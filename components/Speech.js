export default function Speech({ children, className, isFromWriter }) {
  const dynamicClasses = isFromWriter
    ? "rounded-br-none bg-ink-pink"
    : "rounded-bl-none bg-ink-large";
  return (
    <div
      className={`items-center text-left w-full min-h-0 px-2 py-2 overflow-y-auto text-chat bg-center bg-no-repeat bg-cover border-2 border-solid shadow-sm rounded-3xl border-emperor ${dynamicClasses} ${className}`}
      aria-label={
        isFromWriter ? "Your Message" : "Inspirational Jellyfish Message"
      }
      status={isFromWriter ? "" : "alert"}
    >
      {children}
    </div>
  );
}
