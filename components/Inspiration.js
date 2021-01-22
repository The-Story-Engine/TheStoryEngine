import InkJellyfish from "@components/InkJellyfish";
import Button from "@components/Button";
import Speech from "@components/Speech";
import { getInspiration } from "utils-client";

export default function Inspiration({ setInspiration, inspiration }) {
  const changeInspiration = () => setInspiration(getInspiration());
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
        {inspiration ? <Speech>{inspiration.text}</Speech> : null}
        <InkJellyfish />
        <Button onPress={changeInspiration}>Inspire Me!</Button>
      </div>
    </div>
  );
}
