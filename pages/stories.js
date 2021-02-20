import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import Story from "@components/Story";
import Layout from "@components/Layout";
import { fetchStories, useStories, useStory } from "utils-client";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getStaticProps({ locale }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["stories", 10], () => fetchStories(10));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(locale, ["common", "write"])),
    },
  };
}

export default function Stories() {
  const { t } = useTranslation(["write", "common"]);
  const { status, data: stories, error, isFetching } = useStories();

  const [storyId, setStoryId] = useState();
  const { data: story } = useStory(storyId);

  return (
    <Layout
      pageName={t("common:PAGE_NAMES.WRITE")}
      mobileFitMainToScreen={false}
      mainContent={
        <div className="flex flex-col items-center flex-grow">
          <select
            className="m-2 justify-self-start"
            onChange={(e) => setStoryId(e.target.value)}
          >
            <option value=""></option>
            {stories?.map(({ id, title }) => (
              <option key={id} value={id}>
                {title}
              </option>
            ))}
          </select>
          {story ? <Story story={story.story} /> : <h2>Select a story!</h2>}
        </div>
      }
    />
  );
}
