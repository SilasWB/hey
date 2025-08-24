"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request) {
  const cookieStore = await cookies();
  const code = request.nextUrl.searchParams.get("code");

  // Exchange code for tokens
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET)}`,
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: process.env.NEXT_PUBLIC_CALLBACK_URL, // must match dashboard
    }),
  });

  const data = await response.json();
  console.log("callback data:", data);

  if (data.access_token) {
    cookieStore.set("ipm_access_token", data.access_token, {
      maxAge: data.expires_in,
    });
  }

  if (data.refresh_token) {
    cookieStore.set("ipm_refresh_token", data.refresh_token, {
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  redirect("/walkthrough");
}
