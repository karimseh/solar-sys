import { describe, expect, test } from "vitest"
import { EARTH_MOON_BARYCENTER_ELEMENTS } from "./data/jpl-planetary-elements"
import {
  calculateHeliocentricEclipticPosition,
  orbitalPlaneToEcliptic,
} from "./ecliptic-coordinates"
import { calculateOrbitalPlaneState } from "./orbital-state"
import { J2000_JULIAN_DATE } from "./time"

describe("ecliptic coordinates", () => {
  test("calculates the Earth-Moon barycenter at J2000", () => {
    const position = calculateHeliocentricEclipticPosition(
      EARTH_MOON_BARYCENTER_ELEMENTS,
      J2000_JULIAN_DATE,
    )

    expect(position.xAu).toBeCloseTo(-0.1771712491, 9)

    expect(position.yAu).toBeCloseTo(0.967214485, 9)

    expect(position.zAu).toBeCloseTo(-2.58449294e-7, 12)
  })

  test("preserves distance during rotation", () => {
    const orbitalState = calculateOrbitalPlaneState(
      EARTH_MOON_BARYCENTER_ELEMENTS,
      J2000_JULIAN_DATE,
    )

    const eclipticPosition = orbitalPlaneToEcliptic(
      orbitalState.position,
      orbitalState.elements,
    )

    const orbitalPlaneDistance = Math.hypot(
      orbitalState.position.xAu,
      orbitalState.position.yAu,
    )

    const eclipticDistance = Math.hypot(
      eclipticPosition.xAu,
      eclipticPosition.yAu,
      eclipticPosition.zAu,
    )

    expect(eclipticDistance).toBeCloseTo(orbitalPlaneDistance, 12)
  })
})
