import * as THREE from "three"
import type { EclipticPosition } from "../astronomy/ecliptic-coordinates"

export const SCENE_UNITS_PER_AU = 4

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
