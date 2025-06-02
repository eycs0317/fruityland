'use client';

import { useEffect, useState } from 'react';

type User = {
  id: string;
  name: string;
};

export default function ListUserClient() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/listUser');
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`API error: ${res.status} - ${text}`);
        }
        const data = await res.json();
        setUsers(data);
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

    fetchUsers();
  }, []);

  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (!users.length) return <p>Loading users...</p>;

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
