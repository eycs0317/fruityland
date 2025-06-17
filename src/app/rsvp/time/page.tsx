// metadata
export async function generateMetadata(): Promise<Metadata> {
  const session = await getSession();
  const lang = session.lang || 'zh-HK';

  const localizedTitles: Record<string, string> = {
    'en-US': 'Reservation [Time Selection]',
    'zh-CN': '预约 [选择时间]',
    'zh-HK': '預約 [選擇時間]',
  };

  return {
    title: localizedTitles[lang] ?? 'Reservation [Time Selection]',
  };
}

// react
import React from 'react';
// import {format} from 'date-fns';

// nextjs
import Image from 'next/image';
import type {Metadata} from 'next';

// session
import { getSession } from '@/lib/session';

// ui
// import FormField from '@/ui/foundations/formField';
import Heading from '@/ui/foundations/heading';
import FormField from '@/ui/foundations/formField';
import AdminHeader from '@/ui/patterns/adminHeader';
import Message from '@/ui/patterns/message';

// utils
import {l10n} from '@/utils/l10n';
import {groupAndSortAppointments} from '@/utils/appointmentUtils';

import {Appointment} from '@/utils/appointmentUtils';
import InactivityDetector from '@/components/InactivityDetector';

// import { getSchedulesByGroup } from '@/utils/v2Function/getSchedulesByGroup';
// import { filterSchedulesBySelectedDate} from '@/utils/v2Function/filterSchedulesBySelectedDate';
import { getEventSessionsBySelectedDate } from '@/utils/v2Function/getEventSessionsBySelectedDate';
import { filterSessionsByDate } from '@/utils/v2Function/filterSessionsByDate';
interface PageProps {
  searchParams?: Promise<{
    message?: string;
  }>;
}

export default async function MainPage({searchParams}: PageProps) {
  const session = await getSession();
  const lang = session?.lang ?? 'zh-HK';

  const resolvedSearchParams = await searchParams;
  const message = resolvedSearchParams?.message;

  // Destructure the resolved search parameters
  const date = session.rsvpDate; //for display
  const group = session.coupon?.group;



  // testing --------------->
console.log('typeof date------>',  date)
// const schedulesByGroup = await getSchedulesByGroup(group)
// console.log('schedulesByGroup------>', schedulesByGroup)
// const filteredSchedules = await filterSchedulesBySelectedDate(schedulesByGroup, date)
// console.log('filteredSchedules------>', filteredSchedules)
console.log('date------>',  date)
const selecteddateplus48hrs = await getEventSessionsBySelectedDate(date)
console.log('new  result return selected date(local) + 48hrs sessionTime------>', selecteddateplus48hrs)
const result =  filterSessionsByDate(
  selecteddateplus48hrs.map(session => session.sessionDateTime), // <--- Map to extract only the Date objects
  date,
  'America/Los_Angeles'
);
console.log('result---->', result)
// const groupedData = groupAndSortAppointments(selecteddateplus48hrs)
// console.log('new groupedData ------>', groupedData)






  // Initialize arrays for appointments and grouped data
  let appointments: Appointment[] = [];
  let groupedAppointmentData: { time: string; count: number; availableCount: number; isFullyBooked: boolean; uids: string[]; }[] = [];

  // Fetch appointments if a group is provided
  if (group && date) {
    try {
      // Construct API URL for searching open appointments by group
      const apiUrl = `${process.env.NEXT_PUBLIC_URL}/api/rsvp/searchOpenApptByGroup?group=${group}&date=${date}`;

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
      // console.log('appts----->', appointments)

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

  return (
    <main role="main" className="grid justify-self-center justify-items-center w-full md:w-120 p-4">
      <InactivityDetector />
      <AdminHeader />
      <section className="w-full p-8 text-center">
        <Heading level={1} content={l10n('rsvp', 'title-date', lang)} className="text-4xl pb-8" />
      </section>
      <section className="relative w-1/3 pb-8 px-8">
        <Image src="/assets/i/icons/calendar.svg" alt={l10n('rsvp', 'icon-001', lang)} layout="responsive" width="100" height="100" />
      </section>
      <section className="w-full p-8">
        <Message messageCode={message ?? ''} />
        <dl className="flex flex-row pb-4">
          <dt className="font-bold flex-1">{l10n('rsvp', 'content-001', lang)}</dt>
          <dd className="flex-5">{date}</dd>
        </dl>
        <form className="flex flex-col gap-8 w-full" action="/api/rsvp/time" method="post">
          <div className="flex flex-row gap-4">
            <div className="flex flex-col flex-1 gap-4">
              <FormField type='radio' fieldData={{
                groupLabel: l10n('rsvp', 'content-002', lang),
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
                    {groupItem.isFullyBooked ? 'Full' : `${groupItem.availableCount} ${l10n('rsvp', 'content-003', lang)}`}
                  </div>
                ))
              ) : (
                <div className="flex flex-col">N/A</div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <FormField type='button' fieldData={{type: 'submit', id: 'btNext', className: 'primary', value:l10n('rsvp', 'button-002', lang)}} />
            <FormField type='button' fieldData={{type: 'submit', id: 'btBack', className: 'tertiary', value:l10n('rsvp', 'button-001', lang)}} />
          </div>
        </form>
      </section>
    </main>
  );
}
