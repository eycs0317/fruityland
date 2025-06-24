// metadata
export const metadata = {
  title: 'Cancel RSVP Confirmation',
};

// react
import React from 'react';

// nextjs
import {redirect} from 'next/navigation';
import Image from 'next/image';

// ui
import FormField from '@/ui/foundations/formField';
import Heading from '@/ui/foundations/heading';

// utils
import {l10n} from '@/utils/l10n';

// session
import {getSession} from '@/lib/session';

export default async function MainPage() {
  const session = await getSession();
  const lang = session?.lang ?? 'zh-HK';

  async function handleSubmit(formData: FormData) {
    'use server'
    const data = Object.fromEntries(formData.entries());

    if (data.btHome) {
      redirect('/');
    }
  }
  return (
    <main role="main" className="grid justify-self-center justify-items-center w-full md:w-120 p-4">
      <section className="relative w-full p-8">
        <Heading level={1} content="Your reservation is cancelled for FruityLand." className="text-2xl pb-8" />
      </section>
      <section className="w-full p-8">
        <form className="flex flex-col gap-8 w-full" action={handleSubmit}>
          <div className="flex flex-col gap-4">
            <FormField type='button' fieldData={{type: 'submit', id: 'btHome', className: 'secondary', value:'Home'}} />
          </div>
        </form>
      </section>
      <footer className="grid justify-items-center relative w-full pt-4">
        <Image src="/assets/i/brand/logo-cy-bw.png" alt={l10n('layout', 'mall', lang)} width="100" height="100" />
      </footer>
    </main>
  );
}
