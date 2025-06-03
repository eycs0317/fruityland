// metadata
export const metadata = {
  title: 'RSVP Confirmation',
};

// react
import React from 'react';

// nextjs
import Image from 'next/image';
import Link from 'next/link';

export default async function MainPage() {
  return (
    <main role="main">
      <h1>Placeholder for User RSVP Confirmation Page</h1>
      <section>
        <Image src="/assets/i/wireframe/user-rsvp-confirmation.png" width="290" height="380" alt="wireframe" />
      </section>
      <section>
        <h2>Pseudocode</h2>
        <p>[Content]<br/>
        [Date]<br/>
        [Time]<br/>
        [Participant Count]</p>
        <p>[Coupon Code] [QR Code]</p>
        <p>[Content]</p>
        <p>[<a href="/rsvp">Modify Button</a>]<br/>
        [<Link href="/rsvp/cancel">Cancel RSVP Button</Link>]</p>
      </section>
    </main>
  );
}
