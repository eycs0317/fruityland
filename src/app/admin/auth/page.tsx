// metadata
export const metadata = {
  title: 'Admin Authorization',
};

// react
import React from 'react';

// nextjs
import Link from 'next/link';

// ui
import Heading from '@/ui/foundations/heading';

export default async function MainPage() {
  return (
    <main role="main" className="grid justify-self-center justify-items-center w-full md:w-120 p-4">
      <section className="w-full p-8 text-center">
        <Heading level={1} content="Decision flow for Admin Login" className="text-4xl pb-8" />
      </section>
      <section>
        <Heading level={2} content="Admin Flow" className="text-2xl pb-8" />
        <ul className="list-disc">
          <li>If login credential is Customer support, then go to <Link href="/admin/auth/support">Customer Support</Link>.</li>
          <li>Otherwise, if login credential is Onsite Support, then go to <Link href="/admin/auth/onsite">Onsite Support</Link>.</li>
        </ul>
      </section>
    </main>
  );
}
