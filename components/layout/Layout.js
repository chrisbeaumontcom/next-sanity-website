import Head from 'next/head';
import Footer from './Footer';
import NavBar from './NavBar';
import Header from './Header';

export default function Layout({ children }) {
  return (
    <div className="">
      <Head>
        <title>Welcome - Christopher Beaumont</title>
        <meta name="description" content="An artwork portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header title={'Christopher Beaumont'} subtitle={'Paintings'} />
      <NavBar />
      <div className="container mx-auto  md:max-w-5xl">{children}</div>
      <Footer />
    </div>
  );
}
