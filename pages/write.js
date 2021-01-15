import Story from "@components/Story";
import Layout from "@components/Layout";
import Writer from "public/writer.svg";
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
      <Writer />
      <p className="pt-0 leading-none">Reset</p>
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
        <ResetButton
          reset={resetStory}
          isDisabled={!(story.title || story.text)}
        />
      }
    >
      <div className="flex flex-col items-center justify-center flex-grow w-full">
        <Story story={story} saveStory={saveStory} />
      </div>
    </Layout>
  );
}
