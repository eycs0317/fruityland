import React from 'react';
import Text from '../components/Test';

export default async function MainPage() {
  return (
    <main role="main">
      <ul>
        <li><a href="/createUser">Create User</a></li>
        <li><a href="/listUser">List User</a></li>
      </ul>
      <div>
        <Text />
      </div>
    </main>
  );
}

