import { defineConfig } from 'checkly'
import { RetryStrategyBuilder } from 'checkly/constructs'

/**
 * See https://docs.checklyhq.com/docs/cli/config-file/ for all available config options.
 */
const config = defineConfig({
  /* A human readable name for your project. */
  projectName: 'MeFolio Production Monitoring',
  /* A logical ID for this project. */
  logicalId: 'mefolio-monitoring',
  /* An optional ID to subgroup related checks. */
  repoUrl: 'https://github.com/siraajul/MeFolio',
  /* Weekly or daily check results email summary. */
  /* How often you want to receive email alerts. */
  /* The default check settings. */
  checks: {
    /* A list of locations where you want your checks to run from. */
    locations: ['us-east-1', 'eu-central-1'],
    /* How often should your check run? */
    checkFrequencyLoop: 10, // minutes
    /* How long should Checkly wait for a check to complete? */
    timeout: 30, // seconds
    /* The strategy to use when a check fails. */
    retryStrategy: RetryStrategyBuilder.fixedStrategy({
      baseBackoffSeconds: 60,
      maxRetries: 2,
      sameRegion: true,
    }),
    /* The Playwright-specific check settings. */
    browserChecks: {
      /* The Playwright version to use. */
      testMatch: '**/__checks__/**/*.check.ts',
    },
  },
  cli: {
    /* The default Checkly CLI settings. */
    runLocation: 'us-east-1',
  },
})

export default config
