import { describe, expect, test } from "vitest"
import { EARTH_MOON_BARYCENTER_ELEMENTS } from "./data/jpl-planetary-elements"
import { sampleEclipticOrbit } from "./orbit-path"
import { resolveOrbitalElementsAtDate } from "./orbital-elements"
import { J2000_JULIAN_DATE } from "./time"

const earthElementsAtJ2000 = resolveOrbitalElementsAtDate(
  EARTH_MOON_BARYCENTER_ELEMENTS,
  J2000_JULIAN_DATE,
)

describe("sampleEclipticOrbit", () => {
  test("returns the requested number of points", () => {
    const points = sampleEclipticOrbit(earthElementsAtJ2000, 256)

    expect(points).toHaveLength(256)
  })

  test("contains the correct perihelion and aphelion distances", () => {
    const points = sampleEclipticOrbit(earthElementsAtJ2000, 256)

    const perihelion = points[0]
    const aphelion = points[128]

    const perihelionDistance = Math.hypot(
      perihelion.xAu,
      perihelion.yAu,
      perihelion.zAu,
    )

    const aphelionDistance = Math.hypot(
      aphelion.xAu,
      aphelion.yAu,
      aphelion.zAu,
    )

    const semiMajorAxis = earthElementsAtJ2000.semiMajorAxisAu

    const eccentricity = earthElementsAtJ2000.eccentricity

    expect(perihelionDistance).toBeCloseTo(
      semiMajorAxis * (1 - eccentricity),
      12,
    )

    expect(aphelionDistance).toBeCloseTo(semiMajorAxis * (1 + eccentricity), 12)
  })

  test("returns only finite coordinates", () => {
    const points = sampleEclipticOrbit(earthElementsAtJ2000)

    expect(
      points.every(
        ({ xAu, yAu, zAu }) =>
          Number.isFinite(xAu) && Number.isFinite(yAu) && Number.isFinite(zAu),
      ),
    ).toBe(true)
  })

  test("rejects fewer than three segments", () => {
    expect(() => sampleEclipticOrbit(earthElementsAtJ2000, 2)).toThrow(
      RangeError,
    )
  })
})
