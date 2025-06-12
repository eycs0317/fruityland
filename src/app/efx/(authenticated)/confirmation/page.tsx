// metadata
export const metadata = {
  title: 'EFX Portal [Confirmation]',
};

// react
import React, {Suspense} from 'react';

// ui
import AdminHeader from '@/ui/patterns/adminHeader';

// nextjs
import {redirect} from 'next/navigation';

// ui
import Heading from '@/ui/foundations/heading';

// utils
import {protectPage} from '@/utils/protectPage';

// client
import PageClient from './pageClient';

export default async function MainPage() {
  const auth = await protectPage('efxAdmin');
  if (auth != null) {
    redirect(auth);
  }

  return (
    <main role="main" className="grid justify-self-center justify-items-center w-full md:w-120 p-4">
      <AdminHeader />
      <section className="w-full p-8">
        <Heading level={1} content="Confirmation" className="text-4xl" />
      </section>
      <Suspense fallback={<div>Loading...</div>}>
        <PageClient />
      </Suspense>
    </main>
  );
}
