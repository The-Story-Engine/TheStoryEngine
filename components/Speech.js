export default function Speech({ children, className, isFromWriter }) {
  const dynamicClasses = isFromWriter
    ? "rounded-br-none bg-ink-pink"
    : "rounded-bl-none bg-ink-large";
  return (
    <div
      className={`items-center w-full min-h-0 px-2 py-1 overflow-y-auto text-center bg-center bg-no-repeat bg-cover border-2 border-solid shadow-sm rounded-3xl text-l border-emperor ${dynamicClasses} ${className}`}
      aria-label={
        isFromWriter ? "Your Message" : "Inspirational Jellyfish Message"
      }
      status={isFromWriter ? "" : "alert"}
    >
      {children}
    </div>
  );
}
