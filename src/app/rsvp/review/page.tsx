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
import {format} from 'date-fns';

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
        <dl className="space-y-2 text-gray-700">
          <div className="flex justify-between border-b pb-2">
            <dt className="font-bold">{l10n('rsvp', 'content-001', lang)}</dt>
            <dd className="text-right">{session.schedule?.sessionDateTime ? format(session.schedule.sessionDateTime, 'MMMM d, yyyy') : ''}</dd>
          </div>
          <div className="flex justify-between border-b pb-2">
            <dt className="font-bold">{l10n('rsvp', 'content-004', lang)}</dt>
            <dd className="text-right">{session.schedule?.sessionDateTime ? format(session.schedule.sessionDateTime, 'h:mmaaa') : ''}</dd>
          </div>
        </dl>
        <form className="flex flex-col gap-8 w-full" action="/api/rsvp/confirmation" method="post">
          <div className="flex flex-col gap-4">
            <p><small>* {l10n('rsvp', 'content-legal-1', lang)}<Link href="/legal/terms" target="_blank">{l10n('rsvp', 'content-terms', lang)}</Link>{l10n('rsvp', 'content-legal-2', lang)}<Link href="/legal/waiver" target="_blank">{l10n('rsvp', 'content-waiver', lang)}</Link></small></p>
            <FormField type='button' fieldData={{type: 'submit', id: 'btSchedule', className: 'primary', value:l10n('rsvp', 'button-003', lang)}} />
            <FormField type='button' fieldData={{type: 'submit', id: 'btBack', className: 'tertiary', value:l10n('rsvp', 'button-001', lang)}} />
          </div>
        </form>
      </section>
    </main>
  );
}
