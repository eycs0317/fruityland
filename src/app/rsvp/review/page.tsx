// metadata
export async function generateMetadata(): Promise<Metadata> {
  const session = await getSession();
  const lang = session.lang || 'zh-HK';

  const localizedTitles: Record<string, string> = {
    'en-US': 'Reservation [Review]',
    'zh-CN': '预约 [检查]',
    'zh-HK': '預約 [檢查]',
  };

  return {
    title: localizedTitles[lang] ?? 'Reservation [Review]',
  };
}

// react
import React from 'react';

// nextjs
import Image from 'next/image';
import Link from 'next/link';
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
import {formatInUserTimezone} from '@/utils/formatInUserTimezone';

// components
import InactivityDetector from '@/components/InactivityDetector';

// import { convertUTCToLocal, APP_DISPLAY_TIMEZONE } from '@/utils/timezoneUtils';

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


  //for display
  // const displayDate = convertUTCToLocal(session.schedule?.sessionDateTime, APP_DISPLAY_TIMEZONE);
  // console.log('rsvp/review/page-----displaytime', displayDate)
  // const displayTime = format(new Date(session.schedule?.sessionDateTime), 'h:mm a');
  // console.log('rsvp/review/page-----displayTime', displayTime)
  return (
    <main role="main" className="grid justify-self-center justify-items-center w-full md:w-120 p-4">
      <InactivityDetector />
      <AdminHeader />
      <section className="w-full p-8 text-center">
        <Heading level={1} content={l10n('rsvp', 'title-review', lang)} className="text-4xl pb-8" />
      </section>
      <section className="relative w-1/3 pb-8 px-8">
        <Image src="/assets/i/icons/calendar.svg" alt={l10n('rsvp', 'icon-001', lang)} layout="responsive" width="100" height="100" />
      </section>
      <section className="w-full p-8">
        <Message messageCode={message ?? ''} />
        <Heading level={1} content={l10n('rsvp', 'content-confirmation-002', lang)} className="text-xl pb-8" />
        <dl className="space-y-2 text-gray-700">
          <div className="flex justify-between border-b pb-2">
            <dt className="font-bold">{l10n('rsvp', 'content-review-003', lang)}:</dt>
            <dd className="text-right">{session.coupon?.couponCode ? session.coupon.couponCode.match(/.{1,4}/g)?.join('-').toUpperCase() : 'N/A'}</dd>
          </div>
          <div className="flex justify-between border-b pb-2">
            <dt className="font-bold">{l10n('rsvp', 'content-review-004', lang)}</dt>
            <dd className="text-right">{session.schedule?.sessionDateTime ? formatInUserTimezone(session.schedule.sessionDateTime, session.timezone ?? 'Asia/Hong_Kong', 'MMMM d, yyyy') : ''}</dd>
          </div>
          <div className="flex justify-between border-b pb-2">
            <dt className="font-bold">{l10n('rsvp', 'content-review-005', lang)}</dt>
            <dd className="text-right">{session.schedule?.sessionDateTime ? formatInUserTimezone(session.schedule.sessionDateTime, session.timezone ?? 'Asia/Hong_Kong') : ''}</dd>
          </div>
           <div className="flex justify-between border-b pb-2">
            <dt className="font-bold">{l10n('rsvp', 'content-review-006', lang)}:</dt>
            <dd className="text-right">2</dd>
          </div>
        </dl>
        <form className="flex flex-col gap-8 w-full" action="/api/rsvp/confirmation" method="post">
            <FormField type='checkbox' fieldData={{
              id: 'terms',
              label: (
                <>
                  {l10n('rsvp', 'content-legal-1', lang)}
                  <Link href="/legal/terms" target="_blank">
                    {l10n('rsvp', 'content-terms', lang)}
                  </Link>
                </>
              ),
              value: 'terms',
              isRequired: true,
              isChecked: session.legal?.terms ?? false
            }} />
            <FormField type='checkbox' fieldData={{
              id: 'waiver',
              label: (
                <>
                  {l10n('rsvp', 'content-legal-1', lang)}
                  <Link href="/legal/waiver" target="_blank">{l10n('rsvp', 'content-waiver', lang)}</Link>
                </>
              ),
              value: 'waiver',
              isRequired: true,
              isChecked: session.legal?.waiver ?? false
            }} />
          <div className="flex flex-col gap-4">
            <FormField type='button' fieldData={{type: 'submit', id: 'btSchedule', className: 'primary', value:l10n('rsvp', 'button-003', lang)}} />
            <FormField type='button' fieldData={{type: 'submit', id: 'btBack', className: 'tertiary', value:l10n('rsvp', 'button-001', lang)}} />
          </div>
        </form>
      </section>
    </main>
  );
}
