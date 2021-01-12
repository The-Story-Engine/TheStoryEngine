import Head from "next/head";
import Footer from "@components/Footer";
import Link from "next/link";
import Jellyfish from "public/jellyfish.svg";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>The Story Engine</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen">
        <main className="flex flex-row">
          <Jellyfish />
          <div className="flex flex-col">
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
        <Footer />
      </div>
    </div>
  );
}
