// metadata
export const metadata = {
  title: 'RSVP Confirmation',
};

// react
import React, {Suspense} from 'react';

// ui
import AdminHeader from '@/ui/patterns/adminHeader';

// lib
import {getSession} from '@/lib/session';

// client
import PageClient from './pageClient';
import PageClientCheckInAction from './pageClientCheckInAction';
import PageClientReservationAction from './pageClientReservationAction';

export default async function MainPage() {
  const session = await getSession();
  if (session.auth && session.authType == 'onsiteAdmin') {
    return (
      <main role="main" className="grid justify-self-center justify-items-center w-full md:w-120 p-4">
        <AdminHeader />
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
