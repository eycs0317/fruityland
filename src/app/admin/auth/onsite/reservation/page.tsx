// metadata
export const metadata = {
  title: 'Onsite Support [Reservation Search]',
};

// react
import React from 'react';

// nextjs
import Image from 'next/image';
import Link from 'next/link';

export default async function MainPage() {
  return (
    <main role="main">
      <h1>Placeholder for Onsite Support Reservation Search Page</h1>
      <section>
        <Image src="/assets/i/wireframe/onsite-reservation-search.png" width="290" height="380" alt="wireframe" />
      </section>
      <section>
        <h2>Pseudocode</h2>
        <p>[<Link href="/admin/auth/onsite">Back to Dashboard</Link>]</p>
        <p>[Date Form Field]</p>
        <p>[<Link href="/admin/auth/onsite/reservation/list">Search Button</Link>]</p>
      </section>
    </main>
  );
}
