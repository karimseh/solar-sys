import { J2000_JULIAN_DATE } from "./time"

const TWO_PI = Math.PI * 2
const HOURS_PER_DAY = 24

const EARTH_ROTATION_AT_J2000_TURNS = 0.779057273264
const EARTH_ROTATIONS_PER_DAY = 1.00273781191135448

export function calculateAxialRotationRadians(
  elapsedDays: number,
  rotationPeriodHours: number,
): number {
  if (!Number.isFinite(elapsedDays)) {
    throw new RangeError(`Elapsed days must be finite, got: ${elapsedDays}`)
  }

  if (!Number.isFinite(rotationPeriodHours) || rotationPeriodHours === 0) {
    throw new RangeError(
      `Rotation period must be finite and non-zero, got: ${rotationPeriodHours}`,
    )
  }

  const completedRotations = (elapsedDays * HOURS_PER_DAY) / rotationPeriodHours

  return completedRotations * TWO_PI
}

export function calculateEarthRotationAngleRadians(julianDate: number): number {
  if (!Number.isFinite(julianDate)) {
    throw new RangeError(`Julian date must be finite, got: ${julianDate}`)
  }

  const daysSinceJ2000 = julianDate - J2000_JULIAN_DATE

  const rotations =
    EARTH_ROTATION_AT_J2000_TURNS + EARTH_ROTATIONS_PER_DAY * daysSinceJ2000

  const normalizedRotations = ((rotations % 1) + 1) % 1

  return normalizedRotations * TWO_PI
}
