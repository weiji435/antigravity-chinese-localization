---
name: antigravity-chinese-localization
description: "Google Antigravity 官方客户端全量原生汉化技能：基于 Electron 预加载层深度注入，彻底解决界面卡死假死与 Preload 无效果两大问题。覆盖侧栏分组、常规设置长句、模型配额用量、属性与占位符全量中文化。零后台守护进程、零卡顿、无感流畅。"
---

# Google Antigravity 官方客户端全量原生汉化技能 (Antigravity Chinese Localization)

本 Skill 用于为 Google Antigravity 桌面客户端提供工业级、零后台守护进程、无感流畅的全量界面汉化。

---

## 核心特性

1. **零外部守护（Zero-Daemon）**：
   - 彻底废弃任何基于 CDP（Chrome DevTools Protocol）的后台常驻轮询进程（如 `daemon.js`）或开机自启项。
   - 所有逻辑直接固化在客户端官方核心包 `resources/app.asar` 内，不产生额外后台进程，系统资源占用为 0。

2. **原生预加载内联注入（Inlined Preload）**：
   - 汉化引擎以零外部依赖的纯函数（IIFE）直接编译内联至 `dist/preload.js`，100% 符合 Electron 20+ 沙箱安全规范。

3. **双层完整覆盖**：
   - **Web UI 渲染层**：侧边栏分组导航、常规设置说明长句、执行策略、安全预设、终端策略、模型与用量、快捷键面板、输入框占位符（`placeholder`）、控件辅助文本（`title`/`aria-label`）及动态时间匹配。
   - **Native 桌面菜单层**：原生注入 `dist/menu.js`，顶层系统菜单栏（文件、编辑、视图、窗口、帮助等）全量中文化。

4. **100% 保护代码与终端编辑**：
   - 严密排除 Monaco 代码编辑器、xterm 终端、代码块（`pre`/`code`）、Markdown 气泡正文以及文件路径，确保开发工作区内容原始准确。

5. **出厂安全复原保证**：
   - 安装前自动创建官方原版备份文件 `resources/app.asar.original.bak`，支持随时单命令一键无损复原出厂英文。

---

## 两大技术痛点深度剖析与根因修复

### 一、「界面卡死 / 按钮假死无法点击」的根因与彻底修复

- **故障现象**：
  此前安装第三方汉化补丁后，Antigravity 界面完全假死，鼠标无法聚焦输入框，点击设置弹窗或侧栏按钮毫无反应，甚至导致会话锁死。
- **根本原因**：
  1. **CDP 轮询风暴**：原补丁在后台启动了常驻守护脚本（`daemon.js`），以 2.5 秒一次的高频死循环不断向当前 Antigravity 页面强行发送 WebSocket 调试协议（`Runtime.evaluate`）。
  2. **事件风暴与线程阻塞**：脚本每次运行都对整棵 DOM 树做全量递归遍历，且每次都新建未注销的 `MutationObserver`，造成多重监听器重叠自激，直接打满了 Chromium 的 UI 渲染主线程。
  3. **React 合成事件（SyntheticEvent）崩溃**：React 17+ 将事件委托挂载于根容器。主线程被打满后，点击事件在 DOM 冒泡链路上被阻塞或破坏，导致 React 无法捕获合成事件派发，界面表现为完全无法点击。
- **彻底解决方案**：
  - **断开外置依赖**：彻底终止并禁用 `daemon.js` 及 Windows 开机自启快捷方式，不使用任何外置常驻进程。
  - **断开式互斥锁（Observer Disconnect Guard）**：批量修改文本节点前**显式断开 `observer.disconnect()`**，修改完毕后再重新挂载监听，彻底切断 DOM 自激死循环。
  - **空闲调度（`requestIdleCallback`）**：批量翻译任务通过浏览器的空闲回调调度执行（超时兜底 80ms），**100% 优先保证用户的鼠标点击、光标输入与平滑滚动**。

---

### 二、「改用 Preload 后完全没有效果」的根因与彻底修复

- **故障现象**：
  将汉化代码写入 `preload.js` 并打包进 `app.asar` 后，客户端打开依然全为英文，甚至原本的半汉化也彻底消失。
- **根本原因**：
  1. **Electron 沙箱安全限制（Sandbox Restrictions）**：
     Antigravity 主窗口配置了 `contextIsolation: true` 且处于沙箱环境中。在此环境下，Preload 脚本运行在受限的 Isolated World，**严禁使用相对路径 `require('./i18n')` 加载外部 Node.js 模块**。
     一旦 Preload 尝试 `require('./i18n')`，Chromium 底层将直接抛出 `Unable to load preload script: .../preload.js` 致命异常并静默终止 Preload 执行。这导致汉化引擎未运行，甚至连 Antigravity 的原生 API 映射也被阻断。
  2. **React 18 虚拟 DOM 动态比对遗漏**：
     若仅使用静态 `WeakSet` 记录已访问节点，当 React 18 对已有文本节点更新数据时，会被误判为“已访问”而直接跳过，导致动态加载或切换后的视图重新变回英文。
- **彻底解决方案**：
  - **单文件内联嵌入（Inlined Bundle）**：将汉化引擎代码与全量词条表作为纯 IIFE 闭包**直接内联编译进 `dist/preload.js`**，彻底消除任何非法的外部模块引用，完全符合 Electron 沙箱规范，脚本必定 100% 正常执行。
  - **`lastTranslated` 动态比对映射（`WeakMap`）**：记录文本节点最新一次翻译后的文本值。若 React 动态重渲染将内容更新为新英文文本，系统能精准捕获并再次翻译；若内容为自身设置的中文，则立即跳过，既兼顾了动态更新，又彻底避免了自激。

---

## 运行架构

```
┌────────────────────────────────────────────────────────┐
│               Electron Main Process                    │
│    dist/menu.js  ──> 原生顶层应用菜单全量中文化        │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│      Chromium Renderer (Window: contextIsolation)      │
│                                                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │   Isolated World (Preload 沙箱环境)               │  │
│  │   - 内联 dist/preload.js (零外部 require 依赖)    │  │
│  │   - 挂载 MutationObserver (断开式互斥锁 Guard)    │  │
│  │   - WeakMap 动态状态比对 (React 18 动态渲染兼容)  │  │
│  │   - requestIdleCallback 空闲帧调度               │  │
│  └────────────────────────┬─────────────────────────┘  │
│                           │ DOM 实时同步修改           │
│  ┌────────────────────────▼─────────────────────────┐  │
│  │   Main World (React 18 虚拟 DOM 与业务逻辑)      │  │
│  │   - React 状态机与组件树完全无感不受干扰           │  │
│  │   - 合成事件（点击/输入/拖拽）100% 丝滑响应       │  │
│  │   - 编辑器（Monaco）与终端（xterm）严密保护       │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

---

## 快速管理与执行命令

所有管理脚本均内置于当前技能的 `scripts/` 目录中：

### 1. 检查当前汉化与运行健康状态

在终端运行以下命令，全面检测守护进程状态、ASAR 固化状态及当前窗口文本：

```bash
node C:\Users\Hp\.gemini\skills\antigravity-chinese-localization\scripts\status.js
```

### 2. 对当前活动窗口即时生效（单次无感注入）

无需重启 Antigravity，单次向当前运行窗口应用汉化，发完指令后**立即断开连接**，不驻留任何后台进程：

```bash
node C:\Users\Hp\.gemini\skills\antigravity-chinese-localization\scripts\apply-current.js
```

### 3. 一键编译并固化至核心包 (`app.asar`)

将汉化引擎与原生菜单自动解包、内联嵌入、校验语法并回包覆盖至 `resources/app.asar`，实现永久原生加载：

```bash
node C:\Users\Hp\.gemini\skills\antigravity-chinese-localization\scripts\build-asar.js
```

### 4. 一键出厂复原官方英文版

随时将备份的 `app.asar.original.bak` 还原至原版英文：

```bash
node C:\Users\Hp\.gemini\skills\antigravity-chinese-localization\scripts\restore.js
```

### 5. 菜单与二级子菜单全自动深度自检

模拟前台真实鼠标交互，自动触发会话 `⋮` 操作菜单并悬浮展开二级子菜单（如复制、拆分），检测并验证是否 100% 汉化：

```bash
node C:\Users\Hp\.gemini\skills\antigravity-chinese-localization\scripts\auto-inspect-menus.js
```

---

## 词条覆盖范围

- **侧边栏与顶层导航**：`New Conversation`（新建对话）、`Conversation History`（历史对话）、`Settings`（系统设置）、`Automations`（自动化任务）、`Customizations`（技能与自定义）、`Projects`（项目）、`Conversations`（会话设置）、`Open IDE`（打开 IDE）、`Transcript`（对话记录）等。
- **常规设置面板（General）**：各配置项说明长句、`Execution`（执行策略）、`Queued Messages`（排队消息）、`Security Preset`（安全预设）、`Outside of folders file access policy`（工作区外访问策略）、`Terminal Command Auto Execution`（终端自动执行）等。
- **模型与用量（Models & Usage）**：模型配额、可用点数、用量明细、计费超额等。
- **属性与占位符（Attributes）**：输入框 `placeholder`（如“输入任何问题，使用 @ 引用，输入 / 触发操作”）、各类按钮与图标的 `title` / `aria-label`。
- **动态正则匹配（Patterns）**：动态会话数、变更文件数、工作时长、思考时长、相对时间（`X 分钟前` / `X 小时前` / `X 天前`）、当前模型选择提示等。

---

## 参考溯源与致谢 (References & Credits)

- **上游原始参考源**：
  - 文档：[川瓣 Antigravity 界面与排版增强补丁 (Notion 知识库)](https://bustling-politician-00f.notion.site/chuanban-antigravity-theme-patch-db7c5846f37546be9481cd791aed0554)
  - 启发说明：本项目受上述川瓣补丁启发并在此基础上孵化。原文档提供了出色的界面排版、配色预设与基础汉化思路。
- **架构重构与差异**：
  - 原补丁采用外部常驻 CDP 轮询（`daemon.js`），在重度使用下会导致整棵 DOM 监听自激并打满 Chromium 渲染主线程，造成界面假死、React 点击事件失效。
  - 本技能彻底去除了任何后台守护进程，全面重构为**基于 Electron Preload 的内联原生安全架构**，结合断开式互斥锁（Observer Disconnect Guard）与浏览器空闲帧调度（`requestIdleCallback`），实现了零卡顿、零后台开销的全量深度汉化。
- **本地归档规范**：
  - 详见本地参考文件：[upstream-notion-spec.md](file:///C:/Users/Hp/.gemini/skills/antigravity-chinese-localization/references/upstream-notion-spec.md)

