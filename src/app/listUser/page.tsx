// metadata
export const metadata = {
  title: 'List User',
};

import ListUserClient from './listUserClient';

export default function MainPage() {
  return (
    <main role="main">
      <h1>User List</h1>
      <ListUserClient />
    </main>
  );
}
