'use client';

// react
import {useEffect, useState} from 'react';

// next
import {useSearchParams} from 'next/navigation';

type User = {
  id: string;
  name: string;
};

export default function DeleteUserClient() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const deleteUser = async () => {
      // set error - missing GET param "id"
      if (!id) {
        setError('Missing User ID.');
        return;
      }

      try {
        const res = await fetch(`/api/deleteUser?id=${id}`);

        // error - api
        if (!res.ok) {
          throw new Error('API error: ${res.status}');
        }

        // set user - success
        const data = await res.json();
        setUser(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          // set error
          setError(err.message);
        } else {
          // set error - unknown
          setError('An unknown error occurred.');
        }
      }
    };

    deleteUser();
  }, [id]);

  if (error) {
    return (
      <p>Error: {error}</p>
    );
  }

  if (!user) {
    return (
      <p>Deleting user...</p>
    );
  }

  return (
    <p>{user.name} deleted!</p>
  );
}
