export const runtime = 'nodejs';

// metadata
export const metadata = {
  title: 'EFX Portal [Confirmation]',
};

// react
import React, {Suspense} from 'react';

// ui
import Heading from '@/ui/foundations/heading';

import Type from './confirmationClient';

export default async function MainPage() {
  return (
    <main role="main" className="grid justify-self-center justify-items-center w-full md:w-120 p-4">
      <section className="w-full p-8">
        <Heading level={1} content="Confirmation" className="text-4xl pb-8" />
      </section>
      <Suspense fallback={<div>Loading...</div>}>
        <Type />
      </Suspense>
    </main>
  );
}
