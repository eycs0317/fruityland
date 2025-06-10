// src/utils/timezoneUtils.ts

import {
  toZonedTime,    // Interprets a UTC Date object in a specific timezone
  fromZonedTime,  // Converts a local Date object (interpreted in a timezone) to its UTC equivalent
  format          // Formats a Date object into a string, with optional timezone
} from 'date-fns-tz';
import {  setHours, setMinutes, setSeconds, setMilliseconds } from 'date-fns';

// Define the primary timezone for your application's display (e.g., for San Lorenzo, CA)
// For Hong Kong, change this to 'Asia/Hong_Kong'
export const APP_DISPLAY_TIMEZONE = 'Asia/Hong_Kong';

/**
 * Converts a Date object (which might be local/system-time) into its UTC equivalent,
 * assuming the input Date represents a time in a specified local timezone.
 * Use this when sending local user input dates to your API/DB.
 * @param localDate The Date object representing a time in the given timezone.
 * @param timezone The IANA timezone string (e.g., 'America/Los_Angeles').
 * @returns A Date object representing the exact UTC instant for database storage.
 */
export function convertLocalToUTCForDB(localDate: Date, timezone: string): Date {
  return fromZonedTime(localDate, timezone);
}

/**
 * Converts a UTC Date object (from your database) to a Date object that is conceptually
 * "aware" of a specific local timezone. This is used for display purposes.
 * @param utcDate The Date object from the database (UTC).
 * @param timezone The IANA timezone string.
 * @returns A Date object that, when formatted, will reflect the local time.
 */
export function convertUTCToLocal(utcDate: Date, timezone: string): Date {
  return toZonedTime(utcDate, timezone);
}

/**
 * Formats a UTC Date object (from database) into a human-readable string
 * in the specified local timezone.
 * @param utcDate The Date object from the database (UTC).
 * @param timezone The IANA timezone string.
 * @param formatString The date-fns format string (e.g., 'yyyy-MM-dd HH:mm:ss').
 * @returns The formatted date/time string in the specified timezone.
 */
export function formatUTCToLocalString(utcDate: Date, timezone: string, formatString: string): string {
  // toZonedTime makes the Date object "aware" of the timezone
  const zonedDate = toZonedTime(utcDate, timezone);
  // format then correctly formats that zonedDate into a string
  return format(zonedDate, formatString, { timeZone: timezone });
}

/**
 * Calculates the UTC start and end boundaries for a given local date
 * in a specific timezone. Useful for database queries.
 * E.g., for 2025-07-14 in 'America/Los_Angeles', this returns the UTC
 * equivalents of 2025-07-14 00:00:00 PDT and 2025-07-14 23:59:59.999 PDT.
 * @param localDate A Date object representing *any time* on the desired local day.
 * @param timezone The IANA timezone string.
 * @returns An object with 'start' and 'end' Date objects, both in UTC.
 */
export function getUTCRangeForLocalDay(localDate: Date, timezone: string): { start: Date, end: Date } {
  // Create a base Date object for the target local date at midnight (system's local time)
  // We'll then convert this correctly to the target timezone's start and end.
  const baseDay = new Date(localDate.getFullYear(), localDate.getMonth(), localDate.getDate());

  // Get start of the day in the specified timezone
  const startOfLocalDay = setMilliseconds(setSeconds(setMinutes(setHours(baseDay, 0), 0), 0), 0);
  // Get end of the day in the specified timezone
  const endOfLocalDay = setMilliseconds(setSeconds(setMinutes(setHours(baseDay, 23), 59), 59), 999);

  // Convert these specific local times to their UTC equivalents for querying
  const utcStart = fromZonedTime(startOfLocalDay, timezone);
  const utcEnd = fromZonedTime(endOfLocalDay, timezone);

  return { start: utcStart, end: utcEnd };
}