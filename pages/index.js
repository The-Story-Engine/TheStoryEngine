import Layout from "@components/Layout";
import Jellyfish from "@components/InkJellyfish";
import LinkButton from "@components/LinkButton";
import { useUserStory } from "utils-client";

const Placeholder = () => <div className="w-0 h-48 mt-16 lg:w-sm md:h-64" />;

const returnMessage = "Welcome back, tap below to continue your story!";
const welcomeMessage = (
  <>
    {"I’ve got lots of ideas to help with your"}
    <br />
    {"writing, tap below to get started!"}
  </>
);

export default function Home() {
  const { story } = useUserStory();

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
                <h2 className="font-bold text-h2 md:text-h1 text-emperor w-sm">
                  Howdy, I'm
                  <br />
                  the Inspirational Jellyfish
                </h2>
                <p className="mt-4 text-story md:mt-6 md:text-h2 w-sm">
                  {hasStoryContent ? returnMessage : welcomeMessage}
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
