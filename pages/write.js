import Story from "@components/Story";
import Layout from "@components/Layout";
import Inspiration from "@components/Inspiration";
import WritingSVG from "public/writing.svg";
import CopySVG from "public/copy.svg";
import { useUserStory, copy } from "utils-client";
import { useRouter } from "next/router";
import { useButton } from "@react-aria/button";
import { useRef } from "react";
import { motion } from "framer-motion";

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
  const { story, updateStory, resetStory } = useUserStory();
  const router = useRouter();
  const reset = () => {
    if (story.title || story.text) {
      if (window.confirm("Do you really want to reset your story?")) {
        resetStory();
      }
    }
  };

  return (
    <Layout
      pageName="Writing Space"
      mobileFitMainToScreen={false}
      headerButtons={
        <div className="space-x-3">
          <CopyButton story={story} isDisabled={!(story.title || story.text)} />
          <ResetButton
            reset={reset}
            isDisabled={!(story.title || story.text || story.inspiration)}
          />
        </div>
      }
      renderRightBar={({ isOpen, toggleIsOpen }) => (
        <Inspiration
          isInit={!!story?.id}
          isOpen={isOpen}
          toggleIsOpen={toggleIsOpen}
        />
      )}
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
