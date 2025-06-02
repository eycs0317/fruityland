'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

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
      if (!id) {
        setError('No user ID provided');
        return;
      }

      try {
        const res = await fetch(`/api/deleteUser?id=${id}`);
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`API error: ${res.status} - ${text}`);
        }
        const data = await res.json();
        setUser(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error('Error:', err.message);
          setError(err.message);
        } else {
          console.error('Unknown error:', err);
          setError('An unknown error occurred');
        }
      }
    };

    deleteUser();
  }, [id]);

  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (!user) return <p>Deleting user...</p>;

  return <p>{user.name} deleted!</p>;
}
