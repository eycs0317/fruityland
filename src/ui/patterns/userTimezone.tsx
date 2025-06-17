'use client';

// react
import {useEffect, useState} from 'react';

export default function Timezone() {
  const [timezone, setTimezone] = useState('');

  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimezone(tz);
  }, []);

  return (
    <input type="hidden" name="timezone" value={timezone} />
  );
}
