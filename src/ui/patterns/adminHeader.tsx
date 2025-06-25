// nextjs
import Link from 'next/link';

// utils
import {checkAuth} from '@/utils/checkAuth';

export default async function FormButton() {
  const customerAuth = await checkAuth('customerAdmin');
  const onsiteAuth = await checkAuth('onsiteAdmin');
  const efxUserAuth = await checkAuth('efxUser');
  const efxAuth = await checkAuth('efxAdmin');
  
  if (customerAuth) {
    return (
      <nav className="flex flex-row w-full px-8 py-2 bg-warning-300 rounded-2xl">
        <div className="flex-2">
          <Link href="/admin/support">Customer Support Dashboard</Link>
        </div>
        <div className="flex-1 text-right">
          <Link href="/logout" prefetch={false}>登出</Link>
        </div>
      </nav>
    );
  } else if (onsiteAuth) {
    return (
      <nav className="flex flex-row w-full px-8 py-2 bg-warning-300 rounded-2xl">
        <div className="flex-2">
          <Link href="/admin/onsite">Onsite Support Dashboard</Link>
        </div>
        <div className="flex-1 text-right">
          <Link href="/logout" prefetch={false}>登出</Link>
        </div>
      </nav>
    );
  } else if (efxUserAuth) {
    return (
      <nav className="flex flex-row w-full px-8 py-2 bg-warning-300 rounded-2xl">
        <div className="flex-2">
          <Link href="/efx/dashboard">EFX Dashboard</Link>
        </div>
        <div className="flex-1 text-right">
          <Link href="/logout" prefetch={false}>Logout</Link>
        </div>
      </nav>
    );
  } else if (efxAuth) {
    return (
      <nav className="flex flex-row w-full px-8 py-2 bg-warning-300 rounded-2xl">
        <div className="flex-2">
          <Link href="/efx/dashboard">EFX Dashboard</Link>
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
