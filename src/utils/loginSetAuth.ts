// lib
import {getSession} from '@/lib/session';

export async function loginSetAuth(userId: string, password: string, btLogin: string, defaultURL: string) {
  if (userId === 'customer' && password === 'cccccccc' && btLogin) {
    const session = await getSession();
    session.auth = true;
    session.authType = 'customerAdmin';
    
    await session.save();
    return '/admin/support';
  } else if (userId === 'onsite' && password === 'oooooooo' && btLogin) {
    const session = await getSession();
    session.auth = true;
    session.authType = 'onsiteAdmin';
    
    await session.save();
    return '/admin/onsite';
  } else if (userId === 'efxadmin' && password === '!@#$%^&*()' && btLogin) {
    const session = await getSession();
    session.auth = true;
    session.authType = 'efxAdmin';
    
    await session.save();
    return '/efx/dashboard';
  } else {
    return defaultURL;
  }
}
