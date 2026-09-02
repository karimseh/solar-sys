const TWO_PI = Math.PI * 2
const HOURS_PER_DAY = 24

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
