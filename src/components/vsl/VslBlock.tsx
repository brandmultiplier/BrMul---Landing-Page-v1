"use client";

import { useRef, useState } from "react";
import type { VslTranscriptCue } from "@/app/(embeds)/resources/vsl-transcript";
import type { VslAnalyticsLocation } from "@/lib/video-analytics";
import VslPlayer from "./VslPlayer";
import VslTranscript from "./VslTranscript";

type Props = {
  showTranscript?: boolean;
  transcript?: VslTranscriptCue[];
  location?: VslAnalyticsLocation;
};

export default function VslBlock({
  showTranscript = false,
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

  return (
    <div id="vsl" className="vsl-block">
      <VslPlayer
        videoRef={videoRef}
        location={resolvedLocation}
        onTime={setCurrentTime}
      />
      {showTranscript && transcript.length > 0 ? (
        <VslTranscript
          cues={transcript}
          currentTime={currentTime}
          onSeek={seek}
        />
      ) : null}
    </div>
  );
}
