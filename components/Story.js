import { useRef } from "react";
import { useTextField } from "@react-aria/textfield";
import Textarea from "react-expanding-textarea";

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
  return <Textarea {...inputProps} className={className} ref={ref} />;
};

const Text = ({ onChange, value, placeholder, className }) => {
  const ref = useRef();
  const { inputProps } = useTextField({
    onChange,
    value,
    placeholder,
    className,
    "aria-label": "Story Text",
  });
  return <textarea {...inputProps} className={className} ref={ref} />;
};

const Story = ({ story, saveStory }) => {
  const setStoryTitle = (newTitle) => saveStory({ title: newTitle });
  const setStoryText = (newText) => saveStory({ text: newText });

  return (
    <div className="flex flex-col flex-grow w-full h-full max-w-2xl px-12 py-16">
      <div className="pb-6 mb-6 border-b-2 border-gray-400">
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
    </div>
  );
};

export default Story;
