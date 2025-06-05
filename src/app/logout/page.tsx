// metadata
export const metadata = {
  title: 'Logout',
};

// nextjs
import {redirect} from 'next/navigation';

export default async function MainPage() {
  redirect('/api/logout');
}
