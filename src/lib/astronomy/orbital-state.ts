import {
  normalizeRadians,
  positionInOrbitalPlane,
  solveEccentricAnomaly,
  type OrbitalPlanePosition,
} from "./kepler"
import { resolveOrbitalElementsAtDate } from "./orbital-elements"
import type { OrbitalElements, OrbitalElementsAtDate } from "./types"
import { degreesToRadians } from "./angles"

export type OrbitalPlaneState = Readonly<{
  elements: OrbitalElementsAtDate
  meanAnomalyRadians: number
  eccentricAnomalyRadians: number
  position: OrbitalPlanePosition
}>

export function calculateMeanAnomalyRadians(
  elements: OrbitalElementsAtDate,
): number {
  const meanAnomalyDegrees =
    elements.meanLongitudeDeg - elements.longitudeOfPerihelionDeg

  return normalizeRadians(degreesToRadians(meanAnomalyDegrees))
}

export function calculateOrbitalPlaneState(
  elements: OrbitalElements,
  julianDate: number,
): OrbitalPlaneState {
  const elementsAtDate = resolveOrbitalElementsAtDate(elements, julianDate)

  const meanAnomalyRadians = calculateMeanAnomalyRadians(elementsAtDate)

  const eccentricAnomalyRadians = solveEccentricAnomaly(
    meanAnomalyRadians,
    elementsAtDate.eccentricity,
  )

  const position = positionInOrbitalPlane(
    elementsAtDate.semiMajorAxisAu,
    elementsAtDate.eccentricity,
    eccentricAnomalyRadians,
  )

  return {
    elements: elementsAtDate,
    meanAnomalyRadians,
    eccentricAnomalyRadians,
    position,
  }
}
