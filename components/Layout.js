import Head from "next/head";
import Footer from "@components/Footer";
import Header from "@components/Header";

export default function Layout({
  children,
  headerButtons,
  rightBar,
  belowFold,
}) {
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
      <div className="flex font-sans bg-gray-100 min-w-screen">
        <div className="flex-grow md:px-20">
          <div className="flex flex-col min-h-screen">
            <Header buttons={headerButtons} />
            <main className="flex flex-grow bg-white md:rounded-t-2xl">
              {children}
            </main>
          </div>
          {belowFold ? (
            <div className="flex flex-col items-center bg-white ">
              {belowFold}
            </div>
          ) : null}
          <footer className="p-6 text-center bg-white md:mb-5 md:rounded-b-2xl">
            © 2021,{" "}
            <a
              target="_blank"
              className="text-blue-600 underline hover:text-blue-800 visited:text-purple-600"
              href="https://tse.fish"
            >
              TSE Ventures Ltd
            </a>
          </footer>
        </div>
        {rightBar ? (
          <aside className="flex-col self-stretch hidden lg:flex">
            <div className="h-screen">{rightBar}</div>
          </aside>
        ) : null}
      </div>
    </>
  );
}
