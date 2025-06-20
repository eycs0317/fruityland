import { fromZonedTime, toZonedTime, format } from 'date-fns-tz'; // Added toZonedTime and format


// Assuming Appointment interface is defined elsewhere, e.g., in appointmentUtils.ts
// Re-defining it here for self-containment if this is a standalone utility,
// but ideally, you'd import it.
export interface Appointment {
  uid: string;
  sessionDateTime: string | Date; // Can be string (ISO) or Date object
  sessionDateTimetoISO: string; // Already present in your Appointment interface
  isBooked: boolean;
  group: number;
  isWeekend: boolean;
  // Add other properties if they exist on your appointment object
}

// New interface for the desired output structure of this function
interface GroupedAppointmentOutput {
  time: string; // Formatted time string in the userTimeZone, e.g., "11:00 AM"
  count: number; // Total slots at this time
  availableCount: number; // Available slots at this time
  isFullyBooked: boolean;
  uids: string[]; // UIDs of all slots at this time (booked or not)
  availableUids: string[]; // NEW: UIDs of only the available (isBooked: false) slots
  utcSlotTime: Date; // Stores the original UTC Date for reliable sorting
  sessionDateTimetoISO: string; // Stores one of the ISO strings from the group (for consistency)
}


/**
 * Filters an array of Appointment objects to include only those that fall
 * within a specific calendar day in the given user's timezone. It then groups
 * these filtered appointments by time and provides aggregated counts,
 * including a list of UIDs for available slots.
 *
 * @param appointments An array of Appointment objects.
 * @param selectedDateString A date string in 'YYYY-MM-DD' format, representing the desired calendar day in the user's timezone.
 * @param userTimeZone The IANA timezone string (e.g., 'America/Los_Angeles', 'Asia/Hong_Kong') for interpreting selectedDate.
 * @returns A sorted array of GroupedAppointmentOutput objects for the specified day and timezone.
 */
export function filterSessionsByDate(
  appointments: Appointment[], // Changed input type to Appointment[]
  selectedDateString: string | undefined,
  userTimeZone: string
): GroupedAppointmentOutput[] { // Changed return type
  if (!selectedDateString || !userTimeZone || !appointments) {
    console.warn('filterSessionsByDate: Missing required parameters or empty appointments array. Returning empty array.');
    return [];
  }

  const parts = selectedDateString.split('-').map(Number);
  if (parts.length !== 3 || isNaN(parts[0]) || isNaN(parts[1]) || isNaN(parts[2])) {
    console.error(`filterSessionsByDate: Invalid selectedDateString format. Expected 'YYYY-MM-DD'. Received: ${selectedDateString}`);
    return [];
  }

  // 1. Determine the UTC boundaries for the `selectedDateString` in `userTimeZone`.
  //    Create a Date object representing midnight (00:00:00.000) of the `selectedDateString`
  //    as interpreted within the `userTimeZone`.
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



  // 2. Filter the input appointments array by the calculated UTC range
  const filteredAppointments = appointments.filter(appt => {
    const utcDate = new Date(appt.sessionDateTime); // Ensure it's a Date object
    return utcDate >= startFilteringUtc && utcDate < endFilteringUtc;
  });

  // 3. Group and aggregate the filtered appointments (similar to groupAndSortAppointments)
  // Updated Map value type to include availableUids
  const groupedAppointmentsMap = new Map<string, { count: number, availableCount: number, isFullyBooked: boolean, uids: string[], availableUids: string[], utcSlotTime: Date, sessionDateTimetoISO: string }>();

  filteredAppointments.forEach(appt => {
    const utcSlotDate = new Date(appt.sessionDateTime);
    if (isNaN(utcSlotDate.getTime())) {
      console.error('APPT_UTILS: Invalid UTC Date parsed from sessionDateTime, skipping:', appt.sessionDateTime);
      return;
    }

    // Convert the UTC Date object to the local display timezone (userTimeZone) for formatting
    const localZonedDate = toZonedTime(utcSlotDate, userTimeZone);
    if (isNaN(localZonedDate.getTime())) {
      console.error('APPT_UTILS: Invalid Zoned Date after conversion for sessionDateTime:', appt.sessionDateTime, 'Zoned Date:', localZonedDate);
      return;
    }

    // Format this local zoned date to the desired display time string (e.g., "11:00 AM")
    const timeString = format(localZonedDate, 'h:mm a');

    if (!groupedAppointmentsMap.has(timeString)) {
      groupedAppointmentsMap.set(timeString, {
        count: 0,
        availableCount: 0,
        isFullyBooked: false,
        uids: [],
        availableUids: [], // Initialize new array
        utcSlotTime: utcSlotDate, // Store the original UTC Date for sorting later
        sessionDateTimetoISO: typeof appt.sessionDateTime === 'string' ? appt.sessionDateTime : appt.sessionDateTime.toISOString()
      });
    }

    const group = groupedAppointmentsMap.get(timeString)!;
    group.count++;
    group.uids.push(appt.uid); // Always push to all UIDs
    if (!appt.isBooked) {
      group.availableCount++;
      group.availableUids.push(appt.uid); // NEW: Push only if available
    }
    group.isFullyBooked = group.availableCount === 0;
  });

  // 4. Convert map to an array of GroupedAppointmentOutput objects and sort
  const sortedGroupedAppointments = Array.from(groupedAppointmentsMap.entries())
    .map(([time, data]) => ({ time, ...data }))
    .sort((a, b) => {
      // Sort based on the stored original UTC Date objects for reliable chronological order
      return a.utcSlotTime.getTime() - b.utcSlotTime.getTime();
    });

  return sortedGroupedAppointments;
}
// import { fromZonedTime, toZonedTime, format } from 'date-fns-tz'; // Added toZonedTime and format


// // Assuming Appointment interface is defined elsewhere, e.g., in appointmentUtils.ts
// // Re-defining it here for self-containment if this is a standalone utility,
// // but ideally, you'd import it.
// export interface Appointment {
//   uid: string;
//   sessionDateTime: string | Date; // Can be string (ISO) or Date object
//   sessionDateTimetoISO: string; // Already present in your Appointment interface
//   isBooked: boolean;
//   group: number;
//   isWeekend: boolean;
//   // Add other properties if they exist on your appointment object
// }

// // New interface for the desired output structure of this function
// interface GroupedAppointmentOutput {
//   time: string; // Formatted time string in the userTimeZone, e.g., "11:00 AM"
//   count: number; // Total slots at this time
//   availableCount: number; // Available slots at this time
//   isFullyBooked: boolean;
//   uids: string[]; // UIDs of all slots at this time
//   utcSlotTime: Date; // Stores the original UTC Date for reliable sorting
//   sessionDateTimetoISO: string; // Stores one of the ISO strings from the group (for consistency)
// }


// /**
//  * Filters an array of Appointment objects to include only those that fall
//  * within a specific calendar day in the given user's timezone. It then groups
//  * these filtered appointments by time and provides aggregated counts.
//  *
//  * @param appointments An array of Appointment objects.
//  * @param selectedDateString A date string in 'YYYY-MM-DD' format, representing the desired calendar day in the user's timezone.
//  * @param userTimeZone The IANA timezone string (e.g., 'America/Los_Angeles', 'Asia/Hong_Kong') for interpreting selectedDate.
//  * @returns A sorted array of GroupedAppointmentOutput objects for the specified day and timezone.
//  */
// export function filterSessionsByDate(
//   appointments: Appointment[], // Changed input type to Appointment[]
//   selectedDateString: string | undefined,
//   userTimeZone: string
// ): GroupedAppointmentOutput[] { // Changed return type
//   if (!selectedDateString || !userTimeZone || !appointments) {
//     console.warn('filterSessionsByDate: Missing required parameters or empty appointments array. Returning empty array.');
//     return [];
//   }

//   const parts = selectedDateString.split('-').map(Number);
//   if (parts.length !== 3 || isNaN(parts[0]) || isNaN(parts[1]) || isNaN(parts[2])) {
//     console.error(`filterSessionsByDate: Invalid selectedDateString format. Expected 'YYYY-MM-DD'. Received: ${selectedDateString}`);
//     return [];
//   }

//   // 1. Determine the UTC boundaries for the `selectedDateString` in `userTimeZone`.
//   //    Create a Date object representing midnight (00:00:00.000) of the `selectedDateString`
//   //    as interpreted within the `userTimeZone`.
//   const startOfDayInUserTimeZone = new Date(
//     parts[0], parts[1] - 1, parts[2], // Year, Month (0-indexed), Day
//     0, 0, 0, 0 // Midnight
//   );

//   // Convert this "midnight in user's timezone" moment to its equivalent UTC Date object.
//   // This will be the inclusive lower bound for our filter.
//   const startFilteringUtc = fromZonedTime(startOfDayInUserTimeZone, userTimeZone);

//   // Calculate the exclusive upper bound: midnight of the *next* day in the user's timezone,
//   // converted back to UTC. This defines the exact 24-hour window in the user's timezone.
//   const endOfDayInUserTimeZone = new Date(
//     parts[0], parts[1] - 1, parts[2] + 1, // Next Day
//     0, 0, 0, 0 // Midnight
//   );
//   const endFilteringUtc = fromZonedTime(endOfDayInUserTimeZone, userTimeZone);

//   console.log(`filterSessionsByDate: Filtering for ${selectedDateString} in ${userTimeZone}:`);
//   console.log(`  UTC Range Start (inclusive): ${startFilteringUtc.toISOString()}`);
//   console.log(`  UTC Range End (exclusive):   ${endFilteringUtc.toISOString()}`);


//   // 2. Filter the input appointments array by the calculated UTC range
//   const filteredAppointments = appointments.filter(appt => {
//     const utcDate = new Date(appt.sessionDateTime); // Ensure it's a Date object
//     return utcDate >= startFilteringUtc && utcDate < endFilteringUtc;
//   });

//   // 3. Group and aggregate the filtered appointments (similar to groupAndSortAppointments)
//   const groupedAppointmentsMap = new Map<string, { count: number, availableCount: number, isFullyBooked: boolean, uids: string[], utcSlotTime: Date, sessionDateTimetoISO: string }>();

//   filteredAppointments.forEach(appt => {
//     const utcSlotDate = new Date(appt.sessionDateTime);
//     if (isNaN(utcSlotDate.getTime())) {
//       console.error('APPT_UTILS: Invalid UTC Date parsed from sessionDateTime, skipping:', appt.sessionDateTime);
//       return;
//     }

//     // Convert the UTC Date object to the local display timezone (userTimeZone) for formatting
//     const localZonedDate = toZonedTime(utcSlotDate, userTimeZone);
//     if (isNaN(localZonedDate.getTime())) {
//       console.error('APPT_UTILS: Invalid Zoned Date after conversion for sessionDateTime:', appt.sessionDateTime, 'Zoned Date:', localZonedDate);
//       return;
//     }

//     // Format this local zoned date to the desired display time string (e.g., "11:00 AM")
//     const timeString = format(localZonedDate, 'h:mm a');

//     if (!groupedAppointmentsMap.has(timeString)) {
//       groupedAppointmentsMap.set(timeString, {
//         count: 0,
//         availableCount: 0,
//         isFullyBooked: false,
//         uids: [],
//         utcSlotTime: utcSlotDate, // Store the original UTC Date for sorting later
//         sessionDateTimetoISO: typeof appt.sessionDateTime === 'string' ? appt.sessionDateTime : appt.sessionDateTime.toISOString()
//       });
//     }

//     const group = groupedAppointmentsMap.get(timeString)!;
//     group.count++;
//     group.uids.push(appt.uid);
//     if (!appt.isBooked) {
//       group.availableCount++;
//     }
//     group.isFullyBooked = group.availableCount === 0;
//   });

//   // 4. Convert map to an array of GroupedAppointmentOutput objects and sort
//   const sortedGroupedAppointments = Array.from(groupedAppointmentsMap.entries())
//     .map(([time, data]) => ({ time, ...data }))
//     .sort((a, b) => {
//       // Sort based on the stored original UTC Date objects for reliable chronological order
//       return a.utcSlotTime.getTime() - b.utcSlotTime.getTime();
//     });

//   return sortedGroupedAppointments;
// }

// --- Example Usage and Testing ---
/*
// Example Data for Testing (simulating what comes from DB fetch for 2 UTC days)
const exampleAppointments: Appointment[] = [
  // Appointments for July 9th PDT (July 9th 07:00 UTC to July 10th 06:59:59 UTC)
  { uid: 'uid1', sessionDateTime: '2025-07-09T07:00:00.000Z', sessionDateTimetoISO: '2025-07-09T07:00:00.000Z', isBooked: false, group: 1, isWeekend: false }, // 00:00 AM PDT
  { uid: 'uid2', sessionDateTime: '2025-07-10T04:00:00.000Z', sessionDateTimetoISO: '2025-07-10T04:00:00.000Z', isBooked: false, group: 1, isWeekend: false }, // 21:00 PM PDT
  { uid: 'uid3', sessionDateTime: '2025-07-10T04:00:00.000Z', sessionDateTimetoISO: '2025-07-10T04:00:00.000Z', isBooked: true, group: 1, isWeekend: false },  // 21:00 PM PDT (booked)
  { uid: 'uid4', sessionDateTime: '2025-07-10T04:30:00.000Z', sessionDateTimetoISO: '2025-07-10T04:30:00.000Z', isBooked: false, group: 1, isWeekend: false }, // 21:30 PM PDT
  { uid: 'uid5', sessionDateTime: '2025-07-10T06:30:00.000Z', sessionDateTimetoISO: '2025-07-10T06:30:00.000Z', isBooked: false, group: 1, isWeekend: false }, // 23:30 PM PDT

  // Appointment for July 10th PDT (July 10th 07:00 UTC onwards) - should NOT be included for 7/9 PDT
  { uid: 'uid6', sessionDateTime: '2025-07-10T07:00:00.000Z', sessionDateTimetoISO: '2025-07-10T07:00:00.000Z', isBooked: false, group: 1, isWeekend: false }, // 00:00 AM PDT (next day)
];

const selectedDateForFilter = '2025-07-09';
const timezoneForFilter = 'America/Los_Angeles'; // PDT is UTC-7 in July 2025

console.log(`\n--- Test Case: ${selectedDateForFilter} in ${timezoneForFilter} ---`);
const groupedAndFilteredAppointments = filterSessionsByDate(exampleAppointments, selectedDateForFilter, timezoneForFilter);

console.log('\nGrouped and Filtered Output:');
groupedAndFilteredAppointments.forEach(item => {
  console.log(`Time: ${item.time}, Count: ${item.count}, Available: ${item.availableCount}, Booked: ${item.isFullyBooked}, UIDs: [${item.uids.join(', ')}], UTC: ${item.utcSlotTime.toISOString()}`);
});

// Expected Output (for July 9th PDT):
// Time: 12:00 AM, Count: 1, Available: 1, Booked: false, UIDs: [uid1], UTC: 2025-07-09T07:00:00.000Z
// Time: 9:00 PM, Count: 2, Available: 1, Booked: false, UIDs: [uid2, uid3], UTC: 2025-07-10T04:00:00.000Z
// Time: 9:30 PM, Count: 1, Available: 1, Booked: false, UIDs: [uid4], UTC: 2025-07-10T04:30:00.000Z
// Time: 11:30 PM, Count: 1, Available: 1, Booked: false, UIDs: [uid5], UTC: 2025-07-10T06:30:00.000Z
*/





























// import { fromZonedTime} from 'date-fns-tz';
// import { compareAsc } from 'date-fns'; // For sorting Dates

// /**
//  * Filters and sorts a list of UTC session Date objects to include only those
//  * that fall within a specific calendar day in the given user's timezone.
//  *
//  * @param uniqueSessionUTC An array of Date objects, where each Date represents a UTC timestamp of a session.
//  * @param selectedDateString A date string in 'YYYY-MM-DD' format, representing the desired calendar day in the user's timezone.
//  * @param userTimeZone The IANA timezone string (e.g., 'America/Los_Angeles', 'Asia/Hong_Kong') for interpreting selectedDate.
//  * @returns A sorted array of Date objects (UTC timestamps) that fall within the specified day in the user's timezone.
//  */
// export function filterSessionsByDate(
//   uniqueSessionUTC: Date[],
//   selectedDateString: string | undefined,
//   userTimeZone: string
// ): Date[] {
//   if (!selectedDateString || !userTimeZone || !uniqueSessionUTC) {
//     console.warn('filterSessionsByDate: Missing required parameters. Returning empty array.');
//     return [];
//   }

//   const uniqueDatesMap = new Map<number, Date>();
//   uniqueSessionUTC.forEach(date => {
//     uniqueDatesMap.set(date.getTime(), date);
//   });
//   const distinctUtcDates = Array.from(uniqueDatesMap.values());

//   // 1. Determine the UTC boundaries for the `selectedDateString` in `userTimeZone`.
//   //    Create a Date object representing midnight (00:00:00.000) of the `selectedDateString`
//   //    as interpreted within the `userTimeZone`.
//   const parts = selectedDateString.split('-').map(Number);
//   if (parts.length !== 3 || isNaN(parts[0]) || isNaN(parts[1]) || isNaN(parts[2])) {
//     console.error(`filterSessionsByDate: Invalid selectedDateString format. Expected 'YYYY-MM-DD'. Received: ${selectedDateString}`);
//     return [];
//   }

//   // Create a Date object in the local system's timezone, but with the year, month, and day
//   // components taken from the `selectedDateString`. The time is set to midnight.
//   // This *local* Date object is then converted to UTC based on the `userTimeZone` offset.
//   const startOfDayInUserTimeZone = new Date(
//     parts[0], parts[1] - 1, parts[2], // Year, Month (0-indexed), Day
//     0, 0, 0, 0 // Midnight
//   );

//   // Convert this "midnight in user's timezone" moment to its equivalent UTC Date object.
//   // This will be the inclusive lower bound for our filter.
//   const startFilteringUtc = fromZonedTime(startOfDayInUserTimeZone, userTimeZone);

//   // Calculate the exclusive upper bound: midnight of the *next* day in the user's timezone,
//   // converted back to UTC. This defines the exact 24-hour window in the user's timezone.
//   const endOfDayInUserTimeZone = new Date(
//     parts[0], parts[1] - 1, parts[2] + 1, // Next Day
//     0, 0, 0, 0 // Midnight
//   );
//   const endFilteringUtc = fromZonedTime(endOfDayInUserTimeZone, userTimeZone);

//   console.log(`filterSessionsByDate: Filtering for ${selectedDateString} in ${userTimeZone}:`);
//   console.log(`  UTC Range Start (inclusive): ${startFilteringUtc.toISOString()}`);
//   console.log(`  UTC Range End (exclusive):   ${endFilteringUtc.toISOString()}`);


//   // 2. Filter the uniqueSessionUTC array
//   const filteredSessions = distinctUtcDates.filter(utcDate => {
//     // Check if the UTC date falls within the calculated UTC range
//     // `gte` for start (inclusive), `lt` for end (exclusive)
//     return utcDate >= startFilteringUtc && utcDate < endFilteringUtc;
//   });

//   // 3. Sort the filtered list from smallest to largest (chronologically)
//   filteredSessions.sort(compareAsc);

//   return filteredSessions;
// }