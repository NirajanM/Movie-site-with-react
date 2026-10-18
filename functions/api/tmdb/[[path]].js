const TMDB_API = "https://api.themoviedb.org/3";
const PATH_PATTERN = /^[a-z0-9_/-]+$/i;

export async function onRequest(context) {
  const { request, env } = context;
  if (request.method !== "GET") {
    return new Response("Method Not Allowed", {
      status: 405,
      headers: { allow: "GET" },
    });
  }

  const token = env.TMDB_TOKEN || env.VITE_TOKEN;
  if (!token) {
    return new Response(JSON.stringify({ error: "TMDB token not configured" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }

  const url = new URL(request.url);
  const path = url.pathname
    .replace(/^\/api\/tmdb\/?/, "")
    .replace(/\/+/g, "/");

  if (!PATH_PATTERN.test(path) || path.includes("..")) {
    return new Response(JSON.stringify({ error: "Invalid path" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const target = new URL(`${TMDB_API}/${path}`);
  url.searchParams.forEach((value, key) => target.searchParams.set(key, value));

  const cache = caches.default;
  const cacheKey = new Request(target.toString(), { method: "GET" });
  const cached = await cache.match(cacheKey);
  if (cached) {
    return cached;
  }

  const upstream = await fetch(target.toString(), {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cf: { cacheTtl: 3600, cacheEverything: true },
  });

  const headers = new Headers();
  headers.set(
    "content-type",
    upstream.headers.get("content-type") || "application/json"
  );
  headers.set(
    "cache-control",
    upstream.ok ? "public, max-age=300, s-maxage=3600" : "no-store"
  );

  const response = new Response(upstream.body, {
    status: upstream.status,
    headers,
  });

  if (upstream.ok) {
    context.waitUntil(cache.put(cacheKey, response.clone()));
  }

  return response;
}
