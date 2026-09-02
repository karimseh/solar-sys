import { describe, expect, test } from "vitest"
import { EARTH_MOON_BARYCENTER_ELEMENTS } from "./data/jpl-planetary-elements"
import { calculateOrbitalPlaneState } from "./orbital-state"
import { J2000_JULIAN_DATE } from "./time"

describe("calculateOrbitalPlaneState", () => {
  test("calculates the Earth-Moon barycenter state at J2000", () => {
    const state = calculateOrbitalPlaneState(
      EARTH_MOON_BARYCENTER_ELEMENTS,
      J2000_JULIAN_DATE,
    )

    const meanAnomalyDegrees = state.meanAnomalyRadians * (180 / Math.PI)

    expect(meanAnomalyDegrees).toBeCloseTo(357.52688973, 8)

    expect(state.position.xAu).toBeCloseTo(0.9823280039, 8)

    expect(state.position.yAu).toBeCloseTo(-0.0438771484, 8)

    expect(Math.hypot(state.position.xAu, state.position.yAu)).toBeCloseTo(
      0.9833074349,
      8,
    )
  })
})
