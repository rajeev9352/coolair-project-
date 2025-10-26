'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Loading component for suspense fallback
const Loading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Always redirect to auth page first when visiting root
    router.replace('/auth');
  }, [router]);

  // Since we always redirect to auth, show loading while redirecting
  return <Loading />;
}
