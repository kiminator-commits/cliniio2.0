import React from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import '@/styles/globals.css';
import { useRouter } from 'next/router';

export default function MyApp({ Component, pageProps }: any) {
  const router = useRouter();
  const isLoginPage = router.pathname === '/login';

  if (isLoginPage) {
    return <Component {...pageProps} />;
  }

  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  );
} 