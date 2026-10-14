const fs = require('fs');
const path = require('path');

async function applyCurrent() {
  console.log('====================================================');
  console.log('  单次无感注入汉化到当前 Antigravity 窗口 (Apply Once)');
  console.log('====================================================\n');

  const portFile = path.join(process.env.APPDATA || '', 'Antigravity', 'DevToolsActivePort');
  if (!fs.existsSync(portFile)) {
    console.error('❌ 未找到 DevToolsActivePort 文件，请确保 Antigravity 客户端已启动。');
    process.exit(1);
  }

  const port = fs.readFileSync(portFile, 'utf8').trim().split('\n')[0].trim();
  const res = await fetch(`http://127.0.0.1:${port}/json`);
  const targets = await res.json();
  const page = targets.find(t => t.type === 'page');

  if (!page) {
    console.error('❌ 未检测到 Antigravity 前台活动窗口。');
    process.exit(1);
  }

  // 直接从源码模块读取最新的 i18n 汉化引擎代码，无需依赖外部 asar 解包工具
  const enginePath = path.join(__dirname, '..', 'src', 'i18n-engine.js');
  if (!fs.existsSync(enginePath)) {
    console.error(`❌ 未找到汉化引擎核心文件: ${enginePath}`);
    process.exit(1);
  }
  const i18nCode = fs.readFileSync(enginePath, 'utf8');

  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    ws.onopen = () => {
      console.log(`[1] 正在向窗口 "${page.title}" 发送单次汉化指令 (端口: ${port})...`);
      ws.send(JSON.stringify({
        id: 1,
        method: 'Runtime.evaluate',
        params: {
          expression: i18nCode,
          returnByValue: true
        }
      }));
    };

    ws.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      if (msg.id === 1) {
        console.log('✅ 汉化指令注入成功！');
        setTimeout(() => {
          ws.send(JSON.stringify({
            id: 2,
            method: 'Runtime.evaluate',
            params: {
              expression: 'document.body ? document.body.innerText.slice(0, 150).replace(/\\n+/g, " | ") : ""',
              returnByValue: true
            }
          }));
        }, 300);
      } else if (msg.id === 2) {
        console.log(`[2] 当前界面文本采样: "${msg.result?.result?.value}"`);
        console.log('\n====================================================');
        console.log('✅ 汉化已即时生效！连接已彻底断开，无任何后台常驻进程。');
        console.log('====================================================');
        ws.close();
        resolve();
      }
    };

    ws.onerror = (err) => {
      console.error('❌ WebSocket 连接出错:', err);
      reject(err);
    };

    setTimeout(() => { ws.close(); resolve(); }, 5000);
  });
}

applyCurrent().catch(console.error);
