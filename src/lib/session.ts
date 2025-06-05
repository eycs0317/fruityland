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
  },
};

export async function getSession() {
  const cookieStore = await cookies(); // Await is required in Node.js runtime
  return getIronSession<SessionData>(cookieStore, sessionOptions);
}
