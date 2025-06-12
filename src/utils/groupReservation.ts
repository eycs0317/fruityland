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

// --- Example Usage ---
// const reservationsData: ReservationItem[] = [
//   { "uid": "cmbqri1d900014jodvnij77sm", "couponCode": "29da0fd011bc", "status": "2", "group": 1, "sessionDateTime": "2025-07-10T06:00:00.000Z" },
//   { "uid": "cmbqri1d900034jodmnszjdyg", "couponCode": "fb2bddd01196", "status": "1", "group": 1, "sessionDateTime": "2025-07-10T06:00:00.000Z" },
//   { "uid": "cmbqri1da00094jodzc96zrne", "couponCode": "7d9ad5d011b1", "status": "1", "group": 1, "sessionDateTime": "2025-07-10T06:00:00.000Z" },
//   { "uid": "cmbqri1da000a4jodh4amlgho", "couponCode": "8cee6ed0119c", "status": "1", "group": 1, "sessionDateTime": "2025-07-10T06:30:00.000Z" },
//   { "uid": "cmbqri1da000k4jod12ixfg93", "couponCode": "f33bddd011e5", "status": "1", "group": 1, "sessionDateTime": "2025-07-10T07:00:00.000Z" },
//   { "uid": "cmbqri1da00154jodv62eow7j", "couponCode": "d06676d011fa", "status": "1", "group": 1, "sessionDateTime": "2025-07-10T09:00:00.000Z" },
//   { "uid": "cmbqri1da00144jodc340ogdm", "couponCode": "5ff910d01116", "status": "1", "group": 1, "sessionDateTime": "2025-07-10T09:00:00.000Z" },
//   { "uid": "cmbqri1da001y4jodddeq32df", "couponCode": "1b5960d01169", "status": "1", "group": 1, "sessionDateTime": "2025-07-10T10:30:00.000Z" },
//   { "uid": "cmbqri1db002c4jodhhepw8fl", "couponCode": "9d0f35d01178", "status": "1", "group": 1, "sessionDateTime": "2025-07-10T11:00:00.000Z" }
// ];

// const newObj = groupReservationsByTime(reservationsData);
// console.log(newObj);

/*
Expected Output:
[
  { sessionDateTime: '2025-07-10T06:00:00.000Z', reservedNumber: 3, checkIn: 1 },
  { sessionDateTime: '2025-07-10T06:30:00.000Z', reservedNumber: 1, checkIn: 0 },
  { sessionDateTime: '2025-07-10T07:00:00.000Z', reservedNumber: 1, checkIn: 0 },
  { sessionDateTime: '2025-07-10T09:00:00.000Z', reservedNumber: 2, checkIn: 0 },
  { sessionDateTime: '2025-07-10T10:30:00.000Z', reservedNumber: 1, checkIn: 0 },
  { sessionDateTime: '2025-07-10T11:00:00.000Z', reservedNumber: 1, checkIn: 0 }
]
*/
