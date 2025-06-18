import { toZonedTime } from 'date-fns-tz';

export function convertUTC2Local(utcDate: Date, userTimeZone: string): Date {
  if (!userTimeZone) {
    console.error('convertUTC2Local: userTimeZone is required for accurate conversion.');
    // Fallback to local system time if userTimeZone is not provided, though this is not ideal
    return new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60 * 1000);
  }

  // Use toZonedTime from date-fns-tz to convert the UTC date to the specified timezone.
  // This returns a Date object that, when formatted or inspected, will reflect the time
  // in `userTimeZone` for the given UTC instant.
  const localDate = toZonedTime(utcDate, userTimeZone);
  return localDate;
}


// --- Example Usage ---
/*
// Assume current machine's timezone for console.log is America/Los_Angeles (PDT = UTC-7 in summer)

// Example 1: UTC Date is 2025-07-10T04:00:00.000Z (4 AM UTC)
// We want to see this in 'America/Los_Angeles' (PDT, UTC-7 in July)
// 4 AM UTC - 7 hours = 9 PM PDT on the previous day.
const utcDate1 = new Date('2025-07-10T04:00:00.000Z');
const localDate1_PDT = convertUTC2Local(utcDate1, 'America/Los_Angeles');
console.log('UTC Date 1:', utcDate1.toISOString());
console.log('Local Date 1 (in America/Los_Angeles):', localDate1_PDT.toString());
// Expected `localDate1_PDT.toString()` output: Wed Jul 09 2025 21:00:00 GMT-0700 (Pacific Daylight Time)


// Example 2: UTC Date is 2025-07-10T12:00:00.000Z (12 PM UTC)
// We want to see this in 'Asia/Hong_Kong' (HKT, UTC+8)
// 12 PM UTC + 8 hours = 8 PM HKT on the same day.
const utcDate2 = new Date('2025-07-10T12:00:00.000Z');
const localDate2_HKT = convertUTC2Local(utcDate2, 'Asia/Hong_Kong');
console.log('\nUTC Date 2:', utcDate2.toISOString());
console.log('Local Date 2 (in Asia/Hong_Kong):', localDate2_HKT.toString());
// Expected `localDate2_HKT.toString()` output: Thu Jul 10 2025 20:00:00 GMT+0800 (Hong Kong Standard Time)

// Note: `toISOString()` on `localDate1_PDT` or `localDate2_HKT` would still return the original UTC string
// because `toISOString()` always converts back to UTC for its output format.
// The effect of `toZonedTime` is on how the Date object's internal components (like getHours(), getDate())
// behave when queried *relative to that specific timezone*.
*/