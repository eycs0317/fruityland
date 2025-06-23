// metadata
export async function generateMetadata(): Promise<Metadata> {
  const session = await getSession();
  const lang = session.lang || 'zh-HK';

  const localizedTitles: Record<string, string> = {
    'en-US': 'Reservation [Review]',
    'zh-CN': '预约 [確認]',
    'zh-HK': '預約 [確認]',
  };

  return {
    title: localizedTitles[lang] ?? 'Reservation [Review]',
  };
}

// react
import React from 'react';
import {addMinutes} from 'date-fns';

// nextjs
import Link from 'next/link';
import type {Metadata} from 'next';
import Image from 'next/image';

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
    <main role="main" className="grid justify-self-center justify-items-center w-full md:w-120 p-4" id="reviewPage">
      <InactivityDetector />
      <AdminHeader />
      <form className="flex flex-col gap-4 w-full" action="/api/rsvp/confirmation" method="post">
        <div className="m-4 bg-primary-300 border border-neutral-000 mb-4 text-neutral-000 border-4 rounded-2xl">
          <section className="w-full p-8 text-center">
            <Heading level={1} content={l10n('rsvp', 'title-review', lang)} className="text-4xl text-neutral-000" />
          </section>
          <section className="w-full p-4 pt-0">
            <Message messageCode={message ?? ''} />
            <dl className="space-y-2 text-gray-700">
              <div className="rsvpDetails flex pb-2 items-center">
                <dt className="font-bold pl-4"><Image src="/assets/i/icons/participants-light.svg" alt={l10n('rsvp', 'content-review-006', lang)} width="30" height="30" /></dt>
                <dd className="pl-4 font-bold">{l10n('rsvp', 'content-review-007', lang)}</dd>
              </div>
              {/*<div className="flex justify-between border-b pb-2">
                <dt className="font-bold">{l10n('rsvp', 'content-review-003', lang)}:</dt>
                <dd className="text-right">{session.coupon?.couponCode ? session.coupon.couponCode.match(/.{1,4}/g)?.join('-').toUpperCase() : 'N/A'}</dd>
              </div>*/}
              <div className="rsvpDetails flex pb-2 items-center">
                <dt className="font-bold pl-4"><Image src="/assets/i/icons/date-light.svg" alt={l10n('rsvp', 'content-review-004', lang)} width="30" height="30" /></dt>
                <dd className="pl-4 font-bold">{session.schedule?.sessionDateTime ? formatInUserTimezone(session.schedule.sessionDateTime, session.timezone ?? 'Asia/Hong_Kong', 'MMMM d, yyyy') : ''}</dd>
              </div>
              <div className="rsvpDetails flex pb-2 items-center">
                <dt className="font-bold pl-4"><Image src="/assets/i/icons/time-light.svg" alt={l10n('rsvp', 'content-review-005', lang)} width="30" height="30" /></dt>
                <dd className="pl-4 font-bold">{session.schedule?.sessionDateTime ? formatInUserTimezone(session.schedule.sessionDateTime, session.timezone ?? 'Asia/Hong_Kong') : ''} - {session.schedule?.sessionDateTime ? formatInUserTimezone(addMinutes(session.schedule.sessionDateTime, 20), session.timezone ?? 'Asia/Hong_Kong') : ''}</dd>
              </div>
            </dl>
          </section>
          <section className="formLegal w-full p-8 pt-0">
            <FormField type='checkbox' fieldData={{
              id: 'terms',
              label: (
                <>
                  {l10n('rsvp', 'content-legal-1', lang)}
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
                  {/*{l10n('rsvp', 'content-legal-2a', lang)}*/}
                  <strong className="text-accent-200">
                    {l10n('rsvp', 'content-legal-2b', lang)}
                  </strong>
                  {l10n('rsvp', 'content-legal-2c', lang)}
                  <Link href="/legal/rules" target="_blank">{l10n('rsvp', 'content-terms', lang)}</Link>
                  {l10n('rsvp', 'content-legal-3', lang)}
                  <Link href="/legal/precaution" target="_blank">{l10n('rsvp', 'content-waiver', lang)}</Link>
                  {l10n('rsvp', 'content-legal-4', lang)}
                </>
              ),
              value: 'waiver',
              isRequired: true,
              isChecked: session.legal?.waiver ?? false
            }} />
            <p className="pt-4">{l10n('rsvp', 'content-legal-5', lang)}</p>
          </section>
        </div>
        <section className="w-full px-8">
          <div className="flex flex-col gap-4">
            <FormField type='button' fieldData={{type: 'submit', id: 'btSchedule', className: 'primary', value:l10n('rsvp', 'button-003', lang)}} />
            <FormField type='button' fieldData={{type: 'submit', id: 'btBack', className: 'tertiary', value:l10n('rsvp', 'button-001', lang)}} />
          </div>
        </section>
        <footer className="grid justify-items-center relative w-full pt-4">
          <Image src="/assets/i/brand/logo-cy.png" alt={l10n('layout', 'mall', lang)} width="100" height="100" />
        </footer>
      </form>
    </main>
  );
}
