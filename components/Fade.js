import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Fade({ children }) {
  const [show, setShow] = useState(false);
  const [debouncedChildren, setDebouncedChildren] = useState();
  useEffect(() => {
    setShow(false);
    const timeoutId = setTimeout(() => {
      setDebouncedChildren(children);
      setShow(true);
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [children]);
  return (
    <AnimatePresence exitBeforeEnter={true}>
      {show ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {debouncedChildren}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
