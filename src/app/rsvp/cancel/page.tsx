// metadata
export const metadata = {
  title: 'Cancel RSVP',
};

// react
import React, {Suspense}  from 'react';

// next
import Image from 'next/image';

// ui
import AdminHeader from '@/ui/patterns/adminHeader';

// utils
import {l10n} from '@/utils/l10n';

// session
import {getSession} from '@/lib/session';

// client
import PageClient from './pageClient';

export default async function MainPage() {
  const session = await getSession();
  const lang = session?.lang ?? 'zh-HK';

  return (
    <main role="main" className="grid justify-self-center justify-items-center w-full md:w-120 p-4">
        <AdminHeader />
        <Suspense fallback={<div>Loading...</div>}>
          <PageClient />
        </Suspense>
        <footer className="grid justify-items-center relative w-full pt-4">
          <Image src="/assets/i/brand/logo-cy-bw.png" alt={l10n('layout', 'mall', lang)} width="100" height="100" />
        </footer>
    </main>
  );
}
