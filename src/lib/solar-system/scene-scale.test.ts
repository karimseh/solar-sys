import { expect, test } from "vitest"
import * as THREE from "three"
import { setScenePositionFromEcliptic } from "./scene-scale"

test("maps ecliptic coordinates to Three.js coordinates", () => {
  const target = new THREE.Vector3()

  setScenePositionFromEcliptic(target, {
    xAu: 1,
    yAu: 2,
    zAu: 3,
  })

  expect(target.toArray()).toEqual([4, 12, -8])
})
