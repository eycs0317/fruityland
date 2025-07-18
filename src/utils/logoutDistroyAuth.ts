// lib
import {getSession} from '@/lib/session';

export async function logoutDistroyAuth() {
  const session = await getSession();

  let lang: string;

  if (session.lang) {
    // lang = session.lang;
    lang = 'zh-HK';
  } else {
    lang = 'zh-HK';
  }

  switch (session.authType) {
    case 'efxUser':
    case 'efxAdmin':
      await session.destroy();
      session.lang = lang;
      await session.save();
      return '/efx';
    default:
      await session.destroy();
      session.lang = lang;
      await session.save();
      return '/admin';
  }
}
