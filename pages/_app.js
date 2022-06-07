import '../styles/globals.css';
import { GalleryProvider } from '../context/gallery';
import Layout from '../components/layout/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <GalleryProvider>
        <Component {...pageProps} />
      </GalleryProvider>
    </Layout>
  );
}

export default MyApp;
