import * as THREE from "three"

export function createSunMaterial(
  surfaceTexture: THREE.Texture,
): THREE.ShaderMaterial {
  surfaceTexture.wrapS = THREE.RepeatWrapping
  surfaceTexture.needsUpdate = true

  return new THREE.ShaderMaterial({
    uniforms: {
      uSurfaceTexture: { value: surfaceTexture },
      uTime: { value: 0 },
      uAnimationStrength: { value: 0.18 },
    },
    vertexShader: `
            varying vec2 vUv;
            varying vec3 vSpherePosition;

            void main() {
                vUv = uv;
                vSpherePosition = normalize(position);

                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
    fragmentShader: `
      uniform sampler2D uSurfaceTexture;
      uniform float uTime;
      uniform float uAnimationStrength;

      varying vec2 vUv;
      varying vec3 vSpherePosition;

      float calculatePlasma(
        vec3 spherePosition,
        float time
      ) {
        float waveA =
          sin(spherePosition.x * 18.0 + time * 0.70);

        float waveB =
          sin(spherePosition.y * 22.0 - time * 0.55);

        float waveC =
          sin(spherePosition.z * 16.0 + time * 0.45);

        float waveD =
          sin(
            (spherePosition.x +
             spherePosition.y +
             spherePosition.z) *
            12.0 -
            time * 0.35
          );

        return
          (waveA + waveB + waveC + waveD) *
          0.125 +
          0.5;
      }

      void main() {
        vec3 spherePosition =
          normalize(vSpherePosition);

        float plasma =
          calculatePlasma(spherePosition, uTime);

        vec2 distortion = vec2(
          sin(
            spherePosition.y * 14.0 +
            uTime * 0.35
          ),
          cos(
            spherePosition.x * 15.0 -
            uTime * 0.30
          )
        ) * 0.0035;

        vec3 surfaceColor =
          texture2D(
            uSurfaceTexture,
            vUv + distortion
          ).rgb;

        float brightness =
          1.0 +
          (plasma - 0.5) *
          uAnimationStrength;

        vec3 activeRegionColor =
          vec3(1.0, 0.42, 0.04) *
          pow(plasma, 6.0) *
          0.2;

        vec3 finalColor =
          surfaceColor * brightness +
          activeRegionColor;

        gl_FragColor =
          vec4(finalColor, 1.0);

        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
  })
}
