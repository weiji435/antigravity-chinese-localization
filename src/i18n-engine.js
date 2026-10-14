/**
 * Google Antigravity 官方客户端全量原生汉化引擎 (Inlined Native i18n Engine)
 * 运行环境：Electron Preload (Isolated World / 沙箱预加载层)
 * 特性：零外部依赖、零后台守护、空闲帧批处理、断开式互斥锁、WeakMap 动态更新比对
 */
(() => {
  if (window.__ag_native_observer) {
    try { window.__ag_native_observer.disconnect(); } catch (_) {}
  }
  window.__ag_native_i18n_loaded = true;

  const LOCALES = {
    // 侧栏与顶层导航
    "Settings": "系统设置",
    "General": "常规设置",
    "Application": "应用配置",
    "App": "应用配置",
    "Appearance": "外观界面",
    "Models": "模型与用量",
    "Models & Usage": "模型与用量",
    "Not in Project": "非项目范围",
    "Conversations": "会话设置",
    "Shortcuts": "快捷键",
    "Provide Feedback": "意见反馈",
    "Account": "账户",
    "Editor": "编辑器",
    "Customizations": "技能与自定义",
    "Developer": "开发者选项",
    "Workspaces": "工作区",
    "Projects": "项目",
    "Project": "项目",
    "New Conversation": "新建对话",
    "Conversation History": "历史对话",
    "Automations": "自动化任务",
    "Open IDE": "打开 IDE",
    "Load older messages": "加载更早的消息",
    "Conversation Log": "会话日志",
    "Transcript": "对话记录",
    "Analyzed": "已分析",
    "Edited": "已编辑",
    "Checked task": "已检查任务",
    "Scroll to Bottom": "滚动到底部",
    "Message input": "消息输入框",
    "Add context": "添加上下文",
    "Record voice memo": "录制语音备忘",
    "Typeahead menu": "快捷联想菜单",
    "Select All": "全选",
    "Working": "正在处理",

    // 常规设置（General 页面所有文字与卡片）
    "Configure agent execution, queued message delivery, and permissions.": "配置智能体执行策略、排队消息发送机制及权限。",
    "Execution": "执行策略",
    "Queued Messages": "排队消息",
    "Configure when follow-up messages are sent.": "配置后续追加消息的发送时机。",
    "Keyboard shortcuts": "键盘快捷键",
    "Queue": "排队",
    "Send Immediately": "立即发送",
    "Global Permissions": "全局权限",
    "Security Preset": "安全预设",
    "Controls the actions the agent can take.": "控制智能体可执行的操作权限。",
    "Custom": "自定义",
    "Outside of folders file access policy": "工作区外文件访问策略",
    "Configures how the agent tries to access files outside of its working folders.": "配置智能体尝试访问其工作目录外部文件时的策略。",
    "Allow": "允许",
    "Deny": "拒绝",
    "Ask Every Time": "每次询问",
    "Ask first": "每次询问",
    "Terminal Command Auto Execution": "终端命令自动执行",
    "Controls whether terminal commands require your approval before running.": "控制终端命令在运行前是否需要您的批准。",
    "Always Proceed": "直接执行",
    "Always Ask": "始终询问",
    "Enable Sandbox Mode (Preview)": "启用沙箱模式（预览）",
    "Restricts agent tools to a secure, isolated local sandbox.": "将智能体工具限制在安全隔离的本地沙箱中。",
    "Tool Permissions": "工具权限",
    "Modify permissions for file, terminal, and MCP tools.": "修改文件、终端和 MCP 工具的访问权限。",
    "Open": "打开",
    "Agent Behavior": "智能体行为",
    "Plan Review Policy": "计划审查策略",
    "Whether the agent asks you to review its documents.": "控制智能体是否在执行前请求您审查其计划文档。",
    "Type": "输入",
    "and select": "并选择",
    "to have the agent generate a plan.": "以让智能体生成实施计划。",
    "Network Permissions": "网络权限",
    "Network Access Rules": "网络访问规则",
    "Configure allowed and denied URLs for reading.": "配置允许或拒绝读取的网址。",
    "Terminal & Tooling Permissions": "终端与工具权限",
    "Commands Outside Sandbox": "沙箱外执行命令",
    "Configure allowed commands outside the sandbox.": "配置允许在沙箱外部运行的命令。",
    "Browser": "浏览器设置",
    "Configure the browser subagent. It requires": "配置浏览器子智能体。此功能需要安装",
    "Google Chrome": "Google Chrome",
    "to be installed.": "才能运行。",
    "The browser subagent can be invoked by typing /browser in the conversation input box.": "可通过在对话输入框中键入 /browser 来调用浏览器子智能体。",
    "Browser Javascript Execution Policy": "浏览器 JavaScript 执行策略",
    "Controls whether the agent can run custom JavaScript to automate complex browser actions.": "控制智能体是否可以运行自定义 JavaScript 来自动化复杂的浏览器操作。",
    "Request Review": "请求审查",
    "Browser Actuation Rules": "浏览器交互操作规则",
    "Configure allowed and denied URLs for browser actuation.": "配置允许或拒绝进行浏览器交互操作的网址。",
    "Edit": "编辑",

    // 账户设置（Account）
    "Manage your plan, credentials, and general preferences.": "管理您的方案、凭据和偏好设置。",
    "Enable Telemetry": "启用遥测数据",
    "When toggled on, Antigravity collects usage data to help Google enhance performance and features.": "开启后，Antigravity 将收集使用情况数据以帮助 Google 提升性能与功能。",
    "Marketing Emails": "营销邮件",
    "Receive product updates, tips, and promotions from Google Antigravity via email.": "通过电子邮件接收 Google Antigravity 的产品更新、使用技巧和推广信息。",
    "Your Plan:": "当前方案：",
    "You can upgrade to a Google AI Ultra plan to receive higher rate limits.": "您可以升级到 Google AI Ultra 方案以获取更高的速率限制。",
    "Upgrade": "升级",
    "Email": "电子邮件",
    "Sign Out": "退出登录",
    "By using this app, you agree to its": "使用此应用即表示您同意其",
    "Terms of Service": "服务条款",

    // 外观界面（Appearance）
    "Configure the agent's visual theme and display preferences.": "配置智能体的视觉主题与显示偏好。",
    "Theme": "主题模式",
    "Contrast": "对比度",
    "Default": "默认",
    "Strong": "高对比",
    "Light Theme": "浅色主题",
    "Dark Theme": "深色主题",
    "Preset": "预设",
    "Default Light": "默认浅色",
    "Background": "背景色",
    "Foreground": "前景色",
    "Accent": "强调色",
    "Chat Settings": "对话设置",
    "Verbose Agent Chat": "详细智能体对话",
    "Display and preserve intermediate thinking steps.": "显示并保留思考过程与中间执行步骤。",
    "Conversation Width": "对话面板宽度",
    "Configure the maximum width of the conversation panel.": "配置对话面板的最大显示宽度。",
    "Narrow": "居中适中",
    "Wide": "全宽铺满",
    "Project 4K": "Project 4K 体验",
    "Choose the experience that fits how you work.": "选择适合您工作方式的界面体验。",
    "Choose between the Default and Project 4K experience.": "在默认体验与 Project 4K 体验之间切换。",

    // 编辑器设置（Editor Settings）
    "Editor Settings": "编辑器设置",
    "Configure editor-specific behaviors and shortcuts.": "配置编辑器相关的行为和快捷键。",
    "Marketplace": "插件市场",
    "Marketplace Item URL": "插件详情地址",
    "Changes the base URL on each extension page. You must restart Antigravity to use the new marketplace after changing this value.": "修改扩展页面的基础地址。修改后必须重启 Antigravity 才能生效。",
    "Marketplace Gallery URL": "插件市场列表地址",
    "Changes the base URL for marketplace search results. You must restart Antigravity to use the new marketplace after changing this value.": "修改插件市场搜索结果的基础地址。修改后必须重启 Antigravity 才能生效。",
    "Selection Actions": "选中文本快捷操作",
    "Show Selection Actions": "显示划词操作按钮",
    "Show \"Edit\" and \"Chat\" buttons when selecting text in the editor.": "在编辑器中选中文本时显示“编辑”和“对话”悬浮按钮。",
    "To modify editor settings, open Settings within the editor window.": "如需修改编辑器详细设置，请在编辑器窗口内打开设置。",
    "Open Editor Settings": "打开编辑器设置",
    "Tab": "Tab 智能补全",
    "Configure tab completion, suggestions, and navigation behavior.": "配置 Tab 键补全、代码建议与代码跳转行为。",

    // 技能与自定义（Customizations）
    "Configure default behaviors, skills, and MCP servers.": "配置默认行为、技能（Skills）与 MCP 服务器。",
    "Learn more": "了解更多",
    "Token Usage": "Token 消耗",
    "The breakdown below shows token usage from customizations like rules, skills, and MCP. If a budget is exceeded, large rules are demoted to path pointers and large customizations are excluded automatically.": "下方明细显示了规则、技能和 MCP 等自定义项的 Token 消耗。若超出预算，大型规则将降级为路径指针，且超额自定义项将被自动排除。",
    "There are no customizations enabled.": "当前未启用任何自定义项。",
    "Skills": "技能",
    "Global": "全局",
    "Workspace": "工作区",
    "Built In": "内置",
    "Plugins": "插件",
    "Build With Google Plugins": "Google 官方插件",
    "Browse and enable plugins from the Build With Google catalog.": "浏览并启用来自 Build With Google 目录的官方插件。",
    "Customize": "个性化定制",
    "Manage Antigravity app settings.": "管理 Antigravity 应用程序设置。",

    // 应用配置（Application）
    "Prevent Sleep": "防止电脑休眠",
    "Prevent the computer from sleeping while the app is running.": "应用运行时防止电脑进入休眠状态。",
    "Keep In Menu Bar": "保持在系统菜单栏",
    "Keep the app accessible from the menu bar and running in the background when all windows are closed.": "当所有窗口关闭时，保持应用在后台运行并常驻系统菜单栏。",
    "Remote Control": "远程控制",
    "Enable Remote Control": "启用远程控制",
    "Work with local agents from another device.": "从其他设备连接并协同使用本地智能体。",
    "Notifications": "通知提醒",
    "Notification Settings": "通知设置",
    "To modify notification settings, open your operating system's system preferences.": "如需修改通知设置，请前往操作系统的系统偏好设置中调整。",
    "Open System Preferences": "打开系统偏好设置",
    "Version": "版本信息",
    "App version": "应用版本",
    "Advanced Settings": "高级设置",

    // 意见反馈（Provide Feedback）
    "Feedback Type": "反馈类型",
    "Bug Report": "缺陷报告 (Bug Report)",
    "Feature Request": "功能建议 (Feature Request)",
    "Auth and Billing": "认证与账单",
    "Remote Control Issue": "远程控制问题",
    "General Feedback": "常规体验反馈",
    "Description": "问题描述",
    "Please describe the issue in detail. The more actionable your feedback, the quicker our team can address your request. Some helpful information includes:": "请详细描述您遇到的问题。提供的信息越详实，团队处理越快速。建议包含：",
    "Steps to reproduce the issue": "问题复现步骤",
    "Expected behavior": "预期行为",
    "Actual behavior": "实际行为",
    "Any error messages": "任何错误提示信息",
    "Any relevant information": "其他相关信息",
    "Steps to Reproduce": "复现步骤",
    "Attach a screenshot (optional)": "附加屏幕截图（可选）",
    "Attach Antigravity server logs": "附加 Antigravity 服务端日志",
    "Submit": "提交反馈",
    "Visit": "访问",
    "Legal Help": "法律援助支持",
    "to ask for content changes for legal reasons.": "以申请基于法律原因的内容变更。",

    // 快捷键（Shortcuts）
    "Keyboard shortcuts for quick navigation and control.": "用于快速导航与交互控制的快捷键指南。",
    "Recommended": "推荐操作",
    "Open Conversation Picker": "打开会话选择器",
    "Open File Search": "打开文件检索",
    "Focus Input": "聚焦输入框",
    "Navigation": "界面导航",
    "File Picker": "文件选择器",
    "Select Previous Conversation": "切换至上一个会话",
    "Select Next Conversation": "切换至下一个会话",
    "Previous Pane Tab": "上一个窗格标签页",
    "Next Pane Tab": "下一个窗格标签页",
    "Open Settings": "打开系统设置",
    "Conversation": "会话操作",
    "Toggle Model Selector": "切换模型选择器",
    "Toggle Voice Recording": "切换语音输入录制",
    "Find in Pane": "在当前窗格中查找",
    "Add to Chat/Quote": "添加至对话 / 引用",
    "Archive This Conversation": "归档当前会话",
    "Layout Controls": "布局控制",
    "Toggle Sidebar": "展开/折叠侧边栏",
    "Toggle Auxiliary Pane": "展开/折叠辅助窗格",
    "Toggle Overview Panel": "展开/折叠概览面板",
    "Toggle Terminal": "展开/折叠内置终端",

    // 模型与用量（Models & Usage）
    "Manage your model quota and credits.": "管理您的模型额度与计费点数。",
    "Plan": "订阅方案",
    "Model Credits": "模型点数",
    "Enable AI Credit Overages": "启用 AI 点数超额计费",
    "When toggled on, Antigravity will use your AI credits to fulfill model requests once you're out of model quota. Antigravity will always use your model quota first before using AI credits.": "开启后，当模型免费配额用尽时，Antigravity 将使用您的 AI 点数响应模型请求。系统将始终优先消耗模型配额。",
    "Available AI Credits: 0": "可用 AI 点数：0",
    "See Activity": "查看用量明细",
    "Get More AI Credits": "获取更多 AI 点数",
    "Model Quota": "模型配额",

    // 开发者选项（Developer）
    "Developer-only tools. These settings are stored locally in this browser and do not affect other users.": "仅限开发者调试工具。这些设置仅保存在本地当前浏览器中，不影响其他用户。",
    "Regroup Google3 Chats": "重组 Google3 会话",
    "Google3 chats will be regrouped into their workspaces in the sidebar.": "Google3 会话将重新归类至侧边栏各自的工作区中。",
    "This migration may mess up your settings, chats, and sidebar.": "此迁移可能会打乱您的设置、对话记录及侧边栏排布。",
    "Follow the guide at": "请参考指南：",
    "to back up your data and run the migration.": "以备份数据并执行迁移。",

    // 项目与工作区及非项目范围会话设置
    "Agent Settings": "智能体设置",
    "Agent settings and permissions for conversations outside of projects.": "非项目范围会话的智能体设置与权限。",
    "Agent settings and permissions for this project.": "此项目的智能体设置与权限。",
    "Project Settings": "项目设置",
    "Workspace Settings": "工作区设置",
    "Local Permissions": "本地权限",
    "Also includes": "亦包含",
    "when working in this project.": "（在当前项目中工作时）。",
    "when working in this project": "（在当前项目中工作时）",
    "when working in this conversation.": "（在当前会话中工作时）。",
    "when working in this conversation": "（在当前会话中工作时）",
    "when working outside of projects.": "（在非项目范围工作时）。",
    "when working outside of projects": "（在非项目范围工作时）",
    "File Access Rules": "文件访问规则",
    "Configure allowed and denied paths for file reads and writes.": "配置允许和拒绝读取与写入的文件路径。",
    "Terminal Commands": "终端命令",
    "Configure allowed terminal commands.": "配置允许执行的终端命令。",
    "Commands Outside Sandbox": "沙箱外执行命令",
    "Configure allowed commands outside the sandbox.": "配置允许在沙箱外部运行的命令。",
    "Network Access Rules": "网络访问规则",
    "Configure allowed and denied URLs for reading.": "配置允许或拒绝读取的网址。",
    "Browser Actuation Rules": "浏览器交互操作规则",
    "Configure allowed and denied URLs for browser actuation.": "配置允许或拒绝进行浏览器交互操作的网址。",
    "Allowed Paths": "允许的路径",
    "Denied Paths": "拒绝的路径",
    "Add Path": "添加路径",
    "Allowed Commands": "允许的命令",
    "Denied Commands": "拒绝的命令",
    "Add Command": "添加命令",
    "Allowed URLs": "允许的网址",
    "Denied URLs": "拒绝的网址",
    "Add URL": "添加网址",
    "Read and Write": "读取与写入",
    "Read Only": "仅读取",
    "Write Only": "仅写入",
    "Inherit Global": "继承全局",
    "Inherited from Global": "继承自全局",
    "Override Global": "覆盖全局配置",
    "Learn more about": "了解更多关于",
    "No paths configured.": "暂未配置任何路径。",
    "No commands configured.": "暂未配置任何命令。",
    "No URLs configured.": "暂未配置任何网址。",
    "Folders": "项目目录",
    "Permission Settings": "权限设置",
    "MCP Tools": "MCP 工具",
    "Rules": "项目规则",
    "Delete Project": "删除项目",
    "Paths the agent can read inside this workspace.": "智能体在此工作区内可读取的路径。",
    "Paths the agent can modify inside this workspace.": "智能体在此工作区内可修改的路径。",
    "Terminal commands the agent can execute in this workspace.": "智能体在此工作区内可执行的终端命令。",
    "Commands the agent can run outside the sandbox in this workspace.": "智能体在此工作区内可在沙箱外运行的命令。",
    "External tools the agent can call via Model Context Protocol.": "智能体可通过 MCP 调用的外部工具。",
    "URLs the agent can read or open in this workspace.": "智能体在此工作区内可读取或打开的网址。",

    // 通用按钮、状态与主界面元素
    "Enabled": "已启用",
    "Disabled": "已禁用",
    "Save": "保存",
    "Confirm": "确认",
    "Proceed": "确认执行",
    "Cancel": "取消",
    "Copy": "复制",
    "Running": "运行中",
    "Completed": "已完成",
    "Done": "完成",
    "Retry": "重试",
    "Close": "关闭",
    "Ask anything, @ to mention, / for actions": "输入任何问题，使用 @ 引用，输入 / 触发操作",
    "Overview": "概览",
    "Review": "审查",
    "Files": "文件",
    "Terminal": "终端",
    "Background Tasks": "后台任务",
    "Subagents": "子智能体",
    "Artifacts": "生成产物",
    "Changes": "变更",
    "Inline Actions": "内联操作",
    "Copy Link": "复制链接",
    "Revert file changes": "还原文件变更",
    "Undo": "撤销",
    "Undo To Here": "撤销至此",
    "Mention": "提及",
    "Screenshot": "屏幕截图",
    "Console logs": "控制台日志",
    "Recent files": "最近文件",
    "See all": "查看全部",
    "Input required": "需要用户输入",
    "Rename": "重命名",
    "Fork": "创建分支",
    "Split": "拆分",
    "Share": "分享",
    "Archive": "归档",
    "Restore": "恢复",
    "Delete Permanently": "永久删除",
    "Stop": "停止",
    "Close tab": "关闭标签页",
    "Close other tabs": "关闭其他标签页",
    "Close tabs to the right": "关闭右侧标签页",
    "About": "关于",
    "Check for Updates": "检查更新",
    "Command Palette": "命令面板",
    "Toggle Fullscreen": "切换全屏",
    "Minimize": "最小化",
    "Maximize": "最大化",
    "Accept Step": "接受步骤",
    "Reject Step": "拒绝步骤",
    "New Editor Window": "新建编辑器窗口",
    "New Window": "新建窗口",
    "Close Tab": "关闭标签页",
    "Open Workspace": "打开工作区",
    "Continue Response": "继续生成回答",
    "Split Terminal": "拆分终端",
    "Split Conversation Vertically": "垂直拆分会话",
    "Split Conversation Horizontally": "水平拆分会话",
    "Equalize Split Panes": "均分拆分窗格",
    "Close Terminal Tab": "关闭终端标签页",
    "New Terminal Tab": "新建终端标签页",
    "New Tab": "新建标签页",
    "Search Conversations": "搜索会话",
    "Open Workspace Selector": "打开工作区选择器",
    "Add to Chat": "添加至对话",
    "Quote Selection": "引用选中文本",
    "Comment on Selection": "为选中文本添加注释",
    "Zoom In": "放大",
    "Zoom Out": "缩小",
    "Reset Zoom": "重置缩放",
    "Go Back": "返回",
    "Go Forward": "前进",
    "Code Search": "代码搜索",
    "Open Commit Graph": "打开提交图谱",
    "Scheduled Tasks": "定时计划任务",
    "Open Keyboard Shortcuts": "打开快捷键设置",
    "Mark as Read": "标记为已读",
    "Mark as Unread": "标记为未读",
    "Mark Read": "标记为已读",
    "Mark Unread": "标记为未读",
    "Delete": "删除",
    "Delete Conversation": "删除会话",
    "Are you sure you want to delete this conversation? This action cannot be undone.": "确定要删除此会话吗？此操作无法撤销。",
    "Delete Handler": "删除处理器",
    "Delete Hook": "删除钩子",
    "Conversation ID": "会话 ID",
    "Conversation Name": "会话名称",
    "Project Name": "项目名称",
    "Workspace Name": "工作区名称",
    "Worktree Name": "工作树名称",
    "Split Right": "向右拆分",
    "Split Down": "向下拆分",
    "Replace With New": "替换为新会话",
    "Remove From Split": "从拆分中移除",
    "Pin": "置顶",
    "Unpin": "取消置顶",
    "View Debug": "查看调试信息",
    "Move to Group": "移动到分组",
    "Move to New Group": "移动到新分组",
    "New Group": "新建分组",
    "Remove from Group": "从分组中移除",
    "Group name": "分组名称",
    "Create Group": "创建分组",
    "A group with this name already exists.": "已存在同名分组。",
    "Create fork in current workspace": "在当前工作区创建分支",
    "Create fork in shared workspace": "在共享工作区创建分支",
    "Create fork in new workspace": "在新工作区创建分支",
    "Telemetry": "遥测数据",
    "Conversation Telemetry": "会话遥测数据",
    "Share Conversation (Preview)": "分享会话（预览）",
    "Share Conversation": "分享会话",
    "Copy Config File Path": "复制配置文件路径",
    "Copy Conversation ID": "复制会话 ID",
    "Copy File Name": "复制文件名",
    "Copy File Path": "复制文件路径",
    "Copy Image": "复制图像",
    "Copy Path": "复制路径",
    "Copy Trajectory ID": "复制执行轨迹 ID",
    "Copy debug info": "复制调试信息",
    "Create Project": "创建项目",
    "New Project": "新建项目",
    "New Workspace": "新建工作区",
    "Current workspace": "当前工作区",
    "Discard": "放弃更改",
    "Dismiss": "忽略",
    "Don't show this for 2 days": "2 天内不再显示",
    "Actions": "操作",
    "Activity": "动态与活动",
    "All": "全部",
    "Allow once": "仅允许一次",
    "Always run": "始终运行",
    "Branch": "分支",
    "Close (Esc)": "关闭 (Esc)",
    "Comments": "注释",
    "Commit": "提交",
    "Custom Order": "自定义排序",
    "Cut": "剪切",
    "Paste": "粘贴",
    "Daily": "每日",
    "Weekly": "每周",
    "Hourly": "每小时",
    "Idle": "空闲",
    "In Progress": "进行中",
    "Installed": "已安装",
    "Last 7 days": "最近 7 天",
    "Last Updated": "最后更新",
    "Logs": "日志",
    "MCP Servers": "MCP 服务器",
    "Media": "媒体",
    "Mentions": "提及",
    "No conversations yet": "暂无会话",
    "Not Signed In": "未登录",
    "Open Command Palette": "打开命令面板",
    "Open Conversation": "打开会话",
    "Open Conversation History": "打开历史会话",
    "Open Launchpad": "打开启动台",
    "Open Preferences": "打开偏好设置",
    "Open Preview": "打开预览",
    "Open in Built-in Browser": "在内置浏览器中打开",
    "Open in Code Search": "在代码搜索中打开",
    "Open in Preview Pane": "在预览窗格中打开",
    "Open in Preview Tab": "在预览标签页中打开",
    "Open with External Browser": "使用外部浏览器打开",
    "Output": "输出",
    "Proceed with Plan": "按计划执行",
    "Purchase Credits": "购买点数",
    "Push": "推送",
    "Quick Start": "快速入门",
    "Read Files": "读取文件",
    "Write Files": "写入文件",
    "Read URLs": "读取网址",
    "Execute URLs": "执行网址",
    "Screen Recording": "屏幕录制",
    "See Plans": "查看方案",
    "See more results": "查看更多结果",
    "Select Model": "选择模型",
    "Select another model": "选择其他模型",
    "Sidebar grouped by project": "侧栏按项目分组",
    "Sidebar grouped by workspace": "侧栏按工作区分组",
    "Start Voice Recording": "开始语音录制",
    "Stop Voice Recording": "停止语音录制",
    "Stopped": "已停止",
    "Suggestions in Editor": "编辑器代码建议",
    "System Prompt": "系统提示词",
    "Toggle Editor": "切换编辑器",
    "Toggle File Viewer": "切换文件查看器",
    "Toggle Project Selector": "切换项目选择器",
    "Upload Files": "上传文件",
    "Uptime": "运行时间",
    "Volume": "音量",
    "Zoom in (+)": "放大 (+)",
    "Zoom out (-)": "缩小 (-)",
    "Got it": "知道了",
    "Mark This Conversation as Read": "将此会话标记为已读",
    "Mark This Conversation as Unread": "将此会话标记为未读",
    "Monday": "星期一",
    "Tuesday": "星期二",
    "Wednesday": "星期三",
    "Thursday": "星期四",
    "Friday": "星期五",
    "Saturday": "星期六",
    "Sunday": "星期日",
    "Fork conversation in this folder": "在此文件夹中分支会话",
    "Group By Project": "按项目分组",
    "Group By Workspace": "按工作区分组",
    "Archive / Restore": "归档 / 恢复",
    "Copy Conversation Markdown": "复制会话 Markdown",
    "Restart Main Language Server": "重启语言服务核心",
    "Pin This Conversation": "置顶此会话",
    "Unpin This Conversation": "取消置顶此会话",
    "Find in Conversation": "在会话中查找",
    "Download Diagnostics": "下载诊断信息",
    "Toggle Between Light/Dark Themes": "切换浅色/深色主题",
    "Open Folder": "打开文件夹",
    "Rename This Conversation": "重命名当前会话",
    "Collapse All Folders": "折叠全部文件夹",
    "Expand All Folders": "展开全部文件夹",
    "Always Allow": "始终允许",
    "Allow Once": "仅允许一次",
    "Strict Mode": "严格模式",
    "No Model Selected": "未选择模型",
    "Confirm Window Reload": "确认重新加载窗口",
    "Enable Terminal Sandbox": "启用终端沙箱",
    "Sandbox Allow Network": "沙箱允许网络访问",
    "Enable Shell Integration": "启用 Shell 集成",
    "Enable Sounds for Agent": "启用智能体提示音",
    "Enable Notifications for Agent": "启用智能体桌面通知",
    "Auto-Expand Changes Overview": "自动展开变更概览",
    "Auto-Open Edited Files": "自动打开编辑的文件",
    "Open Agent on Reload": "重载时自动打开智能体面板",
    "Automatic Check for Updates": "自动检查更新",

    // 侧栏、顶部与导航辅助
    "Sidebar": "侧边栏",
    "Display Options": "显示选项",
    "Create New Project": "创建新项目",
    "More options": "更多选项",
    "More actions": "更多操作",
    "Pin conversation": "置顶会话",
    "Unpin conversation": "取消置顶会话",
    "Stop execution": "停止执行",
    "Archive conversation": "归档会话",
    "Customize Sections": "自定义侧栏分组",
    "No more older messages": "没有更多历史消息了",
    "Send message": "发送消息",
    "Customize": "自定义",

    // 交互反馈与查看器
    "Agent response": "智能体回答",
    "User message": "用户消息",
    "Good response": "满意",
    "Bad response": "不满意",
    "Undo to this point": "撤销至此",
    "Copy path": "复制路径",
    "Preview": "预览",
    "Raw": "源码",
    "New tab": "新建标签页",
    "File Viewer": "文件查看器",
    "File Viewer header": "文件查看器标头",
    "File path breadcrumbs": "文件路径导航",
    "View Diff": "查看差异",
    "Toggle sidebar": "展开/折叠侧边栏",
    "Maximize Pane": "最大化窗格",
    "Minimize Pane": "最小化窗格",
    "Restore Pane": "还原窗格",
    "Dark": "深色",
    "Light": "浅色",
    "System": "跟随系统",
    "Refresh": "刷新",
    "Refresh quota and credits data": "刷新配额与点数数据",

    // 模型选择器与用量限制
    "Model": "模型",
    "Notice": "提示",
    "Unavailable": "不可用",
    "View Usage": "查看用量明细",
    "Five Hour Limit Remaining": "5 小时配额剩余",
    "Weekly Limit Remaining": "每周配额剩余",
    "Claude and GPT models": "Claude 与 GPT 模型",
    "Gemini Models": "Gemini 模型",
    "For help, visit": "如需帮助，请访问",
    "or join the": "或加入",
    "chat space": "聊天群组",
    "High": "高",
    "Medium": "中",
    "Low": "低",
    "Inherit": "继承",
    "Effort": "思考力度",
    "Reasoning effort": "思考力度",
    "Thinking Process": "思考过程",
    "Choose a model": "选择模型",
    "(Thinking)": "(思考模型)",
    "(Medium)": "(中度思考)",
    "(High)": "(深度思考)",
    "(Low)": "(轻度思考)",

    // 智能体权限预设面板
    "Request Review": "请求审查",
    "Every command requires approval.": "每条命令均需经过您的批准。",
    "Ask before sensitive operations.": "在执行敏感操作前进行询问。",
    "Turbo": "极速模式 (Turbo)",
    "Run all commands without restrictions.": "无限制直接运行所有命令。",

    // 斜杠命令与功能卡片说明
    "Ask a quick question without interrupting the main conversation.": "在不打断主会话的情况下快速提问。",
    "Run until the specified goal is completely finished.": "持续自主运行，直至指定目标彻底完成。",
    "Compact the conversation now (summarize history to free up the context window).": "立即压缩会话（总结历史上下文以释放上下文窗口空间）。",
    "Run an instruction on a recurring schedule or as a one-time timer.": "按周期性定时计划或单次倒计时运行指令。",
    "Invoke a browser agent for web tasks.": "调用浏览器智能体执行网页浏览与检索任务。",
    "Plan carefully before executing a task.": "在执行任务前进行周密的逐步规划。",
    "Interview me to align on a plan.": "对我进行交互式访谈，以对齐计划与设计方案。",
    "Invoke a team of agents to autonomously tackle large projects.": "调用多智能体协作团队自主攻克大型复杂项目。",
    "Reflect on recent successes or corrections to capture reusable skills or rules.": "复盘近期的成功经验或纠错记录，提炼为可复用的技能或规则。",
    "Invoke the Boost multi-agent orchestrator for complex tasks.": "调用 Boost 深度思考与多智能体编排器处理复杂任务。",
    "Guidelines for interacting with GitHub and request permissions from the user when commands fail due to restrictions in the agent environment.": "与 GitHub 交互的指南，并在命令因智能体环境限制而失败时向用户申请权限。",
    "The full developer experience.": "完整的开发者全功能体验。",
    "Project 4K interface without developer tooling.": "无开发者工具的 Project 4K 纯净界面。",
    "Queue until after the current turn.": "排队等待当前轮次结束后发送。",
    "Interrupt the agent and send immediately.": "打断智能体并立即发送。",
    "Replace the default browser right-click menu with quick actions.": "将浏览器默认右键菜单替换为快捷操作。",
    "Configure a chat bot so you can use Jetski directly from Google Chat.": "配置聊天机器人，以便直接在 Google Chat 中使用 Jetski。",
    "Setup": "配置",
    "Setup Jetski Chat": "配置 Jetski 聊天",
    "Avatar URL": "头像链接",
    "Bot Name": "机器人名称",
    "Context Menus": "上下文右键菜单",
    "Custom Context Menus": "自定义右键菜单",

    // 输入框占位符
    "Describe the bug you encountered...": "请描述您遇到的问题...",
    "Enter avatar URL (optional)": "输入头像链接（可选）",
    "Enter bot name (optional)": "输入机器人名称（可选）",
    "Please list the steps to reproduce the issue": "请列出复现该问题的具体步骤",

    // 执行状态与标签页操作
    "Run command": "运行命令",
    "Run in background": "在后台运行",
    "Bypass Sandbox": "绕过沙箱",
    "Allow command": "允许命令",
    "Thinking...": "正在思考...",
    "Thinking": "思考中",
    "Working...": "正在处理...",
    "Applying changes...": "正在应用更改...",
    "Step details": "步骤详情",
    "Expand details": "展开详情",
    "Collapse details": "折叠详情"
  };

  function translateTimePhrase(str) {
    if (!str) return str;
    return str
      .replace(/(\d+)\s*days?/gi, '$1 天')
      .replace(/(\d+)\s*hours?/gi, '$1 小时')
      .replace(/(\d+)\s*minutes?/gi, '$1 分钟')
      .replace(/(\d+)\s*seconds?/gi, '$1 秒')
      .replace(/,\s*/g, ' ')
      .trim();
  }

  const PATTERNS = [
    // 动态数量与相对时间
    { reg: /^(\d+)\s+active\s+conversations$/i, rep: "$1 个进行中的会话" },
    { reg: /^(\d+)\s+files?\s+changed$/i, rep: "$1 个文件变更" },
    { reg: /^Show\s+(\d+)\s+breakdowns?$/i, rep: "展开明细 ($1 项)" },
    { reg: /^Worked for\s+(\d+[smhd])$/i, rep: "已工作 $1" },
    { reg: /^Thought for\s+(\d+[smhd])$/i, rep: "已思考 $1" },
    { reg: /^Available AI Credits:\s*(\d+)/i, rep: "可用 AI 点数：$1" },
    { reg: /^(\d+)\s+tools?$/i, rep: "$1 个工具" },
    { reg: /^(\d+)\s+skills?$/i, rep: "$1 个技能" },
    { reg: /^Skills:\s*(\d+)\s*tokens?$/i, rep: "技能: $1 Token" },
    { reg: /^Rules:\s*(\d+)\s*tokens?$/i, rep: "规则: $1 Token" },
    { reg: /^MCP:\s*(\d+)\s*tokens?$/i, rep: "MCP: $1 Token" },
    { reg: /^Total:\s*(\d+)\s*tokens?$/i, rep: "总计: $1 Token" },
    { reg: /^(\d+)\s*tokens?$/i, rep: "$1 Token" },
    { reg: /^(\d+)\s*s\s+ago$/i, rep: "$1 秒前" },
    { reg: /^(\d+)\s*m\s+ago$/i, rep: "$1 分钟前" },
    { reg: /^(\d+)\s*h\s+ago$/i, rep: "$1 小时前" },
    { reg: /^(\d+)\s*d\s+ago$/i, rep: "$1 天前" },

    // 动态选择器与交互提示
    { reg: /^Select model,\s*current:\s*(.*)$/i, rep: "选择模型，当前：$1" },
    { reg: /^Agent permissions preset selector,\s*current:\s*(.*)$/i, rep: "智能体权限预设选择器，当前：$1" },
    { reg: /^Cancel\s*\((.*?)\)$/i, rep: "取消 ($1)" },
    { reg: /^Close\s+(.*)$/i, rep: "关闭 $1" },
    { reg: /^Opens external link:\s*(.*)$/i, rep: "打开外部链接: $1" },
    { reg: /^Send feedback as\s+(.*)$/i, rep: "以 $1 身份提交反馈" },
    { reg: /^No more older messages,\s*showing\s+(\d+)\s+of\s+(\d+)$/i, rep: "没有更多历史消息了，显示 $1 / $2" },
    { reg: /^Load older messages,\s*showing\s+(\d+)\s+of\s+(\d+)$/i, rep: "加载更早的消息，显示 $1 / $2" },

    // 模型配额与刷新时间动态长句
    {
      reg: /^You have hit your (\d+)-hour limit, it will refresh in (.*?)\. If on a supported paid plan, you can use AI credits in the interim\.$/i,
      rep: (_, h, t) => `您已达到 ${h} 小时使用限额，将在 ${translateTimePhrase(t)} 后刷新。如已订阅支持的付费方案，在此期间可使用 AI 点数。`
    },
    {
      reg: /^You have hit your (\d+)-hour limit, so the weekly limit does not currently apply\. Your (\d+)-hour limit will refresh in (.*?)\.$/i,
      rep: (_, h1, h2, t) => `您已达到 ${h1} 小时使用限额，因此当前不适用每周限额。您的 ${h2} 小时限额将在 ${translateTimePhrase(t)} 后刷新。`
    },
    {
      reg: /^You have used some of your (\d+)-hour limit, it will fully refresh in (.*?)\.$/i,
      rep: (_, h, t) => `您已消耗了部分 ${h} 小时限额，将在 ${translateTimePhrase(t)} 后完全刷新。`
    },
    {
      reg: /^You have used some of your weekly limit, it will fully refresh in (.*?)\.$/i,
      rep: (_, t) => `您已消耗了部分每周限额，将在 ${translateTimePhrase(t)} 后完全刷新。`
    },

    // 会话与权限规则动态匹配
    { reg: /^Terminal Commands\s*(\d*)$/i, rep: "终端命令 $1" },
    { reg: /^File Access Rules\s*(\d*)$/i, rep: "文件访问规则 $1" },
    { reg: /^Network Access Rules\s*(\d*)$/i, rep: "网络访问规则 $1" },
    { reg: /^Commands Outside Sandbox\s*(\d*)$/i, rep: "沙箱外执行命令 $1" },
    { reg: /^Learn more about\s*(.*)$/i, rep: "了解更多关于 $1" },
    { reg: /^Also includes\s+(.*?)\s+when working in this project\.?$/i, rep: "在此项目中工作时亦包含 $1。" },
    { reg: /^Also includes\s+(.*?)\s+when working in this conversation\.?$/i, rep: "在此会话中工作时亦包含 $1。" },
    { reg: /^Also includes\s+(.*?)\s+when working outside of projects\.?$/i, rep: "在非项目范围工作时亦包含 $1。" }
  ];

  const EXCLUSION_SELECTOR = [
    'code', 'pre', 'kbd', 'samp', '[class*="language-"]', '.monaco-editor', '.xterm',
    '.prose', '.markdown', '[class*="chat-message"]',
    'input', 'textarea', '[contenteditable="true"]',
    '[class*="group/file-title"]', '[class*="file-title"]', '[class*="file-path"]', '[data-path]'
  ].join(', ');

  const ATTR_EXCLUSION_SELECTOR = 'code, pre, .monaco-editor, .xterm, .prose, .markdown';

  // 基于 WeakMap 的动态映射：记录上一次翻译后的值，解决 React 虚拟 DOM 动态重渲染漏翻问题
  const lastTranslated = new WeakMap();

  function matchString(str) {
    if (!str || typeof str !== 'string') return null;
    const trimmed = str.trim();
    if (!trimmed) return null;

    if (LOCALES[trimmed]) {
      return str.replace(trimmed, LOCALES[trimmed]);
    }

    for (let i = 0; i < PATTERNS.length; i++) {
      const p = PATTERNS[i];
      if (p.reg.test(trimmed)) {
        const rep = typeof p.rep === 'function' ? trimmed.replace(p.reg, p.rep) : trimmed.replace(p.reg, p.rep);
        return str.replace(trimmed, rep);
      }
    }
    return null;
  }

  function translateTextNode(node) {
    if (!node || node.nodeType !== Node.TEXT_NODE) return;
    if (lastTranslated.get(node) === node.nodeValue) return;

    const parent = node.parentElement;
    if (!parent) return;

    // 交互控件（按钮、菜单项、标签页、选项卡）即使处于 chat-message 容器中也必须汉化
    const isControl = parent.closest('button, [role="button"], [role="menuitem"], [role="tab"], [role="option"]');
    if (!isControl && parent.closest(EXCLUSION_SELECTOR)) return;

    const res = matchString(node.nodeValue);
    if (res && res !== node.nodeValue) {
      node.nodeValue = res;
      lastTranslated.set(node, res);
    }
  }

  function translateAttributes(el) {
    if (!el || el.nodeType !== Node.ELEMENT_NODE) return;
    if (el.closest(ATTR_EXCLUSION_SELECTOR)) return;

    const attrs = ['placeholder', 'title', 'aria-label'];
    for (let i = 0; i < attrs.length; i++) {
      const attr = attrs[i];
      if (el.hasAttribute(attr)) {
        const val = el.getAttribute(attr);
        const res = matchString(val);
        if (res && res !== val) {
          el.setAttribute(attr, res);
        }
      }
    }
  }

  function walkTranslate(root) {
    if (!root) return;
    if (root.nodeType === Node.ELEMENT_NODE) {
      if (!root.matches(ATTR_EXCLUSION_SELECTOR)) {
        translateAttributes(root);
        const candidates = root.querySelectorAll ? root.querySelectorAll('input[placeholder], textarea[placeholder], [title], [aria-label]') : [];
        for (let i = 0; i < candidates.length; i++) {
          translateAttributes(candidates[i]);
        }
      }
      if (root.matches(EXCLUSION_SELECTOR)) return;
    }

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: (n) => {
        if (!n.parentElement) return NodeFilter.FILTER_REJECT;
        const isControl = n.parentElement.closest('button, [role="button"], [role="menuitem"], [role="tab"], [role="option"]');
        if (!isControl && n.parentElement.closest(EXCLUSION_SELECTOR)) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    let current;
    while ((current = walker.nextNode())) {
      translateTextNode(current);
    }
  }

  // 待处理节点队列与断开式自激互斥锁
  const pendingNodes = new Set();
  let flushScheduled = false;
  let isFlushing = false;
  let observer = null;

  function flushPending() {
    flushScheduled = false;
    if (pendingNodes.size === 0 || isFlushing) return;
    isFlushing = true;

    try {
      const batch = Array.from(pendingNodes);
      pendingNodes.clear();

      for (let i = 0; i < batch.length; i++) {
        const node = batch[i];
        if (!node.isConnected) continue;
        if (node.nodeType === Node.ELEMENT_NODE) {
          walkTranslate(node);
        } else if (node.nodeType === Node.TEXT_NODE) {
          translateTextNode(node);
        }
      }
    } finally {
      isFlushing = false;
      if (pendingNodes.size > 0) {
        scheduleFlush();
      }
    }
  }

  function scheduleFlush() {
    if (flushScheduled) return;
    flushScheduled = true;
    setTimeout(flushPending, 10);
  }

  function startObserver() {
    if (!document.body) return;

    walkTranslate(document.body);

    observer = new MutationObserver((mutations) => {
      let hasChanges = false;
      for (let i = 0; i < mutations.length; i++) {
        const m = mutations[i];
        if (m.type === 'childList') {
          for (let j = 0; j < m.addedNodes.length; j++) {
            pendingNodes.add(m.addedNodes[j]);
            hasChanges = true;
          }
        } else if (m.type === 'characterData') {
          if (lastTranslated.get(m.target) === m.target.nodeValue) continue;
          pendingNodes.add(m.target);
          hasChanges = true;
        } else if (m.type === 'attributes') {
          pendingNodes.add(m.target);
          hasChanges = true;
        }
      }
      if (hasChanges) {
        scheduleFlush();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['placeholder', 'title', 'aria-label']
    });
    window.__ag_native_observer = observer;
  }

  function init() {
    if (document.body) {
      startObserver();
    } else {
      const docObs = new MutationObserver(() => {
        if (document.body) {
          docObs.disconnect();
          startObserver();
        }
      });
      if (document.documentElement) {
        docObs.observe(document.documentElement, { childList: true });
      }
      document.addEventListener('DOMContentLoaded', startObserver, { once: true });
    }
  }

  init();
})();
