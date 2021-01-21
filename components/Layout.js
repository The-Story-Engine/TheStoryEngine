import Head from "next/head";
import Footer from "@components/Footer";
import Header from "@components/Header";
import "focus-visible";
import { useEffect } from "react";

const setViewHeight = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

export default function Layout({
  headerButtons,
  rightBar,
  leftBar,
  belowFold,
  mainContent,
  growMainWidth = false,
}) {
  useEffect(() => {
    setViewHeight();
    window.addEventListener("resize", setViewHeight);
    return () => {
      window.removeEventListener("resize", setViewHeight);
    };
  }, []);
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
      <div className="min-w-screen">
        <Header buttons={headerButtons} />
        <div className="flex font-sans">
          {leftBar ? (
            <aside className="flex-col self-stretch hidden lg:flex">
              {leftBar}
            </aside>
          ) : null}
          <div
            className={`flex lg:justify-around flex-grow ${
              leftBar ? "md:pr-20 lg:pl-20" : "md:pr-20"
            }`}
          >
            <div
              className={`flex flex-col ${
                growMainWidth ? "flex-grow" : "max-w-3xl"
              }`}
            >
              <div className="flex flex-col min-h-screen pt-24">
                <main className="flex flex-grow bg-white md:rounded-tr-2xl lg:rounded-tl-2xl">
                  {mainContent}
                </main>
              </div>
              {belowFold ? (
                <div className="flex flex-col items-center bg-white ">
                  {belowFold}
                </div>
              ) : null}
              <footer className="p-6 text-center bg-white">
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
          </div>
          {rightBar ? (
            <aside className="flex-col self-stretch hidden md:flex">
              {rightBar}
            </aside>
          ) : null}
        </div>
      </div>
    </>
  );
}
