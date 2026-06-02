import type { Instrumentation } from "next";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");
  }
}

// Automatically captures all unhandled server-side request errors
// Requires @sentry/nextjs >= 8.28.0
// Next.js 15+ signature: (error, request, context)
export const onRequestError: Instrumentation.onRequestError = async (err, request, context) => {
  const Sentry = await import("@sentry/nextjs");
  return Sentry.captureRequestError(err, request, context);
};
