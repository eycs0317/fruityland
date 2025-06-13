import {getIronSession, SessionOptions} from 'iron-session';
import {cookies} from 'next/headers';

export interface CouponSessionData {
  couponCode: string;
  group?: number;
  isWeekend?: boolean;
  participantCount: number;
  scheduleUID: string | null;
  isRSVP: boolean;
  status: number;
  couponSchedule: string | null;
}
export interface SessionData {
  auth: boolean;
  authType: string;
  lang?: string;
  coupon?: CouponSessionData;
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
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, sessionOptions);
}
