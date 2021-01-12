import { useEffect, useState } from "react";
import Header from "@components/Header";
import { useUserStory } from "utils-client";

const Story = () => {
  const [story, saveStory] = useUserStory();
  const setStoryTitle = (newTitle) => saveStory({ title: newTitle });
  const setStoryText = (newText) => saveStory({ text: newText });

  return (
    <main>
      <Header title={"The Story Engine"} />
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <input
            value={story.title}
            onChange={({ target: { value } }) => setStoryTitle(value)}
          />
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
