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
      pageName="Home"
      growMainWidth={true}
      belowFold={
        <div className="max-w-3xl px-8 py-5 space-y-2 font-bold text-center sm:px-12">
          <p>
            The Story Engine is a space for inspired creative writing. Write
            stories and copy them to paste anywhere. We're excited to add
            features through 2021 as the jellyfish grows, to help inspire you!
          </p>
        </div>
      }
      mainContent={
        <div className="flex flex-col items-center justify-center flex-grow p-5 lg:flex-row">
          <Jellyfish className="lg:mr-16 w-72 md:w-96" />
          <div className="flex flex-col items-center mt-10 text-center md:mt-16 max-w-96 lg:mt-0">
            {isStoryInitialized ? (
              <>
                <h2 className="text-2xl font-bold md:text-4xl text-grey-500">
                  Howdy! I'm
                  <br />
                  the Inspirational Jellyfish
                </h2>
                <p className="mt-4 text-xl md:mt-6 md:text-2xl">
                  {hasStoryContent
                    ? "Welcome back, tap below to continue your story!"
                    : "Welcome to the Story Engine, tap below to get started!"}
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
