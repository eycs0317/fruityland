// metadata
export async function generateMetadata(): Promise<Metadata> {
  const session = await getSession();
  const lang = session.lang || 'zh-HK';

  const localizedTitles: Record<string, string> = {
    'en-US': 'Reservation [Confirmation]',
    'zh-CN': '预约 [确认]',
    'zh-HK': '預約 [確認]',
  };

  return {
    title: localizedTitles[lang] ?? 'Reservation [Date Selection]',
  };
}

// react
import React, {Suspense} from 'react';

// nextjs
import type {Metadata} from 'next';

// ui
import AdminHeader from '@/ui/patterns/adminHeader';
import Message from '@/ui/patterns/message';

// utils
import {checkAuth} from '@/utils/checkAuth';

// session
import { getSession } from '@/lib/session';

// client
import PageClient from './pageClient';
import PageClientCheckInAction from './pageClientCheckInAction';
import PageClientReservationAction from './pageClientReservationAction';

interface PageProps {
  searchParams?: Promise<{
    message?: string;
  }>;
}

export default async function MainPage({searchParams}: PageProps) {
  const resolvedSearchParams = await searchParams;
  const message = resolvedSearchParams?.message;

  const session = await getSession();

  const auth = await checkAuth('onsiteAdmin');
  if (auth) {
    return (
      <main role="main" className="grid justify-self-center justify-items-center w-full md:w-120 p-4">
        <AdminHeader />
        <section className="w-full p-8">
          <Message messageCode={message ?? ''} />
        </section>
        <Suspense fallback={<div>Loading...</div>}>
          <PageClient lang={session.lang ?? 'zh-HK'} />
          <PageClientCheckInAction lang={session.lang ?? 'zh-HK'} />
        </Suspense>
      </main>
    );
  } else {
    return (
      <main role="main" className="grid justify-self-center justify-items-center w-full md:w-120 p-4">
        <AdminHeader />
        <Suspense fallback={<div>Loading...</div>}>
          <PageClient lang={session.lang ?? 'zh-HK'} />
          <PageClientReservationAction lang={session.lang ?? 'zh-HK'} />
        </Suspense>
      </main>
    );
  }
}
