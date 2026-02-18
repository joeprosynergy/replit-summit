"use client";

const COOKIE_NAME = "sb-admin-auth";
const MAX_AGE_SECONDS = 60 * 60 * 24; // 24 hours

export function setAdminSessionCookie() {
  if (typeof document === "undefined") return;
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE_NAME}=1; path=/; max-age=${MAX_AGE_SECONDS}; SameSite=Strict${secure}`;
}

export function clearAdminSessionCookie() {
  if (typeof document === "undefined") return;
  document.cookie = `${COOKIE_NAME}=; path=/; max-age=0; SameSite=Strict`;
}
