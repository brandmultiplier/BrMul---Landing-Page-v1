"use client";

import { useRef, useState } from "react";
import type { VslTranscriptCue } from "@/app/(embeds)/resources/vsl-transcript";
import type { VslAnalyticsLocation } from "@/lib/video-analytics";
import VslPlayer from "./VslPlayer";
import VslTranscript from "./VslTranscript";

type Props = {
  showTranscript?: boolean;
  /** When false, the transcript stays in the HTML but the UI is clipped. */
  hideTranscriptUi?: boolean;
  transcript?: VslTranscriptCue[];
  location?: VslAnalyticsLocation;
};

export default function VslBlock({
  showTranscript = false,
  hideTranscriptUi = false,
  transcript = [],
  location,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const resolvedLocation: VslAnalyticsLocation =
    location ?? (showTranscript ? "resources" : "library");

  const seek = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = seconds;
    setCurrentTime(seconds);
    void video.play();
  };

  const renderTranscript = transcript.length > 0 && (showTranscript || hideTranscriptUi);

  return (
    <div id="vsl" className="vsl-block">
      <VslPlayer
        videoRef={videoRef}
        location={resolvedLocation}
        onTime={setCurrentTime}
      />
      {renderTranscript ? (
        <VslTranscript
          cues={transcript}
          currentTime={currentTime}
          onSeek={seek}
          forAi={hideTranscriptUi}
        />
      ) : null}
    </div>
  );
}
