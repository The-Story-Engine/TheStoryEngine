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
      <div className="w-screen h-screen bg-gray-100">
        <div className="flex flex-col justify-between w-full h-full">
          <Header />
          {children}
          <Footer />
        </div>
      </div>
    </>
  );
}
