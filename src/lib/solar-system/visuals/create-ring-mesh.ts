import * as THREE from "three"
import type { RingVisualDefinition } from "@/types/celestial-body"

export function createRingMesh(
  ring: RingVisualDefinition,
  planetRadius: number,
): THREE.Mesh<THREE.RingGeometry, THREE.MeshStandardMaterial> {
  const geometry = new THREE.RingGeometry(
    planetRadius * ring.innerRadiusRatio,
    planetRadius * ring.outerRadiusRatio,
    128,
  )

  const material = new THREE.MeshStandardMaterial({
    color: ring.color,
    roughness: 0.9,
    metalness: 0,
    transparent: true,
    opacity: ring.opacity,
    side: THREE.DoubleSide,
    depthWrite: false,
  })

  const mesh = new THREE.Mesh(geometry, material)

  // RingGeometry starts in the XY plane. Our planets rotate around Y,
  // so their equatorial plane is XZ.
  mesh.rotation.x = Math.PI / 2

  return mesh
}
