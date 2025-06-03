// metadata
export const metadata = {
  title: 'RSVP [Date]',
};

// react
import React from 'react';

// nextjs
import Image from 'next/image';
import Link from 'next/link';

export default async function MainPage() {
  return (
    <main role="main">
      <h1>Placeholder for User RSVP (Date) Page</h1>
      <section>
        <Image src="/assets/i/wireframe/user-rsvp-date.png" width="290" height="380" alt="wireframe" />
      </section>
      <section>
        <h2>Pseudocode</h2>
        <p>[Calendar Picker]</p>
        <p>[<Link href="/rsvp/time">Next Button</Link>]<br/>
        [<Link href="/">Back Button</Link>]</p>
      </section>
    </main>
  );
}
