// metadata
export const metadata = {
  title: 'RSVP [Time]',
};

// react
import React from 'react';

// nextjs
import Image from 'next/image';
import Link from 'next/link';

export default async function MainPage() {
  return (
    <main role="main">
      <h1>Placeholder for User RSVP (Time) Page</h1>
      <section>
        <Image src="/assets/i/wireframe/user-rsvp-time.png" width="290" height="380" alt="wireframe" />
      </section>
      <section>
        <h2>Pseudocode</h2>
        <p>[Date]</p>
        <p>[Radio] [Time Label] [Available Slots]</p>
        <p>[<Link href="/rsvp/confirmation">Schedule Button</Link>]<br/>
        [<Link href="/rsvp">Back Button</Link>]</p>
      </section>
    </main>
  );
}
