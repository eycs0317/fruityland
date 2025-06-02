// metadata
export const metadata = {
  title: 'Delete User',
};

import { Suspense } from 'react';
import DeleteUserClient from './deleteUserClient';

export default function MainPage() {
  return (
    <main role="main">
      <h1>User Deleted</h1>
      <Suspense fallback={<p>Loading deletion...</p>}>
        <DeleteUserClient />
      </Suspense>
    </main>
  );
}
