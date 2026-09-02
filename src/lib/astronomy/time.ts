export const SECONDS_PER_DAY = 86_400
export const MILLISECONDS_PER_DAY = SECONDS_PER_DAY * 1_000

export const JULIAN_DATE_AT_UNIX_EPOCH = 2_440_587.5
export const J2000_JULIAN_DATE = 2_451_545.0
export const DAYS_PER_JULIAN_CENTURY = 36_525

export function dateToJulianDateUtc(date: Date): number {
  const milliseconds = date.getTime()
  if (!Number.isFinite(milliseconds)) {
    throw new RangeError(`Invalid date: ${date}`)
  }
  return milliseconds / MILLISECONDS_PER_DAY + JULIAN_DATE_AT_UNIX_EPOCH
}

export function julianCenturiesSinceJ2000(julianDate: number): number {
  if (!Number.isFinite(julianDate)) {
    throw new RangeError(`Invalid Julian date: ${julianDate}`)
  }
  return (julianDate - J2000_JULIAN_DATE) / DAYS_PER_JULIAN_CENTURY
}
