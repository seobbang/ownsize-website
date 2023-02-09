import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { RecoilRoot } from 'recoil';
import GlobalStyle from 'styles/GlobalStyle';

import { AxiosInterceptor } from '../apis';
import * as gtm from '../lib/gtm';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        refetchOnWindowFocus: false,
      },
    },
  });
  // GA 설정
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtm.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <AxiosInterceptor>
          <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}>
            <Head>
              <title>Own Size</title>
            </Head>
            <Script
              id="gtag-base"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${gtm.GTM_ID}');
          `,
              }}
            />
            <GlobalStyle />
            <Component {...pageProps} />
          </GoogleOAuthProvider>
        </AxiosInterceptor>
      </QueryClientProvider>
    </RecoilRoot>
  );
}
