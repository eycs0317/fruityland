
// metadata
export const metadata = {
  title: 'RSVP [Date]',
};

// react
import React from 'react';

// nextjs
import {redirect} from 'next/navigation';

// ui
import FormField from '@/ui/foundations/formField';
import Heading from '@/ui/foundations/heading';

// Calendar
import Calendar from '@/components/Calendar';
export default async function MainPage() {
  async function handleSubmit(formData: FormData) {
    'use server'

    const data = Object.fromEntries(formData.entries());

    const selectedDate = data.selectedDate as string;

    if (data.btNext) {
      if (selectedDate) {
        redirect(`/rsvp/time?date=${selectedDate}`);
      } else {
        redirect('/rsvp/time');
      }
    } else if (data.btBack) {
      redirect('/');
    }
  }
  return (
    <main role="main" className="grid justify-self-center justify-items-center w-full md:w-120 p-4">
      <section className="w-full p-8 text-center">
        <Heading level={1} content="RSVP Step 1" className="text-4xl pb-8" />
      </section>
      <section className="relative w-full pb-8 px-8">
      </section>
      <section className="w-full p-8">
        <form className="flex flex-col gap-8 w-full" action={handleSubmit}>
        <Calendar />
          <div className="flex flex-col gap-4">
            <FormField type='button' fieldData={{type: 'submit', id: 'btNext', className: 'secondary', value:'Next'}} />
            <FormField type='button' fieldData={{type: 'submit', id: 'btBack', className: 'tertiary', value:'Back'}} />
          </div>
        </form>
      </section>
    </main>
  );
}
