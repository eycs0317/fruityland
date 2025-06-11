// metadata
export const metadata = {
  title: 'Onsite Support [Reservation List]',
};

// react
import React, {Suspense} from 'react';

// nextjs
import {redirect} from 'next/navigation';

// ui
import AdminHeader from '@/ui/patterns/adminHeader';

// lib
import {getSession} from '@/lib/session';

// client
import PageClient from './pageClient';

export default async function MainPage() {
  const session = await getSession();
  if (!session.auth || session.authType != 'onsiteAdmin') {
    redirect('/admin');
  }

  return (
    <main role="main" className="grid justify-self-center justify-items-center w-full md:w-120 p-4">
      <AdminHeader />
      <Suspense fallback={<div>Loading...</div>}>
        <PageClient />
      </Suspense>
    </main>
  );
}
