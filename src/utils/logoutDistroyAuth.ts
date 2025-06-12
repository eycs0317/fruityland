// lib
import {getSession} from '@/lib/session';

export async function logoutDistroyAuth() {
  const session = await getSession();

  switch (session.authType) {
    case 'efxAdmin':
      await session.destroy();
      return '/efx';
    default:
      await session.destroy();
      return '/admin';
  }
}
