import InkJellyfish from "@components/InkJellyfish";
import Button from "@components/Button";
import Speech from "@components/Speech";
import Fade from "@components/Fade";
import { useGetInspiration } from "utils-client";
import { useEffect, useMemo } from "react";
import { motion, useAnimation } from "framer-motion";

const initInspiration = [
  "Hi! I'm the Inspirational Jellyfish.",
  "I've got lots of ideas to help with your writing, tap Inspire Me to get one!",
];

export default function Inspiration({
  setInspiration,
  inspiration,
  isInit,
  isOpen,
  toggleIsOpen,
}) {
  const wiggleControls = useAnimation();
  const wiggleVariants = {
    still: { rotate: 0 },
    wiggle: { rotate: [0, -5, 5, 0] },
  };
  const getInspiration = useGetInspiration();
  const changeInspiration = () => {
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
  useEffect(() => {
    wiggleControls.start("wiggle");
  }, []);
  const jellyfish = (
    <motion.div
      animate={wiggleControls}
      initial="still"
      variants={wiggleVariants}
      className="flex-shrink"
    >
      <InkJellyfish className="w-full h-full" />
    </motion.div>
  );
  return (
    <div className={`h-full ${isOpen ? "py-8 px-9" : "py-6 px-4"}`}>
      <div className="flex flex-col justify-end h-full">
        {isOpen ? (
          <div className="flex flex-col items-center justify-end min-h-0 pt-8 space-y-8">
            <div className="min-h-0 overflow-y-auto">
              <Fade className="space-y-4">
                {isInit ? inspirationElements : null}
              </Fade>
            </div>
            <motion.div
              animate={wiggleControls}
              initial="still"
              variants={wiggleVariants}
              className="flex-shrink w-full"
            >
              <InkJellyfish className="w-full h-full" />
            </motion.div>
            <Button
              isDisabled={!getInspiration}
              onPress={() => {
                wiggleControls.start("wiggle");
                changeInspiration();
              }}
            >
              Inspire Me!
            </Button>
          </div>
        ) : (
          <Button
            aria-label="Show Inspiration Sidebar"
            className="w-full"
            noStyle={true}
            onPress={toggleIsOpen}
          >
            {jellyfish}
          </Button>
        )}
      </div>
    </div>
  );
}
