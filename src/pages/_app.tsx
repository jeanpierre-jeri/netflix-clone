import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import '@/styles/globals.css'
import { fetcher } from '@/lib/fetcher'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Netflix</title>
      </Head>
      <SessionProvider session={pageProps.session}>
        <SWRConfig value={{ fallback: pageProps.fallback, fetcher }}>
          <Component {...pageProps} />
        </SWRConfig>
      </SessionProvider>
    </>
  )
}
