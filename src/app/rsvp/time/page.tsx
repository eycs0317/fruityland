// metadata
export const metadata = {
  title: 'RSVP [Time]',
};

// react
import React from 'react';

// nextjs
import Image from 'next/image';
import {redirect} from 'next/navigation';

// ui
import FormField from '@/ui/foundations/formField';
import Heading from '@/ui/foundations/heading';

export default async function MainPage({ searchParams }: { searchParams: { date?: string } }) {

  const selectedDateParam = await searchParams.date || '';
  console.log('selectedDate Date:', selectedDateParam);
  let displayDate = 'Date not selected';
  if (selectedDateParam) {
    const [year, month, day] = selectedDateParam.split('-').map(Number);
    const dateObj = new Date(year, month - 1, day);

    displayDate = dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
      // No need for 'timeZone' here if the dateObj was constructed to be local time
    });
  }
  console.log('displayDate Date:', displayDate);
  async function handleSubmit(formData: FormData) {
    'use server'
    const data = Object.fromEntries(formData.entries());

    if (data.rsvpTime && data.btSchedule) {
      redirect('/rsvp/confirmation');
    } else if (data.btBack) {
      redirect('/rsvp/date');
    }
  }
  return (
    <main role="main" className="grid justify-self-center justify-items-center w-full md:w-120 p-4">
      <section className="w-full p-8 text-center">
        <Heading level={1} content="RSVP Step 2" className="text-4xl pb-8" />
      </section>
      <section className="relative w-1/3 pb-8 px-8">
        <Image src="/assets/i/icons/calendar.svg" alt="Calendar" layout="responsive" width="100" height="100" />
      </section>
      <section className="w-full p-8">
        <dl className="flex flex-row pb-4">
          <dt className="font-bold flex-1">Date:</dt>
          <dd className="flex-5">{displayDate}</dd>
        </dl>
        <form className="flex flex-col gap-8 w-full" action={handleSubmit}>
          <div className="flex flex-row gap-4">
            <div className="flex flex-col flex-1 gap-4">
              <FormField type='radio' fieldData={{
                groupLabel: 'Select a time',
                groupName: 'rsvpTime',
                groupClassName: 'flex flex-col',
                radios: [{
                  label: '11:00am',
                  value: '11',
                  id: 'id_11',
                }, {
                  label: '12:00pm',
                  value: '12',
                  id: 'id_12',
                }, {
                  label: '1:00pm',
                  value: '13',
                  id: 'id_13',
                  isDisabled: true,
                }, {
                  label: '2:00pm',
                  value: '14',
                  id: 'id_14',
                }, {
                  label: '3:00pm',
                  value: '15',
                  id: 'id_15',
                }, {
                  label: '4:00pm',
                  value: '16',
                  id: 'id_16',
                  isDisabled: true,
                }, {
                  label: '5:00pm',
                  value: '17',
                  id: 'id_17',
                }, {
                  label: '6:00pm',
                  value: '18',
                  id: 'id_18',
                }]
              }} />
            </div>
            <div className="flex flex-col pt-8 flex-1 text-right">
              <div className="flex flex-col">2 slots</div>
              <div className="flex flex-col">2 slots</div>
              <div className="flex flex-col text-neutral-500">Full</div>
              <div className="flex flex-col">4 slots</div>
              <div className="flex flex-col">2 slots</div>
              <div className="flex flex-col text-neutral-500">Full</div>
              <div className="flex flex-col">2 slots</div>
              <div className="flex flex-col">2 slots</div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <FormField type='button' fieldData={{type: 'submit', id: 'btSchedule', className: 'primary', value:'Schedule'}} />
            <FormField type='button' fieldData={{type: 'submit', id: 'btBack', className: 'tertiary', value:'Back'}} />
          </div>
        </form>
      </section>
    </main>
  );
}
