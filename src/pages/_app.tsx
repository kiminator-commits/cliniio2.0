import React from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import '@/styles/globals.css';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import { ErrorBoundary } from '@/components/ErrorBoundary';

interface CustomAppProps extends Omit<AppProps, 'Component'> {
  Component: React.ComponentType<AppProps['pageProps']>;
}

export default function MyApp({ Component, pageProps }: CustomAppProps) {
  const router = useRouter();
  const isLoginPage = router.pathname === '/login';

  if (isLoginPage) {
    return <Component {...pageProps} />;
  }

  return (
    <ErrorBoundary>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </ErrorBoundary>
  );
} 