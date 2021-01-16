import Layout from "@components/Layout";
import Jellyfish from "@components/InkJellyfish";
import LinkButton from "@components/LinkButton";

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center flex-grow p-4 lg:flex-row">
        <Jellyfish className="lg:mr-16 w-96" />
        <div className="flex flex-col items-center max-w-sm mt-16 text-center lg:mt-0">
          <h2 className="text-4xl font-bold text-grey-500">
            Howdy! I'm
            <br />
            the Inspirational Jellyfish
          </h2>
          <p className="mt-6 text-2xl">
            I've got lots of ideas to help with your writing, tap below to get
            started!
          </p>
          <LinkButton href="/write">Write a story!</LinkButton>
        </div>
      </div>
    </Layout>
  );
}
