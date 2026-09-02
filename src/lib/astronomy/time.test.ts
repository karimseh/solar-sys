import { describe, expect, test } from "vitest"
import {
  DAYS_PER_JULIAN_CENTURY,
  J2000_JULIAN_DATE,
  dateToJulianDateUtc,
  julianCenturiesSinceJ2000,
} from "./time"

describe("dateToJulianDateUtc", () => {
  test("converts the Unix epoch", () => {
    const date = new Date("1970-01-01T00:00:00.000Z")

    expect(dateToJulianDateUtc(date)).toBeCloseTo(2_440_587.5, 10)
  })

  test("converts the J2000 epoch", () => {
    const date = new Date("2000-01-01T12:00:00.000Z")

    expect(dateToJulianDateUtc(date)).toBeCloseTo(J2000_JULIAN_DATE, 10)
  })

  test("rejects invalid dates", () => {
    expect(() => dateToJulianDateUtc(new Date("invalid"))).toThrow(RangeError)
  })
})

describe("julianCenturiesSinceJ2000", () => {
  test("returns zero at J2000", () => {
    expect(julianCenturiesSinceJ2000(J2000_JULIAN_DATE)).toBe(0)
  })

  test("returns one after one Julian century", () => {
    expect(
      julianCenturiesSinceJ2000(J2000_JULIAN_DATE + DAYS_PER_JULIAN_CENTURY),
    ).toBe(1)
  })

  test("returns negative values before J2000", () => {
    expect(
      julianCenturiesSinceJ2000(
        J2000_JULIAN_DATE - DAYS_PER_JULIAN_CENTURY / 2,
      ),
    ).toBe(-0.5)
  })
})
