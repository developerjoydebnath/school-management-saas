import { NextRequest } from "next/server";

// Fallback to JSON server port if environment variable is not set
const TARGET_URL = process.env.API_BASE_URL || "http://localhost:3001";

async function proxyRequest(req: NextRequest) {
	try {
		// 1. Construct the target URL
		// This strips /api/proxy and retains the rest of the path
		const path = req.nextUrl.pathname.replace(/^\/api\/proxy/, "");
		const searchParams = req.nextUrl.search;

		// Safely construct the full URL
		const targetUrl = new URL(`${path}${searchParams}`, TARGET_URL).toString();

		// 2. Forward Request Headers
		const headers = new Headers(req.headers);
		// Remove host header to avoid conflicts with the target server
		headers.delete("host");
		// Remove connection header
		headers.delete("connection");

		// 3. Handle Request Body
		// For methods that support body, pass the raw stream directly
		const hasBody = req.method !== "GET" && req.method !== "HEAD" && req.method !== "OPTIONS";
		const body = hasBody ? req.body : null;

		// 4. Perform the Proxy Fetch Request
		const fetchOptions: any = {
			method: req.method,
			headers,
			body,
			redirect: "manual",
			// Bypass Next.js cache to ensure real-time data from backend
			cache: "no-store",
			// Required parameter for passing a ReadableStream in Next.js fetch
			duplex: "half",
		};

		const response = await fetch(targetUrl, fetchOptions);

		// 5. Forward Response Headers safely
		const resHeaders = new Headers(response.headers);
		// Let the Next.js edge handle content encoding
		resHeaders.delete("content-encoding");
		resHeaders.delete("content-length"); // Length might change if encoding is stripped

		// 6. Return the Response Stream
		return new Response(response.body, {
			status: response.status,
			statusText: response.statusText,
			headers: resHeaders,
		});
	} catch (error: any) {
		console.error("[PROXY_ERROR]", error.message);

		return new Response(
			JSON.stringify({
				error: "Proxy Request Failed",
				message:
					"Unable to connect to the target API server. Ensure your backend server is running.",
				details: error.message,
			}),
			{
				status: 502, // Bad Gateway
				headers: { "Content-Type": "application/json" },
			}
		);
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
