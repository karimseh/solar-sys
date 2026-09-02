import {
  orbitalPlaneToEcliptic,
  type EclipticPosition,
} from "./ecliptic-coordinates"
import { positionInOrbitalPlane } from "./kepler"
import type { OrbitalElementsAtDate } from "./types"

const TWO_PI = Math.PI * 2

export function sampleEclipticOrbit(
  elements: OrbitalElementsAtDate,
  segmentCount = 256,
): readonly EclipticPosition[] {
  if (!Number.isInteger(segmentCount) || segmentCount < 3) {
    throw new RangeError("Orbit path requires at least three segments")
  }

  return Array.from({ length: segmentCount }, (_, index) => {
    const eccentricAnomaly = (index / segmentCount) * TWO_PI

    const orbitalPlanePosition = positionInOrbitalPlane(
      elements.semiMajorAxisAu,
      elements.eccentricity,
      eccentricAnomaly,
    )

    return orbitalPlaneToEcliptic(orbitalPlanePosition, elements)
  })
}
