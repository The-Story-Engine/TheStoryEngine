import { useUserStory } from "utils-client";

const Story = () => {
  const [story, saveStory] = useUserStory();
  const setStoryTitle = (newTitle) => saveStory({ title: newTitle });
  const setStoryText = (newText) => saveStory({ text: newText });

  return (
    <main>
      <div className="flex">
        <div className="flex flex-col gap-2">
          <div className="border-b-2 border-gray-400">
            <input
              value={story.title}
              onChange={({ target: { value } }) => setStoryTitle(value)}
            />
          </div>
          <textarea
            value={story.text}
            onChange={({ target: { value } }) => setStoryText(value)}
          />
        </div>
      </div>
    </main>
  );
};

export default Story;
