/**
 * Single exit point for every outbound n8n webhook.
 *
 * Every call logs one line whether it succeeds or fails. Routes used to log
 * only on failure, which made "the webhook never fired" indistinguishable from
 * "n8n accepted it and did nothing" — the terminal now answers that directly.
 */

const DEFAULT_TIMEOUT_MS = 8000;
const BODY_SNIPPET_LIMIT = 300;

function payloadHint(name: string, payload: unknown): string {
  if (!payload || typeof payload !== "object") return "";
  const p = payload as Record<string, unknown>;
  if (name === "library-optin" || name === "vsl-progress") {
    return ` source=${String(p.source ?? "")} vsl_played=${String(p.vsl_played)} vsl_seconds=${String(p.vsl_seconds)} vsl_percent=${String(p.vsl_percent)}`;
  }
  if (name === "storylock-tax") {
    return ` source=${String(p.source ?? "")} has_email=${Boolean(p.email)}`;
  }
  if (name === "storylock-tax-tool") {
    return ` source=${String(p.source ?? "")} has_email=${Boolean(p.email)} has_lead_id=${Boolean(p.lead_id)}`;
  }
  return "";
}

export type WebhookResult = {
  ok: boolean;
  status: number;
  /** Set when the request never produced an HTTP response. */
  error?: string;
};

export async function postWebhook(
  name: string,
  url: string | undefined,
  payload: unknown,
  envVarName: string,
  timeoutMs: number = DEFAULT_TIMEOUT_MS,
): Promise<WebhookResult> {
  if (!url) {
    console.error(`[webhook:${name}] skipped — ${envVarName} is not set`);
    return { ok: false, status: 0, error: "missing_env" };
  }

  const startedAt = Date.now();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: controller.signal,
    });

    const body = (await response.text().catch(() => "")).slice(
      0,
      BODY_SNIPPET_LIMIT,
    );
    const line = `[webhook:${name}] ${response.status} in ${Date.now() - startedAt}ms${payloadHint(name, payload)} ${body}`;

    if (response.ok) {
      console.info(line);
    } else {
      console.error(line);
    }

    return { ok: response.ok, status: response.status };
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err);
    console.error(
      `[webhook:${name}] no response after ${Date.now() - startedAt}ms — ${reason}`,
    );
    return { ok: false, status: 0, error: reason };
  } finally {
    clearTimeout(timeout);
  }
}
