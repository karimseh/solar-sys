import type { OrbitalElements } from "../types"

export const MOON_ORBITAL_ELEMENTS = {
  semiMajorAxisAu: {
    atJ2000: 0.00256955529,
    ratePerCentury: 0,
  },
  eccentricity: {
    atJ2000: 0.0549,
    ratePerCentury: 0,
  },
  inclinationDeg: {
    atJ2000: 5.145,
    ratePerCentury: 0,
  },
  meanLongitudeDeg: {
    atJ2000: 218.3164477,
    ratePerCentury: 481_267.88123421,
  },
  longitudeOfPerihelionDeg: {
    atJ2000: 83.3530513,
    ratePerCentury: 4_069.01372871,
  },
  longitudeOfAscendingNodeDeg: {
    atJ2000: 125.044555,
    ratePerCentury: -1_934.1361849,
  },
} as const satisfies OrbitalElements
