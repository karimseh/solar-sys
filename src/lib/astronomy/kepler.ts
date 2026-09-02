const TWO_PI = 2 * Math.PI

export type OrbitalPlanePosition = Readonly<{
  xAu: number
  yAu: number
}>
export function normalizeRadians(angle: number): number {
  if (!Number.isFinite(angle)) {
    throw new RangeError(`Invalid angle: ${angle}`)
  }

  return ((angle % TWO_PI) + TWO_PI) % TWO_PI // 0 <= angle < 2π
}

export function solveEccentricAnomaly(
  meanAnomalyRadians: number,
  eccentricity: number,
): number {
  if (eccentricity < 0 || eccentricity >= 1) {
    throw new RangeError(`Invalid eccentricity: ${eccentricity}`)
  }
  const meanAnomaly = normalizeRadians(meanAnomalyRadians)
  let eccentricAnomaly = eccentricity < 0.8 ? meanAnomaly : Math.PI
  const tolerance = 1e-12
  const maxIterations = 15

  for (let i = 0; i < maxIterations; i++) {
    const equationError =
      eccentricAnomaly - eccentricity * Math.sin(eccentricAnomaly) - meanAnomaly
    const derivative = 1 - eccentricity * Math.cos(eccentricAnomaly)
    const correction = equationError / derivative
    eccentricAnomaly -= correction

    if (Math.abs(correction) < tolerance) {
      return normalizeRadians(eccentricAnomaly)
    }
  }

  throw new Error(`Failed to converge after ${maxIterations} iterations`)
}

export function positionInOrbitalPlane(
  semiMajorAxisAu: number,
  eccentricity: number,
  eccentricAnomalyRadians: number,
): OrbitalPlanePosition {
  if (!Number.isFinite(semiMajorAxisAu) || semiMajorAxisAu <= 0) {
    throw new RangeError(`Invalid semi-major axis: ${semiMajorAxisAu}`)
  }
  if (eccentricity < 0 || eccentricity >= 1) {
    throw new RangeError(`Invalid eccentricity: ${eccentricity}`)
  }

  const semiMinorAxisAu = semiMajorAxisAu * Math.sqrt(1 - eccentricity ** 2)

  return {
    xAu: semiMajorAxisAu * (Math.cos(eccentricAnomalyRadians) - eccentricity),
    yAu: semiMinorAxisAu * Math.sin(eccentricAnomalyRadians),
  }
}
