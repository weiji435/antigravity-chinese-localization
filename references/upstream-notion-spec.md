# 上游参考规约：川瓣 Antigravity 界面与排版增强补丁

- **原始文档链接**：[川瓣 Antigravity 界面与排版增强补丁 (Notion)](https://bustling-politician-00f.notion.site/chuanban-antigravity-theme-patch-db7c5846f37546be9481cd791aed0554)
- **文档标题**：川瓣 Antigravity 界面与排版增强补丁 / Chuanban Antigravity Theme Patch
- **项目定位**：基于 Google Antigravity 桌面客户端的排版美化、主题配色与轻量汉化一体化补丁。

---

## 1. 原始 Notion 补丁设计全景

原始川瓣补丁方案包含以下四大核心构件：

### (1) 三大配色主题预设
- **高对比版 (`high-contrast`)**：
  - 微暖亮白正文区（`#FCFCFB`）、暖燕麦侧栏（`#F7F5F0`）、极淡微暖棕输入框（`#F9F7F2`）。
  - 模型名与控制按钮采用高对比墨色（`#0A0A0A`），强化中缝与轮廓线。
- **ClaudeDesktop 净白 (`claude-desktop-purewhite`)**：
  - 像素级复刻 Anthropic 官方客户端质感，极简素净。
- **复古深色 (`vintage-deep`)**：
  - 牛皮纸暖棕底色与陶土砖红强调色。

### (2) 字体分层体系 (Typography Scheme A)
- **UI 控件层**：Claude 原版无衬线 `Anthropic Sans` + 更纱 UI `Sarasa UI SC` + 系统备选
- **正文阅读层**：古典书卷衬线 `Anthropic Serif` / `Tiempos Text` + 更纱粗衬线 `Sarasa Mono Slab SC`
- **代码与终端层**：等宽衬线打字机 `Anthropic Mono` / `Sarasa Mono Slab SC` / `Consolas`
- **输入编辑框**：Codex 同款粗衬线打字机体

### (3) TanStack Router 设置弹窗防死锁
- 拦截客户端设置按钮点击，清理可能残留的 `settingsOpen=true` 状态，防止设置弹窗白屏假死。

### (4) 初始汉化模块 (Legacy i18n)
- 原始版本内置了包含约 30~50 个词条的轻量翻译表，通过后台 `daemon.js` 守护脚本实现 DOM 替换。

---

## 2. 原始补丁的技术局限性与重大故障

在实际长期运行和重度使用过程中，原始补丁暴露出两大严重缺陷：

### 缺陷 A：外置 CDP 守护进程导致“界面完全假死无法点击”
- **机制**：原补丁依赖 `daemon.js`，通过 WebSocket CDP 协议以 **2.5 秒一次** 的死循环向当前窗口发送 `Runtime.evaluate`。
- **后果**：
  1. 每次循环递归整棵 DOM 树，并无节制地新建未解绑的 `MutationObserver` 监听器，造成监听器叠加自激风暴。
  2. Chromium 的 UI 渲染主线程被 100% 耗尽。
  3. React 17/18 依赖挂载在 Root DOM 容器上的统一事件委托系统（SyntheticEvent）。主线程被打满后，冒泡链路上所有的 `click`、`mousedown`、`focus` 事件均无法正常派发给 React 组件，导致用户无法聚焦输入框、无法点击按钮，整个会话锁死。

### 缺陷 B：词条覆盖不全且容易漏翻
- 原补丁仅翻译了顶层常见单词，常规设置（General）中的大段说明长句、执行策略、安全预设、终端策略选项、输入框 `placeholder`、操作图标辅助属性等均未覆盖。
- 采用简单的 `WeakSet` 记录已访问节点，当 React 18 对组件进行局部重渲染时，文本被当成已访问而跳过，界面频繁变回英文。

---

## 3. 本技能（`antigravity-chinese-localization`）的重构与升华

本项目基于上述 Notion 规范的初衷，对汉化模块进行了**彻底重构与全面工程化升级**：

| 评估维度 | 原始 Notion 补丁 (Legacy CDP) | 本技能原生版 (`antigravity-chinese-localization`) |
| :--- | :--- | :--- |
| **执行架构** | 外置常驻 Node.js 守护进程 (`daemon.js`) | **Electron 原生预加载层 (Inlined Preload)** |
| **后台开销** | 持续占用 1 个 PowerShell/Node 进程，高频网络通信 | **零守护进程 (Zero-Daemon)，0% 额外资源消耗** |
| **渲染稳定性** | 容易引发 DOM 自激，导致主线程卡死、点击失效 | **断开式互斥锁 Guard + `requestIdleCallback` 空闲调度，0 卡顿** |
| **沙箱合规性** | 未考虑 Electron 沙箱机制，相对路径 require 会崩溃 | **纯 IIFE 闭包内联嵌入，100% 符合沙箱安全规范** |
| **动态更新** | `WeakSet` 静态标记，React 重渲染后重新变回英文 | **`WeakMap` 前后文本动态比对 (`lastTranslated`)，无感实时追踪** |
| **词条覆盖度** | 仅覆盖约 40 个基础词条，未覆盖长句与属性 | **200+ 词条全量覆盖**（侧栏、长句、模型配额、占位符、Native 菜单） |
| **出厂安全** | 缺乏安全备份与一键复原机制 | **自动创建 `app.asar.original.bak`，支持单命令一键复原** |

---

## 4. 与主题排版技能的协同关系

- **视觉与排版**：如需 Claude 式暖白配色预设与更纱黑体排版，可配合 `chuanban-antigravity-theme-patch` 技能使用。
- **全量汉化与核心稳定**：由本技能 `antigravity-chinese-localization` 独立承担，保障客户端零负担、极致稳定与全中文交互体验。
