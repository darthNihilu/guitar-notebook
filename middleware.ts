import { NextResponse } from "next/server";

export function middleware(request: Request) {
	const requestHeaders = new Headers(request.headers);
	requestHeaders.set("x-url", new URL(request.url).origin.replace("https", "http"));

	return NextResponse.next({
		request: {
			headers: requestHeaders,
		},
	});
}
