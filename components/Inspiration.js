import InkJellyfish from "@components/InkJellyfish";
import Button from "@components/Button";
import Speech from "@components/Speech";
import Fade from "@components/Fade";
import { useGetInspiration } from "utils-client";

const initInspiration = [
  "Hi! I'm the Inspirational Jellyfish.",
  "I've got lots of ideas to help with your writing, tap Inspire Me to get one!",
];

export default function Inspiration({ setInspiration, inspiration, isInit }) {
  const getInspiration = useGetInspiration();
  const changeInspiration = (attemptCount = 0) => {
    const newInspiration = getInspiration();
    // retry up to 10 times if new one is same as existing
    if (newInspiration.text === inspiration && attemptCount < 10) {
      changeInspiration(attemptCount + 1);
    } else {
      setInspiration(newInspiration.text);
    }
  };
  const inspirationElements = (
    <div className="space-y-2">
      {(inspiration ? [inspiration] : initInspiration).map((inspiration) => (
        <Speech key={inspiration}>{inspiration}</Speech>
      ))}
    </div>
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
