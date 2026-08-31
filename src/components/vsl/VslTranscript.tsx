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
};

export default function VslTranscript({ cues, currentTime, onSeek }: Props) {
  const activeIndex = useMemo(() => {
    let idx = 0;
    for (let i = 0; i < cues.length; i += 1) {
      if (cues[i].seconds <= currentTime) idx = i;
    }
    return idx;
  }, [cues, currentTime]);

  return (
    <details className="vsl-transcript">
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
