// metadata
export const metadata = {
  title: 'Cancel RSVP',
};

// react
import React from 'react';

// nextjs
import {redirect} from 'next/navigation';

// ui
import FormField from '@/ui/foundations/formField';
import Heading from '@/ui/foundations/heading';

export default async function MainPage() {
  async function handleSubmit(formData: FormData) {
    'use server'
    const data = Object.fromEntries(formData.entries());

    if (data.btConfirmCancel) {
      redirect('/rsvp/cancel/confirmation');
    }
  }
  return (
    <main role="main" className="grid justify-self-center justify-items-center w-full md:w-120 p-4">
      <section className="relative w-full p-8">
        <Heading level={1} content="Are you sure you want to cancel the reservation?" className="text-2xl pb-8" />
      </section>
      <section className="w-full p-8">
        <form className="flex flex-col gap-8 w-full" action={handleSubmit}>
          <div className="flex flex-col gap-4">
            <FormField type='button' fieldData={{type: 'submit', id: 'btConfirmCancel', className: 'danger', value:'Confirm Cancellation'}} />
          </div>
        </form>
      </section>
    </main>
  );
}
