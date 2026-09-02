import { degreesToRadians } from "./angles"
import type { OrbitalPlanePosition } from "./kepler"
import { calculateOrbitalPlaneState } from "./orbital-state"
import type { OrbitalElements, OrbitalElementsAtDate } from "./types"

export type EclipticPosition = Readonly<{
  xAu: number
  yAu: number
  zAu: number
}>

export function orbitalPlaneToEcliptic(
  position: OrbitalPlanePosition,
  elements: OrbitalElementsAtDate,
): EclipticPosition {
  const inclination = degreesToRadians(elements.inclinationDeg)
  const longitudeOfAscendingNode = degreesToRadians(
    elements.longitudeOfAscendingNodeDeg,
  )
  const argumentOfPerihelion = degreesToRadians(
    elements.longitudeOfPerihelionDeg - elements.longitudeOfAscendingNodeDeg,
  )
  const cosInclination = Math.cos(inclination)
  const sinInclination = Math.sin(inclination)

  const cosAscendingNode = Math.cos(longitudeOfAscendingNode)
  const sinAscendingNode = Math.sin(longitudeOfAscendingNode)
  const cosPerihelion = Math.cos(argumentOfPerihelion)
  const sinPerihelion = Math.sin(argumentOfPerihelion)

  const xPrime = position.xAu
  const yPrime = position.yAu

  return {
    xAu:
      (cosPerihelion * cosAscendingNode -
        sinPerihelion * sinAscendingNode * cosInclination) *
        xPrime +
      (-sinPerihelion * cosAscendingNode -
        cosPerihelion * sinAscendingNode * cosInclination) *
        yPrime,

    yAu:
      (cosPerihelion * sinAscendingNode +
        sinPerihelion * cosAscendingNode * cosInclination) *
        xPrime +
      (-sinPerihelion * sinAscendingNode +
        cosPerihelion * cosAscendingNode * cosInclination) *
        yPrime,

    zAu:
      sinPerihelion * sinInclination * xPrime +
      cosPerihelion * sinInclination * yPrime,
  }
}
export function calculateHeliocentricEclipticPosition(
  elements: OrbitalElements,
  julianDate: number,
): EclipticPosition {
  const state = calculateOrbitalPlaneState(elements, julianDate)

  return orbitalPlaneToEcliptic(state.position, state.elements)
}
