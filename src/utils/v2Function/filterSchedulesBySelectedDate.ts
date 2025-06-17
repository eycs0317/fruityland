import { format } from 'date-fns-tz'; // Use date-fns-tz for timezone-aware formatting
// Removed: import { APP_DISPLAY_TIMEZONE } from '@/utils/timezoneUtils'; // Import your application's display timezone

// Assuming a Schedule type similar to your Prisma model:
interface Schedule {
  uid: string;
  sessionDateTime: Date; // Prisma returns Date objects
  group: number;
  isWeekend: boolean;
  isBooked: boolean;
  // Add any other fields your Schedule model has
}

/**
 * Filters an array of schedule entries to include only those that occur
 * on the specified calendar date, interpreting both dates in the local timezone
 * of the environment where this function is executed.
 *
 * @param schedules An array of Schedule objects to filter.
 * @param selectedDate The Date object representing the calendar day to filter by.
 * This date will be interpreted in the local timezone for comparison.
 * @returns An array of Schedule objects that match the selected date.
 */
export function filterSchedulesBySelectedDate(
  schedules: Schedule[],
  selectedDate: string
): Schedule[] {
  if (!schedules || !Array.isArray(schedules) || schedules.length === 0) {
    console.warn("filterSchedulesBySelectedDate: No schedules provided or array is empty.");
    return [];
  }


  // Format the selectedDate to YYYY-MM-DD string using the local timezone.
  // This is the target calendar day we are looking for.
  console.log('selectedDate', selectedDate);
  const targetDayString = format(selectedDate, 'yyyy-MM-dd'); // Removed timeZone option
  console.log(`Filtering for date (in local timezone): ${targetDayString}`);

  const filteredSchedules = schedules.filter(schedule => {
    // For each schedule's sessionDateTime (which is a UTC Date object),
    // format it to YYYY-MM-DD string using the local timezone.
    const scheduleDayString = format(schedule.sessionDateTime, 'yyyy-MM-dd'); // Removed timeZone option

    // Compare the formatted strings. If they match, they are on the same calendar day.
    return scheduleDayString === selectedDate;
  });

  console.log(`Found ${filteredSchedules.length} schedules matching ${targetDayString}.`);
  return filteredSchedules;
}