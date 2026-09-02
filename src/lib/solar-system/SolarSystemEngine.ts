import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"
import { CELESTIAL_BODIES } from "@/lib/solar-system/bodies"
import type { CelestialBodyDefinition } from "@/types/celestial-body"
import { calculateHeliocentricEclipticPosition } from "../astronomy/ecliptic-coordinates"
import { sampleEclipticOrbit } from "../astronomy/orbit-path"
import { resolveOrbitalElementsAtDate } from "../astronomy/orbital-elements"
import { dateToJulianDateUtc } from "../astronomy/time"
import type { OrbitalElementsAtDate } from "../astronomy/types"
import { createEarthMaterial } from "./visuals/create-earth-material"
import { createSunMaterial } from "./visuals/create-sun-material"
import {
  bodyRadiusToSceneUnits,
  setScenePositionFromEcliptic,
} from "@/lib/solar-system/scene-scale"
import { createStarField } from "./visuals/create-star-field"
import { calculateAxialRotationRadians } from "../astronomy/rotation"

export type SolarSystemEngineOptions = {
  onProgress?: (progress: number, url: string) => void
  onReady?: () => void
  onError?: (url: string) => void
  onSelect?: (bodyId: string | null) => void
}

type BodyRuntime = {
  definition: CelestialBodyDefinition
  mesh: THREE.Mesh
  positionGroup: THREE.Object3D
  selectionGroup: THREE.Object3D
  orbitPath: THREE.LineLoop | null
  displayRadius: number
}
export class SolarSystemEngine {
  private readonly container: HTMLElement
  private simulationJulianDate = dateToJulianDateUtc(new Date())
  private readonly starField: THREE.Points<
    THREE.BufferGeometry,
    THREE.ShaderMaterial
  >
  private sunMaterial: THREE.ShaderMaterial | null = null
  private visualTime = 0
  private readonly scene: THREE.Scene
  private readonly camera: THREE.PerspectiveCamera
  private readonly renderer: THREE.WebGLRenderer
  private readonly controls: OrbitControls
  private readonly bodies: BodyRuntime[] = []
  private readonly resizeObserver: ResizeObserver
  private readonly textureLoader: THREE.TextureLoader
  private readonly textures: THREE.Texture[] = []
  private readonly raycaster = new THREE.Raycaster()
  private readonly pointer = new THREE.Vector2()
  private readonly pointerDown = new THREE.Vector2()
  private readonly overviewCameraPosition = new THREE.Vector3(0, 4, 9)

  private readonly overviewTarget = new THREE.Vector3(0, 0, 0)
  private readonly focusedWorldPosition = new THREE.Vector3()
  private readonly desiredCameraPosition = new THREE.Vector3()
  private readonly cameraOffset = new THREE.Vector3()

  private simulationTime = 0
  private simulationDaysPerSecond = 1
  private isPaused = false
  private orbitPathsVisible = true

  private returningToOverview = false
  private previousFrameTime = 0

  private readonly onSelect: ((bodyId: string | null) => void) | undefined

  private selectedBody: BodyRuntime | null = null

  private disposed = false

  constructor(container: HTMLElement, options: SolarSystemEngineOptions) {
    this.container = container
    this.onSelect = options.onSelect
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x02030a)
    this.starField = createStarField()
    this.scene.add(this.starField)

    this.camera = new THREE.PerspectiveCamera(60, 1, 0.1, 2_000)
    this.camera.position.copy(this.overviewCameraPosition)

    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.outputColorSpace = THREE.SRGBColorSpace

    this.renderer.domElement.style.display = "block"
    this.renderer.domElement.style.width = "100%"
    this.renderer.domElement.style.height = "100%"

    this.renderer.domElement.addEventListener(
      "pointerdown",
      this.handlePointerDown,
    )
    this.renderer.domElement.addEventListener("pointerup", this.handlePointerUp)

    this.container.appendChild(this.renderer.domElement)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.05
    this.controls.target.copy(this.overviewTarget)
    this.controls.minDistance = 0.4
    this.controls.maxDistance = 350
    this.controls.zoomSpeed = 0.75
    const loadingManager = new THREE.LoadingManager()

    loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
      options.onProgress?.(itemsLoaded / itemsTotal, url)
    }

    loadingManager.onLoad = () => {
      options.onReady?.()
    }

    loadingManager.onError = (url) => {
      options.onError?.(url)
    }
    this.textureLoader = new THREE.TextureLoader(loadingManager)

    for (const definition of CELESTIAL_BODIES) {
      this.createBody(definition)
    }

    this.resizeObserver = new ResizeObserver(this.resize)
    this.resizeObserver.observe(this.container)
    this.resize()

    this.renderer.setAnimationLoop(this.animate)
  }

  public setPaused(paused: boolean): void {
    this.isPaused = paused
  }

  public setSimulationSpeed(daysPerSecond: number): void {
    this.simulationDaysPerSecond = THREE.MathUtils.clamp(daysPerSecond, 0.25, 4)
  }

  public setOrbitPathsVisible(visible: boolean): void {
    this.orbitPathsVisible = visible
    for (const body of this.bodies) {
      if (body.orbitPath) {
        body.orbitPath.visible = visible
      }
    }
  }
  private handlePointerDown = (event: PointerEvent): void => {
    this.pointerDown.set(event.clientX, event.clientY)
  }

  private handlePointerUp = (event: PointerEvent): void => {
    if (event.button !== 0) {
      return
    }
    const movement = Math.hypot(
      event.clientX - this.pointerDown.x,
      event.clientY - this.pointerDown.y,
    )

    if (movement > 8) return

    const rectangle = this.renderer.domElement.getBoundingClientRect()
    this.pointer.x =
      ((event.clientX - rectangle.left) / rectangle.width) * 2 - 1
    this.pointer.y =
      -((event.clientY - rectangle.top) / rectangle.height) * 2 + 1

    this.raycaster.setFromCamera(this.pointer, this.camera)
    const intersections = this.raycaster.intersectObjects(
      this.bodies.map((body) => body.mesh),
      false,
    )

    if (intersections.length === 0) {
      this.setSelectedBody(null)
      return
    }

    const selectedMesh = intersections[0].object
    const body = this.bodies.find((body) => body.mesh === selectedMesh) ?? null
    this.setSelectedBody(body)
  }

  private setSelectedBody = (body: BodyRuntime | null): void => {
    if (this.selectedBody === body) return

    if (this.selectedBody) {
      this.selectedBody.selectionGroup.scale.setScalar(1)
    }

    this.selectedBody = body

    if (body) {
      body.selectionGroup.scale.setScalar(1.15)

      body.mesh.getWorldPosition(this.focusedWorldPosition)

      this.cameraOffset
        .copy(this.camera.position)
        .sub(this.focusedWorldPosition)

      if (this.cameraOffset.lengthSq() < 0.0001) {
        this.cameraOffset.set(0, 1, 1)
      }

      const focusDistance = Math.max(body.displayRadius * 3.5, 0.6)

      this.cameraOffset.normalize().multiplyScalar(focusDistance)

      this.returningToOverview = false
      this.controls.enabled = false
    } else {
      this.returningToOverview = true
      this.controls.enabled = false
    }
    this.onSelect?.(body?.definition.id ?? null)
  }
  private updateCamera(deltaTime: number): void {
    if (deltaTime <= 0) {
      return
    }

    const smoothing = 1 - Math.exp(-4 * deltaTime)

    if (this.selectedBody) {
      this.selectedBody.mesh.getWorldPosition(this.focusedWorldPosition)

      this.desiredCameraPosition
        .copy(this.focusedWorldPosition)
        .add(this.cameraOffset)

      this.camera.position.lerp(this.desiredCameraPosition, smoothing)

      this.controls.target.lerp(this.focusedWorldPosition, smoothing)

      return
    }

    if (!this.returningToOverview) {
      return
    }

    this.camera.position.lerp(this.overviewCameraPosition, smoothing)

    this.controls.target.lerp(this.overviewTarget, smoothing)

    const cameraHasArrived =
      this.camera.position.distanceTo(this.overviewCameraPosition) < 0.01

    const targetHasArrived =
      this.controls.target.distanceTo(this.overviewTarget) < 0.01

    if (cameraHasArrived && targetHasArrived) {
      this.camera.position.copy(this.overviewCameraPosition)

      this.controls.target.copy(this.overviewTarget)

      this.returningToOverview = false
      this.controls.enabled = true
    }
  }
  public clearSelection(): void {
    this.setSelectedBody(null)
  }
  private loadColorTexture = (path: string): THREE.Texture => {
    const texture = this.textureLoader.load(path)
    texture.colorSpace = THREE.SRGBColorSpace
    texture.anisotropy = Math.min(
      this.renderer.capabilities.getMaxAnisotropy(),
      8,
    )
    this.textures.push(texture)
    return texture
  }

  private createBody = (definition: CelestialBodyDefinition): void => {
    const geometry = new THREE.SphereGeometry(1, 48, 48)
    const colorMap = definition.visual.texturePath
      ? this.loadColorTexture(definition.visual.texturePath)
      : null
    const nightMap = definition.visual.nightTexturePath
      ? this.loadColorTexture(definition.visual.nightTexturePath)
      : null

    let material: THREE.Material

    if (definition.kind === "star" && colorMap) {
      const sunMaterial = createSunMaterial(colorMap)

      this.sunMaterial = sunMaterial
      material = sunMaterial
    } else if (colorMap && nightMap) {
      material = createEarthMaterial(colorMap, nightMap)
    } else if (definition.kind === "star") {
      material = new THREE.MeshBasicMaterial({
        color: definition.visual.color,
      })
    } else if (!colorMap) {
      // Temporary diagnostic material for planets without textures.
      material = new THREE.MeshBasicMaterial({
        color: definition.visual.color,
      })
    } else {
      material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        map: colorMap,
        roughness: 0.8,
        metalness: 0,
      })
    }

    const mesh = new THREE.Mesh(geometry, material)
    mesh.name = definition.name
    mesh.userData.bodyId = definition.id
    const displayRadius = bodyRadiusToSceneUnits(
      definition.radiusKm,
      definition.kind,
    )

    mesh.scale.setScalar(displayRadius)

    const selectionGroup = new THREE.Object3D()
    selectionGroup.add(mesh)

    const tiltGroup = new THREE.Object3D()

    tiltGroup.rotation.x = THREE.MathUtils.degToRad(definition.axialTiltDegrees)

    tiltGroup.add(selectionGroup)

    const positionGroup = new THREE.Object3D()
    positionGroup.add(tiltGroup)
    this.scene.add(positionGroup)
    if (definition.orbitalElements) {
      const initialPosition = calculateHeliocentricEclipticPosition(
        definition.orbitalElements,
        this.simulationJulianDate,
      )

      setScenePositionFromEcliptic(positionGroup.position, initialPosition)
    }

    let orbitPath: THREE.LineLoop | null = null
    if (definition.orbitalElements) {
      const elementsAtDate = resolveOrbitalElementsAtDate(
        definition.orbitalElements,
        this.simulationJulianDate,
      )

      orbitPath = this.createOrbitPath(elementsAtDate)
      orbitPath.visible = this.orbitPathsVisible
      this.scene.add(orbitPath)
    }
    if (definition.kind === "star") {
      const light = new THREE.PointLight(0xffffff, 150)
      mesh.add(light)
    }

    this.bodies.push({
      definition,
      mesh,
      positionGroup,
      selectionGroup,
      orbitPath,
      displayRadius,
    })
  }
  private createOrbitPath = (
    elements: OrbitalElementsAtDate,
  ): THREE.LineLoop => {
    const points = sampleEclipticOrbit(elements).map((position) => {
      const point = new THREE.Vector3()

      setScenePositionFromEcliptic(point, position)

      return point
    })

    const geometry = new THREE.BufferGeometry().setFromPoints(points)

    const material = new THREE.LineBasicMaterial({
      color: 0x888888,
      transparent: true,
      opacity: 0.5,
    })

    return new THREE.LineLoop(geometry, material)
  }
  private resize = (): void => {
    const width = this.container.clientWidth
    const height = this.container.clientHeight

    if (width === 0 || height === 0) return

    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()

    this.renderer.setSize(width, height, false)
  }

  private animate = (time: number): void => {
    const deltaTime =
      this.previousFrameTime === 0
        ? 0
        : Math.min((time - this.previousFrameTime) * 0.001, 0.1)
    this.visualTime += deltaTime
    if (this.sunMaterial) {
      this.sunMaterial.uniforms.uTime.value = this.visualTime
    }

    this.previousFrameTime = time
    if (!this.isPaused) {
      const simulatedDays = deltaTime * this.simulationDaysPerSecond

      this.simulationJulianDate += simulatedDays
      this.simulationTime += simulatedDays
    }

    for (const body of this.bodies) {
      body.mesh.rotation.y = calculateAxialRotationRadians(
        this.simulationTime,
        body.definition.rotationPeriodHours,
      )
      const orbitalElements = body.definition.orbitalElements

      if (orbitalElements) {
        const position = calculateHeliocentricEclipticPosition(
          orbitalElements,
          this.simulationJulianDate,
        )

        setScenePositionFromEcliptic(body.positionGroup.position, position)
      }
    }
    this.updateCamera(deltaTime)

    this.controls.update()
    this.starField.position.copy(this.camera.position)
    this.renderer.render(this.scene, this.camera)
  }

  public dispose(): void {
    if (this.disposed) return

    this.renderer.setAnimationLoop(null)
    this.resizeObserver.disconnect()
    this.controls.dispose()
    this.starField.geometry.dispose()
    this.starField.material.dispose()
    for (const body of this.bodies) {
      body.mesh.geometry.dispose()
      const materials = Array.isArray(body.mesh.material)
        ? body.mesh.material
        : [body.mesh.material]
      for (const material of materials) {
        material.dispose()
      }

      if (body.orbitPath) {
        body.orbitPath.geometry.dispose()
        const orbitMaterial = body.orbitPath.material
        if (Array.isArray(orbitMaterial)) {
          for (const material of orbitMaterial) {
            material.dispose()
          }
        } else {
          orbitMaterial.dispose()
        }
      }
    }
    for (const texture of this.textures) {
      texture.dispose()
    }
    this.renderer.domElement.removeEventListener(
      "pointerdown",
      this.handlePointerDown,
    )

    this.renderer.domElement.removeEventListener(
      "pointerup",
      this.handlePointerUp,
    )

    this.scene.clear()
    this.renderer.dispose()
    this.renderer.domElement.remove()

    this.disposed = true
  }
}
