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
    inspiration: "",
  });

  // get story from localStorage, get new if none found
  useEffect(() => {
    const existingStory = JSON.parse(localStorage.getItem("tseStory"));
    if (!existingStory || !existingStory.id) {
      // new story in local storage
      const newStory = {
        id: uuidv4(),
        title: "",
        text: "",
        inspiration: "",
      };
      localStorage.setItem("tseStory", JSON.stringify(newStory));
      setStory(newStory);
    } else {
      setStory(existingStory);
    }
  }, []);
  return [
    story,
    ({
      title = story.title,
      text = story.text,
      inspiration = story.inspiration,
    }) => {
      const updatedStory = {
        id: story.id,
        title,
        text,
        inspiration,
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

export function useIsTyping({ title, text }) {
  const testText = title + text;
  const debouncedText = useDebounce(testText, 500);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(
    () => {
      if (debouncedText != testText) {
        if (!isTyping) {
          setIsTyping(true);
        }
      } else {
        if (isTyping) {
          setIsTyping(false);
        }
      }
    },
    [testText, debouncedText] // Only call effect if debounced story changes
  );
  return isTyping;
}

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

function useInspirations() {
  const [inspirations, setInspirations] = useState(null);
  useEffect(() => {
    fetch("/jelly-inspirations.json")
      .then((response) => response.json())
      .then(setInspirations);
  }, []);
  return inspirations;
}

let shuffledJellyInspirations = [];

export function useGetInspiration() {
  const jellyInspirations = useInspirations();
  return jellyInspirations
    ? () => {
        if (!shuffledJellyInspirations.length) {
          shuffledJellyInspirations = shuffleArray([...jellyInspirations]);
        }

        return shuffledJellyInspirations.pop();
      }
    : null;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const modernCopy = ({ text = "", title = "" }) => {
  return navigator.clipboard.writeText(
    `${title}${title && "\n\n\n"}${
      text && text
    }\n\n\nWritten on thestoryengine.co.uk`
  );
};

export const legacyCopy = () => {
  var copyText = document.querySelector("#story-text");
  copyText.select();
  document.execCommand("copy");
};

export const copy = async (story) => {
  if (navigator.clipboard) {
    await modernCopy(story);
  } else {
    legacyCopy();
  }
};
