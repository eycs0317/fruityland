'use client';

// react
import React from 'react'; // No need for useEffect or useState here anymore

// nextjs

import Link from 'next/link'; // For the "Go back to homepage" link

// ui
import Heading from '@/ui/foundations/heading';

// date-fns for parsing and formatting dates/times
import { parseISO, format } from 'date-fns';

//utils
import { groupReservationsByTime } from '@/utils/groupReservation'

// Define the interface for the ReservationData (should match what your API returns)
interface ReservationData {
  uid: string;
  couponCode: string;
  status: number;
  sessionDateTime: string; // ISO string from DB (UTC)
  group: number;
  // Add other fields you expect to display, e.g., participantCount, etc.
}

// Define the props that this Client Component will receive from the Server Component
interface PageClientProps {
  reservations: ReservationData[]; // The fetched array of reservations
  selectedDate: string; // The date string (YYYY-MM-DD in APP_DISPLAY_TIMEZONE)
}

// ClientPage now accepts props directly from MainPage (the Server Component)
export default function PageClient({ reservations, selectedDate }: PageClientProps) {
  // If the reservations array is empty, it implies either no data was found
  // or an error occurred during fetching on the server.
  // console.log('reservations', typeof reservations[0].status) //string
  const hasReservations = reservations?.length > 0;
  console.log('reservations', reservations)
  const groupedData = groupReservationsByTime(reservations)

  console.log('---for display--->', groupedData);

  return (
    <>
      <section className="w-full p-8">
        {/* Display the selected date in the heading */}
        <Heading level={1} content={`預訂資料`} className="text-4xl text-neutral-000" />
        <Heading level={2} content={format(parseISO(selectedDate), 'MMMM d, yyyy')} className="text-2xl text-neutral-000" />
      </section>

      <section className="w-full p-8 pt-0">
        {hasReservations ? (
          <div className="overflow-x-auto"> {/* Add overflow for smaller screens */}
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left">時段</th>
                  <th className="py-3 px-4 text-left">預訂</th>
                  <th className="py-3 px-4 text-left">已報到</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {groupedData.map((timeSlot) => {
                  const sessionDateTime = parseISO(timeSlot.sessionDateTime);
                  // Format to user's browser local time for display
                  const displayTime = format(sessionDateTime, 'HH:mm'); // e.g., 1:30 PM, 2:00 AM

                  return (
                    <tr key={timeSlot.sessionDateTime}>
                      <td className="py-3 px-4 ">{displayTime || 'N/A'}</td>
                      <td className="py-3 px-4 text-center">{timeSlot.reservedNumber || 'N/A'}</td>
                      <td className="py-3 px-4 text-center">{timeSlot.checkIn}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          // Display message if no reservations are found
          <div className="text-center p-8 bg-white shadow-md rounded-lg">
            <p className="text-lg text-gray-700 mb-4">{format(parseISO(selectedDate), 'MMMM d, yyyy')} 沒有任何預訂。</p>
            <p className="text-lg text-gray-700">
              <Link href="/admin/onsite/reservation">返回搜尋其他日期。</Link>
            </p>
            {/* You could optionally add an Image here if desired, e.g., a "no results" icon */}
            {/* <Image src="/assets/i/icons/no-results.svg" alt="No Results" width="100" height="100" className="mx-auto mt-4" /> */}
          </div>
        )}
      </section>
    </>
  );
}



