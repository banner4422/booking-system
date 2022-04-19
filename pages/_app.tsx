import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Footer from '../components/footer'
import Navigation from '../components/navigation'
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <div className='bg-gray-900 flex flex-col min-h-screen'>
        <Navigation />
        <Component {...pageProps} />
        <Footer />
      </div>
    </SessionProvider>
  )
}

export default MyApp
