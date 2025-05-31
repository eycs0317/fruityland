// styles
// import '@/app/globals.css';

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

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
