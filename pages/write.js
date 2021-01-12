import Head from "next/head";
import Footer from "@components/Footer";
import Story from "@components/Story";
import Layout from "@components/Layout";

export default function Home() {
  return (
    <Layout>
      <main style={{ display: "flex" }}>
        <Story />
      </main>
    </Layout>
  );
}
