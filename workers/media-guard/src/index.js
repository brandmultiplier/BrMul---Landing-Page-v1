const PREFIX = "vsl/";

function allowedHosts(env) {
  return (env.ALLOWED_HOSTS || "www.brandmultiplier.ai,brandmultiplier.ai,localhost,127.0.0.1")
    .split(",")
    .map((host) => host.trim())
    .filter(Boolean);
}

function hostFromHeader(value) {
  if (!value) return null;
  try {
    if (value.startsWith("http://") || value.startsWith("https://")) {
      return new URL(value).hostname;
    }
    return new URL(`https://${value}`).hostname;
  } catch {
    return null;
  }
}

function isAllowedHost(hostname, allow) {
  if (!hostname) return false;
  if (allow.includes(hostname)) return true;
  if (hostname.endsWith(".vercel.app")) return true;
  return false;
}

function requestAllowed(request, env) {
  const allow = allowedHosts(env);
  const originHost = hostFromHeader(request.headers.get("Origin"));
  const refererHost = hostFromHeader(request.headers.get("Referer"));
  if (originHost) return isAllowedHost(originHost, allow);
  if (refererHost) return isAllowedHost(refererHost, allow);
  return false;
}

function corsHeaders(request, env) {
  const origin = request.headers.get("Origin");
  const originHost = hostFromHeader(origin);
  if (!origin || !isAllowedHost(originHost, allowedHosts(env))) return {};
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
    "Access-Control-Allow-Headers": "Range, Content-Type",
    "Access-Control-Expose-Headers": "Content-Length, Content-Range, Accept-Ranges",
    Vary: "Origin",
  };
}

function cacheControl(key) {
  if (key.endsWith(".m3u8")) return "public, max-age=30";
  return "public, max-age=31536000, immutable";
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(request, env) });
    }

    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    if (!requestAllowed(request, env)) {
      return new Response("Forbidden", { status: 403, headers: corsHeaders(request, env) });
    }

    const url = new URL(request.url);
    let key = url.pathname.replace(/^\/+/, "");
    if (!key || key.endsWith("/")) key = `${key}master.m3u8`.replace(/^\/+/, "");
    if (key.startsWith("vsl/") === false) key = `${PREFIX}${key}`;

    const hasRange = request.headers.has("Range");
    const object = await env.MEDIA.get(
      key,
      hasRange ? { range: request.headers } : undefined,
    );

    if (!object) {
      return new Response("Not Found", { status: 404, headers: corsHeaders(request, env) });
    }

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set("etag", object.httpEtag);
    headers.set("Cache-Control", cacheControl(key));
    headers.set("Accept-Ranges", "bytes");
    if (hasRange && object.range) {
      const { offset, length } = object.range;
      const end = offset + (length ?? object.size) - 1;
      headers.set("Content-Range", `bytes ${offset}-${end}/${object.size}`);
    }
    const cors = corsHeaders(request, env);
    for (const [name, value] of Object.entries(cors)) headers.set(name, value);

    const status = hasRange && object.range ? 206 : 200;
    if (request.method === "HEAD") {
      return new Response(null, { status, headers });
    }
    return new Response(object.body, { status, headers });
  },
};
