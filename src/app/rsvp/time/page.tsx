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
// import {format, parseISO, addMinutes} from 'date-fns';
import {addMinutes} from 'date-fns';

// nextjs
import type {Metadata} from 'next';
import Image from 'next/image';

// session
import {getSession} from '@/lib/session';

// ui
import FormField from '@/ui/foundations/formField';
import AdminHeader from '@/ui/patterns/adminHeader';
import Message from '@/ui/patterns/message';

// utils
import {l10n} from '@/utils/l10n';
import {getEventSessionsBySelectedDate} from '@/utils/v2Function/getEventSessionsBySelectedDate';
import {filterSessionsByDate} from '@/utils/v2Function/filterSessionsByDate';
import {formatInUserTimezone} from '@/utils/formatInUserTimezone';

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
  console.log('uniqueSessionUTC--->', uniqueSessionUTC);
console.log('availableSessions--->', availableSessions);
const radioData = availableSessions.map(groupItem => {
  const uid = groupItem.availableUids[0];
  return {
    label: formatInUserTimezone(groupItem.utcSlotTime, session.timezone ?? 'Asia/Hong_Kong'),
    value: uid ?? 'unavailable_uid',
    id: `slot_group_${uid ?? 'unavailable_uid'}`,
    isDisabled: groupItem.isFullyBooked || !uid
  };
});

console.log('RADIO DATA:', JSON.stringify(radioData, null, 2));

  return (
    <main role="main" className="grid justify-self-center justify-items-center w-full md:w-120 p-4">
      <InactivityDetector />
      <AdminHeader />
      <section className="w-full p-8 pb-0">
        <Message messageCode={message ?? ''} />
        <p className="text-neutral-000 pb-4 text-center">{l10n('rsvp', 'content-006', lang)}</p>
        {/*<dl className="flex flex-row pb-4 text-neutral-000">
          <dt className="font-bold flex-1">{l10n('rsvp', 'content-001', lang)}</dt>
          <dd className="flex-5">{session.rsvpDate ? format(parseISO(session.rsvpDate), 'MMMM d, yyyy') : ''}</dd>
        </dl>*/}
        <form className="flex flex-col gap-8 w-full" action="/api/rsvp/time" method="post">
          <div className="flex flex-row gap-4 bg-neutral-000 border border-neutral-000 border-4 rounded-2xl p-4">
            <div className="flex flex-col flex-1 gap-4">
              <FormField type='radio' fieldData={{
                groupLabel: l10n('rsvp', 'content-002', lang),
                groupName: 'rsvpTime',
                groupClassName: 'flex flex-col',
                radios: availableSessions.map(groupItem => {
                  const uid = groupItem.availableUids[0];
                  const availabilities = groupItem.isFullyBooked ? `(${l10n('rsvp', 'content-005', lang)})` : `(${l10n('rsvp', 'content-003', lang)}: ${groupItem.availableCount})`;
                  return {
                    label: `${formatInUserTimezone(groupItem.utcSlotTime, session.timezone ?? 'Asia/Hong_Kong')} - ${formatInUserTimezone(addMinutes(groupItem.utcSlotTime, 20), session.timezone ?? 'Asia/Hong_Kong')} ${availabilities}`,
                    value: uid ?? 'unavailable_uid',
                    id: `slot_group_${uid ?? 'unavailable_uid'}`,
                    isDisabled: groupItem.isFullyBooked || !uid,
                    wrapperClassName: 'text-sm',
                  };
                })
              }} />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <FormField type='button' fieldData={{type: 'submit', id: 'btNext', className: 'primary', value:l10n('rsvp', 'button-002', lang)}} />
            <FormField type='button' fieldData={{type: 'submit', id: 'btBack', className: 'tertiary', value:l10n('rsvp', 'button-001', lang)}} />
          </div>
        </form>
      </section>
      <footer className="grid justify-items-center relative w-full pt-4">
        <Image src="/assets/i/brand/logo-cy.png" alt={l10n('layout', 'mall', lang)} width="100" height="100" />
      </footer>
    </main>
  );
}
