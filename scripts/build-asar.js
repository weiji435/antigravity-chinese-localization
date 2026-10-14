const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

function loadAsar() {
  try {
    return require('@electron/asar');
  } catch (e) {}

  const localAsar = path.join(__dirname, '..', 'node_modules', '@electron', 'asar');
  if (fs.existsSync(localAsar)) {
    try {
      return require(localAsar);
    } catch (e) {}
  }

  const localAppData = process.env.LOCALAPPDATA || path.join(process.env.USERPROFILE || '', 'AppData', 'Local');
  const npxDir = path.join(localAppData, 'npm-cache', '_npx');
  if (fs.existsSync(npxDir)) {
    try {
      const dirs = fs.readdirSync(npxDir);
      for (const d of dirs) {
        const candidate = path.join(npxDir, d, 'node_modules', '@electron', 'asar', 'lib', 'asar.js');
        if (fs.existsSync(candidate)) {
          return require(candidate);
        }
      }
    } catch (e) {}
  }

  console.log('📦 未检测到 @electron/asar，正在自动安装依赖 (npm install)...');
  try {
    execSync('npm install --no-audit --no-fund', { cwd: path.join(__dirname, '..'), stdio: 'inherit' });
    const local = path.join(__dirname, '..', 'node_modules', '@electron', 'asar');
    if (fs.existsSync(local)) return require(local);
  } catch (err) {
    console.error('❌ 自动安装依赖失败，请手动在技能目录下运行: npm install');
    process.exit(1);
  }
}

function safeCleanDir(dir) {
  if (!fs.existsSync(dir)) return;
  const junction = path.join(dir, 'app.asar.unpacked');
  if (fs.existsSync(junction)) {
    try { fs.unlinkSync(junction); } catch (e) { try { fs.rmdirSync(junction); } catch (_) {} }
  }
  fs.rmSync(dir, { recursive: true, force: true });
}

async function buildAsar() {
  console.log('====================================================');
  console.log('  Google Antigravity 全量原生汉化构建与打包 (Build ASAR)');
  console.log('====================================================\n');

  const localAppData = process.env.LOCALAPPDATA || path.join(process.env.USERPROFILE || 'C:\\Users\\Hp', 'AppData', 'Local');
  const resourcesDir = process.env.ANTIGRAVITY_RESOURCES || path.join(localAppData, 'Programs', 'antigravity', 'resources');
  const asarPath = path.join(resourcesDir, 'app.asar');
  const bakPath = path.join(resourcesDir, 'app.asar.original.bak');

  if (!fs.existsSync(asarPath) && !fs.existsSync(bakPath)) {
    console.error(`❌ 未找到 Antigravity 核心文件目录: ${resourcesDir}`);
    process.exit(1);
  }

  const asar = loadAsar();

  // 1. 确保官方出厂备份存在
  if (!fs.existsSync(bakPath)) {
    console.log('[1] 正在创建官方原版备份 app.asar.original.bak...');
    fs.copyFileSync(asarPath, bakPath);
    console.log('✅ 备份创建完成！');
  } else {
    console.log('[1] 官方原版备份已就绪。');
  }

  // 2. 解包到临时工作区
  const tempBase = os.tmpdir();
  const tempDir = path.join(tempBase, 'antigravity-build-temp');
  const extractedDir = path.join(tempBase, 'antigravity-build-extracted');
  const targetAsar = path.join(tempBase, 'antigravity-patched.asar');

  console.log('[2] 正在准备解包环境...');
  safeCleanDir(tempDir);
  safeCleanDir(extractedDir);
  if (fs.existsSync(targetAsar)) fs.rmSync(targetAsar, { force: true });
  if (fs.existsSync(targetAsar + '.unpacked')) fs.rmSync(targetAsar + '.unpacked', { recursive: true, force: true });

  fs.mkdirSync(tempDir, { recursive: true });
  fs.copyFileSync(bakPath, path.join(tempDir, 'app.asar'));

  // 创建 unpacked 联接
  const realUnpacked = path.join(resourcesDir, 'app.asar.unpacked');
  if (fs.existsSync(realUnpacked)) {
    execSync(`powershell -NoProfile -Command "New-Item -ItemType Junction -Path '${tempDir}\\app.asar.unpacked' -Target '${realUnpacked}' | Out-Null"`);
  }

  console.log('[3] 正在从官方原版解包...');
  asar.extractAll(path.join(tempDir, 'app.asar'), extractedDir);
  console.log('✅ 解包完成！');

  // 3. 内联嵌入汉化引擎到 dist/preload.js
  console.log('[4] 正在内联编译汉化引擎到 dist/preload.js (符合沙箱安全规范)...');
  const preloadPath = path.join(extractedDir, 'dist', 'preload.js');
  const originalPreload = fs.readFileSync(preloadPath, 'utf8');

  const enginePath = path.join(__dirname, '..', 'src', 'i18n-engine.js');
  const i18nEngineCode = fs.readFileSync(enginePath, 'utf8');

  const patchedPreload = originalPreload.trim() + '\n\n' + i18nEngineCode.trim() + '\n';
  fs.writeFileSync(preloadPath, patchedPreload, 'utf8');
  console.log('✅ preload.js 注入完成 (零外部 require 依赖)！');

  // 4. 注入原生顶层菜单汉化到 dist/menu.js
  console.log('[5] 正在注入原生顶部菜单汉化到 dist/menu.js...');
  const menuPath = path.join(extractedDir, 'dist', 'menu.js');
  let menuContent = fs.readFileSync(menuPath, 'utf8');

  const menuPatch = `
const MENU_LOCALES = {
  'File': '文件',
  'Edit': '编辑',
  'View': '视图',
  'Window': '窗口',
  'Help': '帮助',
  'New Window': '新建窗口',
  'Docs': '官方文档',
  'Check for Updates': '检查更新',
  'Connect to WSL': '连接到 WSL',
  'Reopen Locally': '在本地重新打开',
  'Undo': '撤销',
  'Redo': '重做',
  'Cut': '剪切',
  'Copy': '复制',
  'Paste': '粘贴',
  'Paste and Match Style': '粘贴并匹配样式',
  'Select All': '全选',
  'Delete': '删除',
  'Reload': '重新加载',
  'Force Reload': '强制重新加载',
  'Toggle Developer Tools': '切换开发者工具',
  'Actual Size': '实际大小',
  'Zoom In': '放大',
  'Zoom Out': '缩小',
  'Toggle Full Screen': '切换全屏',
  'Minimize': '最小化',
  'Zoom': '缩放',
  'Bring All to Front': '前置所有窗口',
  'Close': '关闭'
};

function translateMenu(m) {
  if (!m) return;
  m.items?.forEach(item => {
    if (item.label && MENU_LOCALES[item.label]) {
      item.label = MENU_LOCALES[item.label];
    }
    if (item.submenu) {
      translateMenu(item.submenu);
    }
  });
}
`;

  if (!menuContent.includes('MENU_LOCALES')) {
    menuContent = menuPatch + '\n' + menuContent;
    menuContent = menuContent.replace(
      'electron_1.Menu.setApplicationMenu(menu);',
      'translateMenu(menu);\n    electron_1.Menu.setApplicationMenu(menu);'
    );
    fs.writeFileSync(menuPath, menuContent, 'utf8');
    console.log('✅ menu.js 原生菜单汉化完成！');
  }

  // 5. 语法检测
  console.log('[6] 正在执行 JS 语法合法性校验...');
  execSync(`node -c "${preloadPath}"`);
  execSync(`node -c "${menuPath}"`);
  console.log('✅ 语法校验 100% 通过！');

  // 6. 回包为 asar
  console.log('[7] 正在重新无损打包为 ASAR 归档文件...');
  await asar.createPackageWithOptions(extractedDir, targetAsar, { unpackDir: 'node_modules/chrome-devtools-mcp' });
  console.log('✅ 打包完成！大小:', (fs.statSync(targetAsar).size / 1024 / 1024).toFixed(2), 'MB');

  // 7. 覆盖目标 resources/app.asar
  console.log('[8] 正在安装替换 resources/app.asar...');
  fs.copyFileSync(targetAsar, asarPath);
  console.log('✅ 安装完成！');

  // 8. 清理临时目录
  console.log('[9] 正在清理临时构建文件...');
  safeCleanDir(tempDir);
  safeCleanDir(extractedDir);
  if (fs.existsSync(targetAsar)) fs.rmSync(targetAsar, { force: true });
  if (fs.existsSync(targetAsar + '.unpacked')) fs.rmSync(targetAsar + '.unpacked', { recursive: true, force: true });
  console.log('✅ 临时文件已彻底清理！');

  console.log('\n====================================================');
  console.log('🎉 恭喜！Google Antigravity 全量原生汉化已彻底固化成功！');
  console.log('客户端下次启动或重启时将自动以全中文界面运行。');
  console.log('====================================================');
}

buildAsar().catch(console.error);
