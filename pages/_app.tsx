import "../styles/globals.css";
import type { AppProps } from "next/app";
import { GalleryProvider } from "../context/gallery";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/layout/Layout";
import * as gtag from "../gtag";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [currentPath, setCurrentPath] = useState("/");
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      setCurrentPath(url);
      if (process && process.env.NODE_ENV === "development") {
        console.log("Dev GA:", url);
        return;
      }
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        id=""
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      />
      <Script
        id=""
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Layout currentPath={currentPath}>
        <GalleryProvider>
          <Component {...pageProps} />
        </GalleryProvider>
      </Layout>
    </>
  );
}

export default MyApp;
