import puppeteer from 'puppeteer-core'
import { mkdir } from 'fs/promises'

const BROWSER_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const BASE_URL = 'http://localhost:5173'
const OUT_DIR = './public/ui'

const SCREENS = [
  { route: '/shift-briefing', name: 'shift-briefing' },
  { route: '/patients',       name: 'patients' },
  { route: '/appointments',   name: 'appointments' },
  { route: '/medical-records',name: 'medical-records' },
  { route: '/messages',       name: 'messages' },
  { route: '/tasks',          name: 'tasks' },
  { route: '/operational-insights', name: 'operational-insights' },
  { route: '/settings',       name: 'settings' },
]

await mkdir(OUT_DIR, { recursive: true })

const browser = await puppeteer.launch({
  executablePath: BROWSER_PATH,
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900'],
})

const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 })

for (const screen of SCREENS) {
  console.log(`Capturing ${screen.name}…`)
  await page.goto(`${BASE_URL}${screen.route}`, { waitUntil: 'networkidle2', timeout: 15000 })
  await new Promise(r => setTimeout(r, 800))
  await page.screenshot({
    path: `${OUT_DIR}/${screen.name}.png`,
    fullPage: false,
  })
  console.log(`  ✓ ${screen.name}.png`)
}

await browser.close()
console.log('Done — screenshots saved to', OUT_DIR)
