import path from 'path'
import { fileURLToPath } from 'url'
import { BrowserCheck } from 'checkly/constructs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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
