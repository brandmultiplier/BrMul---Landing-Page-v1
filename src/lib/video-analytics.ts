/**
 * Fire-once VSL watch events into dataLayer for GTM / lead scoring.
 * Also persists max depth in sessionStorage so library opt-in can send it to n8n.
 *
 * GPC visitors never receive the GTM container (see tracking-gate.ts), so those
 * events will not reach analytics for that segment. Depth still goes to n8n
 * with the lead after consent — that is first-party, not GTM.
 */
import {
  readVslWatchDepth,
  recordVslWatchDepth,
  type VslWatchLocation,
} from "@/lib/vsl-watch-depth";

type DataLayerEvent = {
  event: string;
  [key: string]: unknown;
};

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
  }
}

const QUARTILES = [25, 50, 75] as const;
const MILESTONES = [
  { seconds: 300, event: "vsl_milestone_300" },
  { seconds: 333, event: "vsl_milestone_333" },
] as const;

export type VslAnalyticsLocation = VslWatchLocation;

function getLeadId(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|; )bm_lead_id=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
}

function push(event: string, extra: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    video_id: "brandmultiplier-vsl",
    video_title: "BrandMultiplier VSL",
    bm_lead_id: getLeadId(),
    ...extra,
  });
}

function pingN8nProgress(force = false) {
  if (typeof window === "undefined") return;
  if (!getLeadId()) return;
  const watch = readVslWatchDepth();
  if (!watch.played) return;
  const last = Number(window.sessionStorage.getItem("bm_vsl_watch_sent") || "-1");
  if (!force && watch.seconds - last < 15) return;
  window.sessionStorage.setItem("bm_vsl_watch_sent", String(watch.seconds));
  void fetch("/api/vsl-progress", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(watch),
    keepalive: true,
  }).catch(() => {
    /* n8n is best-effort */
  });
}

export function flushVslWatchToN8n() {
  pingN8nProgress(true);
}

export function createVslAnalytics(location: VslAnalyticsLocation) {
  const fired = new Set<string>();

  const once = (key: string, event: string, extra: Record<string, unknown>) => {
    if (fired.has(key)) return;
    fired.add(key);
    push(event, { video_location: location, ...extra });
  };

  const note = (currentTime: number, duration: number, completed = false) => {
    recordVslWatchDepth({ currentTime, duration, location, completed });
    pingN8nProgress(completed);
  };

  return {
    onPlay(currentTime: number, duration: number) {
      note(currentTime, duration);
      once("play", "vsl_play", {
        video_current_time: Math.round(currentTime),
        video_duration: Math.round(duration) || null,
        video_percent: duration
          ? Math.round((currentTime / duration) * 100)
          : 0,
      });
    },
    onTime(currentTime: number, duration: number) {
      if (!duration || duration <= 0) return;
      note(currentTime, duration);
      const percent = Math.round((currentTime / duration) * 100);
      const extra = {
        video_current_time: Math.round(currentTime),
        video_duration: Math.round(duration),
        video_percent: percent,
      };
      for (const q of QUARTILES) {
        if (percent >= q) {
          once(`q${q}`, "vsl_progress", { ...extra, video_quartile: q });
        }
      }
      for (const m of MILESTONES) {
        if (currentTime >= m.seconds) {
          once(m.event, m.event, extra);
        }
      }
      if (percent >= 95) {
        once("complete", "vsl_complete", extra);
      }
    },
    onEnded(duration: number) {
      note(duration, duration, true);
      once("complete", "vsl_complete", {
        video_current_time: Math.round(duration),
        video_duration: Math.round(duration),
        video_percent: 100,
      });
    },
  };
}
