import Head from "next/head";
import Header from "@components/Header";
import Footer from "@components/Footer";
import "focus-visible";
import { useEffect, useState } from "react";
import NavButton from "@components/NavButton";

const setViewHeight = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

export default function Layout({
  headerButtons,
  renderRightBar,
  leftBar,
  belowFold,
  mainContent,
  growMainWidth = false,
  pageName,
}) {
  const [isRightOpen, setIsRightOpen] = useState(true);
  const [isPendingRightAnimation, setIsPendingRightAnimation] = useState(false);
  const toggleIsRightOpen = () => {
    setIsRightOpen(!isRightOpen);
    setIsPendingRightAnimation(true);
    setTimeout(() => setIsPendingRightAnimation(false), 500);
  };
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
        <title>{pageName} - The Story Engine</title>
        <meta
          name="Description"
          content="A space for inspired creative writing, home of the inspirational jellyfish."
        ></meta>
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
            <aside className="flex-col self-stretch hidden xl:flex">
              {leftBar}
            </aside>
          ) : null}
          <div
            className={`flex xl:justify-around flex-grow ${
              leftBar ? "md:pr-20 xl:pl-20" : "md:pr-20"
            }`}
          >
            <div
              className={`flex flex-col flex-grow ${
                growMainWidth ? "" : "max-w-52rem"
              }`}
            >
              <div className="flex flex-col min-h-screen pt-24">
                <main
                  className={`flex flex-grow bg-white md:rounded-tr-2xl ${
                    leftBar ? "xl:rounded-tl-2xl" : ""
                  }`}
                >
                  {mainContent}
                </main>
              </div>
              {belowFold ? (
                <div className="flex flex-col items-center bg-white ">
                  {belowFold}
                </div>
              ) : null}
              <Footer />
            </div>
          </div>
          {renderRightBar ? (
            <aside className="flex-col self-stretch hidden md:flex">
              <div
                className={`relative h-full mt-24 bg-white rounded-tl-2xl transition-all duration-500 ${
                  isRightOpen ? "w-72" : "w-32"
                }`}
              >
                <NavButton
                  aria-label={
                    isRightOpen
                      ? "Hide Inspiration Sidebar"
                      : "Show Inspiration Sidebar"
                  }
                  noStyle={true}
                  direction={isRightOpen ? "right" : "left"}
                  className="sticky top-0 z-10 p-6 left-8"
                  onPress={toggleIsRightOpen}
                />
                <div
                  className={`fixed bottom-0 right-0 h-screen pt-24 transition-all duration-500 ${
                    isRightOpen ? "w-72" : "w-32"
                  }`}
                  onAnimationEnd={() => {
                    setIsPendingRightAnimation(false);
                  }}
                >
                  {isPendingRightAnimation
                    ? null
                    : renderRightBar({
                        isOpen: isRightOpen,
                        toggleIsOpen: toggleIsRightOpen,
                      })}
                </div>
              </div>
            </aside>
          ) : null}
        </div>
      </div>
    </>
  );
}
