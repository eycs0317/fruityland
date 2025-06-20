interface ReservationData {
  uid: string;
  couponCode: string;
  status: number;
  sessionDateTime: string; // ISO string from DB (UTC)
  group: number;
  // Add other fields you expect to display, e.g., participantCount, etc.
}

interface GroupedReservation {
  sessionDateTime: string;
  reservedNumber: number; // Total number of reservations for this time slot
  checkIn: number;        // Number of reservations with status '2' (checked in) for this time slot
}

/**
 * Groups an array of reservation items by their sessionDateTime,
 * calculating the total reserved number and the count of 'checked-in' (status '2') reservations.
 * This version uses the `reduce` method for conciseness.
 *
 * @param reservations An array of ReservationItem objects.
 * @returns An array of GroupedReservation objects, sorted by sessionDateTime.
 */
export function groupReservationsByTime(reservations: ReservationData[]): GroupedReservation[] {
  // Use reduce to iterate over the reservations and build the grouped data in a Map
  const groupedDataMap = reservations.reduce((acc, reservation) => {
    const dateTimeKey = reservation.sessionDateTime;

    // Get the current counts for this sessionDateTime from the accumulator (Map)
    // If it doesn't exist, initialize it
    const currentCounts = acc.get(dateTimeKey) || { reservedNumber: 0, checkIn: 0 };

    // Increment total reserved number
    currentCounts.reservedNumber++;

    // Check if the status indicates 'checked-in'
    if (reservation.status === 2) {
      currentCounts.checkIn++;
    }

    // Update the Map with the modified counts
    acc.set(dateTimeKey, currentCounts);

    return acc; // Return the accumulator (the Map) for the next iteration
  }, new Map<string, { reservedNumber: number; checkIn: number }>()); // Initial accumulator is an empty Map

  // Convert the Map into the desired array format
  const result: GroupedReservation[] = Array.from(groupedDataMap.entries()).map(([sessionDateTime, counts]) => ({
    sessionDateTime,
    reservedNumber: counts.reservedNumber,
    checkIn: counts.checkIn,
  }));

  // Sort the results by sessionDateTime (chronologically)
  result.sort((a, b) => a.sessionDateTime.localeCompare(b.sessionDateTime));

  return result;
}
