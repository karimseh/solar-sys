import type { OrbitalElements } from "../types"

export const EARTH_MOON_BARYCENTER_ELEMENTS = {
  semiMajorAxisAu: {
    atJ2000: 1.00000261,
    ratePerCentury: 0.00000562,
  },

  eccentricity: {
    atJ2000: 0.01671123,
    ratePerCentury: -0.00004392,
  },

  inclinationDeg: {
    atJ2000: -0.00001531,
    ratePerCentury: -0.01294668,
  },

  meanLongitudeDeg: {
    atJ2000: 100.46457166,
    ratePerCentury: 35_999.37244981,
  },

  longitudeOfPerihelionDeg: {
    atJ2000: 102.93768193,
    ratePerCentury: 0.32327364,
  },

  longitudeOfAscendingNodeDeg: {
    atJ2000: 0,
    ratePerCentury: 0,
  },
} as const satisfies OrbitalElements
