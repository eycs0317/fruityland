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
import Message from '@/ui/patterns/message';

// utils
import {protectPage} from '@/utils/protectPage';

interface PageProps {
  searchParams?: Promise<{
    message?: string;
  }>;
}

export default async function MainPage({searchParams}: PageProps) {
  const resolvedSearchParams = await searchParams;
  const message = resolvedSearchParams?.message;

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
        <Heading level={1} content="Onsite Dashboard" className="text-4xl text-neutral-000" />
      </section>
      <section className="w-full p-8 pt-0">
        <Message messageCode={message ?? ''} />
        <form className="flex flex-col gap-8 w-full" action={handleSubmit}>
          <div className="flex flex-col gap-4">
            <FormField type='button' fieldData={{type: 'submit', id: 'btSearch', className: 'tertiary', value:'客戶報到'}} />
            <FormField type='button' fieldData={{type: 'submit', id: 'btList', className: 'tertiary', value:'查看預訂資料'}} />
          </div>
        </form>
      </section>
    </main>
  );
}
