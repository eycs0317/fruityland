

export function resetStartUTC(startUTC: Date | null, HKTomorrowUTC: Date | null): Date | null {
  if (!startUTC || !HKTomorrowUTC) {
    console.warn("resetStartUTC: Input date was null, returning null.");
    return null; // If input is null, return null
  }
  startUTC = HKTomorrowUTC
  return startUTC
}