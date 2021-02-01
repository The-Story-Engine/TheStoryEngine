import Head from "next/head";
import Header from "@components/Header";
import Footer from "@components/Footer";
import "focus-visible";
import { useEffect, useState } from "react";
import NavButton from "@components/NavButton";
import InkJellyfish from "@components/InkJellyfish";
import Button from "@components/Button";
import { motion } from "framer-motion";

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
  mobileFitMainToScreen = true,
  pageName,
}) {
  useEffect(() => {
    if (window.innerWidth > 767) {
      setIsRightOpen(true);
    }
  }, []);
  const [isRightOpen, setIsRightOpen] = useState(false);
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
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@TSEjellyfish" />
        <meta name="twitter:title" content="The Story Engine" />
        <meta
          name="twitter:description"
          content="A space for inspired creative writing, home of the inspirational jellyfish."
        />
        <meta
          name="twitter:image"
          content="https://thestoryengine.co.uk/inkinspirationaljellyfish-1.jpg"
        />
        <meta name="twitter:image:alt" content="Illustrated Jellyfish" />
        <link rel="icon" href="/inkinspirationaljellyfish-1.jpg" />
        <link
          href="https://fonts.googleapis.com/css2?family=Dosis:wght@200;300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="/manifest.webmanifest" />
      </Head>
      <div
        className={`h-screen min-w-screen ${
          isRightOpen ? "overflow-y-hidden md:overflow-y-auto" : ""
        }`}
      >
        {renderRightBar && !isRightOpen ? (
          <Button
            aria-label="Show Inspiration Sidebar"
            className="fixed z-10 w-16 h-16 top-28 right-4 md:hidden"
            noStyle={true}
            onPress={toggleIsRightOpen}
          >
            <motion.div
              animate={{ rotate: [0, -5, 5, 0] }}
              className="w-full h-full"
            >
              <InkJellyfish className="w-full h-full" />
            </motion.div>
          </Button>
        ) : null}
        <div className="relative">
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
                <div
                  className={`flex flex-col pt-24 ${
                    mobileFitMainToScreen
                      ? "min-h-screen"
                      : "min-h-2xl md:min-h-screen"
                  }`}
                >
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
                <Footer isWide={growMainWidth} />
              </div>
            </div>
            {renderRightBar ? (
              <>
                {isRightOpen ? (
                  <>
                    <div className="fixed inset-0 z-10 md:hidden">
                      <div
                        className="absolute inset-0 bg-gray-600 opacity-75"
                        aria-hidden="true"
                        onClick={toggleIsRightOpen}
                      ></div>
                    </div>
                    <aside className="fixed top-0 right-0 z-20 self-stretch w-full h-screen pt-24 md:hidden">
                      <div
                        className={`relative h-full w-full bg-white rounded-tl-2xl transition-all duration-500`}
                      >
                        <NavButton
                          aria-label={"Hide Inspiration Sidebar"}
                          noStyle={true}
                          direction={"right"}
                          className="absolute top-0 left-0 z-10 p-4"
                          onPress={toggleIsRightOpen}
                        />
                        {renderRightBar({
                          isOpen: true,
                          toggleIsOpen: toggleIsRightOpen,
                        })}
                      </div>
                    </aside>
                  </>
                ) : null}
                <aside className="flex-col self-stretch hidden md:flex">
                  <div
                    className={`relative h-full mt-24 bg-white rounded-tl-2xl transition-all duration-500 ${
                      isRightOpen ? "w-96" : "w-32"
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
                        isRightOpen ? "w-96" : "w-32"
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
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
