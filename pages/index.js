import Layout from "@components/Layout";
import Jellyfish from "@components/InkJellyfish";
import LinkButton from "@components/LinkButton";
import { useUserStory } from "utils-client";

const Placeholder = () => <div className="w-0 mt-16 h-36 lg:w-md md:h-52" />;

export default function Home() {
  const [story] = useUserStory();

  const isStoryInitialized = !!story.id;
  const hasStoryContent = !!(story.text || story.title);
  return (
    <Layout
      pageName="Home"
      growMainWidth={true}
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
                    : "Welcome to the Story Engine. I’ve got lots of ideas to help with your writing, tap below to get started!"}
                </p>
                <LinkButton href="/write">Write a story</LinkButton>
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
