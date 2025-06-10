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

// lib
import {getSession} from '@/lib/session';

export default async function MainPage() {
  const session = await getSession();
  if (!session.auth || session.authType != 'customerAdmin') {
    redirect('/admin');
  }

  if (session.auth) {
    return (
      <main role="main" className="grid justify-self-center justify-items-center w-full md:w-120 p-4">
        <AdminHeader />
        <section className="w-full p-8 text-center">
          <Heading level={1} content="Coupon Code Search" className="text-4xl pb-8" />
        </section>
        <section className="w-full p-8">
          <form className="flex flex-col gap-8 w-full" action="/api/findCoupon" method="post">
            <div className="flex flex-col gap-4">
              <FormField type="input" fieldData={{type: 'text', id: 'couponCode', label: 'Coupon Code', wrapperClassName: 'w-full', isRequired:true, placeholder: '1111-2222-3333'}} />
            </div>
            <div className="flex flex-col gap-4">
              <FormField type='button' fieldData={{type: 'submit', id: 'btSearch', className: 'primary', value:'Search'}} />
            </div>
          </form>
        </section>
      </main>
    );
  } else {
    return (
      <p>test</p>
    );
  }
}
