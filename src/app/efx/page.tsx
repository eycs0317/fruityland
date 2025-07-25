// metadata
export const metadata = {
  title: 'EFX Portal [Login]',
};

// react
import React from 'react';

// nextjs
import Link from 'next/link';

// ui
import FormField from '@/ui/foundations/formField';
import Heading from '@/ui/foundations/heading';
import Message from '@/ui/patterns/message';

interface PageProps {
  searchParams?: Promise<{
    message?: string;
  }>;
}

export default async function MainPage({searchParams}: PageProps) {
  const resolvedSearchParams = await searchParams;
  const message = resolvedSearchParams?.message;

  return (
    <main role="main" className="grid justify-self-center justify-items-center w-full md:w-120 p-4">
      <nav className="flex flex-row w-full px-8">
        <div className="flex-1">
          <Link href="/" className="headerLink">夏日 Go Fresh 彈跳樂園</Link>
        </div>
      </nav>
      <section className="w-full p-8 pb-0 text-center">
        <Heading level={1} content="EFX Portal Login" className="text-4xl pb-8 text-neutral-000" />
      </section>
      <section className="w-full p-8 pt-0">
        <Message messageCode={message ?? ''} />
        <form className="flex flex-col gap-8 w-full" action="/api/efx/auth" method="post">
          <div className="flex flex-col gap-4">
            <FormField type="input" fieldData={{type: 'text', id: 'userId', label: 'User ID', wrapperClassName: 'w-full', isRequired:true}} />
            <FormField type="input" fieldData={{type: 'password', id: 'password', label: 'Password', wrapperClassName: 'w-full', isRequired:true}} />
          </div>
          <div className="flex flex-col gap-4">
            <FormField type='button' fieldData={{type: 'submit', id: 'btLogin', className: 'primary', value:'Login to EFX Portal'}} />
          </div>
        </form>
      </section>
    </main>
  );
}
