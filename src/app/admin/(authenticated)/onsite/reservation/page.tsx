// metadata
export const metadata = {
  title: 'Onsite Support [Reservation Search]',
};

// react
import React from 'react';

// nextjs
import {redirect} from 'next/navigation';

// ui
import FormField from '@/ui/foundations/formField';
import Heading from '@/ui/foundations/heading';
import AdminHeader from '@/ui/patterns/adminHeader';

// Calendar
import Calendar from '@/components/Calendar';

// lib
import {getSession} from '@/lib/session';
import {getEventMinMaxDate} from '@/lib/getEventMinMaxDate';

export default async function MainPage() {
  const session = await getSession();
  if (!session.auth || session.authType != 'onsiteAdmin') {
    redirect('/admin');
  }

  const {startDate, endDate} = await getEventMinMaxDate();

  return (
    <main role="main" className="grid justify-self-center justify-items-center w-full md:w-120 p-4">
      <AdminHeader />
      <section className="w-full p-8">
        <Heading level={1} content="Event Date Search" className="text-4xl" />
      </section>
      <section className="w-full px-8 pb-8">
        <form className="flex flex-col gap-8 w-full" action="/api/listConfirmationByDate" method="post">
          <Calendar allowedMinDate={startDate ?? undefined} allowedMaxDate={endDate ?? undefined}/>
          <div className="flex flex-col gap-4">
            <FormField type='button' fieldData={{type: 'submit', id: 'btSearch', className: 'primary', value:'Search'}} />
          </div>
        </form>
      </section>
    </main>
  );
}
