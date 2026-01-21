
Claude Code 实现任务：WeChat Social Icon 弹窗二维码 Modal

目标

在现有 Portfolio（Next.js + React + Tailwind + framer-motion）中，将 Socials 的 WeChat 从“跳转链接”改为“打开弹窗 Modal”。

点击 WeChat icon 后：
	•	原地弹出 Modal（遮罩 + 中央卡片）
	•	展示 微信二维码图片 + 微信号（可复制）
	•	支持：点击遮罩关闭、右上角关闭按钮、按 Esc 关闭
	•	打开 Modal 时锁定背景滚动，关闭后恢复
	•	其他 socials（GitHub/LinkedIn/小红书）继续正常跳转

⸻

约束 / 设计要求
	1.	不要引入新的 UI 库（不使用 Headless UI / Radix），用 自写 Portal Modal 实现。
	2.	可选使用 framer-motion 做入场动画（淡入 + 缩放 / 上移）。
	3.	不要破坏现有 social 渲染结构；改动尽量小、清晰。
	4.	WeChat 的 social item 不要依赖 label === "WeChat" 来判断；用稳定字段：id: "wechat" 或 type: "modal"。

⸻

需要新增的资源
	•	在项目 public/ 下新增二维码图片：
	•	public/wechat-qr.png（由我手动放置；代码只需引用路径 /wechat-qr.png）

⸻

需要修改的数据结构

文件：src/constants/socials.tsx

变更
	•	为每个 social item 增加字段 id（string）。例如：
	•	github, linkedin, wechat, xiaohongshu
	•	为 WeChat item 增加字段 action: "modal"（或 type: "modal"），其他保持默认 action: "link"。
	•	WeChat item 不需要 href（可保留为 "#" 但点击必须 preventDefault）。

示例（概念）：
	•	GitHub：{ id:"github", action:"link", href:"...", icon:... }
	•	WeChat：{ id:"wechat", action:"modal", icon:..., wechatId:"<我的微信号>" }

注意：wechatId 放在 constants 里也可以；也可在 Modal 组件里写死一个常量，但更推荐放到 constants/配置里。

⸻

需要新增组件

新增文件：src/components/WechatModal.tsx

Props

type WechatModalProps = {
  open: boolean;
  onClose: () => void;
  wechatId: string;
  qrSrc?: string; // default "/wechat-qr.png"
};

行为
	•	open === false 时不渲染任何 DOM（return null）
	•	open === true 时：
	•	使用 React Portal 渲染到 document.body
	•	遮罩：fixed inset-0 ...，点击遮罩触发 onClose
	•	Modal 内容区点击不应关闭（stopPropagation）
	•	Esc 触发 onClose
	•	打开时 document.body.style.overflow = "hidden"；关闭/卸载恢复
	•	UI 内容：
	•	标题：WeChat
	•	二维码：使用 next/image 渲染 qrSrc（默认 /wechat-qr.png），建议尺寸 240~320
	•	微信号：显示 wechatId
	•	复制按钮：点击复制 wechatId 到剪贴板
	•	成功：按钮文案短暂变为 Copied（约 1.5s），或显示轻提示
	•	失败：fallback 到 document.execCommand("copy")（可选）
	•	提示文案：
	•	“电脑端可扫码添加；手机端可复制微信号搜索”

动画（可选但推荐）

用 framer-motion：
	•	遮罩 opacity 动画
	•	Modal 卡片 scale/opacity/y 动画

⸻

需要修改 Socials 的渲染组件

在项目里找到渲染 socials 的地方（可能在 src/components/* 或 layout/sidebar 相关组件）。
要求：

渲染逻辑
	•	遍历 socials：
	•	若 action === "link"：
	•	<a href target="_blank" rel="noreferrer">（保持原行为）
	•	若 action === "modal"（WeChat）：
	•	用 <button type="button"> 渲染 icon
	•	点击 setWechatOpen(true)
	•	保持 icon 的 hover/样式与其他 socials 一致

状态管理
	•	在同一组件中加入：
	•	const [wechatOpen, setWechatOpen] = useState(false);
	•	在 JSX 最后渲染：
	•	<WechatModal open={wechatOpen} onClose={() => setWechatOpen(false)} wechatId={...} />

其中 wechatId 建议从 socials 常量里读取（例如找到 id === "wechat" 的 item）。

⸻

样式建议（保持高级感）
	•	遮罩：bg-black/50 + backdrop-blur-sm
	•	Modal card：rounded-2xl, shadow, p-6, max-w-sm w-[92vw]
	•	二维码容器：留白，浅灰背景（提高扫码成功率）
	•	微信号行：使用等宽/清晰字体，旁边放复制按钮

⸻

验收标准（必须满足）
	1.	点击 WeChat icon：弹窗出现；页面不跳转
	2.	其他 icon：仍是新标签打开外链
	3.	弹窗可通过：遮罩点击 / 右上角按钮 / Esc 关闭
	4.	弹窗打开时：背景不能滚动；关闭后恢复
	5.	复制按钮可把微信号写入剪贴板，并有可见反馈
	6.	移动端打开页面时：仍能复制微信号（二维码在同机不方便扫码，复制是关键兜底）

⸻

额外可选项（非必须）
	•	点击复制后显示 toast（如果项目已有 toast 组件就用；没有就不引入）
	•	右下角增加一个小链接：“如果二维码失效，请通过微信号添加”

⸻

把以上任务执行完后，请输出：
	•	修改了哪些文件
	•	如何配置 wechat-qr.png 和 wechatId
	•	如果你发现 socials 渲染组件不止一个位置，请说明最终选择的入口

⸻
