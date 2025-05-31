// metadata
export const metadata = {
  title: 'List User',
};

// utils
import {listUser} from '@/utils/user';

export default async function MainPage() {

  const users = await listUser();

  return (
    <main role="main">
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name} ({user.id}) (<a href={'/deleteUser?id=' + user.id}>Delete</a>)</li>
        ))}
      </ul>
    </main>
  );
}

