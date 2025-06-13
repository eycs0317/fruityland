// metadata
export async function generateMetadata(): Promise<Metadata> {
  const session = await getSession();
  const lang = session.lang || 'zh-HK';

  const localizedTitles: Record<string, string> = {
    'en-US': 'Reservation [Date Selection]',
    'zh-CN': '预约 [选择日期]',
    'zh-HK': '預約 [選擇日期]',
  };

  return {
    title: localizedTitles[lang] ?? 'Reservation [Date Selection]',
  };
}

// react
import React from 'react';

// nextjs
import {redirect} from 'next/navigation';
import type {Metadata} from 'next';

// ui
import FormField from '@/ui/foundations/formField';
import Heading from '@/ui/foundations/heading';
import AdminHeader from '@/ui/patterns/adminHeader';

// utils
import {l10n} from '@/utils/l10n';

// Calendar
import Calendar from '@/components/Calendar';

// session
import { getSession } from '@/lib/session';

//server side functions
import { getMinMaxScheduleDatesByGroup } from '@/lib/getMinMaxScheduleDatesByGroup';

import InactivityDetector from '@/components/InactivityDetector';




export default async function MainPage() {
  const session = await getSession();
  const lang = session?.lang ?? 'zh-HK';
  const couponGroup = session.coupon?.group ?? 0;
  const couponCode = session.coupon?.couponCode;
  let { startDate} = await getMinMaxScheduleDatesByGroup(session.coupon?.group ?? 0)
  const { endDate } = await getMinMaxScheduleDatesByGroup(session.coupon?.group ?? 0)

const today = new Date();
const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

// Convert UTC strings from the DB into local Date objects
const rawStartDate = startDate ? new Date(startDate) : null; // e.g., '2025-07-01T04:00:00.000Z'
const rawEndDate = endDate ? new Date(endDate) : null;     // e.g., '2025-07-05T04:00:00.000Z'

// Check if coupon has expired
if (rawEndDate && rawEndDate < today) {
  // redirect('/efx?message=E0007')
  redirect('/')
}

if (rawStartDate && rawStartDate <= today) {
  startDate = tomorrow;
} else {
  startDate = rawStartDate;
}

  async function handleSubmit(formData: FormData) {
    'use server'

    const data = Object.fromEntries(formData.entries());
    const selectedDate = data.selectedDate;
    if (data.btNext) {
      if (selectedDate) {
        redirect(`/rsvp/time?date=${selectedDate}&group=${couponGroup}&couponCode=${couponCode}`);
      } else {
        redirect('/rsvp/time');
      }
    } else if (data.btBack) {
      redirect('/');
    }
  }
  return (
    <main role="main" className="grid justify-self-center justify-items-center w-full md:w-120 p-4">
      <InactivityDetector />
      <AdminHeader />
      <section className="w-full p-8 text-center">
        <Heading level={1} content={l10n('rsvp', 'title-date', lang)} className="text-4xl pb-8" />
      </section>
      <section className="relative w-full pb-8 px-8">
      </section>
      <section className="w-full p-8">
        <form className="flex flex-col gap-8 w-full" action={handleSubmit}>

        <Calendar allowedMinDate={startDate ?? undefined} allowedMaxDate={endDate ?? undefined}/>
          <div className="flex flex-col gap-4">
            <FormField type='button' fieldData={{type: 'submit', id: 'btNext', className: 'secondary', value:l10n('rsvp', 'button-002', lang)}} />
            <FormField type='button' fieldData={{type: 'submit', id: 'btBack', className: 'tertiary', value:l10n('rsvp', 'button-001', lang)}} />
          </div>
        </form>
      </section>
    </main>
  );
}
