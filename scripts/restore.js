const fs = require('fs');
const path = require('path');

function restoreOriginal() {
  console.log('====================================================');
  console.log('  Google Antigravity 官方出厂英文版一键复原 (Restore)');
  console.log('====================================================\n');

  const localAppData = process.env.LOCALAPPDATA || path.join(process.env.USERPROFILE || 'C:\\Users\\Hp', 'AppData', 'Local');
  const resourcesDir = process.env.ANTIGRAVITY_RESOURCES || path.join(localAppData, 'Programs', 'antigravity', 'resources');
  const asarPath = path.join(resourcesDir, 'app.asar');
  const bakPath = path.join(resourcesDir, 'app.asar.original.bak');

  if (!fs.existsSync(bakPath)) {
    console.error('❌ 未找到官方备份文件 app.asar.original.bak，无法自动还原！');
    process.exit(1);
  }

  console.log(`[1] 正在将备份 ${bakPath} 还原至 ${asarPath}...`);
  fs.copyFileSync(bakPath, asarPath);
  console.log('✅ 还原成功！app.asar 已复原为官方英文原版。');
  console.log('\n请完全重启 Antigravity 客户端以查看原版英文界面。');
  console.log('====================================================');
}

restoreOriginal();
