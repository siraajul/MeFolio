"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import posthog from "posthog-js";
import packageJson from "../../package.json";

export function SentryProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // PostHog Init
    if (typeof window !== "undefined") {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        person_profiles: "identified_only",
        capture_pageview: false,
      });
    }

    // Sentry Init
    if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
      Sentry.init({
        dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
        // IMPORTANT: Disabled PII to prevent exposing user personal information
        // This helps comply with GDPR and other privacy regulations
        sendDefaultPii: false,
        tracesSampleRate: process.env.NODE_ENV === "development" ? 1.0 : 0.1,

        // Release Health Configuration
        release: `${packageJson.name}@${packageJson.version}`,
        environment: process.env.NODE_ENV,

        // Session Replay Configuration
        replaysSessionSampleRate: 0.1,
        replaysOnErrorSampleRate: 1.0,
        integrations: [
          Sentry.replayIntegration({
            // Mask all inputs and text to prevent leaking sensitive data
            maskAllInputs: true,
            maskAllText: false, // Set to true if you want to mask all text
            blockAllMedia: false,
          }),
        ],

        // Before sending events, filter out sensitive data
        beforeSend(event) {
          // Remove URL query parameters that might contain sensitive data
          if (event.request?.url) {
            try {
              const url = new URL(event.request.url);
              // Remove common sensitive query params
              ['token', 'password', 'secret', 'api_key', 'apikey', 'auth'].forEach(param => {
                url.searchParams.delete(param);
              });
              event.request.url = url.toString();
            } catch {
              // URL parsing failed, keep original
            }
          }
          return event;
        },
      });
    }
  }, []);

  return <>{children}</>;
}
