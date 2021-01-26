import Story from "@components/Story";
import Layout from "@components/Layout";
import Inspiration from "@components/Inspiration";
import WritingSVG from "public/writing.svg";
import CopySVG from "public/copy.svg";
import { useUserStory } from "utils-client";
import { useRouter } from "next/router";
import { useButton } from "@react-aria/button";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import NavButton from "@components/NavButton";
import InkJellyfish from "@components/InkJellyfish";

const ResetButton = ({ reset, isDisabled = false }) => {
  const ref = useRef();
  const { buttonProps } = useButton({ onPress: reset, isDisabled }, ref);
  return (
    <motion.button
      {...buttonProps}
      ref={ref}
      className="h-14 disabled:text-gray-400 disabled:cursor-default"
      whileTap={{ scale: isDisabled ? 1 : 0.95 }}
    >
      <WritingSVG title="Illustration of pencil & notepad" />
      <p className="pt-1 text-sm leading-none">Reset</p>
    </motion.button>
  );
};

const modernCopy = ({ text = "", title = "" }) => {
  return navigator.clipboard.writeText(
    `${title}${title && "\n\n\n"}${
      text && text
    }\n\n\nWritten on thestoryengine.co.uk`
  );
};

const legacyCopy = () => {
  var copyText = document.querySelector("#story-text");
  copyText.select();
  document.execCommand("copy");
};

const copy = async (story) => {
  if (navigator.clipboard) {
    await modernCopy(story);
  } else {
    legacyCopy();
  }
};

const CopyButton = ({ story, isDisabled = false }) => {
  const ref = useRef();
  const copyStory = async () => {
    try {
      await copy(story);
      alert("Story copied! Get pasting.");
    } catch (error) {
      console.error(error);
      alert("Copy failed, please select and copy your story manually!");
    }
  };
  const { buttonProps } = useButton({ onPress: copyStory, isDisabled }, ref);
  return (
    <motion.button
      {...buttonProps}
      ref={ref}
      className={
        "h-14 disabled:text-gray-400 disabled:cursor-default" +
        (isDisabled ? "" : "hover:text-black")
      }
      whileTap={{ scale: isDisabled ? 1 : 0.95 }}
    >
      <CopySVG title="Illustration of person reading book" />
      <p className="pt-1 text-sm leading-none">Copy</p>
    </motion.button>
  );
};

export default function Home() {
  const [story, updateStory] = useUserStory();
  const [isRightOpen, setIsRightOpen] = useState(true);
  const [isPendingAnimation, setPendingAnimation] = useState(false);
  const router = useRouter();
  const resetStory = () => {
    if (story.title || story.text) {
      if (window.confirm("Do you really want to reset your story?")) {
        localStorage.removeItem("tseStory");
        router.push("/");
      }
    } else {
      updateStory({ inspiration: "" });
    }
  };
  const setInspiration = (inspiration) => {
    updateStory({ inspiration });
  };
  const toggleIsRightOpen = () => {
    setIsRightOpen(!isRightOpen);
    setPendingAnimation(true);
    setTimeout(() => setPendingAnimation(false), 500);
  };

  return (
    <Layout
      pageName="Writing Space"
      headerButtons={
        <div className="space-x-3">
          <CopyButton story={story} isDisabled={!(story.title || story.text)} />
          <ResetButton
            reset={resetStory}
            isDisabled={!(story.title || story.text || story.inspiration)}
          />
        </div>
      }
      rightBar={
        <div
          className={`relative h-full mt-24 bg-white rounded-tl-2xl transition-all duration-500 ${
            isRightOpen ? "w-72" : "w-32"
          }`}
        >
          <div
            className={`fixed bottom-0 right-0 h-screen pt-24 transition-all duration-500 ${
              isRightOpen ? "w-72" : "w-32"
            }`}
            onAnimationEnd={() => {
              console.log("yay");
              setPendingAnimation(false);
            }}
          >
            <NavButton
              aria-label={
                isRightOpen
                  ? "Hide Inspiration Sidebar"
                  : "Show Inspiration Sidebar"
              }
              noStyle={true}
              direction={isRightOpen ? "right" : "left"}
              className="absolute top-32 left-8"
              onPress={toggleIsRightOpen}
            />
            {isPendingAnimation ? null : (
              <Inspiration
                setInspiration={setInspiration}
                inspiration={story?.inspiration}
                isInit={!!story?.id}
                isOpen={isRightOpen}
                toggleIsOpen={toggleIsRightOpen}
              />
            )}
          </div>
        </div>
      }
      leftBar={
        <div className="relative w-20 h-full mt-24 bg-white rounded-tr-2xl"></div>
      }
      belowFold={
        <div className="px-8 py-12 space-y-2 italic font-semibold text-center max-w-52rem lg:px-16">
          <p>Your story is stored in your web browser only.</p>
          <p>
            As the jellyfish grows up, we'll always be 100% transparent about
            what we store and how we store it.
          </p>
        </div>
      }
      mainContent={
        <div className="flex flex-col items-center justify-center flex-grow">
          {story.id ? <Story story={story} saveStory={updateStory} /> : null}
        </div>
      }
    />
  );
}
