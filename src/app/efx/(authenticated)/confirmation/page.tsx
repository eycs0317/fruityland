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
      <section className="w-full px-8">
        <Message messageCode={message ?? ''} />
      </section>
      <Suspense fallback={<div>Loading...</div>}>
        <PageClient />
      </Suspense>
    </main>
  );
}
