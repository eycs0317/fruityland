import { fromZonedTime} from 'date-fns-tz';
import { compareAsc } from 'date-fns'; // For sorting Dates

/**
 * Filters and sorts a list of UTC session Date objects to include only those
 * that fall within a specific calendar day in the given user's timezone.
 *
 * @param uniqueSessionUTC An array of Date objects, where each Date represents a UTC timestamp of a session.
 * @param selectedDateString A date string in 'YYYY-MM-DD' format, representing the desired calendar day in the user's timezone.
 * @param userTimeZone The IANA timezone string (e.g., 'America/Los_Angeles', 'Asia/Hong_Kong') for interpreting selectedDate.
 * @returns A sorted array of Date objects (UTC timestamps) that fall within the specified day in the user's timezone.
 */
export function filterSessionsByDate(
  uniqueSessionUTC: Date[],
  selectedDateString: string | undefined,
  userTimeZone: string
): Date[] {
  if (!selectedDateString || !userTimeZone || !uniqueSessionUTC) {
    console.warn('filterSessionsByDate: Missing required parameters. Returning empty array.');
    return [];
  }

  // 1. Determine the UTC boundaries for the `selectedDateString` in `userTimeZone`.
  //    Create a Date object representing midnight (00:00:00.000) of the `selectedDateString`
  //    as interpreted within the `userTimeZone`.
  const parts = selectedDateString.split('-').map(Number);
  if (parts.length !== 3 || isNaN(parts[0]) || isNaN(parts[1]) || isNaN(parts[2])) {
    console.error(`filterSessionsByDate: Invalid selectedDateString format. Expected 'YYYY-MM-DD'. Received: ${selectedDateString}`);
    return [];
  }

  // Create a Date object in the local system's timezone, but with the year, month, and day
  // components taken from the `selectedDateString`. The time is set to midnight.
  // This *local* Date object is then converted to UTC based on the `userTimeZone` offset.
  const startOfDayInUserTimeZone = new Date(
    parts[0], parts[1] - 1, parts[2], // Year, Month (0-indexed), Day
    0, 0, 0, 0 // Midnight
  );

  // Convert this "midnight in user's timezone" moment to its equivalent UTC Date object.
  // This will be the inclusive lower bound for our filter.
  const startFilteringUtc = fromZonedTime(startOfDayInUserTimeZone, userTimeZone);

  // Calculate the exclusive upper bound: midnight of the *next* day in the user's timezone,
  // converted back to UTC. This defines the exact 24-hour window in the user's timezone.
  const endOfDayInUserTimeZone = new Date(
    parts[0], parts[1] - 1, parts[2] + 1, // Next Day
    0, 0, 0, 0 // Midnight
  );
  const endFilteringUtc = fromZonedTime(endOfDayInUserTimeZone, userTimeZone);

  console.log(`filterSessionsByDate: Filtering for ${selectedDateString} in ${userTimeZone}:`);
  console.log(`  UTC Range Start (inclusive): ${startFilteringUtc.toISOString()}`);
  console.log(`  UTC Range End (exclusive):   ${endFilteringUtc.toISOString()}`);


  // 2. Filter the uniqueSessionUTC array
  const filteredSessions = uniqueSessionUTC.filter(utcDate => {
    // Check if the UTC date falls within the calculated UTC range
    // `gte` for start (inclusive), `lt` for end (exclusive)
    return utcDate >= startFilteringUtc && utcDate < endFilteringUtc;
  });

  // 3. Sort the filtered list from smallest to largest (chronologically)
  filteredSessions.sort(compareAsc);

  return filteredSessions;
}