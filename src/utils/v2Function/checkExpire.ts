export function checkExpire(startDate: Date, endDate: Date, HKTomorrowUTC: Date): number {
  if(HKTomorrowUTC < startDate) {
    return 0;
  } else if(HKTomorrowUTC >= endDate) {
    return 1;
  } else {
    return 2;
  }
}