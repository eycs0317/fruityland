// styles
import '@/app/globals.css';

// nextjs
import type {Metadata} from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const session = await getSession();
  const lang = session.lang || 'zh-HK';

  const localizedTitles: Record<string, string> = {
    'en-US': 'Summer Go Fresh!',
    'zh-CN': '夏日 Go Fresh 弹跳乐园',
    'zh-HK': '夏日 Go Fresh 彈跳樂園',
  };

  return {
    title: {
      template: '%s | ' + (localizedTitles[lang] ?? '夏日 Go Fresh 彈跳樂園'),
      default: localizedTitles[lang] ?? '夏日 Go Fresh 彈跳樂園',
    },
    description: '夏日 Go Fresh 彈跳樂園',
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
}

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
