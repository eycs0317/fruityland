// metadata
export const metadata = {
  title: 'Admin Authorization',
};

// react
import React from 'react';

// nextjs
import Link from 'next/link';

export default async function MainPage() {
  return (
    <main role="main">
      <h1>Decision flow for Admin Login</h1>
      <section>
        <h2>Admin Flow</h2>
        <p>If login credential is Customer support, then go to <Link href="/admin/auth/support">Customer Support</Link>.  Otherwise, if login credential is Onsite Support, then go to <Link href="/admin/auth/onsite">Onsite Support</Link>.</p>
      </section>
    </main>
  );
}
