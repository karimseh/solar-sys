import { OrbitalElements, SecularValue } from "../types"

function secularValue(atJ2000: number, ratePerCentury: number): SecularValue {
  return {
    atJ2000,
    ratePerCentury,
  }
}

export const JPL_PLANETARY_ELEMENTS = {
  mercury: {
    semiMajorAxisAu: secularValue(0.38709927, 0.00000037),
    eccentricity: secularValue(0.20563593, 0.00001906),
    inclinationDeg: secularValue(7.00497902, -0.00594749),
    meanLongitudeDeg: secularValue(252.2503235, 149_472.67411175),
    longitudeOfPerihelionDeg: secularValue(77.45779628, 0.16047689),
    longitudeOfAscendingNodeDeg: secularValue(48.33076593, -0.12534081),
  },

  venus: {
    semiMajorAxisAu: secularValue(0.72333566, 0.0000039),
    eccentricity: secularValue(0.00677672, -0.00004107),
    inclinationDeg: secularValue(3.39467605, -0.0007889),
    meanLongitudeDeg: secularValue(181.9790995, 58_517.81538729),
    longitudeOfPerihelionDeg: secularValue(131.60246718, 0.00268329),
    longitudeOfAscendingNodeDeg: secularValue(76.67984255, -0.27769418),
  },

  earth: {
    semiMajorAxisAu: secularValue(1.00000261, 0.00000562),
    eccentricity: secularValue(0.01671123, -0.00004392),
    inclinationDeg: secularValue(-0.00001531, -0.01294668),
    meanLongitudeDeg: secularValue(100.46457166, 35_999.37244981),
    longitudeOfPerihelionDeg: secularValue(102.93768193, 0.32327364),
    longitudeOfAscendingNodeDeg: secularValue(0, 0),
  },

  mars: {
    semiMajorAxisAu: secularValue(1.52371034, 0.00001847),
    eccentricity: secularValue(0.0933941, 0.00007882),
    inclinationDeg: secularValue(1.84969142, -0.00813131),
    meanLongitudeDeg: secularValue(-4.55343205, 19_140.30268499),
    longitudeOfPerihelionDeg: secularValue(-23.94362959, 0.44441088),
    longitudeOfAscendingNodeDeg: secularValue(49.55953891, -0.29257343),
  },

  jupiter: {
    semiMajorAxisAu: secularValue(5.202887, -0.00011607),
    eccentricity: secularValue(0.04838624, -0.00013253),
    inclinationDeg: secularValue(1.30439695, -0.00183714),
    meanLongitudeDeg: secularValue(34.39644051, 3_034.74612775),
    longitudeOfPerihelionDeg: secularValue(14.72847983, 0.21252668),
    longitudeOfAscendingNodeDeg: secularValue(100.47390909, 0.20469106),
  },

  saturn: {
    semiMajorAxisAu: secularValue(9.53667594, -0.0012506),
    eccentricity: secularValue(0.05386179, -0.00050991),
    inclinationDeg: secularValue(2.48599187, 0.00193609),
    meanLongitudeDeg: secularValue(49.95424423, 1_222.49362201),
    longitudeOfPerihelionDeg: secularValue(92.59887831, -0.41897216),
    longitudeOfAscendingNodeDeg: secularValue(113.66242448, -0.28867794),
  },

  uranus: {
    semiMajorAxisAu: secularValue(19.18916464, -0.00196176),
    eccentricity: secularValue(0.04725744, -0.00004397),
    inclinationDeg: secularValue(0.77263783, -0.00242939),
    meanLongitudeDeg: secularValue(313.23810451, 428.48202785),
    longitudeOfPerihelionDeg: secularValue(170.9542763, 0.40805281),
    longitudeOfAscendingNodeDeg: secularValue(74.01692503, 0.04240589),
  },

  neptune: {
    semiMajorAxisAu: secularValue(30.06992276, 0.00026291),
    eccentricity: secularValue(0.00859048, 0.00005105),
    inclinationDeg: secularValue(1.77004347, 0.00035372),
    meanLongitudeDeg: secularValue(-55.12002969, 218.45945325),
    longitudeOfPerihelionDeg: secularValue(44.96476227, -0.32241464),
    longitudeOfAscendingNodeDeg: secularValue(131.78422574, -0.00508664),
  },
} as const satisfies Readonly<Record<string, OrbitalElements>>

export type JplPlanetId = keyof typeof JPL_PLANETARY_ELEMENTS

export const EARTH_MOON_BARYCENTER_ELEMENTS = JPL_PLANETARY_ELEMENTS.earth
