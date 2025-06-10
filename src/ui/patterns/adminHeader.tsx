// nextjs
import Link from 'next/link';

// lib
import {getSession} from '@/lib/session';

export default async function FormButton() {
  const session = await getSession();
  if (session.auth && session.authType == 'customerAdmin') {
    return (
      <nav className="flex flex-row w-full px-8">
        <div className="flex-2">
          <Link href="/admin/support">Customer Supoort Dashboard</Link>
        </div>
        <div className="flex-1 text-right">
          <Link href="/logout" prefetch={false}>Logout</Link>
        </div>
      </nav>
    );
  } else if (session.auth && session.authType == 'onsiteAdmin') {
    return (
      <nav className="flex flex-row w-full px-8">
        <div className="flex-2">
          <Link href="/admin/onsite">Onsite Support Dashboard</Link>
        </div>
        <div className="flex-1 text-right">
          <Link href="/logout" prefetch={false}>Logout</Link>
        </div>
      </nav>
    );
  } else {
    return null;
  }
}
