// metadata
export const metadata = {
  title: 'Admin Login',
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

    if (data.userId != '' && data.password != '' && data.btLogin) {
      redirect('/admin/auth');
    }
  }
  return (
    <main role="main" className="grid justify-self-center justify-items-center w-full md:w-120 p-4">
      <section className="w-full p-8 text-center">
        <Heading level={1} content="Admin Login" className="text-4xl pb-8" />
      </section>
      <section className="w-full p-8">
        <form className="flex flex-col gap-8 w-full" action={handleSubmit}>
          <div className="flex flex-col gap-4">
            <FormField type="input" fieldData={{type: 'text', id: 'userId', label: 'User ID', wrapperClassName: 'w-full', isRequired:true}} />
            <FormField type="input" fieldData={{type: 'password', id: 'password', label: 'Password', wrapperClassName: 'w-full', isRequired:true}} />
          </div>
          <div className="flex flex-col gap-4">
            <FormField type='button' fieldData={{type: 'submit', id: 'btLogin', className: 'primary', value:'Login'}} />
          </div>
        </form>
      </section>
    </main>
  );
}
