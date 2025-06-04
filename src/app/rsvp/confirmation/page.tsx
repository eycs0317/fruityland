// metadata
export const metadata = {
  title: 'RSVP Confirmation',
};

// react
import React from 'react';

// nextjs
import Image from 'next/image';
import {redirect} from 'next/navigation';

// ui
import FormField from '@/ui/foundations/formField';
import Heading from '@/ui/foundations/heading';

export default async function MainPage() {
  async function handleSubmit(formData: FormData) {
    'use server'
    const data = Object.fromEntries(formData.entries());

    if (data.btModify) {
      redirect('/rsvp/date');
    } else if (data.btCancel) {
      redirect('/rsvp/cancel');
    }
  }
  return (
    <main role="main" className="grid justify-self-center justify-items-center w-full md:w-120 p-4">
      <section className="w-full p-8">
        <Heading level={1} content="Your reservation is confirmed for FruityLand." className="text-2xl pb-8" />
        <dl className="flex flex-row">
          <dt className="font-bold pr-2">Date:</dt>
          <dd>July 27, 2025</dd>
        </dl>
        <dl className="flex flex-row">
          <dt className="font-bold pr-2">Time:</dt>
          <dd>1:00pm</dd>
        </dl>
        <dl className="flex flex-row pb-4">
          <dt className="font-bold pr-2">Participants:</dt>
          <dd>2</dd>
        </dl>
        <div className="flex flex-row pb-4">
          <dl className="flex flex-col flex-2">
            <dt className="font-bold flex-1">Coupon Code:</dt>
            <dd className="flex-5">1F4A-671B-43AE</dd>
          </dl>
          <div className="flex flex-row flex-1">
            <Image src="/assets/i/placeholder/qrCode.svg" alt="QR Code" layout="responsive" width="300" height="300" />
          </div>
        </div>
        <p>Present this confirmation at the entrance for event admission.</p>
      </section>
      <section className="w-full p-8">
        <form className="flex flex-col gap-8 w-full" action={handleSubmit}>
          <div className="flex flex-col gap-4">
            <FormField type='button' fieldData={{type: 'submit', id: 'btModify', className: 'secondary', value:'Modify'}} />
            <FormField type='button' fieldData={{type: 'submit', id: 'btCancel', className: 'secondary', value:'Cancel Reservation'}} />
          </div>
        </form>
      </section>
    </main>
  );
}
