import { format } from 'date-fns'; // Using standard date-fns for formatting

/**
 * Checks if a given date string (YYYY-MM-DD) represents the same calendar day
 * as a provided Date object, considering the Date object's local time components.
 *
 * @param selectedDateString A date string in 'YYYY-MM-DD' format.
 * @param localTimeDate A Date object, assumed to have its internal components already adjusted
 * to the desired local timezone (e.g., via `convertUTC2Local` or `toZonedTime`).
 * @returns true if the dates represent the same calendar day, false otherwise.
 */
export function isSameDay(selectedDateString: string, localTimeDate: Date): boolean {
  // Basic validation for inputs
  if (!selectedDateString || typeof selectedDateString !== 'string' || !(localTimeDate instanceof Date) || isNaN(localTimeDate.getTime())) {
    console.warn('isSameDay: Invalid input. selectedDateString must be a string (YYYY-MM-DD) and localTimeDate a valid Date object.');
    return false;
  }

  // Format the localTimeDate to a 'YYYY-MM-DD' string based on its local components.
  // This extracts the year, month, and day as perceived in the Date object's
  // *internal local representation* (i.e., according to the system's timezone).
  const formattedLocalTime = format(localTimeDate, 'yyyy-MM-dd');

  console.log(`isSameDay: Comparing '${selectedDateString}' (input) with '${formattedLocalTime}' (from Date object's local time).`);

  // Compare the two YYYY-MM-DD strings directly
  return selectedDateString === formattedLocalTime;
}