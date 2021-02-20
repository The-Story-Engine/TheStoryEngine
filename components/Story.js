import { useRef } from "react";
import { useTextField } from "@react-aria/textfield";
import { useIsTyping } from "utils-client";
import { useTranslation } from "next-i18next";

const Title = ({ onChange, value, placeholder, className, ...rest }) => {
  const { t } = useTranslation("write");
  const ref = useRef();
  const { inputProps } = useTextField(
    {
      onChange,
      value,
      placeholder,
      "aria-label": t("STORY.TITLE.LABEL"),
      ...rest,
    },
    ref
  );
  return <textarea {...inputProps} className={className} ref={ref} />;
};

const Text = ({ onChange, value, placeholder, className, ...rest }) => {
  const { t } = useTranslation("write");
  const ref = useRef();
  const { inputProps } = useTextField({
    onChange,
    value,
    placeholder,
    className,
    id: "story-text",
    "aria-label": t("STORY.TEXT.LABEL"),
    ...rest,
  });
  return <textarea {...inputProps} className={className} ref={ref} />;
};

const Story = ({ story, saveStory }) => {
  const { t } = useTranslation("write");
  const setStoryTitle = (newTitle) => saveStory({ title: newTitle });
  const setStoryText = (newText) => saveStory({ text: newText });
  const isTyping = useIsTyping(story);

  return (
    <div className="relative flex flex-col flex-grow w-full h-full px-8 pt-10 pb-4 max-w-52rem lg:px-16 lg:pt-14">
      <div className="pb-2 mb-4 border-b-2 border-silver-chalice lg:mb-6">
        <Title
          value={story.title}
          onChange={saveStory && setStoryTitle}
          placeholder={t("STORY.TITLE.PLACEHOLDER")}
          disabled={!saveStory}
          readonly={!saveStory}
          className="w-full h-12 font-semibold text-h2"
        />
      </div>
      <Text
        value={story.text}
        onChange={saveStory && setStoryText}
        disabled={!saveStory}
        readonly={!saveStory}
        placeholder={t("STORY.TEXT.PLACEHOLDER")}
        className="flex-grow w-full text-story"
      />
      {story.title || story.text ? (
        <p
          aria-label={t("STORY.SAVE_STATUS.LABEL")}
          className="m-2 mt-3 text-center text-emperor"
        >
          {isTyping
            ? t("STORY.SAVE_STATUS.SAVING_TAB")
            : t("STORY.SAVE_STATUS.SAVED_TAB")}
        </p>
      ) : null}
    </div>
  );
};

export default Story;
