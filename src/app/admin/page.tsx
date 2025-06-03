// metadata
export const metadata = {
  title: 'Admin Login',
};

// react
import React from 'react';

// nextjs
import Image from 'next/image';
import Link from 'next/link';

export default async function MainPage() {
  return (
    <main role="main">
      <h1>Placeholder for Admin Login Page</h1>
      <section>
        <Image src="/assets/i/wireframe/admin-login.png" width="290" height="380" alt="wireframe" />
      </section>
      <section>
        <h2>Pseudocode</h2>
        <p>[User ID Form Field]<br/>
        [Password Form Field]</p>
        <p>[<Link href="/admin/auth">Login Button</Link>]</p>
      </section>
    </main>
  );
}
