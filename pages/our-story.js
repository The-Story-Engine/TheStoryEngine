import Layout from "@components/Layout";
import LinkButton from "@components/LinkButton";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation, Trans } from "next-i18next";
import Image from "next/image";

const translationSpaces = ["story", "common"];

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, translationSpaces)),
  },
});

export default function Home() {
  const { t } = useTranslation(translationSpaces);
  return (
    <Layout
      pageName={t("common:PAGE_NAMES.HOME")}
      headerButtons={<LinkButton href="/write">Write!</LinkButton>}
      growMainWidth={true}
      mainContent={
        <div className="flex justify-center flex-grow p-8 mt-2 md:mt-6">
          <div className="flex flex-col items-center flex-grow max-w-6xl">
            <h2 className="w-full pb-10 font-bold text-center border-b-2 text-h1 border-silver-chalice">
              {t("TITLE")}
            </h2>
            <div className="max-w-2xl mt-10 space-y-8 text-story">
              <p>{t("BODY.0")}</p>
              <div className="py-10 transform scale-110">
                <Image
                  src="/story-picture.png"
                  alt="Young writer at laptop using The Story Engine"
                  layout="responsive"
                  width="100"
                  height="70"
                />
              </div>
              <p>
                <Trans
                  i18nKey="story:BODY.1"
                  components={{
                    talkLink: (
                      <a
                        href="https://youtu.be/FaSF1gPBKrA"
                        target="_blank"
                        className="font-semibold cursor-pointer hover:underline focus-visible:underline"
                      />
                    ),
                  }}
                />
              </p>
              <p>{t("BODY.2")}</p>
              <p className="px-6 py-2 font-semibold text-h3">
                {t("PULL_QUOTE")}
              </p>
              <p>{t("BODY.3")}</p>
              <p>{t("BODY.4")}</p>
              <p>{t("BODY.5")}</p>
            </div>
          </div>
        </div>
      }
    />
  );
}
