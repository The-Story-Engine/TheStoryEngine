import Story from "@components/Story";
import Layout from "@components/Layout";
import Inspiration from "@components/Inspiration";
import ReadingSVG from "public/writing.svg";
import CopySVG from "public/copy.svg";
import { useUserStory, copy } from "utils-client";
import { useButton } from "@react-aria/button";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "write"])),
  },
});

if (typeof window !== "undefined") {
  window.tseSafeUnload = true;
}

const ResetButton = ({ reset, isDisabled = false }) => {
  const { t } = useTranslation("write");
  const ref = useRef();
  const { buttonProps } = useButton({ onPress: reset, isDisabled }, ref);
  return (
    <motion.button
      {...buttonProps}
      ref={ref}
      className="h-14 disabled:text-silver-chalice disabled:cursor-default"
      whileTap={{ scale: isDisabled ? 1 : 0.95 }}
    >
      <ReadingSVG title={t("ICON_ALT.READING")} />
      <p className="pt-1 leading-none text-caption">{t("RESET.LABEL")}</p>
    </motion.button>
  );
};

const CopyButton = ({ story, isDisabled = false, copyCallback }) => {
  const ref = useRef();
  const { t } = useTranslation("write");
  const copyStory = async () => {
    copyCallback();
    try {
      await copy(story);
      alert(t("COPY.SUCCESS"));
    } catch (error) {
      console.error(error);
      alert(t("COPY.FAIL"));
    }
  };
  const { buttonProps } = useButton({ onPress: copyStory, isDisabled }, ref);
  return (
    <motion.button
      {...buttonProps}
      ref={ref}
      className={
        "h-14 disabled:text-silver-chalice disabled:cursor-default" +
        (isDisabled ? "" : "hover:text-black")
      }
      whileTap={{ scale: isDisabled ? 1 : 0.95 }}
    >
      <CopySVG title={t("ICON_ALT.WRITING")} />
      <p className="pt-1 leading-none text-caption">{t("COPY.LABEL")}</p>
    </motion.button>
  );
};

export default function Home() {
  const { story, updateStory, resetStory } = useUserStory();
  const { t } = useTranslation(["write", "common"]);
  const reset = () => {
    if (story.title || story.text) {
      if (window.confirm(t("RESET.CONFIRM"))) {
        resetStory();
      }
    }
  };

  const copyCallback = () => {
    window.tseSafeUnload = true;
  };

  useEffect(() => {
    const unloadHandler = function (event) {
      if (
        !window.tseSafeUnload &&
        (story.text.length > 10 || story.title.length > 10)
      ) {
        event.preventDefault();
        event.returnValue = "";
        return "";
      }
    };
    window.addEventListener("beforeunload", unloadHandler);
    return () => window.removeEventListener("beforeunload", unloadHandler);
  }, [story]);

  return (
    <Layout
      pageName={t("common:PAGE_NAMES.WRITE")}
      mobileFitMainToScreen={false}
      headerButtons={
        <div className="space-x-3">
          <CopyButton
            story={story}
            isDisabled={!(story.title || story.text)}
            copyCallback={copyCallback}
          />
          <ResetButton
            reset={reset}
            isDisabled={!(story.title || story.text || story.inspiration)}
          />
        </div>
      }
      renderRightBar={({ isOpen, toggleIsOpen }) => (
        <Inspiration
          isInit={!!story?.id}
          isOpen={isOpen}
          toggleIsOpen={toggleIsOpen}
        />
      )}
      leftBar={
        <div className="relative w-20 h-full mt-24 bg-white rounded-tr-2xl"></div>
      }
      belowFold={
        <div className="px-8 py-12 space-y-2 italic font-semibold text-center max-w-52rem lg:px-16">
          <p>{t("DATA_NOTICE.0")}</p>
          <p>
            {t("DATA_NOTICE.1.0")}
            <a
              onClick={() => {
                window.tseSafeUnload = true;
                window.location.reload();
              }}
              href="/write"
              className="font-extrabold cursor-pointer hover:underline focus-visible:underline"
            >
              {t("DATA_NOTICE.1.1")}
            </a>
            {t("DATA_NOTICE.1.2")}
          </p>
          <p>{t("DATA_NOTICE.2")}</p>
        </div>
      }
      mainContent={
        <div className="flex flex-col items-center justify-center flex-grow">
          {story.id ? <Story story={story} saveStory={updateStory} /> : null}
        </div>
      }
    />
  );
}
