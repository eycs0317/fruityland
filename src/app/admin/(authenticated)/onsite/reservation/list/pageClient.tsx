'use client';

// react
import React from 'react'; // No need for useEffect or useState here anymore

// nextjs

import Link from 'next/link'; // For the "Go back to homepage" link

// ui
import Heading from '@/ui/foundations/heading';

// date-fns for parsing and formatting dates/times
import { parseISO, format } from 'date-fns';

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
  const hasReservations = reservations?.length > 0;

  return (
    <>
      <section className="w-full p-8">
        {/* Display the selected date in the heading */}
        <Heading level={1} content={`Reservations for ${selectedDate}`} className="text-4xl pb-8" />
      </section>

      <section className="w-full p-8">
        {hasReservations ? (
          <div className="overflow-x-auto"> {/* Add overflow for smaller screens */}
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left">Time</th>
                  <th className="py-3 px-4 text-left">Coupon Code</th>
                  <th className="py-3 px-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {reservations.map((reservation) => {
                  const sessionDateTime = parseISO(reservation.sessionDateTime);
                  // Format to user's browser local time for display
                  const displayTime = format(sessionDateTime, 'p'); // e.g., 1:30 PM, 2:00 AM

                  return (
                    <tr key={reservation.uid}>
                      <td className="py-3 px-4">{displayTime || 'N/A'}</td>
                      <td className="py-3 px-4">{reservation.couponCode || 'N/A'}</td>
                      <td className="py-3 px-4">{(reservation.status == 1) ? 'Reserved' : (reservation.status == 2) ? 'Completed' : 'New'}</td>
                      {/* Add more cells based on your ReservationData interface */}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          // Display message if no reservations are found
          <div className="text-center p-8 bg-white shadow-md rounded-lg">
            <p className="text-lg text-gray-700 mb-4">No reservations found for {selectedDate}.</p>
            <p className="text-lg text-gray-700">
              <Link href="/admin/onsite/reservation">Go back to search for another date.</Link>
            </p>
            {/* You could optionally add an Image here if desired, e.g., a "no results" icon */}
            {/* <Image src="/assets/i/icons/no-results.svg" alt="No Results" width="100" height="100" className="mx-auto mt-4" /> */}
          </div>
        )}
      </section>
    </>
  );
}












// 'use client';

// // react
// import {useEffect, useState} from 'react';

// // nextjs
// import Image from 'next/image';
// import Link from 'next/link';
// import {useSearchParams} from 'next/navigation';

// // ui
// import Heading from '@/ui/foundations/heading';

// // type EventDetails = {
// //   group: string;
// // };

// export default function ClientPage() {
//   const searchParams = useSearchParams();

//   const eventDate = searchParams.get('eventDate');
//   // const eventDateISO = new Date(eventDate);

//   // const [eventData, setEventData] = useState<EventDetails | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!eventDate) {
//       setError('Event date not found in URL.');
//       setIsLoading(false);
//       return;
//     }

//     const fetchEventData = async () => {
//       try {
//         // const eventResults = await prisma.schedule.findMany({
//         //   where: {
//         //     sessionDateTime: {
//         //       gte: startOfDay(eventDateISO),
//         //       lte: endOfDay(eventDateISO),
//         //     },
//         //   },
//         // });


//         // if (eventResults.length > 0) {
//         //   setConfirmationData({...eventResults});
//         // } else {
//         //   setError(result.message || 'Failed to load event details.');
//         // }
//       } catch {
//         setError('An unexpected error occurred while fetching details.');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchEventData();
//   }, [eventDate]);

//   // Display loading state
//   if (isLoading) {
//     return (
//       <>
//         <section className="w-full p-8 text-center">
//           <Heading level={1} content="Loading Your Events..." className="text-2xl pb-8" />
//         </section>
//         <section className="relative w-1/3 pb-8 px-8">
//           <Image src="/assets/i/icons/spinner.gif" alt="Loading" width="100" height="100" />
//         </section>
//       </>
//     );
//   }

//   // Display error state
//   if (error) {
//     return (
//       <>
//         <section className="w-full p-8 text-center">
//           <Heading level={1} content="Error Loading Events" className="text-2xl pb-8 text-red-600" />
//           <p className="text-lg text-gray-700 mb-8">{error}</p>
//           <p className="text-lg text-gray-700"><Link href="/">Go back to homepage.</Link></p>
//         </section>
//       </>
//     );
//   }

//   // Display data once loaded
//   return (
//     <>
//       <section className="w-full p-8">
//         <Heading level={1} content="Reservation List" className="text-4xl pb-8" />
//       </section>
//       <section className="w-full p-8">
//         <table className="w-full">
//           <thead>
//             <tr>
//               <th className="p-2 text-left">Time</th>
//               <th className="p-2 text-left">Coupon Code</th>
//               <th className="p-2 text-left">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td className="p-2">11:00am</td>
//               <td className="p-2">1F4A-671B-43AE</td>
//               <td className="p-2">Confirmed</td>
//             </tr>
//             <tr>
//               <td className="p-2">11:00am</td>
//               <td className="p-2">1F4A-671B-44AE</td>
//               <td className="p-2">Confirmed</td>
//             </tr>
//             <tr>
//               <td className="p-2">12:00pm</td>
//               <td className="p-2">1F4A-671B-45AE</td>
//               <td className="p-2">Confirmed</td>
//             </tr>
//             <tr>
//               <td className="p-2">12:00pm</td>
//               <td className="p-2">1F4A-671B-46AE</td>
//               <td className="p-2">Confirmed</td>
//             </tr>
//             <tr>
//               <td className="p-2">1:00pm</td>
//               <td className="p-2">1F4A-671B-47AE</td>
//               <td className="p-2">Confirmed</td>
//             </tr>
//             <tr>
//               <td className="p-2">1:00pm</td>
//               <td className="p-2">1F4A-671B-48AE</td>
//               <td className="p-2">Confirmed</td>
//             </tr>
//           </tbody>
//         </table>
//       </section>
//     </>
//   );
// }
