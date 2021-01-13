import Link from "next/link";

export default function Header({ title }) {
  return (
    <div className="px-4 py-2">
      <Link href="/">
        <a>
          <img src="/TSE_Logo.png" className="h-12" />
        </a>
      </Link>
    </div>
  );
}
