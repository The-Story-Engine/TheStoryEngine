import Layout from "@components/Layout";
import Jellyfish from "@components/Jellyfish";
import LinkButton from "@components/LinkButton";

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center w-full h-full gap-16 lg:flex-row">
        <Jellyfish className="w-96" />
        <div className="flex flex-col items-center max-w-sm gap-6 text-center">
          <h2 className="text-4xl font-bold text-grey-500">
            Howdy! I'm
            <br />
            the Inspirational Jellyfish
          </h2>
          <p className="text-2xl">
            I've got lots of ideas to help with your writing, tap below to get
            started!
          </p>
          <LinkButton href="/write">Write a story!</LinkButton>
        </div>
      </div>
    </Layout>
  );
}
