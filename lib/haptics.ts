/** Heartbeat-style haptic for a successful daily check-in. */
export function pulseHaptic() {
  if (typeof navigator === "undefined" || typeof navigator.vibrate !== "function") {
    return;
  }

  try {
    navigator.vibrate(0);
    navigator.vibrate([16, 85, 34]);
  } catch {
    // Some browsers expose vibrate() but reject it.
  }
}
