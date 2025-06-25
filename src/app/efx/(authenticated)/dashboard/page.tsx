// metadata
export const metadata = {
  title: 'EFX Portal [Dashboard]',
};

// react
import React from 'react';

// nextjs
import {redirect} from 'next/navigation';

// ui
import FormField from '@/ui/foundations/formField';
import Heading from '@/ui/foundations/heading';
import AdminHeader from '@/ui/patterns/adminHeader';
import Message from '@/ui/patterns/message';

// utils
import {protectPage} from '@/utils/protectPage';

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
        <Heading level={1} content="EFX Dashboard" className="text-4xl pb-0 text-neutral-000" />
      </section>
      <section className="w-full p-8 pt-0">
        <Message messageCode={message ?? ''} />
        <form className="flex flex-col gap-8 w-full" action="/api/efx/dashboard" method="post">
          <div className="flex flex-col gap-4">
            <FormField type='button' fieldData={{type: 'submit', id: 'btGenerateCalendar', className: 'secondary', value:'Generate Calendar'}} />
            <FormField type='button' fieldData={{type: 'submit', id: 'btGenerateCouponCode', className: 'secondary', value:'Generate Coupon Code'}} />
            <FormField type='button' fieldData={{type: 'submit', id: 'btRunReport', className: 'secondary', value:'Run Report'}} />
          </div>
        </form>
      </section>
    </main>
  );
}
