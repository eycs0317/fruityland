// metadata
export const metadata = {
  title: 'Onsite Support [Dashboard]',
};

// react
import React from 'react';

// nextjs
import Image from 'next/image';
import Link from 'next/link';

export default async function MainPage() {
  return (
    <main role="main">
      <h1>Placeholder for Onsite Support Dashboard Page</h1>
      <section>
        <Image src="/assets/i/wireframe/onsite-dashboard.png" width="290" height="380" alt="wireframe" />
      </section>
      <section>
        <h2>Pseudocode</h2>
        <p>[<Link href="/admin/auth/onsite/search">Coupon Code Search Button</Link>]<br/>
        [<Link href="/admin/auth/onsite/reservation">List Reservation Button</Link>]</p>
      </section>
    </main>
  );
}
