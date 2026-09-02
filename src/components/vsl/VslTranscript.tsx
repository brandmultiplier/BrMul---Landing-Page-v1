"use client";

import { useMemo } from "react";
import type { VslTranscriptCue } from "@/app/(embeds)/resources/vsl-transcript";

function formatClock(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

type Props = {
  cues: VslTranscriptCue[];
  currentTime: number;
  onSeek: (seconds: number) => void;
  /** Clip the UI but leave every cue in the HTML for crawlers / models. */
  forAi?: boolean;
};

export default function VslTranscript({
  cues,
  currentTime,
  onSeek,
  forAi = false,
}: Props) {
  const activeIndex = useMemo(() => {
    let idx = 0;
    for (let i = 0; i < cues.length; i += 1) {
      if (cues[i].seconds <= currentTime) idx = i;
    }
    return idx;
  }, [cues, currentTime]);

  return (
    <details
      className={forAi ? "vsl-transcript vsl-transcript--for-ai" : "vsl-transcript"}
      open={forAi || undefined}
      aria-hidden={forAi || undefined}
    >
      <summary>Read the transcript</summary>
      <div className="vsl-transcript__body">
        {cues.map((cue, i) => (
          <button
            key={cue.seconds}
            type="button"
            className={
              i === activeIndex
                ? "vsl-transcript__line is-active"
                : "vsl-transcript__line"
            }
            onClick={() => onSeek(cue.seconds)}
          >
            <span className="vsl-transcript__time">
              {formatClock(cue.seconds)}
            </span>
            {cue.text}
          </button>
        ))}
      </div>
    </details>
  );
}
