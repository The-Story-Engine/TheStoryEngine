import Story from "@components/Story";
import Layout from "@components/Layout";
import InkJellyfish from "@components/InkJellyfish";
import WritingSVG from "public/writing.svg";
import CopySVG from "public/copy.svg";
import { useUserStory } from "utils-client";
import { useRouter } from "next/router";
import { useButton } from "@react-aria/button";
import { useRef } from "react";
import copy from "clipboard-copy";

const ResetButton = ({ reset, isDisabled = false }) => {
  const ref = useRef();
  const { buttonProps } = useButton({ onPress: reset, isDisabled }, ref);
  return (
    <button
      {...buttonProps}
      ref={ref}
      className="h-14 disabled:text-gray-400 disabled:cursor-default focus:outline-none focus:ring-2 focus:ring-offset-2"
    >
      <WritingSVG />
      <p className="pt-1 text-sm leading-none">Reset</p>
    </button>
  );
};

const CopyButton = ({ story, isDisabled = false }) => {
  const ref = useRef();
  const copyStory = () => {
    copy(story.title + "\n\n\n" + story.text);
    alert("Story copied! Get pasting.");
  };
  const { buttonProps } = useButton({ onPress: copyStory, isDisabled }, ref);
  return (
    <button
      {...buttonProps}
      ref={ref}
      className="h-14 disabled:text-gray-400 disabled:cursor-default focus:outline-none focus:ring-2 focus:ring-offset-2"
    >
      <CopySVG />
      <p className="pt-1 text-sm leading-none">Copy</p>
    </button>
  );
};

export default function Home() {
  const [story, saveStory] = useUserStory();
  const router = useRouter();
  const resetStory = () => {
    if (window.confirm("Do you really want to reset your story?")) {
      localStorage.removeItem("tseStory");
      router.push("/");
    }
  };
  return (
    <Layout
      headerButtons={
        <div className="space-x-3">
          <CopyButton story={story} isDisabled={!(story.title || story.text)} />
          <ResetButton
            reset={resetStory}
            isDisabled={!(story.title || story.text)}
          />
        </div>
      }
      rightBar={
        <div className="w-24 space-y-2">
          <p className="text-center">Hi! I'll be ready to chat early 2021</p>
          <InkJellyfish />
        </div>
      }
    >
      <div className="flex flex-col items-center justify-center flex-grow md:flex-grow-0 md:w-page">
        <Story story={story} saveStory={saveStory} />
      </div>
    </Layout>
  );
}
