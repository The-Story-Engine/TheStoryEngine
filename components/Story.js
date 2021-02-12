import { useRef } from "react";
import { useTextField } from "@react-aria/textfield";
import TextareaAutosize from "react-autosize-textarea";
import { useIsTyping } from "utils-client";

const Title = ({ onChange, value, placeholder, className }) => {
  const ref = useRef();
  const { inputProps } = useTextField(
    {
      onChange,
      value,
      placeholder,
      "aria-label": "Story Title",
    },
    ref
  );
  return <textarea {...inputProps} className={className} ref={ref} />;
};

const Text = ({ onChange, value, placeholder, className }) => {
  const ref = useRef();
  const { inputProps } = useTextField({
    onChange,
    value,
    placeholder,
    className,
    id: "story-text",
    "aria-label": "Story Text",
  });
  return <textarea {...inputProps} className={className} ref={ref} />;
};

const Story = ({ story, saveStory }) => {
  const setStoryTitle = (newTitle) => saveStory({ title: newTitle });
  const setStoryText = (newText) => saveStory({ text: newText });
  const isTyping = useIsTyping(story);

  return (
    <div className="relative flex flex-col flex-grow w-full h-full px-8 pt-10 pb-4 max-w-52rem lg:px-16 lg:pt-14">
      <div className="pb-2 mb-4 border-b-2 border-silver-chalice lg:mb-6">
        <Title
          value={story.title}
          onChange={setStoryTitle}
          placeholder="Title..."
          className="w-full h-12 font-semibold text-h2"
        />
      </div>
      <Text
        value={story.text}
        onChange={setStoryText}
        placeholder="Story..."
        className="flex-grow w-full text-story"
      />
      {story.title || story.text ? (
        <p
          aria-label="Save Status"
          className="m-2 mt-3 text-center text-emperor"
        >
          {isTyping ? "Saving to Browser Tab" : "Saved to Browser Tab"}
        </p>
      ) : null}
    </div>
  );
};

export default Story;
