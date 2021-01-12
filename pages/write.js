import Head from "next/head";
import Footer from "@components/Footer";
import Story from "@components/Story";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>The Story Engine</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ display: "flex" }}>
        <Story />
      </main>
      <Footer />
    </div>
  );
}
