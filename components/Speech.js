export default function Speech({ children }) {
  return (
    <div className="inline-flex items-center w-full px-4 py-3 mt-8 text-lg text-center bg-no-repeat bg-cover border-2 border-solid shadow-sm rounded-3xl text-l bg-ink bg-speech-tl border-grey-700 text-grey-700">
      {children}
    </div>
  );
}
