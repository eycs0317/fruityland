// metadata
export const metadata = {
  title: 'Customer Support [Coupon Code Search]',
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

  const auth = await protectPage('customerAdmin');
  if (auth != null) {
    redirect(auth);
  }

  return (
    <main role="main" className="grid justify-self-center justify-items-center w-full md:w-120 p-4">
      <AdminHeader />
      <section className="w-full p-8 text-center">
        <Heading level={1} content="Coupon ID 搜尋" className="text-4xl text-neutral-000" />
      </section>
      <section className="w-full p-8 pt-0">
        <Message messageCode={message ?? ''} />
        <form className="flex flex-col gap-8 w-full" action="/api/findCoupon" method="post">
          <div className="flex flex-col gap-4">
            <FormField type="input" fieldData={{type: 'text', id: 'couponCode', label: 'COUPON ID', wrapperClassName: 'w-full', isRequired:true, placeholder: '1234-1234'}} />
          </div>
          <div className="flex flex-col gap-4">
            <FormField type='button' fieldData={{type: 'submit', id: 'btSearch', className: 'primary', value:'搜尋'}} />
          </div>
        </form>
      </section>
    </main>
  );
}
