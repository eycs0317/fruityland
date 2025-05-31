// metadata
export const metadata = {
  title: 'Delete User',
};

interface Props {
  searchParams: Promise<{ id: string }>;
}

// utils
import {deleteUser} from '@/utils/user';

export default async function MainPage(props: Props) {
  const dataGET = await props.searchParams;
  const user = await deleteUser(dataGET.id);

  return (
    <main role="main">
      <h1>User Deleted</h1>
      <p>{user.name} deleted!</p>
    </main>
  );
}

