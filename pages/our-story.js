import Layout from "@components/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

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
      growMainWidth={true}
      mainContent={
        <div className="flex justify-center flex-grow p-8 mt-2 md:mt-8">
          <div className="flex flex-col items-center max-w-2xl">
            <h2 className="w-full pb-6 font-bold text-center border-b-2 text-h1 border-silver-chalice">
              {t("TITLE")}
            </h2>
            <div className="mt-4 space-y-8 text-story">
              <p>{t("BODY.0")}</p>
              <p className="px-6 py-2 font-bold text-h3">{t("BODY.1")}</p>
              <p>{t("BODY.2")}</p>
            </div>
          </div>
        </div>
      }
    />
  );
}
