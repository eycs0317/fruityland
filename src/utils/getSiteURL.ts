// nextjs
import {NextRequest} from 'next/server';

export function getSiteURL(req: NextRequest) {
  const host = req.headers.get('host');
  const protocol = req.headers.get('x-forwarded-proto') || 'https';
  const siteURL = protocol + '://' + host;

  return siteURL;
}
