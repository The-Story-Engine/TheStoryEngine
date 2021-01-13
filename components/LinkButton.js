import Link from "next/link";

export default function LinkButton({ href, children }) {
  return (
    <Link href={href}>
      <a className="inline-flex items-center px-20 py-4 text-2xl font-bold border-solid rounded-full shadow-sm mt-14 border-6 bg-bloo-500 border-grey-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        {children}
      </a>
    </Link>
  );
}
