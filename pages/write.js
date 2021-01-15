import Story from "@components/Story";
import Layout from "@components/Layout";
import WriterSVG from "public/writer.svg";
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
      className="h-14 disabled:text-gray-400 disabled:cursor-default"
    >
      <WriterSVG />
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
      className="h-14 disabled:text-gray-400 disabled:cursor-default"
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
    >
      <div className="flex flex-col items-center justify-center flex-grow w-full">
        <Story story={story} saveStory={saveStory} />
      </div>
    </Layout>
  );
}
