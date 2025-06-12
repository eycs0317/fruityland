import React from 'react';

// nextjs
import Image from 'next/image';

// ui
import FormField from '@/ui/foundations/formField';
import Heading from '@/ui/foundations/heading';
import AdminHeader from '@/ui/patterns/adminHeader';

export default function MainPage() {
  return (
    <main role="main" className="grid justify-self-center justify-items-center w-full md:w-120 p-4">
      <AdminHeader />
      <section className="w-full p-8 text-center">
        <Heading level={1} content="Welcome FruityLand." className="text-4xl pb-8" />
      </section>
      <section className="relative w-full px-20 pb-8">
        <Image src="/assets/i/home.svg" alt="FruityLand" width="300" height="300" />
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
}
