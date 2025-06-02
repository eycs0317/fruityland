'use client';

// react
import {useEffect, useState} from 'react';

type User = {
  id: string;
  name: string;
};

export default function ListUserClient() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const listUsers = async () => {
      try {
        const res = await fetch('/api/listUser', {
          cache: 'no-store',
        });

        // error - api
        if (!res.ok) {
          throw new Error('API error: ${res.status}');
        }

        // set user - success
        const data = await res.json();
        setUsers(data);
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

    listUsers();
  }, []);

  if (error) {
    return (
      <p>Error: {error}</p>
    );
  }

  if (!users.length) {
    return (
      <p>Loading user...</p>
    );
  }

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name} ({user.id}){' '}
          <a href={`/deleteUser?id=${user.id}`}>Delete</a>
        </li>
      ))}
    </ul>
  );
}
