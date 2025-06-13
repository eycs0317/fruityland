// styles
import '@/app/globals.css';

// metadata
export const metadata = {
  title: {
    template: '%s | FruityLand',
    default: 'FruityLand',
  },
  description: 'FruityLand Description',
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/assets/i/brand/favicon_light.ico',
        href: '/assets/i/brand/favicon_light.svg',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/assets/i/brand/favicon_dark.ico',
        href: '/assets/i/brand/favicon_dark.svg',
      },
    ],
  },
};

// lib
import {getSession} from '@/lib/session';

export default async function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  const session = await getSession();
  if (!session.lang) {
    session.lang = 'zh-HK';
    await session.save();
  }
  return (
    <html lang={session.lang}>
      <body>
        {children}
      </body>
    </html>
  );
}
