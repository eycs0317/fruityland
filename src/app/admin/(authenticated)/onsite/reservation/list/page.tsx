// metadata
export const metadata = {
  title: 'Onsite Support [Reservation List]',
};

// react
import React, {Suspense} from 'react';

// nextjs
import {redirect} from 'next/navigation';

// ui
import AdminHeader from '@/ui/patterns/adminHeader';

// lib
import {getSession} from '@/lib/session';



// client
import PageClient from './pageClient';

// Define a type for the reservation data you expect from your API
interface ReservationData {
  uid: string;
  couponCode: string;
  status: string;
  sessionDateTime: string; // ISO string from DB (UTC)
  group: number;
  // Add other fields you expect to display, e.g., participantCount, etc.
}

interface PageProps {
  searchParams?: Promise<{
    date?: string; // Expecting YYYY-MM-DD format (representing APP_DISPLAY_TIMEZONE)
  }>;
}

export default async function MainPage({searchParams}: PageProps) {
  const session = await getSession();
  if (!session.auth || session.authType != 'onsiteAdmin') {
    redirect('/admin');
  }

  const resolvedSearchParams = await searchParams;
  const userSelectedDate = resolvedSearchParams?.date; // This is the YYYY-MM-DD from the Calendar
console.log('<<<<<<<userSelectedDate>>>>>>>', userSelectedDate);
  // let dateToFetch: string; // This will hold the YYYY-MM-DD string for the API call
  let reservations: ReservationData[] = []; // Initialize to an empty array

  // Determine the date to fetch: use user's selection or default to today's date in APP_DISPLAY_TIMEZONE
  if (userSelectedDate) {
    console.log(`User selected date: ${userSelectedDate}`);
      // --- Data Fetching Logic ---
  try {
    // Construct API URL for fetching reservations for the determined date
    // This API route (e.g., /api/admin/reservations/list) needs to be created
    // and should filter reservations by the `date` parameter.
    const apiUrl = `http://localhost:3000/api/admin/reservations/list?date=${userSelectedDate}`;

    const response = await fetch(apiUrl, {
      method: 'GET',
      cache: 'no-store' // Ensure fresh data is fetched
    });

    if (!response.ok) {
      // Throw an error if the HTTP response was not OK
      throw new Error(`HTTP error! Status: ${response.status} ${response.statusText}`);
    }

    // Parse the JSON response into our ReservationData array type
    reservations = await response.json();
    console.log(`Successfully fetched ${reservations.length} reservations for date: ${userSelectedDate}`);

  } catch (error: Error | unknown) { // Use type guard for error
    // This catch block handles errors that occur *during the API fetch*.
    let errorMessage = 'An unexpected error occurred while fetching reservations.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error('Error fetching reservations for admin list:', errorMessage);
    // On error, ensure reservations array is empty to prevent rendering issues
    // or you could pass this error message to PageClient for display
    reservations = [];
  }
  }


  // --- End Data Fetching Logic ---

  return (
    <main role="main" className="grid justify-self-center justify-items-center w-full md:w-120 p-4">
      <AdminHeader />
      <Suspense fallback={<div>Loading reservations...</div>}>
        {/* Pass the fetched data and the selected date to the client component */}
        <PageClient reservations={reservations} selectedDate={userSelectedDate??''} />
      </Suspense>
    </main>
  );
}




// // metadata
// export const metadata = {
//   title: 'Onsite Support [Reservation List]',
// };

// // react
// import React, {Suspense} from 'react';

// // nextjs
// import {redirect} from 'next/navigation';

// // ui
// import AdminHeader from '@/ui/patterns/adminHeader';

// // lib
// import {getSession} from '@/lib/session';

// // client
// import PageClient from './pageClient';


// interface PageProps {
//   searchParams?: Promise<{
//     date?: string;
//   }>;
// }
// export default async function MainPage({searchParams}: PageProps) {
//   const session = await getSession();
//   if (!session.auth || session.authType != 'onsiteAdmin') {
//     redirect('/admin');
//   }
//   const resolvedSearchParams = await searchParams;
//   const userSelectedDate = resolvedSearchParams?.date;
//   console.log('lalalalallalal', userSelectedDate)
//   if(userSelectedDate) {
//     try{

//     } catch {

//     }
//   }
//   return (
//     <main role="main" className="grid justify-self-center justify-items-center w-full md:w-120 p-4">
//       <AdminHeader />
//       <Suspense fallback={<div>Loading...</div>}>
//         <PageClient />
//       </Suspense>
//     </main>
//   );
// }
