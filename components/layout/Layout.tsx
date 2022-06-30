import { ReactNode } from "react";
import Head from "next/head";
import Footer from "./Footer";
import NavBar from "./NavBar";
import Header from "./Header";

const title = process.env.NEXT_PUBLIC_SITE_NAME || "";
const subtitle = process.env.NEXT_PUBLIC_SITE_TAGLINE || "";
type Props = {
  children: ReactNode;
  currentPath: string;
};
export default function Layout({ children, currentPath }: Props) {
  return (
    <div className="page-container">
      <Head>
        <title>Welcome - {process.env.NEXT_PUBLIC_SITE_NAME}</title>
        <meta name="description" content="An artwork portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="content-wrap">
        <Header title={title} subtitle={subtitle} />
        <NavBar currentPath={currentPath} />
        <div className="container mx-auto  md:max-w-5xl">{children}</div>
      </div>
      <Footer />
    </div>
  );
}
