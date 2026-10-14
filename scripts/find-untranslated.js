const fs = require('fs');
const path = require('path');

async function findEnglish() {
  const portFile = path.join(process.env.APPDATA || '', 'Antigravity', 'DevToolsActivePort');
  if (!fs.existsSync(portFile)) return;
  const port = fs.readFileSync(portFile, 'utf8').trim().split('\n')[0].trim();
  const res = await fetch(`http://127.0.0.1:${port}/json`);
  const targets = await res.json();
  const page = targets.find(t => t.type === 'page');
  if (!page) return;

  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise(resolve => {
    ws.onopen = () => {
      ws.send(JSON.stringify({
        id: 1,
        method: 'Runtime.evaluate',
        params: {
          expression: `(() => {
            const results = new Set();
            const EXCL = 'style, script, svg, code, pre, kbd, samp, .monaco-editor, .xterm, .prose, .markdown, [class*="chat-message"], [class*="file-title"], [class*="file-path"]';
            const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
            let node;
            while ((node = walker.nextNode())) {
              if (node.parentElement && node.parentElement.closest(EXCL)) continue;
              const t = node.nodeValue.trim();
              if (t && /[a-zA-Z]{2,}/.test(t) && !/[\\u4e00-\\u9fa5]/.test(t)) {
                results.add('TEXT: ' + t);
              }
            }
            const attrs = document.querySelectorAll('[placeholder], [title], [aria-label]');
            attrs.forEach(el => {
              if (el.closest(EXCL)) return;
              ['placeholder', 'title', 'aria-label'].forEach(a => {
                const val = el.getAttribute(a);
                if (val && /[a-zA-Z]{2,}/.test(val) && !/[\\u4e00-\\u9fa5]/.test(val)) {
                  results.add('[' + a + '] ' + val.trim());
                }
              });
            });
            return Array.from(results);
          })()`,
          returnByValue: true
        }
      }));
    };
    ws.onmessage = e => {
      const data = JSON.parse(e.data);
      console.log('=== Untranslated Elements in Current View ===');
      const list = data.result?.result?.value || [];
      list.forEach(item => console.log(item));
      console.log('Total count:', list.length);
      ws.close();
      resolve();
    };
    ws.onerror = () => resolve();
    setTimeout(() => { ws.close(); resolve(); }, 3000);
  });
}

findEnglish().catch(console.error);
