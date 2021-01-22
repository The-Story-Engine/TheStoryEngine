import JellyfishSVG from "public/jellyfish.svg";

export default function InkJellyfish({ className = "" }) {
  return (
    <JellyfishSVG
      className={`bg-no-repeat bg-ink bg-jf-tl bg-50% ${className}`}
    />
  );
}
