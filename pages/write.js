import Head from "next/head";
import Footer from "@components/Footer";
import Story from "@components/Story";
import Layout from "@components/Layout";

export default function Home() {
  return (
    <Layout>
      <div className="flex items-center justify-center w-full h-full">
        <Story />
      </div>
    </Layout>
  );
}
