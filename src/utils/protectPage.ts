// lib
import {getSession} from '@/lib/session';

export async function protectPage(authType: string) {
  const session = await getSession();

  if (!session.auth || session.authType != authType) {
    switch(authType) {
      case 'efxUser':
      case 'efxAdmin':
        return '/efx';
      case 'customerAdmin':
      case 'onsiteAdmin':
        return '/admin';
      default:
        return '/';
    }
  }
  return null;
}
