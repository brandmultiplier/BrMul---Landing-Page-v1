"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type MouseEvent,
  type RefObject,
} from "react";
import Hls from "hls.js";
import {
  Maximize2,
  Minimize2,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import { VSL_CAPTIONS, VSL_HLS_URL, VSL_POSTER } from "@/lib/vsl";
import {
  createVslAnalytics,
  flushVslWatchToN8n,
  type VslAnalyticsLocation,
} from "@/lib/video-analytics";

const SPEEDS = [0.75, 1, 1.25, 1.5, 2] as const;
const DEFAULT_SPEED = 1.25;

function formatClock(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

type Props = {
  videoRef: RefObject<HTMLVideoElement | null>;
  location: VslAnalyticsLocation;
  onTime: (seconds: number) => void;
};

export default function VslPlayer({ videoRef, location, onTime }: Props) {
  const analyticsRef = useRef(createVslAnalytics(location));
  const [paused, setPaused] = useState(true);
  const [muted, setMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const [captionsOn, setCaptionsOn] = useState(false);
  const [cueText, setCueText] = useState("");
  const [speed, setSpeed] = useState(DEFAULT_SPEED);
  const speedRef = useRef(DEFAULT_SPEED);
  const [speedOpen, setSpeedOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focused, setFocused] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const bufferDelayRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuId = useId();

  const bindCaptions = useCallback(
    (video: HTMLVideoElement, on: boolean) => {
      const tracks = video.textTracks;
      for (let i = 0; i < tracks.length; i += 1) {
        // "hidden" keeps cuechange firing without drawing native cues at the
        // bottom of the <video> (they sat under the picture / on the bar).
        tracks[i].mode = on && i === 0 ? "hidden" : "disabled";
      }
    },
    [],
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;
    const src = VSL_HLS_URL;

    const onError = () => {
      setError("The video could not be loaded. Refresh and try again.");
    };

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    } else if (Hls.isSupported()) {
      hls = new Hls({
        enableWorker: true,
        renderTextTracksNatively: true,
      });
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (!data.fatal) return;
        if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
          setError("The video could not be loaded. Refresh and try again.");
          return;
        }
        onError();
      });
    } else {
      onError();
    }

    bindCaptions(video, false);
    video.playbackRate = speedRef.current;

    if (hls) {
      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        if (videoRef.current) videoRef.current.playbackRate = speedRef.current;
      });
    }

    return () => {
      hls?.destroy();
    };
  }, [bindCaptions, videoRef]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    bindCaptions(video, captionsOn);

    const readCues = () => {
      const track = video.textTracks[0];
      if (!track || !captionsOn) {
        setCueText("");
        return;
      }
      const cues = track.activeCues;
      const parts: string[] = [];
      if (cues) {
        for (let i = 0; i < cues.length; i += 1) {
          parts.push((cues[i] as VTTCue).text);
        }
      }
      setCueText(parts.join(" ").replace(/\s+/g, " ").trim());
    };

    const tracks = video.textTracks;
    for (let i = 0; i < tracks.length; i += 1) {
      tracks[i].addEventListener("cuechange", readCues);
    }
    const onAdd = (event: TrackEvent) => {
      event.track?.addEventListener("cuechange", readCues);
      bindCaptions(video, captionsOn);
    };
    tracks.addEventListener("addtrack", onAdd);
    readCues();

    return () => {
      tracks.removeEventListener("addtrack", onAdd);
      for (let i = 0; i < tracks.length; i += 1) {
        tracks[i].removeEventListener("cuechange", readCues);
      }
    };
  }, [bindCaptions, captionsOn, videoRef]);

  useEffect(() => {
    const onFs = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  const hideBuffering = useCallback(() => {
    if (bufferDelayRef.current != null) {
      clearTimeout(bufferDelayRef.current);
      bufferDelayRef.current = null;
    }
    setBuffering(false);
  }, []);

  const showBufferingSoon = useCallback(() => {
    const video = videoRef.current;
    // HLS fires waiting/stalled while attaching and on idle poster. Never
    // show the spinner unless playback is actually requested and stuck.
    if (!video || video.paused) return;
    if (bufferDelayRef.current != null) return;
    bufferDelayRef.current = setTimeout(() => {
      bufferDelayRef.current = null;
      const current = videoRef.current;
      if (!current || current.paused) return;
      setBuffering(true);
    }, 400);
  }, [videoRef]);

  useEffect(() => () => hideBuffering(), [hideBuffering]);

  useEffect(() => {
    const flush = () => flushVslWatchToN8n();
    const onHide = () => {
      if (document.visibilityState === "hidden") flush();
    };
    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("pagehide", flush);
    return () => {
      document.removeEventListener("visibilitychange", onHide);
      window.removeEventListener("pagehide", flush);
      flush();
    };
  }, []);

  const handlePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = speedRef.current;
    setPaused(false);
    analyticsRef.current.onPlay(video.currentTime, video.duration || duration);
  };

  const handleTime = () => {
    const video = videoRef.current;
    if (!video) return;
    const t = video.currentTime;
    const d = video.duration || duration;
    setCurrent(t);
    onTime(t);
    analyticsRef.current.onTime(t, d);
    // Time is advancing, so this is not a stall — drop a spurious HLS waiting.
    if (!video.seeking) hideBuffering();
  };

  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      try {
        await video.play();
        setError(null);
      } catch (err) {
        const name = err instanceof Error ? err.name : "";
        if (name === "NotAllowedError") {
          setError("Playback was blocked. Tap play again.");
        } else {
          setError("The video could not be loaded. Refresh and try again.");
        }
      }
    } else {
      video.pause();
    }
  };

  const toggleCaptions = () => {
    setCaptionsOn((on) => !on);
  };

  const changeSpeed = (next: number) => {
    const video = videoRef.current;
    speedRef.current = next;
    if (video) video.playbackRate = next;
    setSpeed(next);
    setSpeedOpen(false);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const toggleFullscreen = async () => {
    const root = videoRef.current?.parentElement;
    if (!root) return;
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await root.requestFullscreen();
    }
  };

  const handleSurfaceClick = (event: MouseEvent<HTMLDivElement>) => {
    if (error) return;
    const node = event.target as HTMLElement;
    if (node.closest("button, input, .vsl-player__bar, .vsl-player__menu")) return;
    if (speedOpen) setSpeedOpen(false);
    void togglePlay();
  };

  return (
    <div
      className={`vsl-player${paused ? " is-paused" : ""}${focused ? " is-focused" : ""}${buffering ? " is-buffering" : ""}`}
      onClick={handleSurfaceClick}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
      }}
    >
      <video
        ref={videoRef}
        poster={VSL_POSTER}
        preload="metadata"
        playsInline
        controls={false}
        onPlay={handlePlay}
        onPause={() => {
          setPaused(true);
          hideBuffering();
          flushVslWatchToN8n();
        }}
        onTimeUpdate={handleTime}
        onWaiting={showBufferingSoon}
        onStalled={showBufferingSoon}
        onSeeking={showBufferingSoon}
        onPlaying={hideBuffering}
        onCanPlay={hideBuffering}
        onSeeked={hideBuffering}
        onLoadedMetadata={(e) => {
          e.currentTarget.playbackRate = speedRef.current;
          setDuration(e.currentTarget.duration || 0);
          bindCaptions(e.currentTarget, captionsOn);
        }}
        onEnded={() => {
          setPaused(true);
          hideBuffering();
          analyticsRef.current.onEnded(duration);
        }}
        onError={() =>
          setError("The video could not be loaded. Refresh and try again.")
        }
      >
        <track
          kind="captions"
          srcLang="en"
          label="English"
          src={VSL_CAPTIONS}
          default={false}
        />
      </video>

      {error ? <div className="vsl-player__error">{error}</div> : null}

      <div className="vsl-player__ui">
        {captionsOn && cueText && !error ? (
          <div className="vsl-player__cues" aria-live="polite">
            <span className="vsl-player__cue">{cueText}</span>
          </div>
        ) : null}

        {buffering && !paused && !error ? (
          <div className="vsl-player__center">
            <div
              className="vsl-player__spinner"
              role="status"
              aria-label="Loading"
            />
          </div>
        ) : paused && !error ? (
          <div className="vsl-player__center">
            <button
              type="button"
              className="vsl-player__play"
              aria-label="Play video"
              onClick={togglePlay}
            >
              <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
                <path d="M8 5.5v17l14-8.5L8 5.5z" fill="currentColor" />
              </svg>
            </button>
          </div>
        ) : null}

        <div className="vsl-player__bar">
          <button
            type="button"
            className="vsl-player__btn vsl-player__btn--icon"
            aria-label={paused ? "Play" : "Pause"}
            title={paused ? "Play" : "Pause"}
            onClick={togglePlay}
          >
            {paused ? (
              <Play size={18} strokeWidth={0} fill="currentColor" aria-hidden="true" />
            ) : (
              <Pause size={18} strokeWidth={0} fill="currentColor" aria-hidden="true" />
            )}
          </button>
          <input
            className="vsl-player__scrub"
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={current}
            aria-label="Seek"
            onChange={(e) => {
              const next = Number(e.target.value);
              const video = videoRef.current;
              if (video) video.currentTime = next;
              setCurrent(next);
              onTime(next);
            }}
          />
          <span className="vsl-player__time">
            {formatClock(current)}
            <span className="vsl-player__time-sep"> / </span>
            <span className="vsl-player__time-dur">{formatClock(duration)}</span>
          </span>
          <button
            type="button"
            className="vsl-player__btn vsl-player__btn--icon"
            aria-label={muted ? "Unmute" : "Mute"}
            title={muted ? "Unmute" : "Mute"}
            onClick={toggleMute}
          >
            {muted ? (
              <VolumeX size={18} strokeWidth={2.25} aria-hidden="true" />
            ) : (
              <Volume2 size={18} strokeWidth={2.25} aria-hidden="true" />
            )}
          </button>
          <button
            type="button"
            className="vsl-player__btn"
            aria-pressed={captionsOn}
            aria-label="Captions"
            onClick={toggleCaptions}
          >
            CC
          </button>
          <div className="vsl-player__menu">
            <button
              type="button"
              className="vsl-player__btn"
              aria-expanded={speedOpen}
              aria-controls={menuId}
              aria-label="Playback speed"
              onClick={() => setSpeedOpen((open) => !open)}
            >
              {speed === 1 ? "1×" : `${speed}×`}
            </button>
            {speedOpen ? (
              <div id={menuId} className="vsl-player__menu-list" role="listbox">
                {SPEEDS.map((rate) => (
                  <button
                    key={rate}
                    type="button"
                    role="option"
                    aria-selected={speed === rate}
                    onClick={() => changeSpeed(rate)}
                  >
                    {rate}×
                  </button>
                ))}
              </div>
            ) : null}
          </div>
          <button
            type="button"
            className="vsl-player__btn vsl-player__btn--icon"
            aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
            title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
            onClick={toggleFullscreen}
          >
            {isFullscreen ? (
              <Minimize2 size={18} strokeWidth={2.25} aria-hidden="true" />
            ) : (
              <Maximize2 size={18} strokeWidth={2.25} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
