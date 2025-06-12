// metadata
export const metadata = {
  title: 'EFX Portal [Dashboard]',
};

// react
import React from 'react';

// nextjs
import {redirect} from 'next/navigation';

// ui
import FormField from '@/ui/foundations/formField';
import Heading from '@/ui/foundations/heading';
import AdminHeader from '@/ui/patterns/adminHeader';

// utils
import {protectPage} from '@/utils/protectPage';

export default async function MainPage() {
  const auth = await protectPage('efxAdmin');
  if (auth != null) {
    redirect(auth);
  }

  async function handleSubmit(formData: FormData) {
    'use server'
    const data = Object.fromEntries(formData.entries());

    if (data.btGenerateCalendar) {
      const response = await fetch(process.env.URL + '/api/efx/generateCalendar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.status == 200) {
        redirect(result.redirect);
      }
    } else if (data.btGenerateCouponCode) {
      const response = await fetch(process.env.URL + '/api/efx/generateCouponCode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.status == 200) {
        redirect(result.redirect);
      }
    }
  }
  return (
    <main role="main" className="grid justify-self-center justify-items-center w-full md:w-120 p-4">
      <AdminHeader />
      <section className="w-full p-8">
        <Heading level={1} content="EFX Dashboard" className="text-4xl pb-8" />
      </section>
      <section className="w-full p-8">
        <form className="flex flex-col gap-8 w-full" action={handleSubmit}>
          <div className="flex flex-col gap-4">
            <FormField type='button' fieldData={{type: 'submit', id: 'btGenerateCalendar', className: 'secondary', value:'Generate Calendar'}} />
            <FormField type='button' fieldData={{type: 'submit', id: 'btGenerateCouponCode', className: 'secondary', value:'Generate Coupon Code'}} />
          </div>
        </form>
      </section>
    </main>
  );
}
