
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

// session
import { getSession } from '@/lib/session';

//helper functions
// import searchByCouponGroup from '@/utils/searchByCouponGroup';

//server side functions
import { getMinMaxScheduleDatesByGroup } from '@/lib/getMinMaxScheduleDatesByGroup';


export default async function MainPage() {
  const session = await getSession();
  // const couponData = session.coupon;
  // console.log('Session Coupon Data:----->', couponData);
  // Session Coupon Data:-----> {
  //   couponCode: '29506dd0109b',
  //   group: 1,
  //   isWeekend: false,
  //   participantCount: 2,
  //   scheduleUID: null,
  //   isRSVP: false,
  //   status: 0,
  //   couponSchedule: null
  // }
  const couponGroup = session.coupon?.group ?? 0;
  const couponCode = session.coupon?.couponCode;
  const {startDate, endDate} = await getMinMaxScheduleDatesByGroup(session.coupon?.group ?? 0)
  //confirm startDate an endDate are UTC
console.log('-----startDate:-----', startDate);
console.log('-----endDate:-----', endDate);
  async function handleSubmit(formData: FormData) {
    'use server'

    const data = Object.fromEntries(formData.entries());
console.log('----data.selectedDate:----', data.selectedDate);
    const selectedDate = data.selectedDate ; //string
    console.log('----data:----', data);
    console.log('------>Selected Date:indate/page-----------',  selectedDate);
    if (data.btNext) {
      if (selectedDate) {
        redirect(`/rsvp/time?date=${selectedDate}&group=${couponGroup}&couponCode=${couponCode}`);
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

        <Calendar allowedMinDate={startDate ?? undefined} allowedMaxDate={endDate ?? undefined}/>
          <div className="flex flex-col gap-4">
            <FormField type='button' fieldData={{type: 'submit', id: 'btNext', className: 'secondary', value:'Next'}} />
            <FormField type='button' fieldData={{type: 'submit', id: 'btBack', className: 'tertiary', value:'Back'}} />
          </div>
        </form>
      </section>
    </main>
  );
}
