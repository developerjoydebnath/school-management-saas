import { NextRequest } from "next/server";

// Fallback to JSON server port if environment variable is not set
const TARGET_URL = process.env.API_BASE_URL || "http://127.0.0.1:3001";

async function proxyRequest(
	req: NextRequest,
	{ params }: { params: Promise<{ path: string[] }> }
) {
	try {
		const { path: pathSegments } = await params;
		const path = "/" + pathSegments.join("/");
		const searchParams = req.nextUrl.search;
		const targetUrl = `${TARGET_URL}${path}${searchParams}`;
		
		console.log("[PROXY] Fetching from:", targetUrl);

		const headers = new Headers();
		const headersToForward = ["content-type", "accept", "accept-language"];
		headersToForward.forEach(h => {
			const val = req.headers.get(h);
			if (val) headers.set(h, val);
		});

		const response = await fetch(targetUrl, {
			method: req.method,
			headers,
			body: req.method !== "GET" && req.method !== "HEAD" ? req.body : null,
			cache: "no-store",
			...(req.method !== "GET" && req.method !== "HEAD" ? { duplex: "half" } : {}),
		} as any);

		const resHeaders = new Headers(response.headers);
		resHeaders.delete("content-encoding");
		resHeaders.delete("content-length");

		return new Response(response.body, {
			status: response.status,
			statusText: response.statusText,
			headers: resHeaders,
		});
	} catch (error: any) {
		console.error("[PROXY_ERROR]", error.message);
		return new Response(JSON.stringify({ error: error.message }), { status: 500 });
	}
}

// Map all standard HTTP methods to the proxy handler
export const GET = proxyRequest;
export const POST = proxyRequest;
export const PUT = proxyRequest;
export const PATCH = proxyRequest;
export const DELETE = proxyRequest;
export const HEAD = proxyRequest;
export const OPTIONS = proxyRequest;
