// Type-set wordmark based on the DongWorkx sticker logo (S10).
// The paid build should swap this for the owner's vector logo file.

const outline =
  "2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1.5px 1.5px 0 #fff, -1.5px -1.5px 0 #fff, 1.5px -1.5px 0 #fff, -1.5px 1.5px 0 #fff";

export function Logo({ size = "md" }: { size?: "md" | "lg" }) {
  const text = size === "lg" ? "text-5xl sm:text-6xl" : "text-[1.7rem]";
  return (
    <span className="inline-flex flex-col leading-none select-none" aria-hidden="true">
      <span className={`display ${text} tracking-tight`}>
        <span className="text-paper">DONG</span>
        <span className="text-workx" style={{ textShadow: outline }}>
          WORKX
        </span>
      </span>
      <span
        className={`font-mono font-bold uppercase text-fi ${size === "lg" ? "mt-2 text-sm" : "mt-0.5 text-[0.6rem]"} tracking-[0.08em]`}
      >
        FI specialist
      </span>
    </span>
  );
}
