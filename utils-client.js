import { useEffect, useState } from "react";

/**
 *
 * Initialize story state from localStorage
 *
 * @return {[string, function]}
 *
 * @example
 *
 *  const [ story, setStory ] = useUserStory();
 *
 */
export const useUserStory = () => {
  const [story, setStory] = useState({
    title: "",
    text: "",
  });

  // get story from localStorage, get new if none found
  useEffect(() => {
    const existingStory = localStorage.getItem("tseStory");
    if (!existingStory) {
      console.log("new story!");
      // new story in local storage
      const newStory = {
        id: uuidv4(),
        title: "",
        text: "",
      };
      console.dir(story);
      localStorage.setItem("tseStory", JSON.stringify(newStory));
      setStory(newStory);
    } else {
      console.log("existing story!");
      console.log(JSON.parse(existingStory));
      setStory(JSON.parse(existingStory));
    }
  }, []);
  return [
    story,
    ({ title = story.title, text = story.text }) => {
      const updatedStory = {
        id: story.id,
        title,
        text,
      };
      localStorage.setItem("tseStory", JSON.stringify(updatedStory));
      setStory(updatedStory);
    },
  ];
};

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}
