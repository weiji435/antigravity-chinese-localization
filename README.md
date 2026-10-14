# 🚀 Google Antigravity 全量原生汉化补丁 & Skill

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Platform: Windows](https://img.shields.io/badge/Platform-Windows-0078D6?logo=windows)](https://antigravity.google)
[![Architecture: Electron Preload](https://img.shields.io/badge/Architecture-Inlined%20Preload-success)](SKILL.md)
[![Zero Daemon](https://img.shields.io/badge/Daemon-Zero%20Overhead-brightgreen)]()

专为 **Google Antigravity 官方客户端**量身打造的工业级全量中文本地化方案。彻底摒弃旧版外置常驻 CDP 轮询进程，采用 **Electron 原生预加载层（Inlined Preload）** 零依赖静态注入，**彻底解决界面卡死无法点击与 Preload 注入无效果**两大技术痛点，实现 100% 丝滑无感的全界面中文化。

---

## ✨ 核心特性

- 🛡️ **零后台守护进程（Zero-Daemon）**：无任何外部 `daemon.js` 或轮询常驻进程，彻底杜绝 CPU 占用与内存泄漏。
- ⚡ **零卡顿、零假死**：配备**断开式自激互斥锁（Observer Disconnect Guard）**与 `requestIdleCallback` 浏览器空闲调度，100% 保障 React 17/18 合成事件派发，输入框与按钮点击极其丝滑。
- 📦 **符合 Electron 沙箱规范**：将汉化引擎与全量词条纯函数内联编译至 `dist/preload.js`，避免因外部 `require` 触发沙箱拦截崩溃（解决“没效果”问题）。
- 🔄 **深度兼容 React 18 虚拟 DOM**：采用 `WeakMap` 前后值比对技术（`lastTranslated`），页面局部重渲染或切换会话时自动保持汉化，杜绝重渲染后变回英文。
- 🌐 **双层全量中文化**：
  - **Web UI 层**：侧边栏分组导航、常规设置说明长句、执行策略、安全预设、终端策略、模型与用量、快捷键面板、输入框占位符、操作按钮提示及动态时间匹配。
  - **Native 桌面菜单层**：顶层系统菜单栏（文件、编辑、视图、窗口、帮助等）全量汉化。
- 🔒 **严密的作用域隔离**：保护 Monaco 代码编辑器、xterm 终端、代码块（`pre`/`code`）、Markdown 气泡正文以及文件路径，确保开发环境不被污染。
- 🛡️ **出厂级无损还原**：自动生成 `app.asar.original.bak` 官方备份，支持随时一键无损复原出厂英文版。

---

## 🛠️ 快速安装与使用

### 前置环境
- 安装有 **Node.js** (>= 18.0)
- 运行于 Windows 平台下的 Google Antigravity 客户端

### 方式一：作为 Antigravity Skill 原生加载（最推荐，支持对话调度）

直接将本仓库克隆至 Antigravity 全局技能目录：

```bash
git clone https://github.com/weiji435/antigravity-chinese-localization.git %USERPROFILE%\.gemini\skills\antigravity-chinese-localization
```

克隆完成后：
1. 客户端侧栏“技能与自定义 (Customizations)”面板将自动识别并展示本技能。
2. 您可以在任何对话中直接对智能体说：**“帮我汉化反重力”** 或 **“检查汉化状态”**，智能体会自动调度本技能的脚本执行打包与生效！

---

### 方式二：手动在终端一键固化（持久化生效）

克隆或下载本仓库至本地后，在终端执行：

```bash
# 自动检测/安装依赖、解包官方核心包、内联嵌入汉化引擎、自动回包固化至 app.asar
node scripts/build-asar.js
# 或使用 npm 命令：
npm run build
```

> **提示**：打包完成后，重启 Antigravity 客户端即可永久生效。

---

### 方式三：当前活动窗口即时热生效（无需重启客户端）

若 Antigravity 客户端正在运行，且不想关闭重启：

```bash
# 单次无感注入到当前窗口，发完立即断开，不留后台进程
node scripts/apply-current.js
# 或使用 npm 命令：
npm run apply
```

---

### 状态检测与健康检查

```bash
# 检测后台是否有守护残留、核心包是否已固化、当前窗口文本是否汉化
npm run status

# 深度自检：自动模拟点击触发会话菜单及二级子菜单，检测是否 100% 汉化
npm run inspect
```

---

### 🔍 发现界面还有遗漏怎么办？（一键扫描与极简增补）

随着 Antigravity 官方客户端版本更新，可能会出现新的按钮或设置说明。本技能内置了**自动化探针扫描器**与**极简热增补机制**：

#### 1. 一键扫描当前界面的所有未汉化英文
打开 Antigravity 并切换到有英文的界面，在终端运行：
```bash
npm run scan
```
探针会自动连接当前窗口，**秒级列出整棵 DOM 树中所有遗漏的英文文本与 `aria-label` 属性**，无需人工肉眼查找！

#### 2. 添加新词条（极简源码结构）
打开 [`src/i18n-engine.js`](src/i18n-engine.js)：
- **固定词汇/长句**：在 `LOCALES` 字典中添加一行即可：
  ```javascript
  "新英文原词": "优雅的中文翻译",
  ```
- **带数字或变量的动态文本**：在 `PATTERNS` 数组中添加一行正则：
  ```javascript
  { reg: /^Remaining (\d+) credits$/i, rep: "剩余 $1 点数" },
  ```

#### 3. 即时验证与固化
```bash
npm run apply   # 0.5 秒内在当前窗口即时预览效果
npm run build   # 满意后一键固化进核心包
```

欢迎提交 Pull Request，共同完善全量词典！

---

### 一键出厂复原官方英文版

```bash
# 将 app.asar.original.bak 瞬间还原为官方原版
npm run restore
```

---

## 🔬 两大技术痛点深度剖析

### 1. 为什么旧版补丁会导致“界面卡死 / 无法点击”？
- **根因**：原先的补丁依赖 `daemon.js`，每 2.5 秒通过 CDP WebSocket 向前端注入 30KB 脚本并递归整棵 DOM 树，且反复创建未注销的 `MutationObserver` 造成监听器重叠自激，直接打满 Chromium 渲染主线程。React 挂载在根容器上的合成事件冒泡链路被彻底切断，导致界面表现为完全无法点击。
- **解法**：废弃 `daemon.js`；采用原生 Preload 架构；引入断开式互斥锁，在修改 DOM 前断开监听、完成后恢复；结合 `requestIdleCallback` 空闲帧调度，将主线程 100% 留给用户交互。

### 2. 为什么改用 Preload 后会“完全没有效果”？
- **根因**：Antigravity 启用了 `contextIsolation: true` 并处于沙箱环境中。沙箱内的 Preload **禁止调用相对路径 `require('./i18n')`**。一旦调用，Chromium 底层将直接抛出 `Unable to load preload script` 致命异常并掐断脚本执行，导致整个 Preload 崩溃。此外，若仅使用 `WeakSet` 记录已访问节点，React 18 重渲染同一文本节点时会被误判为已处理而跳过。
- **解法**：将核心逻辑与词典**直接内联编译进 `dist/preload.js`**，零外部模块引用；采用基于 `WeakMap` 的前后文本动态比对机制（`lastTranslated`），完美兼顾动态重渲染感知与防自激。

---

## 📂 项目结构

```text
antigravity-chinese-localization/
├── SKILL.md                 # Antigravity 官方技能规范与使用指南
├── README.md                # 项目详细说明文档
├── package.json             # NPM 脚本与依赖
├── LICENSE                  # MIT 开源协议
├── .gitignore               # Git 忽略配置
├── src/
│   └── i18n-engine.js       # 全量内联原生汉化引擎核心源码与词典
├── references/
│   └── upstream-notion-spec.md # 上游 Notion 规约归档与新旧架构对照
└── scripts/
    ├── apply-current.js     # 当前活动窗口单次注入脚本
    ├── auto-inspect-menus.js# 会话及二级子菜单全自动深度自检脚本
    ├── build-asar.js        # 自动化解包、内联、回包固化脚本
    ├── find-untranslated.js # 全界面未汉化探针扫描脚本
    ├── status.js            # 全面状态与健康检查脚本
    └── restore.js           # 官方英文版一键复原脚本
```

---

## 🔗 参考与致谢 (Upstream Reference)

- **上游原始方案**：
  - [川瓣 Antigravity 界面与排版增强补丁 (Notion 知识库)](https://bustling-politician-00f.notion.site/chuanban-antigravity-theme-patch-db7c5846f37546be9481cd791aed0554)
- **致谢与说明**：
  - 感谢原始补丁作者对 Google Antigravity 主题、排版与汉化领域的探索与设计启发。
  - 本项目在其汉化构想的基础上，彻底重构了执行架构：将容易引发高频轮询卡死与 React 事件失效的外置常驻 CDP 守护脚本（`daemon.js`），全面升级为**原生 Electron Preload 内联注入方案**，实现 0 后台常驻守护、0 额外 CPU 消耗、零卡顿全量原生汉化。

---

## 📄 开源许可证

本项目基于 [MIT License](LICENSE) 开源。仅供学习交流与个人生产力提升使用。

