import type {
  OrbitalElements,
  OrbitalElementsAtDate,
  SecularValue,
} from "./types"
import { julianCenturiesSinceJ2000 } from "./time"

export function evaluateSecularValue(
  value: SecularValue,
  julianCenturies: number,
): number {
  if (!Number.isFinite(julianCenturies)) {
    throw new RangeError("Julian centuries must be finite")
  }

  return value.atJ2000 + value.ratePerCentury * julianCenturies
}

export function resolveOrbitalElementsAtDate(
  elements: OrbitalElements,
  julianDate: number,
): OrbitalElementsAtDate {
  const centuries = julianCenturiesSinceJ2000(julianDate)

  return {
    semiMajorAxisAu: evaluateSecularValue(elements.semiMajorAxisAu, centuries),

    eccentricity: evaluateSecularValue(elements.eccentricity, centuries),

    inclinationDeg: evaluateSecularValue(elements.inclinationDeg, centuries),

    meanLongitudeDeg: evaluateSecularValue(
      elements.meanLongitudeDeg,
      centuries,
    ),

    longitudeOfPerihelionDeg: evaluateSecularValue(
      elements.longitudeOfPerihelionDeg,
      centuries,
    ),

    longitudeOfAscendingNodeDeg: evaluateSecularValue(
      elements.longitudeOfAscendingNodeDeg,
      centuries,
    ),
  }
}
