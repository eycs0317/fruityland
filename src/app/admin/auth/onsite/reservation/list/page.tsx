// metadata
export const metadata = {
  title: 'Onsite Support [Reservation List]',
};

// react
import React from 'react';

// nextjs
import Image from 'next/image';
import Link from 'next/link';

export default async function MainPage() {
  return (
    <main role="main">
      <h1>Placeholder for Onsite Support Reservation List Page</h1>
      <section>
        <Image src="/assets/i/wireframe/onsite-reservation-list.png" width="290" height="380" alt="wireframe" />
      </section>
      <section>
        <h2>Pseudocode</h2>
        <p>[<Link href="/admin/auth/onsite">Back to Dashboard</Link>]</p>
        <p>[Date]</p>
        <p>[Table of Time, Coupon Code, Status]</p>
      </section>
    </main>
  );
}
