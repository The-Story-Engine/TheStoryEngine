import InkJellyfish from "@components/InkJellyfish";
import Button from "@components/Button";
import Speech from "@components/Speech";
import Fade from "@components/Fade";
import { useGetInspiration } from "utils-client";
import { useMemo } from "react";

const initInspiration = [
  "Hi! I'm the Inspirational Jellyfish.",
  "I've got lots of ideas to help with your writing, tap Inspire Me to get one!",
];

export default function Inspiration({ setInspiration, inspiration, isInit }) {
  const getInspiration = useGetInspiration();
  const changeInspiration = (attemptCount = 0) => {
    const newInspiration = getInspiration();
    setInspiration(newInspiration.text);
  };
  const inspirationElements = useMemo(
    () => (
      <div className="space-y-2">
        {(inspiration ? [inspiration] : initInspiration).map((inspiration) => (
          <Speech key={inspiration}>{inspiration}</Speech>
        ))}
      </div>
    ),
    [inspiration]
  );
  return (
    <div className="h-full py-8 px-9">
      <div className="flex flex-col justify-end h-full">
        <div className="flex flex-col items-center justify-end min-h-0 pt-8 space-y-8">
          <div className="min-h-0 overflow-y-auto">
            <Fade className="space-y-4">
              {isInit ? inspirationElements : null}
            </Fade>
          </div>
          <InkJellyfish className="flex-shrink" />
          <Button
            isDisabled={!getInspiration}
            onPress={() => changeInspiration()}
          >
            Inspire Me!
          </Button>
        </div>
      </div>
    </div>
  );
}
