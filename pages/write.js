import Story from "@components/Story";
import Layout from "@components/Layout";
import Inspiration from "@components/Inspiration";
import WritingSVG from "public/writing.svg";
import CopySVG from "public/copy.svg";
import { useUserStory } from "utils-client";
import { useRouter } from "next/router";
import { useButton } from "@react-aria/button";
import { useRef } from "react";

const ResetButton = ({ reset, isDisabled = false }) => {
  const ref = useRef();
  const { buttonProps } = useButton({ onPress: reset, isDisabled }, ref);
  return (
    <button
      {...buttonProps}
      ref={ref}
      className="h-14 disabled:text-gray-400 disabled:cursor-default"
    >
      <WritingSVG />
      <p className="pt-1 text-sm leading-none">Reset</p>
    </button>
  );
};

const modernCopy = ({ text = "", title = "" }) => {
  return navigator.clipboard.writeText(
    `${title}${title && "\n\n\n"}${text && text}`
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
    <button
      {...buttonProps}
      ref={ref}
      className="h-14 disabled:text-gray-400 disabled:cursor-default"
    >
      <CopySVG />
      <p className="pt-1 text-sm leading-none">Copy</p>
    </button>
  );
};

export default function Home() {
  const [story, updateStory] = useUserStory();
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
  return (
    <Layout
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
        <div className="relative h-full mt-24 bg-white w-72 rounded-tl-2xl">
          <div className="fixed bottom-0 right-0 h-screen pt-24 w-72">
            <Inspiration
              setInspiration={setInspiration}
              inspiration={story?.inspiration}
              isInit={!!story?.id}
            />
          </div>
        </div>
      }
      leftBar={
        <div className="relative w-20 h-full mt-24 bg-white rounded-tr-2xl"></div>
      }
      belowFold={
        <div className="px-8 py-5 space-y-2 italic font-semibold text-center max-w-52rem sm:px-12">
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
