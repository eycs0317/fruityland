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
import AdminHeader from '@/ui/patterns/adminHeader';
import Message from '@/ui/patterns/message';
import Timezone from '@/ui/patterns/userTimezone';

// utils
import {l10n} from '@/utils/l10n';
import {getHKTomorrowUTC} from '@/utils/v2Function/getHKTomorrowUTC';
import {getStartEndUTC} from '@/utils/v2Function/getStartEndUTC';
import {checkExpire} from '@/utils/v2Function/checkExpire';
import {resetStartUTC} from '@/utils/v2Function/resetStartUTC';

// components
import Calendar from '@/components/Calendar';
import InactivityDetector from '@/components/InactivityDetector';

// session
import {getSession} from '@/lib/session';

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

  // get tomorrow hk time at 12am as UTC
  const hktTomorrowUTC = getHKTomorrowUTC();
  // console.log(hktTomorrowUTC);

  let startEndUTC: {
    startDate: Date | null;
    endDate: Date | null;
  } | undefined;

  if (session.coupon) {
    // get start and end session time based on group or authType as UTC
    startEndUTC = await getStartEndUTC(session.coupon.couponCode);
    if (!startEndUTC.startDate || !startEndUTC.endDate) {
      redirect('/?message=E0005'); // or throw an error, or use a fallback
    }
    // console.log(startEndUTC);

    // get expired status
    const expireStatus = checkExpire(startEndUTC.startDate, startEndUTC.endDate, hktTomorrowUTC);
    // console.log(expireStatus);

    if (expireStatus == 1) {
      // coupon expired.  redirect with error code.
      redirect('/?message=E0011');
    } else if (expireStatus == 2) {
      // start date passed, but coupon is not expired.  reset start date to tomorrow.
      startEndUTC.startDate = resetStartUTC(startEndUTC.startDate, hktTomorrowUTC);
    }
    // console.log(startEndUTC);

  } else {
    redirect('/?message=E0004');
  }

  return (
    <main role="main" className="grid justify-self-center justify-items-center w-full md:w-120 p-4">
      <InactivityDetector />
      <AdminHeader />
      <section className="w-full p-8">
        <Message messageCode={message ?? ''} />
        <form className="flex flex-col gap-8 w-full" action="/api/rsvp/date" method="post">
          <Calendar initialDate="2025-01-01" allowedMinDate={startEndUTC?.startDate?.toISOString()} allowedMaxDate={startEndUTC?.endDate?.toISOString()}/>
          <Timezone />
          <div className="flex flex-col gap-4">
            <FormField type='button' fieldData={{type: 'submit', id: 'btNext', className: 'primary', value:l10n('rsvp', 'button-002', lang)}} />
            <FormField type='button' fieldData={{type: 'submit', id: 'btBack', className: 'tertiary', value:l10n('rsvp', 'button-001', lang)}} />
          </div>
        </form>
      </section>
    </main>
  );
}
