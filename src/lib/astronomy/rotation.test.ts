import { describe, expect, it } from "vitest"
import { calculateAxialRotationRadians } from "./rotation"

describe("calculateAxialRotationRadians", () => {
  it("completes one rotation after one rotation period", () => {
    expect(calculateAxialRotationRadians(1, 24)).toBeCloseTo(Math.PI * 2)
  })

  it("rotates backward for a negative period", () => {
    expect(calculateAxialRotationRadians(1, -24)).toBeCloseTo(-Math.PI * 2)
  })

  it("rejects a zero rotation period", () => {
    expect(() => calculateAxialRotationRadians(1, 0)).toThrow(RangeError)
  })
})
