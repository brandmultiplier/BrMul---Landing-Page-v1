export type VslWatchLocation = "library" | "resources";

export type VslWatchDepth = {
  played: boolean;
  seconds: number;
  percent: number;
  minutes: number;
  minutes_label: string;
  duration: number;
  completed: boolean;
  past_300: boolean;
  past_333: boolean;
  location: VslWatchLocation | null;
  updated_at: number;
};

export const VSL_WATCH_STORAGE_KEY = "bm_vsl_watch";

function minutesLabel(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function minutesValue(seconds: number) {
  return Math.round((seconds / 60) * 10) / 10;
}

const EMPTY: VslWatchDepth = {
  played: false,
  seconds: 0,
  percent: 0,
  minutes: 0,
  minutes_label: "0:00",
  duration: 0,
  completed: false,
  past_300: false,
  past_333: false,
  location: null,
  updated_at: 0,
};

function clamp(value: number, min: number, max: number) {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}

export function sanitizeVslWatchDepth(input: unknown): VslWatchDepth {
  const raw =
    input && typeof input === "object" ? (input as Record<string, unknown>) : {};
  const seconds = clamp(Math.round(Number(raw.seconds) || 0), 0, 24 * 60 * 60);
  const percent = clamp(Math.round(Number(raw.percent) || 0), 0, 100);
  const duration = clamp(Math.round(Number(raw.duration) || 0), 0, 24 * 60 * 60);
  const location =
    raw.location === "library" || raw.location === "resources"
      ? raw.location
      : null;
  const completed = Boolean(raw.completed) || percent >= 95;
  return {
    played: Boolean(raw.played) || seconds > 0,
    seconds,
    percent,
    minutes: minutesValue(seconds),
    minutes_label: minutesLabel(seconds),
    duration,
    completed,
    past_300: Boolean(raw.past_300) || seconds >= 300,
    past_333: Boolean(raw.past_333) || seconds >= 333,
    location,
    updated_at: clamp(Math.round(Number(raw.updated_at) || Date.now()), 0, Date.now() + 60_000),
  };
}

function readFrom(storage: Storage | null): VslWatchDepth | null {
  if (!storage) return null;
  try {
    const raw = storage.getItem(VSL_WATCH_STORAGE_KEY);
    if (!raw) return null;
    return sanitizeVslWatchDepth(JSON.parse(raw));
  } catch {
    return null;
  }
}

function writeTo(storage: Storage | null, value: VslWatchDepth) {
  if (!storage) return;
  try {
    storage.setItem(VSL_WATCH_STORAGE_KEY, JSON.stringify(value));
  } catch {
    /* private mode */
  }
}

export function readVslWatchDepth(): VslWatchDepth {
  if (typeof window === "undefined") return { ...EMPTY };
  const session = readFrom(window.sessionStorage);
  const local = readFrom(window.localStorage);
  if (!session && !local) return { ...EMPTY };
  if (!session) return local!;
  if (!local) return session;
  return session.seconds >= local.seconds ? session : local;
}

export function recordVslWatchDepth(update: {
  currentTime: number;
  duration: number;
  location: VslWatchLocation;
  completed?: boolean;
}): VslWatchDepth {
  const prev = readVslWatchDepth();
  const duration = Math.max(
    prev.duration,
    Math.round(update.duration) || 0,
  );
  const seconds = Math.max(prev.seconds, Math.round(update.currentTime) || 0);
  const percent =
    duration > 0
      ? Math.max(prev.percent, Math.round((seconds / duration) * 100))
      : prev.percent;
  const next = sanitizeVslWatchDepth({
    ...prev,
    played: true,
    seconds,
    percent,
    duration,
    completed: Boolean(update.completed) || prev.completed || percent >= 95,
    past_300: prev.past_300 || seconds >= 300,
    past_333: prev.past_333 || seconds >= 333,
    location: update.location,
    updated_at: Date.now(),
  });
  if (typeof window !== "undefined") {
    writeTo(window.sessionStorage, next);
    writeTo(window.localStorage, next);
  }
  return next;
}

export function vslWatchWebhookFields(watch: VslWatchDepth) {
  return {
    vsl_played: watch.played,
    vsl_seconds: watch.seconds,
    vsl_minutes: watch.minutes,
    vsl_minutes_label: watch.minutes_label,
    vsl_percent: watch.percent,
    vsl_duration: watch.duration || null,
    vsl_completed: watch.completed,
    vsl_past_300: watch.past_300,
    vsl_past_333: watch.past_333,
    vsl_watch_location: watch.location,
    vsl_watch: watch,
  };
}
