import * as THREE from "three"

export function createEarthMaterial(
  dayTexture: THREE.Texture,
  nightTexture: THREE.Texture,
): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: {
      uDayTexture: { value: dayTexture },
      uNightTexture: { value: nightTexture },
      uSunPosition: { value: new THREE.Vector3(0, 0, 0) },
    },
    vertexShader: `
        varying vec2 vUv;
      varying vec3 vViewNormal;
      varying vec3 vViewSunDirection;

      uniform vec3 uSunPosition;

      void main() {
        vUv = uv;

        vec4 viewPosition =
          modelViewMatrix * vec4(position, 1.0);

        vec3 viewSunPosition =
          (viewMatrix * vec4(uSunPosition, 1.0)).xyz;

        vViewNormal =
          normalize(normalMatrix * normal);

        vViewSunDirection =
          normalize(viewSunPosition - viewPosition.xyz);

        gl_Position =
          projectionMatrix * viewPosition;
      }
    `,

    fragmentShader: `
      uniform sampler2D uDayTexture;
      uniform sampler2D uNightTexture;

      varying vec2 vUv;
      varying vec3 vViewNormal;
      varying vec3 vViewSunDirection;

      void main() {
        vec3 normal = normalize(vViewNormal);
        vec3 sunDirection = normalize(vViewSunDirection);

        float sunlight =
          dot(normal, sunDirection);

        float dayAmount =
          smoothstep(-0.12, 0.2, sunlight);

        vec3 dayColor =
          texture2D(uDayTexture, vUv).rgb;

        vec3 nightColor =
          texture2D(uNightTexture, vUv).rgb;

        float diffuseLight =
          max(sunlight, 0.0);

        vec3 litDayColor =
          dayColor * (0.15 + diffuseLight * 0.85);

        vec3 finalColor =
          mix(nightColor * 1.5, litDayColor, dayAmount);

        gl_FragColor = vec4(finalColor, 1.0);

        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
  })
}
