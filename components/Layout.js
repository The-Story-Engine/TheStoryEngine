import Head from "next/head";
import Footer from "@components/Footer";
import Header from "@components/Header";

export default function Layout({ children, headerButtons }) {
  return (
    <>
      <Head>
        <title>The Story Engine</title>
        <link rel="icon" href="/jellyfish.svg" />
        <link
          href="https://fonts.googleapis.com/css2?family=Dosis:wght@200;300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="flex flex-col min-h-screen font-sans bg-gray-100 min-w-screen">
        <Header buttons={headerButtons} />
        <main className="flex flex-grow bg-white lg:rounded-tr-2xl lg:mr-20">
          {children}
        </main>
      </div>
    </>
  );
}
