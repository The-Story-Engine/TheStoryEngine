import Layout from "@components/Layout";
import Jellyfish from "@components/Jellyfish";
import Link from "next/link";

export default function Home() {
  return (
    <Layout>
      <div className="flex items-center justify-center w-full h-full">
        <Jellyfish className="h-96" />
        <div className="flex flex-col items-center gap-4">
          <h2>Howdy! I'm the Inspirational Jellyfish</h2>
          <h4>
            I've got lots of ideas to help with your writing, tap below to get
            started!
          </h4>
          <Link href="/write">
            <a className="underline">Write a story!</a>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
