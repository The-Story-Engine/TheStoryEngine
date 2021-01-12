import Head from "next/head";
import Footer from "@components/Footer";
import Header from "@components/Header";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>The Story Engine</title>
        <link rel="icon" href="/jellyfish.svg" />
      </Head>
      <div className="container">
        <div className="h-screen">
          <Header />
          {children}
          <Footer />
        </div>
      </div>
    </>
  );
}
