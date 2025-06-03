// metadata
export const metadata = {
  title: 'Cancel RSVP Confirmation',
};

// react
import React from 'react';

// nextjs
import Image from 'next/image';
import Link from 'next/link';

export default async function MainPage() {
  return (
    <main role="main">
      <h1>Placeholder for User Cancel RSVP Confirmation Page</h1>
      <section>
        <Image src="/assets/i/wireframe/user-rsvp-cancel-confirmation.png" width="290" height="380" alt="wireframe" />
      </section>
      <section>
        <h2>Pseudocode</h2>
        <p>[Content]</p>
        <p>[<Link href="/">Home Button</Link>]</p>
      </section>
    </main>
  );
}
