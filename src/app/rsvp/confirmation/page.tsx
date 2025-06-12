// metadata
export const metadata = {
  title: 'RSVP Confirmation',
};

// react
import React, {Suspense} from 'react';

// ui
import AdminHeader from '@/ui/patterns/adminHeader';
import Message from '@/ui/patterns/message';

// utils
import {checkAuth} from '@/utils/checkAuth';

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

  const auth = await checkAuth('onsiteAdmin');
  if (auth) {
    return (
      <main role="main" className="grid justify-self-center justify-items-center w-full md:w-120 p-4">
        <AdminHeader />
        <section className="w-full p-8">
          <Message messageCode={message ?? ''} />
        </section>
        <Suspense fallback={<div>Loading...</div>}>
          <PageClient />
          <PageClientCheckInAction />
        </Suspense>
      </main>
    );
  } else {
    return (
      <main role="main" className="grid justify-self-center justify-items-center w-full md:w-120 p-4">
        <AdminHeader />
        <Suspense fallback={<div>Loading...</div>}>
          <PageClient />
          <PageClientReservationAction />
        </Suspense>
      </main>
    );
  }
}
