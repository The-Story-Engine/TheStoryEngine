import InkJellyfish from "@components/InkJellyfish";
import Button from "@components/Button";
import Speech from "@components/Speech";
import { getRandomInspiration } from "utils-client";

export default function Inspiration({ setInspiration, inspiration }) {
  const changeInspiration = (attemptCount = 0) => {
    const newInspiration = getRandomInspiration();
    // retry up to 10 times if new one is same as existing
    if (newInspiration.text === inspiration && attemptCount < 10) {
      changeInspiration(attemptCount + 1);
    } else {
      console.log({
        newInspiration,
        inspiration,
        eh: newInspiration.text === inspiration,
        attemptCount,
      });
      setInspiration(newInspiration.text);
    }
  };
  return (
    <div className="flex flex-col justify-between h-full py-8 px-9">
      <div className="divide-y-2 divide-gray-400 divide-solid">
        <p className="pb-4 text-2xl font-semibold text-center">
          I'm the Inspirational Jellyfish
        </p>
        <p className="py-4 text-xl text-center">
          I've got lots of ideas to help with your writing, tap inspire me to
          get one!
        </p>
        <div />
      </div>
      <div className="flex flex-col items-center space-y-8">
        {inspiration ? <Speech>{inspiration}</Speech> : null}
        <InkJellyfish />
        <Button onPress={() => changeInspiration()}>Inspire Me!</Button>
      </div>
    </div>
  );
}
