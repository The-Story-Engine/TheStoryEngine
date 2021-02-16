import { useTranslation } from "next-i18next";

export default function Speech({ children, className, isFromWriter }) {
  const { t } = useTranslation("common");
  const dynamicClasses = isFromWriter
    ? "rounded-br-none bg-ink-pink"
    : "rounded-bl-none bg-ink-large";
  return (
    <div
      className={`items-center text-left w-full min-h-0 px-2 py-2 overflow-y-auto text-chat bg-center bg-no-repeat bg-cover border-2 border-solid shadow-sm rounded-3xl border-emperor ${dynamicClasses} ${className}`}
      aria-label={
        isFromWriter
          ? t("CHAT.ARIA_WRITER_MESSAGE")
          : t("CHAT.ARIA_JELLYFISH_MESSAGE")
      }
      status={isFromWriter ? "" : "alert"}
    >
      {children}
    </div>
  );
}
