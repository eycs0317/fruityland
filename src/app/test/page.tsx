// metadata
export const metadata = {
  title: 'Create User',
};

import React from 'react';
import Text from '@/components/Test';

export default async function MainPage() {
  return (
    <main role="main">
      <ul>
        <li><a href="/test/createUser">Create User</a></li>
        <li><a href="/test/listUser">List User</a></li>
      </ul>
      <div>
        <Text />
      </div>
    </main>
  );
}

