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
import FormField from '@/ui/foundations/formField';
import Heading from '@/ui/foundations/heading';

// utils
import {groupAndSortAppointments} from '@/utils/appointmentUtils';
import { createReservation } from '@/utils/createReservation';

import { Appointment } from '@/utils/appointmentUtils';

interface PageProps {
  searchParams?: {
    date?: string;
    group?: string;
    couponCode?: string;
  };
}
export default async function MainPage({ searchParams }: PageProps ) {
  const { date, group, couponCode } = searchParams;
  // console.log('----searchParams:----', searchParams);
  // console.log('----searchParams:----', date, group,couponCode);
  // const selectedDateParam = awaitedSearchParams.date || ''; // e.g., "2025-07-10" (representing the local HK date)
  let appointments: Appointment[] = [];
  let groupedAppointmentData: { time: string; count: number; availableCount: number; isFullyBooked: boolean; uids: string[]; }[] = [];
  // let displayDate = 'Date not selected';
  // console.log('----selectedDateParam:----', awaitedSearchParams);

  if (group) {
    try {
      // console.log('----selectedDateParam.grouppppppppppp:', awaitedSearchParams.group);
      const apiUrl = `http://localhost:3000/api/rsvp/searchOpenApptByGroup?group=${group}`;

      const response = await fetch(apiUrl, {
        method: 'GET',
        cache: 'no-store'
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      appointments = await response.json();
    // console.log('Fetched Appointments:', appointments);
    // console.log('Fetched Appointments length:', appointments.length);
      groupedAppointmentData = groupAndSortAppointments(appointments);
      // console.log('Grouped Appointment Data:', groupedAppointmentData);

    } catch (error) {
        console.error('Failed to fetch appointments in MainPage:', error);
        appointments = [];
        groupedAppointmentData = [];
    }

  }

  async function handleSubmit(formData: FormData) {
    'use server'
    const data = Object.fromEntries(formData.entries());
    console.log('------Form Data Submitted:--------', data);

    const { rsvpTime, couponCode: submittedCouponCode, btBack, btSchedule } = data; // Renamed couponCode from form to avoid confusion

    if (btSchedule) { // If the 'Schedule' button was clicked
      if (!rsvpTime) {
        // Handle case where rsvpTime is missing from the form
        return 'Please select a time slot.'; // This message would be caught by useFormState if used
      }

      let reservationSuccess = false; // Flag to track reservation status
      let errorMessage = '';

      try {
        const result = await createReservation({
          couponCode: submittedCouponCode as string,
          rsvpTime: rsvpTime as string,
        });

        if (!result.success) {
          // If creation fails, set error message
          errorMessage = result.message || 'Failed to create reservation.';
          console.error('Reservation creation failed:', errorMessage);
        } else {
          // If creation succeeds, set success flag
          reservationSuccess = true;
          console.log('Reservation created successfully:', result.data);
        }
      } catch (error: Error | unknown) {
        // Catch any unexpected errors from createReservation (e.g., network, DB connection issues)
        errorMessage = error.message || 'An unexpected error occurred during reservation creation.';
        console.error('Error during reservation submission (createReservation failed):', errorMessage);
      }

      // --- IMPORTANT: Now, handle the redirect or error based on the flags ---
      if (reservationSuccess) {
        // This is where the redirect should happen, OUTSIDE the previous try-catch block.
        // If createReservation was successful, Next.js handles the redirect signal here.
        redirect(`/rsvp/confirmation?cc=${submittedCouponCode}&date=${date}&group=${group}&uid=${rsvpTime}`);
      } else {
        // If reservation was not successful, return the error message to the client
        return errorMessage;
      }

    } else if (btBack) {
      redirect('/rsvp/date');
    }

    // Fallback if neither button was clicked (shouldn't typically happen)
    return 'Invalid form submission.';
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
        {couponCode && <input type="hidden" name="couponCode" value={couponCode} />}
          <div className="flex flex-row gap-4">
            <div className="flex flex-col flex-1 gap-4">
              <FormField type='radio' fieldData={{
                groupLabel: 'Select a time',
                groupName: 'rsvpTime',
                groupClassName: 'flex flex-col',
                radios: groupedAppointmentData.length > 0 ? groupedAppointmentData.map(group => ({
                  label: group.time,
                  value: group.uids[0],
                  id: `slot_group_${group.time.replace(/[^a-zA-Z0-9]/g, '')}`,
                  isDisabled: group.isFullyBooked,
                })) : [
                  { label: 'No slots available for this date', value: '', id: 'no_slots_available', isDisabled: true }
                ]
              }} />
            </div>
            <div className="flex flex-col pt-8 flex-1 text-right">
              {groupedAppointmentData.length > 0 ? (
                groupedAppointmentData.map(group => (
                  <div key={`count_${group.time.replace(/[^a-zA-Z0-9]/g, '')}`}
                       className={`flex flex-col ${group.isFullyBooked ? 'text-neutral-500' : ''}`}>
                    {group.isFullyBooked ? 'Full' : `${group.availableCount} slots`}
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