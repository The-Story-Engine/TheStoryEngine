import { useUserStory } from "utils-client";
import { useTextField } from "@react-aria/textfield";

const Title = ({ onChange, value, placeholder, className }) => {
  const { inputProps } = useTextField({
    onChange,
    value,
    placeholder,
    "aria-label": "Story Title",
  });
  return <input {...inputProps} className={className} />;
};

const Text = ({ onChange, value, placeholder, className }) => {
  const { inputProps } = useTextField({
    onChange,
    value,
    placeholder,
    className,
    "aria-label": "Story Text",
  });
  return <textarea {...inputProps} className={className} />;
};

const Story = () => {
  const [story, saveStory] = useUserStory();
  const setStoryTitle = (newTitle) => saveStory({ title: newTitle });
  const setStoryText = (newText) => saveStory({ text: newText });

  return (
    <div className="flex flex-col flex-grow w-full h-full max-w-2xl px-12 py-16">
      <div className="pb-6 mb-6 border-b-2 border-gray-400">
        <Title
          value={story.title}
          onChange={({ target: { value } }) => setStoryTitle(value)}
          placeholder="Title..."
          className="w-full text-2xl font-semibold"
        />
      </div>
      <Text
        value={story.text}
        onChange={({ target: { value } }) => setStoryText(value)}
        placeholder="Story..."
        className="flex-grow w-full text-xl"
      />
    </div>
  );
};

export default Story;
