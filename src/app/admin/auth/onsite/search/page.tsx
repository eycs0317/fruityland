// metadata
export const metadata = {
  title: 'Onsite Support [Coupon Code Search]',
};

// react
import React from 'react';

// nextjs
import Link from 'next/link';
import {redirect} from 'next/navigation';

// ui
import FormField from '@/ui/foundations/formField';
import Heading from '@/ui/foundations/heading';

export default async function MainPage() {
  async function handleSubmit(formData: FormData) {
    'use server'
    const data = Object.fromEntries(formData.entries());

    if (data.couponCode != '' && data.btSearch) {
      redirect('/admin/auth/onsite/confirmation');
    }
  }
  return (
    <main role="main" className="grid justify-self-center justify-items-center w-full md:w-120 p-4">
      <section className="w-full p-8">
        <Heading level={1} content="Coupon Code Search" className="text-4xl pb-8" />
        <Link href="/admin/auth/onsite">Back to Dashboard</Link>
      </section>
      <section className="w-full p-8">
        <form className="flex flex-col gap-8 w-full" action={handleSubmit}>
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
