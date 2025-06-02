// metadata
export const metadata = {
  title: 'Create User',
};

import CreateUserClient from './createUserClient';

export default function MainPage() {
  return (
    <main role="main">
      <h1>User Created</h1>
      <CreateUserClient />
    </main>
  );
}
