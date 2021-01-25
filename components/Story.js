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
    <div className="relative flex flex-col flex-grow w-full h-full px-8 pt-10 pb-4 max-w-52rem lg:px-16 lg:pt-14">
      <div className="pb-4 mb-4 border-b-2 border-gray-400 lg:pb-6 lg:mb-6">
        <Title
          value={story.title}
          onChange={setStoryTitle}
          placeholder="Title..."
          className="w-full text-2xl font-semibold"
        />
      </div>
      <Text
        value={story.text}
        onChange={setStoryText}
        placeholder="Story..."
        className="flex-grow w-full text-xl"
      />
      {story.title || story.text ? (
        <p
          aria-label="Save Status"
          className="m-2 mt-3 text-right text-grey-500"
        >
          {isTyping ? "Saving" : "Saved Locally"}
        </p>
      ) : null}
    </div>
  );
};

export default Story;
