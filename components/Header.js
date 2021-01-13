import Link from "next/link";

export default function Header({ title }) {
  return (
    <div className="px-5 pt-3 pb-5">
      <Link href="/">
        <a>
          <img src="/TSE_Logo.png" className="h-14" />
        </a>
      </Link>
    </div>
  );
}
