'use client';

import { useEffect, useState } from 'react';

export default function CreateUserClient() {
  const [user, setUser] = useState<{ id: number; name: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const createUser = async () => {
      try {
        const res = await fetch('/api/createUser');
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

    createUser();
  }, []);

  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (!user) return <p>Creating user...</p>;

  return <p>{user.name} ({user.id})</p>;
}
