import InkJellyfish from "@components/InkJellyfish";
import Button from "@components/Button";
import Speech from "@components/Speech";
import JellyfishSVG from "public/jellyfish.svg";
import WriterSVG from "public/writer.svg";
import { useChatMessages, useJellyfish } from "utils-client";
import { useEffect, useMemo, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useTranslation } from "next-i18next";

export default function Inspiration({ isInit, isOpen, toggleIsOpen }) {
  const { t } = useTranslation("common");
  const wiggleControls = useAnimation();
  const wiggleVariants = {
    still: { rotate: 0 },
    wiggle: { rotate: [0, -5, 5, 0] },
  };
  const { messages, pushJellyMessage, pushWriterMessage } = useChatMessages();

  const { isPendingInspiration, inspireMe } = useJellyfish(
    pushJellyMessage,
    wiggleControls
  );

  const changeInspiration = () => {
    if (!isPendingInspiration) {
      pushWriterMessage(t("CHAT.INSPIRE"));
      inspireMe();
      setTimeout(() => window.fathom.trackGoal("HD3SGWBU", 0));
    }
  };
  const containerRef = useRef();
  useEffect(() => {
    if (containerRef.current) {
      const rafId = requestAnimationFrame(() => {
        containerRef.current.scrollTo(
          0,
          containerRef.current.scrollHeight - containerRef.current.clientHeight
        );

        containerRef.current.scrollTo(
          0,
          containerRef.current.scrollHeight - containerRef.current.clientHeight
        );
      });
      return () => cancelAnimationFrame(rafId);
    }
  }, [containerRef.current, messages]);
  const inspirationElements = useMemo(() =>
    messages.map(
      (message) => {
        const isJellyfish = message.from.id === "jellyfish";
        return (
          <div
            className={`flex items-end ${
              isJellyfish ? "justify-start pr-16" : "justify-end pl-16"
            }`}
            key={message.message.text + message.sentMs}
          >
            <div
              className={`w-12 flex-shrink-0 ${
                isJellyfish ? "mr-4" : "ml-4 order-1"
              }`}
            >
              {isJellyfish ? (
                <JellyfishSVG className="w-24 h-24" />
              ) : (
                <WriterSVG className="w-24 h-24" />
              )}
            </div>
            <div className="relative">
              {isJellyfish ? (
                <p className="absolute left-0.5 text-caption text-emperor -top-4.5">
                  {message.from.name}
                </p>
              ) : null}
              <Speech isFromWriter={!isJellyfish}>
                {message.message.text}
              </Speech>
            </div>
          </div>
        );
      },
      [messages]
    )
  );
  useEffect(() => {
    wiggleControls.start("wiggle");
  }, []);
  const jellyfish = (
    <motion.div
      animate={wiggleControls}
      initial="still"
      variants={wiggleVariants}
      className="flex-shrink"
    >
      <InkJellyfish className="w-full h-full" />
    </motion.div>
  );
  return (
    <div
      className={`h-full ${
        isOpen ? "py-4 mx-4 md:pb-4 md:pt-6 md:mx-4" : "py-6 px-4"
      }`}
    >
      <div className="flex flex-col justify-end h-full">
        {isOpen ? (
          <div className="flex flex-col items-center justify-end flex-grow min-h-0 fade-out-top">
            <div
              className="min-h-0 pt-12 space-y-6 overflow-y-auto overscroll-contain scrollbar-thin scrollbar-track-transparent pt-auto"
              ref={containerRef}
            >
              {isInit ? inspirationElements : null}
            </div>
            <div className="w-full mt-6 border-b-2 border-silver-chalice" />
            <div className="flex items-center self-stretch justify-between flex-shrink-0 mx-4 mt-4">
              <motion.div
                animate={wiggleControls}
                initial="still"
                variants={wiggleVariants}
                className="flex-shrink w-16"
              >
                <InkJellyfish className="w-full h-full" />
              </motion.div>
              <Button
                isDisabled={isPendingInspiration}
                onPress={() => {
                  changeInspiration();
                }}
              >
                {t("CHAT.INSPIRE")}
              </Button>
            </div>
          </div>
        ) : (
          <Button
            aria-label={t("CHAT.SHOW_LABEL")}
            className="w-full"
            noStyle={true}
            onPress={toggleIsOpen}
          >
            {jellyfish}
          </Button>
        )}
      </div>
    </div>
  );
}
