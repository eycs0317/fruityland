'use client';

// react
import React from 'react';

// nextjs
import Link from 'next/link';

export default function ClientPage() {
  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>, lang:string) => {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/language?lang=${lang}`, {
      method: 'GET',
      credentials: 'include',
    });

    if (res.redirected) {
      window.location.href = res.url;
    }
  };

  return (
    <footer>
      <Link href="#" onClick={(e) => handleClick(e, 'en-US')} prefetch={false} className="px-2 border-r-1 border-neutral-600">ENG</Link>
      <Link href="#" onClick={(e) => handleClick(e, 'zh-HK')} prefetch={false} className="px-2">繁</Link>
    </footer>
  );
}
