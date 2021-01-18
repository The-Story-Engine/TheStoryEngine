import { useRef } from "react";
import { useTextField } from "@react-aria/textfield";
import Textarea from "react-expanding-textarea";
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
  return <Textarea {...inputProps} className={`${className} h-12`} ref={ref} />;
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
    <div className="relative flex flex-col flex-grow w-full h-full max-w-2xl px-8 py-10 sm:px-12 sm:py-16">
      <div className="pb-4 mb-4 border-b-2 border-gray-400 sm:pb-6 sm:mb-6">
        <Title
          value={story.title}
          onChange={setStoryTitle}
          placeholder="Title..."
          className="w-full text-2xl font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2"
        />
      </div>
      <Text
        value={story.text}
        onChange={setStoryText}
        placeholder="Story..."
        className="flex-grow w-full text-xl focus:outline-none focus:ring-2 focus:ring-offset-2"
      />
      {story.title || story.text ? (
        <p className="absolute self-end text-grey-400 bottom-8 right-13">
          {isTyping ? "Saving" : "Saved Locally"}
        </p>
      ) : null}
    </div>
  );
};

export default Story;
