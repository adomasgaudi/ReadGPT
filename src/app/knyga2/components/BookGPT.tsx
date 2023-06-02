import { fontNotoSerifJp } from "@/app/css/twinStyles";
import { useRef } from "react";

export default function BookGPT({ text }: any) {
  const containerRef = useRef(null);

  return (
    <div className="">
      <div ref={containerRef} className="container p-5 pr-10 text-lg" css={[fontNotoSerifJp]}>{text}</div>
    </div>
  );
}