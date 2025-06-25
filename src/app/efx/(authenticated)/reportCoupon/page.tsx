// metadata
export const metadata = {
  title: 'EFX Portal [Coupon Code Report]',
};

// react
import React, {Suspense} from 'react';

// nextjs
import {redirect} from 'next/navigation';

// ui
import Heading from '@/ui/foundations/heading';
import AdminHeader from '@/ui/patterns/adminHeader';
import Message from '@/ui/patterns/message';

// utils
import {protectPage} from '@/utils/protectPage';

// client
import PageClient from './pageClient';

interface PageProps {
  searchParams?: Promise<{
    message?: string;
  }>;
}

export default async function MainPage({searchParams}: PageProps) {
  const resolvedSearchParams = await searchParams;
  const message = resolvedSearchParams?.message;

  const authUser = await protectPage('efxUser');
  if (authUser != null) {
    const auth = await protectPage('efxAdmin');
    if (auth != null) {
      redirect(auth);
    }
  }

  return (
    <main role="main" className="grid justify-self-center justify-items-center w-full md:w-120 p-4">
      <AdminHeader />
      <section className="w-full p-8 pb-0">
        <Heading level={1} content="Coupon Code Report" className="text-4xl pb-0 text-neutral-000" />
      </section>
      <section className="grid justify-self-center justify-items-center w-full p-1">
        <Message messageCode={message ?? ''} />
        <Suspense fallback={<div>Loading...</div>}>
          <PageClient />
        </Suspense>
      </section>
    </main>
  );
}
