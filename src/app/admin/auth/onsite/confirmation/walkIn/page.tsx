// metadata
export const metadata = {
  title: 'Onsite Support [Walk-in Confirmation]',
};

// react
import React from 'react';

// nextjs
import Image from 'next/image';
import Link from 'next/link';

export default async function MainPage() {
  return (
    <main role="main">
      <h1>Placeholder for Onsite Support Walk-in Confirmation Page</h1>
      <section>
        <Image src="/assets/i/wireframe/onsite-confirmation-walkin.png" width="290" height="380" alt="wireframe" />
      </section>
      <section>
        <h2>Pseudocode</h2>
        <p>[<Link href="/admin/auth/onsite">Back to Dashboard</Link>]</p>
        <p>[Heading]</p>
        <p>[Content]</p>
        <p>[Coupon Code]</p>
        <p>[Participant Count]</p>
        <p>[<Link href="/admin/auth/onsite/reservation/list">Check In Button</Link>]</p>
      </section>
    </main>
  );
}
