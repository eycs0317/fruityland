// metadata
export const metadata = {
  title: 'RSVP [Time]',
};

// react
import React from 'react';

// nextjs
import Image from 'next/image';
import {redirect} from 'next/navigation';

// ui
// import FormField from '@/ui/foundations/formField';
import Heading from '@/ui/foundations/heading';
import FormField from '@/ui/foundations/formField';
// utils
import {groupAndSortAppointments} from '@/utils/appointmentUtils';
import { createReservation } from '@/utils/createReservation';

import { Appointment } from '@/utils/appointmentUtils';

interface PageProps {
  searchParams?: Promise<{
    date?: string;
    group?: string;
    couponCode?: string;
  }>;
}

export default async function MainPage({ searchParams }: PageProps) {
  // Await the searchParams Promise as per Next.js 15 behavior
  const resolvedSearchParams = await searchParams;

  // Destructure the resolved search parameters
  const date = resolvedSearchParams?.date; //for display
  const group = resolvedSearchParams?.group;
  const couponCode = resolvedSearchParams?.couponCode;

  // Initialize arrays for appointments and grouped data
  let appointments: Appointment[] = [];
  let groupedAppointmentData: { time: string; count: number; availableCount: number; isFullyBooked: boolean; uids: string[]; }[] = [];

  // Fetch appointments if a group is provided
  if (group && date) {
    try {
      // Construct API URL for searching open appointments by group
      const apiUrl = `http://localhost:3000/api/rsvp/searchOpenApptByGroup?group=${group}&date=${date}`;

      // Fetch data from the API
      const response = await fetch(apiUrl, {
        method: 'GET',
        cache: 'no-store' // Ensure fresh data is fetched
      });

      // Check if the API response was successful
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the JSON response
      appointments = await response.json();
      console.log('appts----->', appointments)

      // Group and sort the fetched appointments
      groupedAppointmentData = groupAndSortAppointments(appointments);
      // console.log('groupedAppointmentData----->', groupedAppointmentData)
    } catch (error) {
        // Log and handle errors during API call or data processing
        console.error('Failed to fetch appointments in MainPage:', error);
        appointments = [];
        groupedAppointmentData = [];
    }
  }

  // Server Action to handle form submission
  async function handleSubmit(formData: FormData) {
    'use server' // Mark this function as a Server Action

    // Extract data from the form
    const data = Object.fromEntries(formData.entries());
    console.log('------Form Data Submitted:--------', data);

    // Destructure specific fields from the form data
    const { rsvpTime, couponCode: submittedCouponCode, btBack, btSchedule } = data;

    // Handle 'Schedule' button click
    if (btSchedule) {
      // Validate if an RSVP time was selected
      if (!rsvpTime) {
        // Throw an error if no time is selected, as per Server Action return type expectations
        throw new Error('Please select a time slot.');
      }

      let errorMessage = ''; // Variable to hold error message

      try {
        // Attempt to create the reservation using a utility function
        const result = await createReservation({
          couponCode: submittedCouponCode as string,
          rsvpTime: rsvpTime as string,
        });

        // Check if reservation creation was successful
        if (!result.success) {
          errorMessage = result.message || 'Failed to create reservation.';
          // Throw an error if reservation creation failed
          throw new Error(errorMessage);
        } else {
          console.log('Reservation created successfully:', result.data);
        }
      } catch (error: Error | unknown) {
        // Catch any unexpected errors from createReservation
        // Use a type guard to safely access the error message
        if (error instanceof Error) {
          errorMessage = error.message;
        } else {
          errorMessage = 'An unexpected error occurred during reservation creation.';
        }
        console.error('Error during reservation submission (createReservation failed):', errorMessage);
        // Re-throw the error to ensure the Server Action's contract is met
        throw new Error(errorMessage);
      }

      // If reservation was successful, redirect the user to the confirmation page
      // `redirect` terminates the execution of the Server Action
      redirect(`/rsvp/confirmation?cc=${submittedCouponCode}`);

    } else if (btBack) {
      // If 'Back' button was clicked, redirect to the date selection page
      redirect('/rsvp/date');
    }

    // This line is reached if neither btSchedule nor btBack is present,
    // or if a branch completes without a redirect/throw.
    // Explicitly returning void satisfies the Server Action return type.
    return;
  }

  return (
    <main role="main" className="grid justify-self-center justify-items-center w-full md:w-120 p-4">
      <section className="w-full p-8 text-center">
        <Heading level={1} content="RSVP Step 2" className="text-4xl pb-8" />
      </section>
      <section className="relative w-1/3 pb-8 px-8">
        <Image src="/assets/i/icons/calendar.svg" alt="Calendar" layout="responsive" width="100" height="100" />
      </section>
      <section className="w-full p-8">
        <dl className="flex flex-row pb-4">
          <dt className="font-bold flex-1">Date:</dt>
          <dd className="flex-5">{date}</dd>
        </dl>
        <form className="flex flex-col gap-8 w-full" action={handleSubmit}>
        {/* Render hidden input for couponCode if available */}
        {couponCode && <input type="hidden" name="couponCode" value={couponCode} />}
          <div className="flex flex-row gap-4">
            <div className="flex flex-col flex-1 gap-4">
              <FormField type='radio' fieldData={{
                groupLabel: 'Select a time',
                groupName: 'rsvpTime',
                groupClassName: 'flex flex-col',
                radios: groupedAppointmentData.length > 0 ? groupedAppointmentData.map(groupItem => ({
                  label: groupItem.time,
                  value: groupItem.uids[0], // Assuming uids[0] is the UID for the slot
                  id: `slot_group_${groupItem.time.replace(/[^a-zA-Z0-9]/g, '')}`,
                  isDisabled: groupItem.isFullyBooked,
                })) : [
                  { label: 'No slots available for this date', value: '', id: 'no_slots_available', isDisabled: true }
                ]
              }} />
            </div>
            <div className="flex flex-col pt-8 flex-1 text-right">
              {groupedAppointmentData.length > 0 ? (
                groupedAppointmentData.map(groupItem => (
                  <div key={`count_${groupItem.time.replace(/[^a-zA-Z0-9]/g, '')}`}
                       className={`flex flex-col ${groupItem.isFullyBooked ? 'text-neutral-500' : ''}`}>
                    {groupItem.isFullyBooked ? 'Full' : `${groupItem.availableCount} slots`}
                  </div>
                ))
              ) : (
                <div className="flex flex-col">N/A</div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <FormField type='button' fieldData={{type: 'submit', id: 'btSchedule', className: 'primary', value:'Schedule'}} />
            <FormField type='button' fieldData={{type: 'submit', id: 'btBack', className: 'tertiary', value:'Back'}} />
          </div>
        </form>
      </section>
    </main>
  );
}
