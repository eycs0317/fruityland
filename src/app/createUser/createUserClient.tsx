'use client';

// react
import {useEffect, useState} from 'react';

export default function CreateUserClient() {
  const [user, setUser] = useState<{ id: number; name: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const createUser = async () => {
      try {
        const res = await fetch('/api/createUser');

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

    createUser();
  }, []);

  if (error) {
    return (
      <p>Error: {error}</p>
    );
  }

  if (!user) {
    return (
      <p>Creating user...</p>
    );
  }

  return (
    <p>{user.name} ({user.id})</p>
  );
}
