import InkJellyfish from "@components/InkJellyfish";
import Button from "@components/Button";
import Speech from "@components/Speech";
import { getRandomInspiration } from "utils-client";

const initInspiration = [
  "Hi! I'm the Inspirational Jellyfish.",
  <br />,
  <br />,
  "I've got lots of ideas to help with your writing, tap Inspire Me to get one!",
];

export default function Inspiration({ setInspiration, inspiration }) {
  const changeInspiration = (attemptCount = 0) => {
    const newInspiration = getRandomInspiration();
    // retry up to 10 times if new one is same as existing
    if (newInspiration.text === inspiration && attemptCount < 10) {
      changeInspiration(attemptCount + 1);
    } else {
      setInspiration(newInspiration.text);
    }
  };
  return (
    <div className="h-full py-8 px-9">
      <div className="flex flex-col justify-end h-full">
        <div className="flex flex-col items-center justify-end min-h-0 pt-8 space-y-8">
          <Speech>{inspiration || initInspiration}</Speech>
          <InkJellyfish className="flex-shrink" />
          <Button onPress={() => changeInspiration()}>Inspire Me!</Button>
        </div>
      </div>
    </div>
  );
}
