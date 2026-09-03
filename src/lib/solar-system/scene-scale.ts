import * as THREE from "three"
import type { EclipticPosition } from "@/lib/astronomy/ecliptic-coordinates"

export const KILOMETERS_PER_AU = 149_597_870.7
export const SCENE_UNITS_PER_AU = 4
export const SATELLITE_ORBIT_DISTANCE_MULTIPLIER = 50

const EARTH_MEAN_RADIUS_KM = 6_371
const EXPLORATION_EARTH_RADIUS = 0.1
const RADIUS_COMPRESSION_EXPONENT = 0.45

export function kilometersToSceneUnits(kilometers: number): number {
  if (!Number.isFinite(kilometers) || kilometers < 0) {
    throw new RangeError("Kilometer distance must be finite and non-negative")
  }

  return (kilometers / KILOMETERS_PER_AU) * SCENE_UNITS_PER_AU
}

export function bodyRadiusToSceneUnits(radiusKm: number): number {
  if (!Number.isFinite(radiusKm) || radiusKm <= 0) {
    throw new RangeError("Body radius must be finite and positive")
  }

  const radiusRelativeToEarth = radiusKm / EARTH_MEAN_RADIUS_KM

  return (
    EXPLORATION_EARTH_RADIUS *
    Math.pow(radiusRelativeToEarth, RADIUS_COMPRESSION_EXPONENT)
  )
}

export function setScenePositionFromEcliptic(
  target: THREE.Vector3,
  position: EclipticPosition,
  distanceMultiplier = 1,
): THREE.Vector3 {
  if (!Number.isFinite(distanceMultiplier) || distanceMultiplier <= 0) {
    throw new RangeError("Distance multiplier must be finite and positive")
  }

  const scale = SCENE_UNITS_PER_AU * distanceMultiplier

  return target.set(
    position.xAu * scale,
    position.zAu * scale,
    -position.yAu * scale,
  )
}
