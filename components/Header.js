import Link from "next/link";

export default function Header({ buttons = null }) {
  return (
    <div className="flex items-center justify-between px-5 pt-5 pb-5">
      <Link href="/">
        <a>
          <img src="/TSE_Logo.png" className="h-14" />
        </a>
      </Link>
      <div className="h-14">{buttons}</div>
    </div>
  );
}
