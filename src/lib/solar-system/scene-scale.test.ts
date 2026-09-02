import { describe, expect, test } from "vitest"
import * as THREE from "three"
import {
  bodyRadiusToSceneUnits,
  KILOMETERS_PER_AU,
  SCENE_UNITS_PER_AU,
  setScenePositionFromEcliptic,
} from "./scene-scale"

describe("setScenePositionFromEcliptic", () => {
  test("maps ecliptic coordinates to Three.js coordinates", () => {
    const target = new THREE.Vector3()

    setScenePositionFromEcliptic(target, {
      xAu: 1,
      yAu: 2,
      zAu: 3,
    })

    expect(target.toArray()).toEqual([4, 12, -8])
  })
})

describe("bodyRadiusToSceneUnits", () => {
  test("uses the physical distance scale in true mode", () => {
    const earthRadius = bodyRadiusToSceneUnits(6_371, "planet", "true")

    expect(earthRadius).toBeCloseTo(
      (6_371 / KILOMETERS_PER_AU) * SCENE_UNITS_PER_AU,
      12,
    )
  })

  test("preserves body-size ratios in true mode", () => {
    const sunRadius = bodyRadiusToSceneUnits(695_700, "star", "true")

    const earthRadius = bodyRadiusToSceneUnits(6_371, "planet", "true")

    expect(sunRadius / earthRadius).toBeCloseTo(695_700 / 6_371, 12)
  })

  test("uses readable reference sizes in exploration mode", () => {
    const sunRadius = bodyRadiusToSceneUnits(695_700, "star", "exploration")

    const earthRadius = bodyRadiusToSceneUnits(6_371, "planet", "exploration")

    expect(sunRadius).toBeCloseTo(0.6)
    expect(earthRadius).toBeCloseTo(0.12)
  })

  test("preserves planet-to-moon proportions in exploration mode", () => {
    const earthRadius = bodyRadiusToSceneUnits(6_371, "planet", "exploration")

    const moonRadius = bodyRadiusToSceneUnits(1_737.4, "moon", "exploration")

    expect(moonRadius / earthRadius).toBeCloseTo(1_737.4 / 6_371, 12)
  })

  test("rejects invalid radii", () => {
    expect(() => bodyRadiusToSceneUnits(0, "planet", "true")).toThrow(
      RangeError,
    )
  })
})
