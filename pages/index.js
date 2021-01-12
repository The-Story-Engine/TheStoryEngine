import Layout from "@components/Layout";
import Link from "next/link";
import Jellyfish from "public/jellyfish.svg";

export default function Home() {
  return (
    <Layout>
      <main className="flex flex-row self-center">
        <Jellyfish />
        <div className="flex flex-col items-center justify-center gap-4">
          <h2>Howdy! I'm the Inspirational Jellyfish</h2>
          <h4>
            I've got lots of ideas to help with your writing, tap below to get
            started!
          </h4>
          <Link href="/write">
            <a>Write a story!</a>
          </Link>
        </div>
      </main>
    </Layout>
  );
}
