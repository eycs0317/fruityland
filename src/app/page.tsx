import React from 'react';

// nextjs
import Image from 'next/image';

// ui
import FormField from '@/ui/foundations/formField';
import AdminHeader from '@/ui/patterns/adminHeader';
import Message from '@/ui/patterns/message';

// lib
import {getSession} from '@/lib/session';

// utils
import {l10n} from '@/utils/l10n';

// client
// import PageClient from './pageClient';

// v2 function to test
// import {getHKTomorrowUTC} from '@/utils/v2Function/getHKTomorrowUTC';
// import { getStartEndUTC } from '@/utils/v2Function/getStartEndUTC';
// import { checkExpire } from '@/utils/v2Function/checkExpire';
// import { resetStartUTC } from '@/utils/v2Function/resetStartUTC';


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

  return (
    <main role="main" className="grid justify-self-center justify-items-center w-full md:w-120 p-4">
      <AdminHeader />
      {/*<section className="w-full p-8 text-center">
        <Heading level={1} content={l10n('home', 'title', lang)} className="text-4xl pb-8" />
      </section>*/}
      <section className="grid justify-items-center relative w-full px-6">
        <Image src="/assets/i/brand/logo-cy-bw.png" alt={l10n('layout', 'mall', lang)} width="100" height="100" />
      </section>
      <section className="grid grid-flow-col justify-items-center relative w-full px-6">
        <Image src="/assets/i/icons/avo.png" alt={l10n('home', 'title', lang)} width="75" height="75" />
        <Image src="/assets/i/icons/pineapple.png" alt={l10n('home', 'title', lang)} width="75" height="75" />
      </section>
      <section className="grid justify-items-center relative w-full px-6">
        <Image src="/assets/i/home.png" alt={l10n('home', 'title', lang)} width="300" height="300" />
      </section>
      <section className="w-full p-8">
        <Message messageCode={message ?? ''} />
        <form className="flex flex-col gap-8 w-full" action="/api/findCoupon" method="post">
          <div className="flex flex-col gap-2">
            <FormField type="input" fieldData={{type: 'text', id: 'couponCode', label: l10n('home', 'input-001', lang), wrapperClassName: 'w-full', isRequired:true, placeholder: '12345678'}} />
            <p className="text-neutral-000"><small>{l10n('home', 'helper-001', lang)}</small></p>
          </div>
          <div className="flex flex-col gap-4">
            <FormField type='button' fieldData={{type: 'submit', id: 'btSearch', className: 'primary', value:l10n('home', 'button-001', lang)}} />
          </div>
        </form>
      </section>
      {/*<Suspense fallback={<div>Loading...</div>}>
        <PageClient />
      </Suspense>*/}
    </main>
  );
}
