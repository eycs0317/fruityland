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
  let lang = '';
  if (!session.lang) {
    lang = 'zh-HK';
  } else {
    lang = session.lang;
  }

  return (
    <html lang={lang}>
      <body>
        {children}
      </body>
    </html>
  );
}
