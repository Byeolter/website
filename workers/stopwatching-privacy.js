const POLICY_URL = "https://byeolter.com/stopwatching/privacy/";

export default {
  async fetch(request) {
    const incomingUrl = new URL(request.url);

    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method not allowed", {
        status: 405,
        headers: { Allow: "GET, HEAD" },
      });
    }

    if (
      incomingUrl.pathname !== "/" &&
      incomingUrl.pathname !== "/privacy" &&
      incomingUrl.pathname !== "/privacy/"
    ) {
      return new Response("Not found", { status: 404 });
    }

    return Response.redirect(POLICY_URL, 302);
  },
};
