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
        sendDefaultPii: true,
        tracesSampleRate: process.env.NODE_ENV === "development" ? 1.0 : 0.1,
        
        // Release Health Configuration
        release: `${packageJson.name}@${packageJson.version}`,
        environment: process.env.NODE_ENV,
        
        replaysSessionSampleRate: 0.1,
        replaysOnErrorSampleRate: 1.0,
        integrations: [
          Sentry.replayIntegration(),
        ],
      });
    }
  }, []);

  return <>{children}</>;
}
