const RADIANS_PER_DEGREE = Math.PI / 180

export function degreesToRadians(degrees: number): number {
  if (!Number.isFinite(degrees)) {
    throw new RangeError("Degrees must be finite")
  }

  return degrees * RADIANS_PER_DEGREE
}
