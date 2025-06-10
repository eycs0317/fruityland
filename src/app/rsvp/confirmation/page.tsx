// metadata
export const metadata = {
  title: 'RSVP Confirmation',
};

// react
import React, {Suspense} from 'react';

// ui
import AdminHeader from '@/ui/patterns/adminHeader';

// client
import PageClient from './pageClient';

export default async function MainPage() {
  return (
    <main role="main" className="grid justify-self-center justify-items-center w-full md:w-120 p-4">
      <AdminHeader />
      <Suspense fallback={<div>Loading...</div>}>
        <PageClient />
      </Suspense>
    </main>
  );
}
