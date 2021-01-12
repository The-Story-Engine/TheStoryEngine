import Link from "next/link";

export default function Header({ title }) {
  return (
    <div className="p-4">
      <Link href="/">
        <a>
          <img src="/TSE_Logo.png" className="h-12" />
        </a>
      </Link>
    </div>
  );
}
