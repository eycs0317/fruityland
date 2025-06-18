import {getIronSession, SessionOptions} from 'iron-session';
import {cookies} from 'next/headers';

export interface CouponSessionData {
  couponCode: string;
  group?: number;
  isWeekend?: boolean;
  participantCount: number;
}
export interface ScheduleSessionData {
  uid: string;
  sessionDateTime: Date;
  group?: number;
  isWeekend?: boolean;
  isBooked?: boolean;
}
export interface LegalSessionData {
  terms: boolean;
  waiver: boolean;
}
export interface SessionData {
  auth: boolean;
  authType: string;
  lang?: string;
  coupon?: CouponSessionData;
  schedule?: ScheduleSessionData;
  legal?: LegalSessionData;
  rsvpDate?: string;
  timezone?: string;
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
