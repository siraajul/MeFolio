import * as Sentry from "@sentry/nextjs";
import packageJson from "./package.json";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  sendDefaultPii: true,
  tracesSampleRate: process.env.NODE_ENV === "development" ? 1.0 : 0.1,

  // Release Health Configuration
  release: `${packageJson.name}@${packageJson.version}`,
  environment: process.env.NODE_ENV,

  enableLogs: true,
});
