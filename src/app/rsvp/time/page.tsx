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
// Import the necessary utilities from your timezoneUtils.ts
import { APP_DISPLAY_TIMEZONE, convertUTCToLocal } from '@/utils/timezoneUtils';
// Import format from date-fns (NOT date-fns-tz for this specific use,
// as convertUTCToLocal already makes the Date object "zoned-aware")
import { format } from 'date-fns';

export default async function MainPage({ searchParams }: { searchParams: { date?: string } }) {
  const awaitedSearchParams = await searchParams;
  const selectedDateParam = awaitedSearchParams.date || ''; // e.g., "2025-07-10" (representing the local HK date)
  let appointments: any[] = [];
  let groupedAppointmentData: { time: string; count: number; availableCount: number; isFullyBooked: boolean; uids: string[]; }[] = [];
  let displayDate = 'Date not selected';

  if (selectedDateParam) {
    try {
      const apiUrl = `http://localhost:3000/api/rsvp/searchOpenApptByDay?date=${selectedDateParam}`;

      const response = await fetch(apiUrl, {
        method: 'GET',
        cache: 'no-store'
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      appointments = await response.json();
    // console.log('Fetched Appointments:', appointments);
      groupedAppointmentData = groupAndSortAppointments(appointments);
      console.log('Grouped Appointment Data:', groupedAppointmentData);

    } catch (error) {
        console.error('Failed to fetch appointments in MainPage:', error);
        appointments = [];
        groupedAppointmentData = [];
    }

    // --- REVISED displayDate LOGIC USING timezoneUtils ---
    // 1. Parse the incoming selectedDateParam (e.g., "2025-07-10") as a UTC date.
    //    We append 'T00:00:00.000Z' to ensure it's interpreted as midnight UTC.
    const utcDateForDisplay = new Date(selectedDateParam + 'T00:00:00.000Z');

    // 2. Convert this UTC Date object to a Date object "aware" of the APP_DISPLAY_TIMEZONE.
    //    This handles the timezone offset correctly.
    const zonedDisplayDate = convertUTCToLocal(utcDateForDisplay, APP_DISPLAY_TIMEZONE);

    // 3. Format this zoned Date object into a human-readable string.
    //    'PPPP' is a date-fns format string for a full date (e.g., "Thursday, July 10, 2025").
    displayDate = format(zonedDisplayDate, 'PPPP');
    // --- END REVISED displayDate LOGIC ---
  }

  async function handleSubmit(formData: FormData) {
    'use server'
    const data = Object.fromEntries(formData.entries());

    if (data.rsvpTime && data.btSchedule) {
      redirect('/rsvp/confirmation');
    } else if (data.btBack) {
      redirect('/rsvp/date');
    }
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
          <dd className="flex-5">{displayDate}</dd>
        </dl>
        <form className="flex flex-col gap-8 w-full" action={handleSubmit}>
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