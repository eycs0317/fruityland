// src/utils/appointmentUtils.ts

// Import the necessary utilities from your timezoneUtils.ts
import { APP_DISPLAY_TIMEZONE, convertUTCToLocal } from './timezoneUtils';
// Import format from date-fns for flexible formatting
import { format } from 'date-fns-tz';

export interface Appointment {
  uid: string;
  sessionDateTime: string | Date ; // Assuming it comes as ISO string
  sessionDateTimetoISO: string;
  isBooked: boolean;
  group: number;
  isWeekend: boolean;
  // Add other properties if they exist on your appointment object
}

interface GroupedAppointment {
  time: string; // Formatted time string, e.g., "11:00 AM"
  count: number; // Total slots at this time
  availableCount: number; // Available slots at this time
  isFullyBooked: boolean;
  uids: string[]; // UIDs of all slots at this time
  utcSlotTime: Date; // Added this to store the UTC Date for reliable sorting
  sessionDateTimetoISO: string;
  localTime: string;
}

/**
 * Groups and sorts appointments by their local time, calculating availability.
 * @param appointments An array of raw appointment objects from the database (slot property is UTC ISO string).
 * @returns A sorted array of grouped appointment data for UI display.
 */
export function groupAndSortAppointments(appointments: Appointment[]): GroupedAppointment[] {
  // Use Map<string, Partial<GroupedAppointment>> where the key is the *formatted local time string*
  // The value will hold aggregated data for that time slot.


  const groupedAppointmentsMap = new Map<string, { count: number, availableCount: number, isFullyBooked: boolean, uids: string[], utcSlotTime: Date, sessionDateTimetoISO: string, localTime: string }>();

  appointments.forEach(appt => {
    // 1. Parse the UTC slot string into a Date object

    const utcSlotDate = new Date(appt.sessionDateTime);


    if (isNaN(utcSlotDate.getTime())) {
      console.error('APPT_UTILS: Invalid UTC Date parsed from sessionDateTime, skipping:', appt.sessionDateTime);
      return; // Skip this appointment if the date is invalid
  }

    // 2. Convert the UTC Date object to the local display timezone (HKT)
    const localZonedDate = convertUTCToLocal(utcSlotDate, APP_DISPLAY_TIMEZONE);
//     const localZonedDate = utcSlotDate

    if (isNaN(localZonedDate.getTime())) {
      console.error('APPT_UTILS: Invalid Zoned Date after conversion for sessionDateTime:', appt.sessionDateTime, 'Zoned Date:', localZonedDate);
      return; // Skip if conversion resulted in an invalid date
  }

    // 3. Format this local zoned date to the desired display time string (e.g., "11:00 AM", "1:00 PM")
    // Use 'h:mm a' for 12-hour format with AM/PM (e.g., 11:00 AM, 1:00 PM)

    const timeString = format(new Date(localZonedDate), 'h:mm a');
    // 4. Format the original UTC date to the desired display time string for the 'localTime' field
    // This explicitly formats the UTC date as a time string without timezone conversion
    const localTimeStringUtc = format(utcSlotDate, 'h:mm a', { timeZone: 'UTC' });
    if (!groupedAppointmentsMap.has(timeString)) {
      // Initialize the group. Crucially, store the original UTC Date for sorting.
      groupedAppointmentsMap.set(timeString, {
        count: 0,
        availableCount: 0,
        isFullyBooked: false,
        uids: [],
        utcSlotTime: utcSlotDate,
        sessionDateTimetoISO: appt.sessionDateTime.toString(),
        localTime: localTimeStringUtc
      });
    }

    const group = groupedAppointmentsMap.get(timeString)!;
    group.count++;
    group.uids.push(appt.uid);
    if (!appt.isBooked) {
      group.availableCount++;
    }
    group.isFullyBooked = group.availableCount === 0;
  });

  // Convert map to an array of GroupedAppointment objects
  const sortedGroupedAppointments = Array.from(groupedAppointmentsMap.entries())
    .map(([time, data]) => ({ time, ...data }))
    .sort((a, b) => {
      // Sort based on the stored original UTC Date objects for reliable chronological order
      return a.utcSlotTime.getTime() - b.utcSlotTime.getTime();
    });

  return sortedGroupedAppointments;
}