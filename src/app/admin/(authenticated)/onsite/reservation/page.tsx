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
import Timezone from '@/ui/patterns/userTimezone';

// Calendar
import Calendar from '@/components/Calendar';

// utils
import {protectPage} from '@/utils/protectPage';
import {getStartEndUTC} from '@/utils/v2Function/getStartEndUTC';

export default async function MainPage() {
  const auth = await protectPage('onsiteAdmin');
  if (auth != null) {
    redirect(auth);
  }

  const startEndUTC = await getStartEndUTC('00000000');
  if (!startEndUTC.startDate || !startEndUTC.endDate) {
    redirect('/admin/onsite?message=E0005');
  }

  async function handleSubmit(formData: FormData) {
    'use server'
    const data = Object.fromEntries(formData.entries());
    // console.log('---------data===>', data.selectedDate);
    if(data.btSearch) {
      redirect('/admin/onsite/reservation/list?date=' + data.selectedDate + '&timezone=' + data.timezone);
    }

  }
  return (
    <main role="main" className="grid justify-self-center justify-items-center w-full md:w-120 p-4">
      <AdminHeader />
      <section className="w-full p-8">
        <Heading level={1} content="活動日期搜尋" className="text-4xl text-neutral-000" />
      </section>
      <section className="w-full px-8 pb-8">
        <form className="flex flex-col gap-8 w-full" action={handleSubmit}>
          <Calendar initialDate="2025-01-01" allowedMinDate={startEndUTC?.startDate?.toISOString()} allowedMaxDate={startEndUTC?.endDate?.toISOString()}/>
          <Timezone />
          <div className="flex flex-col gap-4">
            <FormField type='button' fieldData={{type: 'submit', id: 'btSearch', className: 'primary', value:'搜尋'}} />
          </div>
        </form>
      </section>
    </main>
  );
}
