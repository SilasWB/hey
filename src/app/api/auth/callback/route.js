"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request) {
	const cookieStore = await cookies();
	const code = request.nextUrl.searchParams.get("code");

	const response = await fetch(`https://accounts.spotify.com/api/token`, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization: `Basic ${btoa(process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET)}`
			},
			body: new URLSearchParams({
				grant_type: "refresh_token",
				refresh_token: request.cookies.get("ipm_refresh_token"),
				client_id: process.env.CLIENT_ID
			})
		});

	const data = await response.json();

	console.log("data", data.access_token);

cookieStore.set({
    name: "ipm_access_token", 
    value: data.access_token,
    maxAge: data.expires_in 
});

cookieStore.set({
    name: "ipm_refresh_token", 
    value: data.refresh_token,
    maxAge: 60 * 60 * 24 * 30
});

redirect("/")
}