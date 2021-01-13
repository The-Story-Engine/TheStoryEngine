import JellyfishSVG from "public/jellyfish.svg";

export default function Jellyfish({ className = "" }) {
  return (
    <JellyfishSVG className={`bg-no-repeat bg-ink bg-jf-tl ${className}`} />
  );
}
