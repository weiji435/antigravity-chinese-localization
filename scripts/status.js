const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

async function checkStatus() {
  console.log('====================================================');
  console.log('  Google Antigravity 全量原生汉化状态检测 (Status Check)');
  console.log('====================================================\n');

  // 1. 检测是否有残留的危险后台守护进程 (CDP daemon)
  let daemonRunning = false;
  try {
    const ps = execSync('powershell -NoProfile -Command "Get-CimInstance Win32_Process -Filter \\"name = \'node.exe\'\\" | Where-Object { $_.CommandLine -like \'*daemon.js*\' } | Select-Object -ExpandProperty ProcessId"').toString().trim();
    if (ps.length > 0) daemonRunning = true;
  } catch (e) {}

  console.log(`[1] 后台守护进程检测: ${daemonRunning ? '⚠️ 发现残留常驻进程 (建议立即终止)' : '✅ 正常 (零外置后台守护，无卡死风险)'}`);

  // 2. 检测 resources/app.asar 固化状态
  const localAppData = process.env.LOCALAPPDATA || path.join(process.env.USERPROFILE || 'C:\\Users\\Hp', 'AppData', 'Local');
  const resourcesDir = path.join(localAppData, 'Programs', 'antigravity', 'resources');
  const asarPath = path.join(resourcesDir, 'app.asar');
  const bakPath = path.join(resourcesDir, 'app.asar.original.bak');

  const asarExists = fs.existsSync(asarPath);
  const bakExists = fs.existsSync(bakPath);

  console.log(`[2] 核心资源包 (app.asar): ${asarExists ? '✅ 存在 (' + (fs.statSync(asarPath).size / 1024 / 1024).toFixed(2) + ' MB)' : '❌ 未找到'}`);
  console.log(`[3] 官方原版备份 (app.asar.original.bak): ${bakExists ? '✅ 完备安全 (' + (fs.statSync(bakPath).size / 1024 / 1024).toFixed(2) + ' MB)' : '⚠️ 未检测到备份'}`);

  if (asarExists) {
    try {
      let asar;
      try {
        asar = require('@electron/asar');
      } catch (_) {
        const local = path.join(__dirname, '..', 'node_modules', '@electron', 'asar');
        if (fs.existsSync(local)) asar = require(local);
        else {
          const npxDir = path.join(localAppData, 'npm-cache', '_npx');
          if (fs.existsSync(npxDir)) {
            const dirs = fs.readdirSync(npxDir);
            for (const d of dirs) {
              const candidate = path.join(npxDir, d, 'node_modules', '@electron', 'asar', 'lib', 'asar.js');
              if (fs.existsSync(candidate)) { asar = require(candidate); break; }
            }
          }
        }
      }
      if (!asar) throw new Error('未加载到 asar 模块');
      const preload = asar.extractFile(asarPath, 'dist/preload.js').toString('utf8');
      const isPatched = preload.includes('Antigravity Native UI Localization Engine');
      console.log(`[4] ASAR 内置原生汉化引擎: ${isPatched ? '✅ 已固化嵌入 (启动自生效)' : '❌ 未嵌入 (当前为官方原版)'}`);
      const menu = asar.extractFile(asarPath, 'dist/menu.js').toString('utf8');
      const isMenuPatched = menu.includes('MENU_LOCALES');
      console.log(`[5] 原生顶部菜单汉化: ${isMenuPatched ? '✅ 已嵌入' : '❌ 未嵌入'}`);
    } catch (e) {
      console.log(`[4] ASAR 校验异常: ${e.message}`);
    }
  }

  // 3. 当前运行中的窗口检测
  const portFile = path.join(process.env.APPDATA || '', 'Antigravity', 'DevToolsActivePort');
  if (fs.existsSync(portFile)) {
    const port = fs.readFileSync(portFile, 'utf8').trim().split('\n')[0].trim();
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json`);
      const targets = await res.json();
      const page = targets.find(t => t.type === 'page');
      if (page) {
        console.log(`\n[6] 客户端当前窗口: "${page.title}" (端口: ${port})`);
        const ws = new WebSocket(page.webSocketDebuggerUrl);
        await new Promise((resolve) => {
          ws.onopen = () => {
            ws.send(JSON.stringify({
              id: 1,
              method: 'Runtime.evaluate',
              params: {
                expression: `({
                  loaded: !!window.__ag_native_i18n_loaded,
                  sampleText: document.body ? document.body.innerText.slice(0, 150).replace(/\\n+/g, ' | ') : ''
                })`,
                returnByValue: true
              }
            }));
          };
          ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            const val = data.result?.result?.value;
            if (val) {
              console.log(`    - 页面汉化加载状态: ${val.loaded ? '✅ 已在内存中加载' : '⚠️ 尚未加载'}`);
              console.log(`    - 界面文本采样: "${val.sampleText}"`);
            }
            ws.close();
            resolve();
          };
          ws.onerror = () => resolve();
          setTimeout(() => { ws.close(); resolve(); }, 2000);
        });
      }
    } catch (e) {
      console.log(`\n[6] 客户端当前窗口: 无法通过调试端口连接 (${e.message})`);
    }
  } else {
    console.log('\n[6] 客户端当前窗口: 未运行');
  }

  console.log('\n====================================================');
}

checkStatus().catch(console.error);
