// metadata
export const metadata = {
  title: 'Onsite Support [Dashboard]',
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
  const auth = await protectPage('onsiteAdmin');
  if (auth != null) {
    redirect(auth);
  }

  async function handleSubmit(formData: FormData) {
    'use server'
    const data = Object.fromEntries(formData.entries());

    if (data.btSearch) {
      redirect('/admin/onsite/search');
    } else if (data.btList) {
      redirect('/admin/onsite/reservation');
    }
  }
  return (
    <main role="main" className="grid justify-self-center justify-items-center w-full md:w-120 p-4">
      <AdminHeader />
      <section className="w-full p-8">
        <Heading level={1} content="Support Dashboard" className="text-4xl pb-8" />
      </section>
      <section className="w-full p-8">
        <form className="flex flex-col gap-8 w-full" action={handleSubmit}>
          <div className="flex flex-col gap-4">
            <FormField type='button' fieldData={{type: 'submit', id: 'btSearch', className: 'secondary', value:'Coupon Code Search'}} />
            <FormField type='button' fieldData={{type: 'submit', id: 'btList', className: 'secondary', value:'List Reservations'}} />
          </div>
        </form>
      </section>
    </main>
  );
}
