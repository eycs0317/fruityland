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
import {format, parseISO} from 'date-fns';

// nextjs
import Image from 'next/image';
import type {Metadata} from 'next';

// session
import {getSession} from '@/lib/session';

// ui
import Heading from '@/ui/foundations/heading';
import FormField from '@/ui/foundations/formField';
import AdminHeader from '@/ui/patterns/adminHeader';
import Message from '@/ui/patterns/message';

// utils
import {l10n} from '@/utils/l10n';
import {getEventSessionsBySelectedDate} from '@/utils/v2Function/getEventSessionsBySelectedDate';
import {filterSessionsByDate} from '@/utils/v2Function/filterSessionsByDate';

// components
import InactivityDetector from '@/components/InactivityDetector';

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


  const uniqueSessionUTC = await getEventSessionsBySelectedDate(session.rsvpDate);
  const availableSessions = filterSessionsByDate(
    uniqueSessionUTC,
    session.rsvpDate,
    session.timezone ?? 'Asia/Hong_Kong'
  );

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
          <dd className="flex-5">{session.rsvpDate ? format(parseISO(session.rsvpDate), 'MMMM d, yyyy') : ''}</dd>
        </dl>
        <form className="flex flex-col gap-8 w-full" action="/api/rsvp/time" method="post">
          <div className="flex flex-row gap-4">
            <div className="flex flex-col flex-1 gap-4">
              <FormField type='radio' fieldData={{
                groupLabel: l10n('rsvp', 'content-002', lang),
                groupName: 'rsvpTime',
                groupClassName: 'flex flex-col',
                radios: availableSessions.length > 0 ? availableSessions.map(groupItem => ({
                  label: format(groupItem.utcSlotTime, 'h:mmaaa'),
                  value: groupItem.availableUids[0],
                  id: `slot_group_${groupItem.availableUids[0]}`,
                  isDisabled: groupItem.isFullyBooked,
                })) : [
                  { label: 'No slots available for this date', value: '', id: 'no_slots_available', isDisabled: true }
                ]
              }} />
            </div>
            <div className="flex flex-col pt-8 flex-1 text-right">
              {availableSessions.length > 0 ? (
                availableSessions.map(groupItem => (
                  <div key={`count_${groupItem.availableUids[0]}`}
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
