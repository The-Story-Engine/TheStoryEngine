import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Speech({ children }) {
  const [show, setShow] = useState(false);
  const [debouncedChildren, setDebouncedChildren] = useState();
  useEffect(() => {
    setShow(false);
    const timeoutId = setTimeout(() => {
      setDebouncedChildren(children);
      setShow(true);
    }, 700);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [children]);
  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="items-center w-full min-h-0 px-4 py-3 overflow-y-auto text-lg text-center bg-center bg-no-repeat bg-cover border-2 border-solid shadow-sm inline-foverflow-y-autolex rounded-3xl text-l bg-ink-large border-grey-700 text-grey-700"
        >
          {debouncedChildren}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
