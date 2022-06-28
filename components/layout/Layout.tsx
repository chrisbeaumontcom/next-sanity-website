import Head from 'next/head';
import Footer from './Footer';
import NavBar from './NavBar';
import Header from './Header';

export default function Layout({ children, currentPath }) {
  return (
    <div className="page-container">
      <Head>
        <title>Welcome - {process.env.NEXT_PUBLIC_SITE_NAME}</title>
        <meta name="description" content="An artwork portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="content-wrap">
        <Header
          title={process.env.NEXT_PUBLIC_SITE_NAME}
          subtitle={process.env.NEXT_PUBLIC_SITE_TAGLINE}
        />
        <NavBar currentPath={currentPath} />
        <div className="container mx-auto  md:max-w-5xl">{children}</div>
      </div>
      <Footer />
    </div>
  );
}
