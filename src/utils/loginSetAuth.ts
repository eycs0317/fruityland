// lib
import {getSession} from '@/lib/session';

export async function loginSetAuth(userId: string, password: string, btLogin: string, defaultURL: string) {
  if (userId === 'customer' && password === process.env.CUSTOMER_ADMIN_PASSWORD && btLogin) {
    const session = await getSession();
    session.auth = true;
    session.authType = 'customerAdmin';
    
    await session.save();
    return '/admin/support';
  } else if (userId === 'onsite' && password === process.env.ONSITE_ADMIN_PASSWORD && btLogin) {
    const session = await getSession();
    session.auth = true;
    session.authType = 'onsiteAdmin';
    
    await session.save();
    return '/admin/onsite';
  } else if (userId === 'efxadmin' && password === process.env.EFX_ADMIN_PASSWORD && btLogin) {
    const session = await getSession();
    session.auth = true;
    session.authType = 'efxAdmin';
    
    await session.save();
    return '/efx/dashboard';
  } else {
    return defaultURL;
  }
}
