// metadata
export const metadata = {
  title: 'Admin Login',
};

// react
import React from 'react';

// nextjs
import Link from 'next/link';
import Image from 'next/image';

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
      <section className="w-full p-8 text-center">
        <Heading level={1} content="Admin 登入" className="text-4xl text-neutral-000" />
      </section>
      <section className="w-full p-8 pt-0">
        <Message messageCode={message ?? ''} />
        <form className="flex flex-col gap-8 w-full" action="/api/admin/auth" method="post">
          <div className="flex flex-col gap-4">
            <FormField type="input" fieldData={{type: 'text', id: 'userId', label: '用戶', wrapperClassName: 'w-full', isRequired:true}} />
            <FormField type="input" fieldData={{type: 'password', id: 'password', label: '密碼', wrapperClassName: 'w-full', isRequired:true}} />
          </div>
          <div className="flex flex-col gap-4">
            <FormField type='button' fieldData={{type: 'submit', id: 'btLogin', className: 'primary', value:'登入'}} />
          </div>
        </form>
      </section>
      <footer className="grid justify-items-center relative w-full pt-4">
        <Image src="/assets/i/brand/logo-cy-bw.png" alt="青衣城" width="100" height="100" />
      </footer>
    </main>
  );
}
