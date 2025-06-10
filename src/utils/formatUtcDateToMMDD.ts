// src/utils/formatSimpleDate.ts
import { parseISO, format } from 'date-fns';

/**
 * Parses a UTC date/time string and returns the date in MM/DD format,
 * effectively ignoring the time and timezone components for the output format.
 *
 * @param utcDateTimeString The UTC date/time string (e.g., '2025-07-10T10:00:00.000Z')
 * @returns A formatted date string (e.g., '07/10') or 'Invalid Date' if parsing fails.
 */
export function formatUtcDateToMMDD(utcDateTimeString: string): string {
  try {
    // Parse the ISO 8601 UTC string into a Date object
    const date = parseISO(utcDateTimeString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }

    // Format the date to MM/DD.
    // Since parseISO creates a Date object based on the UTC value,
    // formatting it directly with MM/dd will give you the date component
    // from that UTC value.
    const formattedDate = format(date, 'MM/dd');

    return formattedDate;
  } catch (error) {
    console.error('Error formatting UTC date to MM/DD:', error);
    return 'Error';
  }
}