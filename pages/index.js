import Layout from "@components/Layout";
import Jellyfish from "@components/InkJellyfish";
import LinkButton from "@components/LinkButton";
import { useUserStory } from "utils-client";

const Placeholder = () => <div className="w-full mt-16 h-60" />;

export default function Home() {
  const [story] = useUserStory();

  const isStoryInitialized = !!story.id;
  const hasStoryContent = !!(story.text || story.title);
  return (
    <Layout
      growMainWidth={true}
      belowFold={
        <div className="max-w-3xl px-8 py-5 space-y-2 font-bold text-center sm:px-12">
          <p>The Story Engine is a space for inspired creative writing.</p>
        </div>
      }
      mainContent={
        <div className="flex flex-col items-center justify-center flex-grow p-4 lg:flex-row">
          <Jellyfish className="lg:mr-16 w-72 sm:w-96" />
          <div className="flex flex-col items-center mt-16 text-center w-72 sm:w-96 lg:mt-0">
            {isStoryInitialized ? (
              <>
                <h2 className="text-4xl font-bold text-grey-500">
                  Howdy! I'm
                  <br />
                  the Inspirational Jellyfish
                </h2>
                <p className="mt-6 text-2xl">
                  {hasStoryContent
                    ? "Welcome back, tap below to continue your story!"
                    : "I've got lots of ideas to help with your writing, tap below to get started!"}
                </p>
                <LinkButton href="/write">Write a story!</LinkButton>
              </>
            ) : (
              <Placeholder />
            )}
          </div>
        </div>
      }
    />
  );
}
