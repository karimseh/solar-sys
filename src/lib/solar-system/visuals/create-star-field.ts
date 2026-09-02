import * as THREE from "three"

export function createStarField(
  starCount = 10_000,
): THREE.Points<THREE.BufferGeometry, THREE.ShaderMaterial> {
  const positions = new Float32Array(starCount * 3)
  const sizes = new Float32Array(starCount)
  const brightnesses = new Float32Array(starCount)

  for (let index = 0; index < starCount; index += 1) {
    const offset = index * 3

    const theta = Math.random() * Math.PI * 2
    const yDirection = THREE.MathUtils.randFloatSpread(2)
    const horizontalDirection = Math.sqrt(1 - yDirection * yDirection)
    const radius = THREE.MathUtils.randFloat(600, 900)
    const isBrightStar = Math.random() < 0.06

    sizes[index] = isBrightStar
      ? THREE.MathUtils.randFloat(3, 5)
      : THREE.MathUtils.randFloat(0.8, 1.8)

    brightnesses[index] = isBrightStar
      ? THREE.MathUtils.randFloat(0.85, 1)
      : THREE.MathUtils.randFloat(0.25, 0.7)

    positions[offset] = radius * horizontalDirection * Math.cos(theta)
    positions[offset + 1] = radius * yDirection
    positions[offset + 2] = radius * horizontalDirection * Math.sin(theta)
  }

  const geometry = new THREE.BufferGeometry()

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))

  geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1))

  geometry.setAttribute(
    "aBrightness",
    new THREE.BufferAttribute(brightnesses, 1),
  )

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uPixelRatio: {
        value: Math.min(window.devicePixelRatio, 2),
      },
    },

    vertexShader: `
    attribute float aSize;
    attribute float aBrightness;

    varying float vBrightness;

    uniform float uPixelRatio;

    void main() {
      vBrightness = aBrightness;

      vec4 viewPosition =
        modelViewMatrix * vec4(position, 1.0);

      gl_Position =
        projectionMatrix * viewPosition;

      gl_PointSize = aSize * uPixelRatio;
    }
  `,

    fragmentShader: `
    varying float vBrightness;

    void main() {
      float distanceFromCenter =
        distance(gl_PointCoord, vec2(0.5));

      float starShape =
        1.0 - smoothstep(0.15, 0.5, distanceFromCenter);

      if (starShape <= 0.0) {
        discard;
      }

      vec3 coolWhite = vec3(0.7, 0.82, 1.0);
      vec3 warmWhite = vec3(1.0, 0.96, 0.88);

      vec3 starColor =
        mix(coolWhite, warmWhite, vBrightness);

      gl_FragColor = vec4(
        starColor * vBrightness,
        starShape * vBrightness
      );
    }
  `,

    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
  })
  const starField = new THREE.Points(geometry, material)

  starField.name = "Star field"
  starField.frustumCulled = false

  return starField
}
