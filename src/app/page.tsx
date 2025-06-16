import React, {Suspense} from 'react';

// nextjs
import Image from 'next/image';

// ui
import FormField from '@/ui/foundations/formField';
import Heading from '@/ui/foundations/heading';
import AdminHeader from '@/ui/patterns/adminHeader';
import Message from '@/ui/patterns/message';

// lib
import {getSession} from '@/lib/session';

// utils
import {l10n} from '@/utils/l10n';

// client
import PageClient from './pageClient';

// v2 function to test
import {getHKTomorrowUTC} from '@/utils/v2Function/getHKTomorrowUTC';
interface PageProps {
  searchParams?: Promise<{
    message?: string;
  }>;
}

export default async function MainPage({searchParams}: PageProps) {
  const resolvedSearchParams = await searchParams;
  const message = resolvedSearchParams?.message;

  const session = await getSession();
  const lang = session?.lang ?? 'zh-HK';


  console.log(getHKTomorrowUTC());

  return (
    <main role="main" className="grid justify-self-center justify-items-center w-full md:w-120 p-4">
      <AdminHeader />
      <section className="w-full p-8 text-center">
        <Heading level={1} content={l10n('home', 'title', lang)} className="text-4xl pb-8" />
      </section>
      <section className="relative w-full px-20 pb-8">
        <Image src="/assets/i/home.svg" alt={l10n('home', 'title', lang)} width="300" height="300" />
      </section>
      <section className="w-full p-8">
        <Message messageCode={message ?? ''} />
        <form className="flex flex-col gap-8 w-full" action="/api/findCoupon" method="post">
          <div className="flex flex-col gap-4">
            <FormField type="input" fieldData={{type: 'text', id: 'couponCode', label: l10n('home', 'input-001', lang), wrapperClassName: 'w-full', isRequired:true, placeholder: '1234-1234'}} />
          </div>
          <div className="flex flex-col gap-4">
            <FormField type='button' fieldData={{type: 'submit', id: 'btSearch', className: 'primary', value:l10n('home', 'button-001', lang)}} />
          </div>
        </form>
      </section>
      <Suspense fallback={<div>Loading...</div>}>
        <PageClient />
      </Suspense>
    </main>
  );
}
