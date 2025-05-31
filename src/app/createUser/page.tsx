// metadata
export const metadata = {
  title: 'Create User',
};

// utils
import {createUser} from '@/utils/user';

export default async function MainPage() {

  const user = await createUser();

  return (
    <main role="main">
      <h1>User Created</h1>
      <p>{user.name}</p>
    </main>
  );
}

