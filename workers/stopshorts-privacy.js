const ORIGIN = "https://byeolter.com/stopshorts/privacy/";

export default {
  async fetch(request) {
    const incomingUrl = new URL(request.url);

    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method not allowed", {
        status: 405,
        headers: { Allow: "GET, HEAD" },
      });
    }

    if (incomingUrl.pathname === "/") {
      return Response.redirect("https://stopshorts.byeolter.com/privacy", 302);
    }

    if (incomingUrl.pathname !== "/privacy" && incomingUrl.pathname !== "/privacy/") {
      return new Response("Not found", { status: 404 });
    }

    const upstream = await fetch(ORIGIN, {
      method: request.method,
      headers: { Accept: request.headers.get("Accept") ?? "text/html" },
    });
    const headers = new Headers(upstream.headers);
    headers.set("Cache-Control", "public, max-age=300");
    headers.set("X-Robots-Tag", "index, follow");

    return new Response(upstream.body, {
      status: upstream.status,
      headers,
    });
  },
};
