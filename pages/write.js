import Head from "next/head";
import Footer from "@components/Footer";
import Story from "@components/Story";
import Layout from "@components/Layout";

export default function Home() {
  return (
    <Layout>
      <main className="flex self-center">
        <Story />
      </main>
    </Layout>
  );
}
