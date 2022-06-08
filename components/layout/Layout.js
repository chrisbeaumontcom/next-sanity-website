import Head from 'next/head';
import Footer from './Footer';
import NavBar from './NavBar';
import Header from './Header';

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>Welcome - {process.env.NEXT_PUBLIC_SITE_NAME}</title>
        <meta name="description" content="An artwork portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header
        title={process.env.NEXT_PUBLIC_SITE_NAME}
        subtitle={process.env.NEXT_PUBLIC_SITE_TAGLINE}
      />
      <NavBar />
      <div className="container mx-auto  md:max-w-5xl">{children}</div>
      <Footer />
    </div>
  );
}
