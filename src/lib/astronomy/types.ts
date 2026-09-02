export type SecularValue = Readonly<{
  atJ2000: number
  ratePerCentury: number
}>

export type OrbitalElements = Readonly<{
  semiMajorAxisAu: SecularValue
  eccentricity: SecularValue
  inclinationDeg: SecularValue
  meanLongitudeDeg: SecularValue
  longitudeOfPerihelionDeg: SecularValue
  longitudeOfAscendingNodeDeg: SecularValue
}>

export type PhysicalBodyData = Readonly<{
  equatorialRadiusKm: number
  polarRadiusKm: number
  siderealRotationHours: number
  axialTiltDeg: number
  massKg: number
}>
export type OrbitalElementsAtDate = Readonly<{
  semiMajorAxisAu: number
  eccentricity: number
  inclinationDeg: number
  meanLongitudeDeg: number
  longitudeOfPerihelionDeg: number
  longitudeOfAscendingNodeDeg: number
}>
