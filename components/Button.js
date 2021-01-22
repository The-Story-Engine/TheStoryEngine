import { useButton } from "@react-aria/button";
import { useRef } from "react";

export default function Button({ children, onPress }) {
  const ref = useRef();
  const { props } = useButton({ onPress }, ref);
  return (
    <button
      {...props}
      className="inline-flex items-center px-8 py-2 mt-8 text-lg font-semibold text-center border-2 border-solid shadow-sm rounded-3xl text-l bg-bloo-500 border-grey-700"
      ref={ref}
    >
      {children}
    </button>
  );
}
