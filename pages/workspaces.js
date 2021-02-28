import Layout from "@components/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import CommunitySVG from "public/community.svg";
import HomeSVG from "public/home.svg";
import LinkButton from "@components/LinkButton";
import Waitlist from "@components/Waitlist";
import { useWaitlistQuery } from "utils-client";

const translationSpaces = ["workspaces", "common"];

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, translationSpaces)),
  },
});

const boldMid = ([start, emphasize, end]) => (
  <>
    {start} <span className="font-semibold">{emphasize}</span> {end}
  </>
);

const FeatureList = ({ features, className }) => {
  return (
    <ul className={`${className} space-y-3`}>
      {features.map((feature) => {
        return (
          <li key={feature} className="flex items-center space-x-3">
            <svg
              className="flex-shrink-0 w-5 h-5 text-malachite"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>{boldMid(feature)}</span>
          </li>
        );
      })}
    </ul>
  );
};

const FeatureCards = () => {
  const { t } = useTranslation(translationSpaces);
  return (
    <div className="flex flex-wrap space-x-12">
      <div className="flex flex-col p-8 space-y-8 bg-center bg-no-repeat bg-cover w-sm bg-ink-large border-3 rounded-2xl border-emperor">
        <div className="flex justify-start pb-8 pl-8 space-x-6 border-b-2 border-silver-chalice">
          <HomeSVG className="w-20" />
          <div className="flex flex-col">
            <p className="font-bold text-h1">{t("HOME.TITLE")}</p>
            <p>
              £ <span className="font-bold text-h1">3+ </span>
              {t("PER_MONTH")}
            </p>
          </div>
        </div>
        <FeatureList
          features={t("HOME.FEATURE_LIST", { returnObjects: true })}
          className="flex-grow mt-6"
        />
        <p className="text-center text-h3">
          {boldMid(t("HOME.LAUNCH", { returnObjects: true }))}
        </p>
      </div>
      <div className="flex flex-col p-8 space-y-8 bg-center bg-no-repeat bg-cover w-sm border-3 rounded-2xl border-emperor bg-ink-large">
        <div className="flex justify-start pb-8 pl-8 space-x-6 border-b-2 border-silver-chalice">
          <CommunitySVG className="w-20" />
          <div className="flex flex-col">
            <p className="font-bold text-h1">{t("COMMUNITY.TITLE")}</p>
            <p>
              £ <span className="font-bold text-h1">10+ </span>per month
            </p>
          </div>
        </div>
        <FeatureList
          features={t("COMMUNITY.FEATURE_LIST", {
            returnObjects: true,
          })}
          className="flex-grow mt-6"
        />
        <p className="text-center text-h3">
          {boldMid(t("COMMUNITY.LAUNCH", { returnObjects: true }))}
        </p>
      </div>
    </div>
  );
};

export default function Workspaces() {
  const { t } = useTranslation(translationSpaces);
  return (
    <Layout
      pageName={t("common:PAGE_NAMES.WORKSPACES")}
      growMainWidth={true}
      mainContent={
        <div className="flex justify-center flex-grow p-8 mt-2 mb-6 md:mt-6">
          <div className="flex flex-col items-stretch flex-grow max-w-6xl space-y-10 divide-y-2 divide-silver-chalice">
            <div className="flex flex-col items-center">
              <h2 className="w-full font-bold text-center text-h1">
                {t("TITLE")}
              </h2>
            </div>
            <div className="flex flex-col items-center pt-10">
              <div className="max-w-2xl mb-6 space-y-4 text-center text-h3">
                <p>{t("SUB_TITLE.0")}</p>
              </div>
              <div className="my-4">
                <LinkButton href="/waitlist">Join Waitlist</LinkButton>
              </div>
              <div className="mt-6">
                <FeatureCards />
              </div>
            </div>
            {/* <div className="flex flex-col items-center pt-12">
              {waitlistQuery.data ? (
                <h2 className="text-h3">
                  Wahoo! Please check your inbox to confirm your address and
                  join the list.
                </h2>
              ) : (
                waitlist
              )}
            </div> */}
            {/* <div className="flex flex-col items-center pt-12">
                <Donate/>
            </div> */}
          </div>
        </div>
      }
    />
  );
}
