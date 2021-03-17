import Layout from "@components/Layout";
import Jellyfish from "@components/InkJellyfish";
import LinkButton from "@components/LinkButtonLarge";
import { useUserStory } from "utils-client";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "home"])),
  },
});

const Placeholder = () => <div className="w-0 h-48 mt-16 lg:w-sm md:h-64" />;

export default function Home() {
  const { t } = useTranslation(["home", "common"]);
  const returnMessage = t("WELCOME.BODY.RETURN");
  const welcomeMessage = (
    <>
      {t("WELCOME.BODY.NEW.0")}
      <br />
      {t("WELCOME.BODY.NEW.1")}
    </>
  );

  const { story } = useUserStory();

  const isStoryInitialized = !!story.id;
  const hasStoryContent = !!(story.text || story.title);
  return (
    <Layout
      pageName={t("common:PAGE_NAMES.HOME")}
      growMainWidth={true}
      mainContent={
        <div className="flex flex-col items-center justify-center flex-grow p-5 lg:flex-row">
          <Jellyfish className="lg:mr-16 w-72 md:w-96" />
          <div className="flex flex-col items-center mt-10 text-center md:mt-16 max-w-96 lg:mt-0">
            {isStoryInitialized ? (
              <>
                <h2 className="font-bold text-h2 md:text-h1 text-emperor w-sm">
                  {t("WELCOME.HEADLINE.0")}
                  <br />
                  {t("WELCOME.HEADLINE.1")}
                </h2>
                <p className="mt-4 text-story md:mt-6 md:text-h2 w-sm">
                  {hasStoryContent ? returnMessage : welcomeMessage}
                </p>
                <div className="mt-8 md:mt-14">
                  <LinkButton href="/write">{t("WRITE")}</LinkButton>
                </div>
              </>
            ) : (
              <Placeholder />
            )}
          </div>
        </div>
      }
    />
  );
}
