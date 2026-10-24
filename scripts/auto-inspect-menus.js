const fs = require('fs');
const path = require('path');

async function autoInspect() {
  console.log('====================================================');
  console.log('  Antigravity 菜单与交互界面原生汉化全自动化自检');
  console.log('====================================================\n');

  const portFile = path.join(process.env.APPDATA || '', 'Antigravity', 'DevToolsActivePort');
  if (!fs.existsSync(portFile)) {
    console.error('❌ 未找到 DevToolsActivePort 文件，请确保 Antigravity 客户端已启动。');
    return;
  }
  const port = fs.readFileSync(portFile, 'utf8').trim().split('\n')[0].trim();
  const res = await fetch(`http://127.0.0.1:${port}/json`);
  const targets = await res.json();
  const page = targets.find(t => t.type === 'page');
  if (!page) {
    console.error('❌ 未检测到活动窗口。');
    return;
  }

  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise(resolve => {
    ws.onopen = () => {
      console.log('[1] 正在模拟触发会话菜单 (More options)...');
      ws.send(JSON.stringify({
        id: 1,
        method: 'Runtime.evaluate',
        params: {
          expression: `(() => {
            const btn = document.querySelector('button[aria-label*="More options"], button[aria-label*="更多选项"], button[aria-label*="更多操作"]');
            if (btn) {
              btn.click();
              return true;
            }
            return false;
          })()`,
          returnByValue: true
        }
      }));
    };

    ws.onmessage = e => {
      const data = JSON.parse(e.data);
      if (data.id === 1) {
        if (!data.result?.result?.value) {
          console.warn('⚠️ 未在界面上找到会话卡片选项按钮。');
          ws.close();
          resolve();
          return;
        }

        setTimeout(() => {
          ws.send(JSON.stringify({
            id: 2,
            method: 'Runtime.evaluate',
            params: {
              expression: `(() => {
                const items = Array.from(document.querySelectorAll('[role="menuitem"]')).map(i => i.innerText.trim());
                // 模拟展开拆分子菜单
                const splitItem = document.querySelector('[data-testid="conversation-split-submenu"]');
                if (splitItem) {
                  splitItem.focus();
                  splitItem.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', code: 'ArrowRight', keyCode: 39, bubbles: true }));
                }
                return items;
              })()`,
              returnByValue: true
            }
          }));
        }, 300);
      } else if (data.id === 2) {
        const items = data.result?.result?.value || [];
        console.log('[2] 会话主菜单已弹出，当前渲染条目:');
        items.forEach((item, idx) => console.log(`    ${idx + 1}. ${item}`));

        const englishFound = items.map(t => t.replace(/(Ctrl|Alt|Shift)\+[A-Za-z0-9+]+/gi, '').trim()).filter(t => /[a-zA-Z]{3,}/.test(t));
        if (englishFound.length === 0) {
          console.log('✅ 会话主菜单已全部完成原生汉化！\n');
        } else {
          console.warn('⚠️ 会话主菜单检测到未汉化项:', englishFound, '\n');
        }

        setTimeout(() => {
          ws.send(JSON.stringify({
            id: 3,
            method: 'Runtime.evaluate',
            params: {
              expression: `(() => {
                const items = Array.from(document.querySelectorAll('[role="menuitem"]')).map(i => i.innerText.trim());
                return items;
              })()`,
              returnByValue: true
            }
          }));
        }, 800);
      } else if (data.id === 3) {
        const allItems = data.result?.result?.value || [];
        console.log('[3] 二级子菜单（拆分选项）展开检测:');
        allItems.forEach((item, idx) => console.log(`    ${idx + 1}. ${item.replace(/\n+/g, ' ')}`));

        // 过滤快捷键如 Ctrl+D、Ctrl+Shift+D、Alt+Shift+P 后的英文
        const subEnglish = allItems.map(t => t.replace(/(Ctrl|Alt|Shift)\+[A-Za-z0-9+]+/gi, '').trim()).filter(t => /[a-zA-Z]{3,}/.test(t));
        if (subEnglish.length === 0) {
          console.log('\n====================================================');
          console.log('🎉 深度自检通过！主菜单及二级子菜单 100% 汉化完成！');
          console.log('====================================================');
        } else {
          console.warn('\n⚠️ 子菜单检测到未汉化项:', subEnglish);
        }

        ws.send(JSON.stringify({
          id: 4,
          method: 'Runtime.evaluate',
          params: { expression: `document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', keyCode: 27, bubbles: true }))` }
        }));
      } else if (data.id === 4) {
        ws.close();
        resolve();
      }
    };
    setTimeout(() => { ws.close(); resolve(); }, 6000);
  });
}

autoInspect().catch(console.error);
