import * as THREE from "three"
import type { EclipticPosition } from "@/lib/astronomy/ecliptic-coordinates"

export const KILOMETERS_PER_AU = 149_597_870.7
export const SCENE_UNITS_PER_AU = 4

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
): THREE.Vector3 {
  return target.set(
    position.xAu * SCENE_UNITS_PER_AU,
    position.zAu * SCENE_UNITS_PER_AU,
    -position.yAu * SCENE_UNITS_PER_AU,
  )
}
