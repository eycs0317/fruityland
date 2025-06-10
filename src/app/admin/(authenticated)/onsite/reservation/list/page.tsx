// metadata
export const metadata = {
  title: 'Onsite Support [Reservation List]',
};

// react
import React from 'react';

// nextjs
import {redirect} from 'next/navigation';

// ui
import Heading from '@/ui/foundations/heading';
import AdminHeader from '@/ui/patterns/adminHeader';

// lib
import {getSession} from '@/lib/session';

export default async function MainPage() {
  const session = await getSession();
  if (!session.auth || session.authType != 'onsiteAdmin') {
    redirect('/admin');
  }

  return (
    <main role="main" className="grid justify-self-center justify-items-center w-full md:w-120 p-4">
      <AdminHeader />
      <section className="w-full p-8">
        <Heading level={1} content="Reservation List" className="text-4xl pb-8" />
      </section>
      <section className="w-full p-8">
        <table className="w-full">
          <thead>
            <tr>
              <th className="p-2 text-left">Time</th>
              <th className="p-2 text-left">Coupon Code</th>
              <th className="p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2">11:00am</td>
              <td className="p-2">1F4A-671B-43AE</td>
              <td className="p-2">Confirmed</td>
            </tr>
            <tr>
              <td className="p-2">11:00am</td>
              <td className="p-2">1F4A-671B-44AE</td>
              <td className="p-2">Confirmed</td>
            </tr>
            <tr>
              <td className="p-2">12:00pm</td>
              <td className="p-2">1F4A-671B-45AE</td>
              <td className="p-2">Confirmed</td>
            </tr>
            <tr>
              <td className="p-2">12:00pm</td>
              <td className="p-2">1F4A-671B-46AE</td>
              <td className="p-2">Confirmed</td>
            </tr>
            <tr>
              <td className="p-2">1:00pm</td>
              <td className="p-2">1F4A-671B-47AE</td>
              <td className="p-2">Confirmed</td>
            </tr>
            <tr>
              <td className="p-2">1:00pm</td>
              <td className="p-2">1F4A-671B-48AE</td>
              <td className="p-2">Confirmed</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  );
}
