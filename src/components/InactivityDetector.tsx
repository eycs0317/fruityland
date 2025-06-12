// Example: src/components/InactivityDetector.tsx (a client component)
'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation'; // For redirection

// const INACTIVITY_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes
const INACTIVITY_TIMEOUT_MS = 3 * 1000; // Set to 3 seconds for testing
export default function InactivityDetector() {
  const router = useRouter();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      // Perform logout/redirect when inactive
      console.log('User inactive. Redirecting to logout.');
      router.push('/'); // Or '/admin/login'
    }, INACTIVITY_TIMEOUT_MS);
  }, [router]);

  useEffect(() => {
    const activityEvents = ['mousemove', 'keydown', 'click', 'scroll'];

    const handleActivity = () => {
      resetTimeout();
    };

    // Set initial timeout
    resetTimeout();

    // Attach event listeners for activity
    activityEvents.forEach(event => {
      window.addEventListener(event, handleActivity);
    });

    // Cleanup event listeners and timeout on component unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      activityEvents.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [resetTimeout]); // Empty dependency array means this runs once on mount

  return null; // This component doesn't render anything visible
}