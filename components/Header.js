import Link from "next/link";

export default function Header({ title }) {
  return (
    <div>
      <Link href="/">
        <a>
          <img src="/TSE_Logo.png" />
        </a>
      </Link>
    </div>
  );
}
