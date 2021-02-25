import Layout from "@components/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import TeacherSVG from "public/teacher.svg";
import HomeSVG from "public/home.svg";
import Button from "@components/Button";
import LargeButton from "@components/LargeButton";
import { useEffect, useState } from "react";

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

const AmountSelection = ({ setAmount: setOuterAmount }) => {
  const { t } = useTranslation(translationSpaces);
  const [amountSelection, setAmountSelection] = useState();
  const [otherAmount, setOtherAmount] = useState();
  const handleOtherChange = (newAmount) => {
    const cleanAmount = newAmount.replace(/\D/, "");
    setOtherAmount(cleanAmount);
    setOuterAmount(cleanAmount);
  };
  const handleAmountSelectionChange = (newAmount) => {
    if (newAmount === "other") {
      setOtherAmount(5);
      setOuterAmount(5);
    } else {
      setOtherAmount(-1);
      setOuterAmount(newAmount);
    }
    setAmountSelection(newAmount);
  };
  return (
    <div role="group" aria-labelledby="label-amount">
      <div className="sm:grid sm:grid-cols-4 sm:gap-4 sm:items-baseline">
        <div>
          <div
            className="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700"
            id="label-amount"
          >
            {t("SUPPORT.AMOUNT.LABEL")}
          </div>
        </div>
        <div className="sm:col-span-3">
          <div className="max-w-lg">
            <div className="flex flex-wrap mt-4 space-x-4">
              {t("SUPPORT.AMOUNT.AMOUNTS", { returnObjects: true }).map(
                (amount) => (
                  <div key={amount} className="flex items-center">
                    <input
                      id={`amount-${amount}`}
                      name="amount"
                      value={amount}
                      type="radio"
                      className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                      onChange={(event) =>
                        handleAmountSelectionChange(event.target.value)
                      }
                    />
                    <label
                      htmlFor={`amount-${amount}`}
                      className="block ml-3 text-sm font-medium text-gray-700"
                    >
                      £ {amount}
                    </label>
                  </div>
                )
              )}
              <div className="flex items-center">
                <input
                  id="amount-other"
                  value="other"
                  name="amount"
                  type="radio"
                  onChange={(event) =>
                    handleAmountSelectionChange(event.target.value)
                  }
                  className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                <label
                  htmlFor="amount-other"
                  className="block ml-3 text-sm font-medium text-gray-700"
                >
                  {t("SUPPORT.AMOUNT.OTHER")}
                </label>
                {amountSelection === "other" ? (
                  <input
                    className="ml-2 text-base font-semibold w-14"
                    type="number"
                    value={otherAmount}
                    onChange={(event) => handleOtherChange(event.target.value)}
                  ></input>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [amount, setAmount] = useState();
  const { t } = useTranslation(translationSpaces);
  const featureCards = (
    <div className="flex flex-wrap mt-6 space-x-12">
      <div className="flex flex-col p-8 space-y-8 bg-center bg-no-repeat bg-cover w-sm bg-ink-large border-3 rounded-2xl border-emperor">
        <div className="flex justify-around pb-8 border-b-2 border-silver-chalice">
          <TeacherSVG className="w-20" />
          <div className="flex flex-col">
            <p className="font-bold text-h1">{t("FAMILY.TITLE")}</p>
            <p>
              £ <span className="font-bold text-h1">3+ </span>
              {t("PER_MONTH")}
            </p>
          </div>
        </div>
        <FeatureList
          features={t("FAMILY.FEATURE_LIST", { returnObjects: true })}
          className="flex-grow mt-6"
        />
        <p className="text-center text-h3">
          {boldMid(t("FAMILY.LAUNCH", { returnObjects: true }))}
        </p>
      </div>
      <div className="flex flex-col p-8 space-y-8 bg-center bg-no-repeat bg-cover w-sm border-3 rounded-2xl border-emperor bg-ink-large">
        <div className="flex justify-around pb-8 border-b-2 border-silver-chalice">
          <HomeSVG className="w-20" />
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
  const waitlist = (
    <div className="flex flex-col items-center max-w-2xl mt-12 space-y-4">
      <p className="text-story">
        Join the waitlist for{" "}
        <span className="font-semibold">£5 of workspace credit</span> when we
        launch!
      </p>
      <div className="self-stretch sm:grid sm:grid-cols-4 sm:gap-4 sm:items-start sm:p-5">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          {t("SUPPORT.EMAIL.LABEL")}
        </label>
        <div className="mt-1 sm:mt-0 sm:col-span-3">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className="block w-full max-w-lg p-2 text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>
      <div>
        <p className="text-center">
          You'll get a confirmation email now, and an email for each of the 2
          launches later this year.
        </p>
        <p className="text-center">
          Your email will then be stored for 6 months so we know it's you when
          you sign up.
        </p>
      </div>
      <div className="flex mt-6 space-x-12">
        <Button>Get Notified</Button>
      </div>
    </div>
  );
  return (
    <Layout
      pageName={t("common:PAGE_NAMES.WORKSPACES")}
      growMainWidth={true}
      mainContent={
        <div className="flex justify-center flex-grow p-8 mt-2 md:mt-8">
          <div className="flex flex-col items-center flex-grow max-w-6xl">
            <h2 className="w-full pb-6 font-bold text-center border-b-2 text-h1 border-silver-chalice">
              {t("TITLE")}
            </h2>
            <div className="max-w-xl my-6 space-y-2 text-center text-h3">
              <p>{t("SUB_TITLE.0")}</p>
            </div>
            {featureCards}
            {waitlist}
            <div className="pt-12 my-12 space-y-6 text-center border-t-2 max-w-4sxl text-story border-silver-chalice">
              <div>
                <p>{t("SUPPORT.SUB_TITLE.0")}</p>
                <p className="pt-2">{t("SUPPORT.SUB_TITLE.1")}</p>
              </div>
              <p>
                {amount
                  ? boldMid(
                      t("SUPPORT.CREDIT", {
                        amount: amount * 2 + 5,
                        returnObjects: true,
                      })
                    )
                  : boldMid(
                      t("SUPPORT.CREDIT_BEFORE", { returnObjects: true })
                    )}
              </p>
              <div className="space-y-6 sm:space-y-5">
                <AmountSelection amount={amount} setAmount={setAmount} />
                <div className="sm:grid sm:grid-cols-4 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    {t("SUPPORT.EMAIL.LABEL")}
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-3">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full max-w-lg p-2 text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p className="text-center">
                You'll get a confirmation email now, and an email for each of
                the 2 launches later this year.
              </p>
              <p className="text-center">
                Your email will then be stored for 12 months so we know it's you
                when you sign up.
              </p>
            </div>
            <div className="flex mt-6 space-x-12">
              <Button isDisabled={!amount}>{t("SUPPORT.BUTTON_LABEL")}</Button>
            </div>
          </div>
        </div>
      }
    />
  );
}
