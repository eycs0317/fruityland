export function checkExpire(startDate: Date | null, endDate: Date | null, HKTomorrowUTC: Date): number {
  if (!startDate || !endDate) {
    console.warn("checkExpire: Missing startDate or endDate. Treating period as unavailable (returning 1).");
    return 1; // Return 1 (Expired/Unavailable) if range is incomplete
  }
  if(HKTomorrowUTC < startDate) {
    return 0;
  } else if(HKTomorrowUTC >= endDate) {
    return 1;
  } else {
    return 2;
  }
}