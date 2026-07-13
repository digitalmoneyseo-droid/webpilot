"use server";

import { timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ACCESS_COOKIE, createAccessToken } from "@/lib/access";

export async function unlockSite(formData: FormData) {
  const supplied = String(formData.get("password") ?? "");
  const expected = process.env.ACCESS_PASSWORD;
  const secret = process.env.ACCESS_SECRET;
  if (!expected || !secret) redirect("/");
  const suppliedBuffer = Buffer.from(supplied);
  const expectedBuffer = Buffer.from(expected);
  const valid = suppliedBuffer.length === expectedBuffer.length && timingSafeEqual(suppliedBuffer, expectedBuffer);
  if (!valid) redirect("/access?error=1");
  const store = await cookies();
  store.set(ACCESS_COOKIE, createAccessToken(secret), { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production", maxAge: 60 * 60 * 12, path: "/" });
  redirect("/");
}

