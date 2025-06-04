// metadata
export const metadata = {
  title: 'Onsite Support [Walk-in Confirmation]',
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

    if (data.btCheckIn) {
      redirect('/admin/auth/onsite/reservation/list');
    }
  }
  return (
    <main role="main" className="grid justify-self-center justify-items-center w-full md:w-120 p-4">
      <section className="w-full p-8">
        <Heading level={1} content="Coupon Details" className="text-4xl pb-8" />
        <Link href="/admin/auth/onsite">Back to Dashboard</Link>
      </section>
      <section className="w-full p-8">
        <div className="flex flex-row pb-4">
          <dt className="font-bold pr-2">Coupon Code:</dt>
          <dd>1F4A-671B-43AE</dd>
        </div>
        <dl className="flex flex-row pb-4">
          <dt className="font-bold pr-2">Participants:</dt>
          <dd>2</dd>
        </dl>
        <form className="flex flex-col gap-8 w-full" action={handleSubmit}>
          <div className="flex flex-col gap-4">
            <FormField type='button' fieldData={{type: 'submit', id: 'btCheckIn', className: 'primary', value:'Check In'}} />
          </div>
        </form>
      </section>
    </main>
  );
}
