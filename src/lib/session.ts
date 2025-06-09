import {getIronSession, SessionOptions} from 'iron-session';
import {cookies} from 'next/headers';

export interface SessionData {
  auth: boolean;
  authType: string;
}

export const sessionOptions: SessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: 'myapp_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  },
};

export async function getSession() {
  console.log('EDDIE inside getSession()');
  const cookieStore = await cookies();
  console.log('EDDIE after await cookies().  OUTPUT ' + cookieStore);
  return getIronSession<SessionData>(cookieStore, sessionOptions);
}
