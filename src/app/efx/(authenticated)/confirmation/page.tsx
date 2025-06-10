// metadata
export const metadata = {
  title: 'EFX Portal [Confirmation]',
};

// react
import React, {Suspense} from 'react';

// nextjs
import Link from 'next/link';
import {redirect} from 'next/navigation';

// ui
import Heading from '@/ui/foundations/heading';

// lib
import {getSession} from '@/lib/session';

// client
import PageClient from './pageClient';

export default async function MainPage() {
  const session = await getSession();
  if (!session.auth || session.authType != 'efxAdmin') {
    redirect('/efx');
  }

  return (
    <main role="main" className="grid justify-self-center justify-items-center w-full md:w-120 p-4">
      <nav className="flex flex-row w-full px-8">
        <div className="flex-1">
          <Link href="/efx/dashboard">&lt; Back to EFX Dashboard</Link>
        </div>
        <div className="flex-1 text-right">
          <Link href="/logout" prefetch={false}>Logout</Link>
        </div>
      </nav>
      <section className="w-full p-8">
        <Heading level={1} content="Confirmation" className="text-4xl" />
      </section>
      <Suspense fallback={<div>Loading...</div>}>
        <PageClient />
      </Suspense>
    </main>
  );
}
