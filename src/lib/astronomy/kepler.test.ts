import { describe, expect, test } from "vitest"
import {
  normalizeRadians,
  positionInOrbitalPlane,
  solveEccentricAnomaly,
} from "./kepler"

describe("normalizeRadians", () => {
  test("normalizes negative angles", () => {
    expect(normalizeRadians(-Math.PI)).toBeCloseTo(Math.PI)
    expect(normalizeRadians(-3 * Math.PI)).toBeCloseTo(Math.PI)
  })

  test("normalizes a complete circle", () => {
    expect(normalizeRadians(2 * Math.PI)).toBeCloseTo(0)
    expect(normalizeRadians(4 * Math.PI)).toBeCloseTo(0)
  })
})

describe("solveEccentricAnomaly", () => {
  test("returns the mean anomaly for a circular orbit", () => {
    const meanAnomaly = 1.2

    expect(solveEccentricAnomaly(meanAnomaly, 0)).toBeCloseTo(meanAnomaly, 12)
  })

  test("satisfies Kepler's equation for Mercury", () => {
    const meanAnomaly = 1.2
    const eccentricity = 0.20563593

    const eccentricAnomaly = solveEccentricAnomaly(meanAnomaly, eccentricity)

    const calculatedMeanAnomaly =
      eccentricAnomaly - eccentricity * Math.sin(eccentricAnomaly)

    expect(calculatedMeanAnomaly).toBeCloseTo(meanAnomaly, 10)
  })

  test("rejects non-elliptical eccentricities", () => {
    expect(() => solveEccentricAnomaly(1, 1)).toThrow(RangeError)
  })
})

describe("positionInOrbitalPlane", () => {
  const semiMajorAxisAu = 1
  const eccentricity = 0.01671123

  test("places Earth at perihelion", () => {
    const position = positionInOrbitalPlane(semiMajorAxisAu, eccentricity, 0)

    expect(position.xAu).toBeCloseTo(semiMajorAxisAu * (1 - eccentricity))

    expect(position.yAu).toBeCloseTo(0)
  })

  test("places Earth at aphelion", () => {
    const position = positionInOrbitalPlane(
      semiMajorAxisAu,
      eccentricity,
      Math.PI,
    )

    expect(position.xAu).toBeCloseTo(-semiMajorAxisAu * (1 + eccentricity))

    expect(position.yAu).toBeCloseTo(0)
  })
})
