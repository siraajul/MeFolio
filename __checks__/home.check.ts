import { BrowserCheck } from 'checkly/constructs'
import path from 'path'

new BrowserCheck('homepage-check', {
  name: 'Homepage Check',
  activated: true,
  muted: false,
  shouldFail: false,
  locations: ['us-east-1', 'eu-central-1'],
  code: {
    entrypoint: path.join(__dirname, 'homepage.spec.ts')
  },
})
