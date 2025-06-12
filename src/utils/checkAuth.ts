// lib
import {getSession} from '@/lib/session';

export async function checkAuth(authType: string) {
  const session = await getSession();
  if (session.auth && session.authType == authType) {
    return true;
  } else {
    return false;
  }
}
