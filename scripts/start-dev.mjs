import { spawn } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectDirectory = fileURLToPath(new URL('../', import.meta.url))
const viteEntry = resolve(projectDirectory, 'node_modules/vite/bin/vite.js')
const args = process.argv.slice(2)
const portIndex = args.indexOf('--port')
const portArgument = args.find(argument => argument.startsWith('--port='))
const port = Number(portIndex >= 0 ? args[portIndex + 1] : portArgument?.slice(7) ?? 5173)
const validPort = Number.isInteger(port) && port > 0 && port < 65536
const localUrl = validPort ? 'http://127.0.0.1:' + port + '/' : null

if (!existsSync(viteEntry)) {
  console.error('Chưa có thư viện để chạy website. Hãy chạy npm install trước.')
  process.exitCode = 1
} else {
  const title = readFileSync(resolve(projectDirectory, 'index.html'), 'utf8').match(/<title>([\s\S]*?)<\/title>/)?.[1].trim()
  let alreadyRunning = false
  if (localUrl && title) {
    try {
      const response = await fetch(localUrl, { signal: AbortSignal.timeout(1500) })
      const html = await response.text()
      alreadyRunning = response.ok && html.includes('/@vite/client') && html.includes(title)
    } catch {
      // The development server has not started yet.
    }
  }

  if (alreadyRunning) {
    console.log('Website Linh Xuân đang chạy. Dùng lại địa chỉ hiện có.')
    console.log('  Local:   ' + localUrl)
  } else {
    console.log('Starting Linh Xuan website...')
    const child = spawn(process.execPath, [viteEntry, ...args], {
      cwd: projectDirectory,
      stdio: 'inherit',
    })
    for (const signal of ['SIGINT', 'SIGTERM']) {
      process.once(signal, () => child.kill(signal))
    }
    child.once('error', error => {
      console.error('Không khởi động được website: ' + error.message)
      process.exitCode = 1
    })
    child.once('exit', code => {
      process.exitCode = code ?? 1
    })
  }
}
