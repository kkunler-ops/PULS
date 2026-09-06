"use client";

import posthog from "posthog-js";

const DISTINCT_ID_KEY = "puls.distinct_id";

let started = false;
let openedThisPage = false;

function distinctId() {
  let id = localStorage.getItem(DISTINCT_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(DISTINCT_ID_KEY, id);
  }
  return id;
}

function start() {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key || started || typeof window === "undefined") return false;

  posthog.init(key, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com",
    persistence: "localStorage",
    autocapture: false,
    capture_pageview: false,
    capture_pageleave: false,
    disable_session_recording: true,
    person_profiles: "identified_only",
  });
  posthog.identify(distinctId());
  started = true;
  return true;
}

export function trackAppOpen() {
  if (openedThisPage) return;
  if (!start() && !started) return;
  openedThisPage = true;
  posthog.capture("app_open");
}

export function trackCheckIn() {
  if (!start() && !started) return;
  posthog.capture("check_in");
}
