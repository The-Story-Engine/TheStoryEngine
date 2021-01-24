export default function Speech({ children }) {
  return (
    <div
      className="items-center w-full min-h-0 px-4 py-3 overflow-y-auto text-lg text-center bg-center bg-no-repeat bg-cover border-2 border-solid shadow-sm inline-foverflow-y-autolex rounded-3xl text-l bg-ink-large border-grey-700 text-grey-700"
      aria-label="Message from the Inspirational Jellyfish"
      status="alert"
    >
      {children}
    </div>
  );
}
