# Step 2 "本地网络优化" 分屏叙事重构方案

## Context

当前 Step 2 将所有内容（7条优化项 + 4条设备建议 + 4张直连测试卡 + 叙事文案）垂直堆叠在一个 440px 的 step-body 中，需要滚动且视觉上像纯列表/报表，缺乏仪式感和叙事张力。需要改造为分屏展示的多幕叙事结构，在同一 Step 内通过阶段性内容替换（fade-out → fade-in），传达三个核心概念：铺路准备 → 物超所值的免费体检 → 直连测试暴露痛点。

---

## 总体结构：4 幕叙事

在同一 `step-body`（440px, overflow-y: hidden）内，用 4 个 `.act-stage` div 承载各幕内容：

| 幕次 | 名称 | 内容 | 传达概念 |
|------|------|------|----------|
| Act 2.1 | **铺路启程** | 铺路隐喻进度条动画 + Step 1 检测摘要（运营商/带宽/NAT/延迟） | 概念A：优化是为冠军专线铺路 |
| Act 2.2 | **网络体检报告** | 报告卡片：B+ 综合评级 + 5 维度评分条 + 体检完成印章 + "免费环节"说明 | 概念B：全方位免费网络体检 |
| Act 2.3 | **优化执行** | 5 条核心优化项逐条执行（before→after），完成后显示优化总结 | 概念B 延续：优化兑现价值 |
| Act 2.4 | **直连验证** | 4 张直连测试卡片（2×2 网格）+ 克制的琥珀色警示 + 结论引导文案 | 概念C：直连仍差，需要冠军专线 |

幕间过渡：当前幕 `exiting`（fade-out 280ms）→ 目标幕 `active`（fade-in 450ms）。

---

## 修改文件清单

| 文件 | 修改内容 |
|------|----------|
| `冠军专线开通_v2/index.html` | 替换 Step 2 的 `step-body` 内全部 HTML |
| `冠军专线开通_v2/style.css` | 替换现有 Step 2 样式（L825-886），追加 4 幕全部样式 |
| `冠军专线开通_v2/script.js` | 新增 `actStageSwitch` 辅助函数；重写 `actRunStep2`；`actResetAll` 追加 Step 2 重置逻辑 |

---

## 任务 1：修改 HTML — Step 2 step-body

**文件**：`冠军专线开通_v2/index.html`，第 333 行

将当前 `step-body` 内的 4 个 div（optimize-list、device-tips、direct-test、narrative-text）全部替换为 4 个 `.act-stage` 容器。

### Act 2.1 — 铺路启程

```html
<div class="act-stage" id="act2Stage1">
    <div class="pave-visual">
        <div class="pave-road"><div class="pave-road-fill" id="act2PaveFill"></div></div>
        <div class="pave-label">正在为冠军专线铺设本地优化基础...</div>
    </div>
    <div class="pave-summary" id="act2PaveSummary">
        <div class="pave-summary-title">◇ 检测摘要确认</div>
        <div class="pave-summary-grid">
            <div class="pave-summary-item"><span class="pave-summary-label">运营商</span><span class="pave-summary-value" id="act2PaveISP">—</span></div>
            <div class="pave-summary-item"><span class="pave-summary-label">下行带宽</span><span class="pave-summary-value" id="act2PaveBW">—</span></div>
            <div class="pave-summary-item"><span class="pave-summary-label">NAT 类型</span><span class="pave-summary-value" id="act2PaveNAT">—</span></div>
            <div class="pave-summary-item"><span class="pave-summary-label">网关延迟</span><span class="pave-summary-value" id="act2PavePing">—</span></div>
        </div>
    </div>
</div>
```

### Act 2.2 — 网络体检报告

```html
<div class="act-stage" id="act2Stage2">
    <div class="report-card">
        <div class="report-header">
            <div class="report-header-left">
                <div class="report-icon-wrap"><span class="report-icon">◇</span></div>
                <div class="report-title-group"><div class="report-title">网络体检报告</div><div class="report-sub">Network Health Check Report</div></div>
            </div>
            <div class="report-grade"><span class="report-grade-letter">B+</span><span class="report-grade-label">良好</span></div>
        </div>
        <div class="report-metrics">
            <div class="report-metric-row"><span class="report-metric-label">延迟表现</span><div class="report-metric-bar-wrap"><div class="report-metric-bar" data-width="65%"></div></div><span class="report-metric-val">12 ms</span><span class="report-metric-tag tag-good">优</span></div>
            <div class="report-metric-row"><span class="report-metric-label">下行带宽</span><div class="report-metric-bar-wrap"><div class="report-metric-bar" data-width="72%"></div></div><span class="report-metric-val">942 Mbps</span><span class="report-metric-tag tag-good">优</span></div>
            <div class="report-metric-row"><span class="report-metric-label">丢包抑制</span><div class="report-metric-bar-wrap"><div class="report-metric-bar" data-width="80%"></div></div><span class="report-metric-val">0.00%</span><span class="report-metric-tag tag-good">优</span></div>
            <div class="report-metric-row"><span class="report-metric-label">NAT 开放度</span><div class="report-metric-bar-wrap"><div class="report-metric-bar" data-width="75%"></div></div><span class="report-metric-val">Open</span><span class="report-metric-tag tag-good">优</span></div>
            <div class="report-metric-row"><span class="report-metric-label">抖动控制</span><div class="report-metric-bar-wrap"><div class="report-metric-bar" data-width="68%"></div></div><span class="report-metric-val">1.2 ms</span><span class="report-metric-tag tag-ok">良</span></div>
        </div>
        <div class="report-footer">
            <div class="report-stamp" id="act2ReportStamp"><span class="report-stamp-text">体检完成</span><span class="report-stamp-date">2026.06.12</span></div>
            <div class="report-footer-text"><span>◇ 本次体检为冠军专线开通服务的免费环节</span></div>
        </div>
    </div>
</div>
```

### Act 2.3 — 优化执行

```html
<div class="act-stage" id="act2Stage3">
    <div class="opt-banner"><span class="opt-banner-icon">◇</span><span class="opt-banner-text">基于体检结果，执行以下 5 项本地优化</span></div>
    <div class="opt-exec-list">
        <div class="opt-exec-item" id="act2OptExec1"><div class="opt-exec-left"><span class="opt-exec-icon">◈</span><div class="opt-exec-info"><span class="opt-exec-name">TCP 窗口调优</span><span class="opt-exec-reason">基于 942Mbps 高带宽适配</span></div></div><div class="opt-exec-right"><span class="opt-exec-before">65535</span><span class="opt-exec-arrow">→</span><span class="opt-exec-after" id="act2OptAfter1">—</span></div><div class="opt-exec-status" id="act2OptStatus1">等待中</div></div>
        <div class="opt-exec-item" id="act2OptExec2"><div class="opt-exec-left"><span class="opt-exec-icon">◈</span><div class="opt-exec-info"><span class="opt-exec-name">Nagle 算法优化</span><span class="opt-exec-reason">消除小包延迟，适配格斗游戏</span></div></div><div class="opt-exec-right"><span class="opt-exec-before">启用</span><span class="opt-exec-arrow">→</span><span class="opt-exec-after" id="act2OptAfter2">—</span></div><div class="opt-exec-status" id="act2OptStatus2">等待中</div></div>
        <div class="opt-exec-item" id="act2OptExec3"><div class="opt-exec-left"><span class="opt-exec-icon">◈</span><div class="opt-exec-info"><span class="opt-exec-name">QoS 优先级策略</span><span class="opt-exec-reason">游戏数据包优先转发</span></div></div><div class="opt-exec-right"><span class="opt-exec-before">未配置</span><span class="opt-exec-arrow">→</span><span class="opt-exec-after" id="act2OptAfter3">—</span></div><div class="opt-exec-status" id="act2OptStatus3">等待中</div></div>
        <div class="opt-exec-item" id="act2OptExec4"><div class="opt-exec-left"><span class="opt-exec-icon">◈</span><div class="opt-exec-info"><span class="opt-exec-name">BBR 拥塞控制</span><span class="opt-exec-reason">基于 0.00% 低丢包率特征</span></div></div><div class="opt-exec-right"><span class="opt-exec-before">CUBIC</span><span class="opt-exec-arrow">→</span><span class="opt-exec-after" id="act2OptAfter4">—</span></div><div class="opt-exec-status" id="act2OptStatus4">等待中</div></div>
        <div class="opt-exec-item" id="act2OptExec5"><div class="opt-exec-left"><span class="opt-exec-icon">◈</span><div class="opt-exec-info"><span class="opt-exec-name">DNS 智能路由</span><span class="opt-exec-reason">优化域名解析延迟</span></div></div><div class="opt-exec-right"><span class="opt-exec-before">默认</span><span class="opt-exec-arrow">→</span><span class="opt-exec-after" id="act2OptAfter5">—</span></div><div class="opt-exec-status" id="act2OptStatus5">等待中</div></div>
    </div>
    <div class="opt-summary" id="act2OptSummary"><span class="opt-summary-icon">✓</span><span class="opt-summary-text">5 项优化全部完成 · 相当于专业网络工程师上门调优服务</span></div>
</div>
```

### Act 2.4 — 直连验证

```html
<div class="act-stage" id="act2Stage4">
    <div class="direct-head"><div class="direct-head-title">直连游戏服务器测试</div><div class="direct-head-hint">本地优化后模拟直连，检测是否需要专线加速</div></div>
    <div class="direct-grid-2x2">
        <div class="direct-card direct-card--warn" id="act2DirectPing"><div class="direct-card-label">直连延迟</div><div class="direct-card-value" id="act2ValDirectPing">—</div><div class="direct-card-sub" id="act2SubDirectPing"></div></div>
        <div class="direct-card" id="act2DirectJitter"><div class="direct-card-label">直连抖动</div><div class="direct-card-value" id="act2ValDirectJitter">—</div><div class="direct-card-sub" id="act2SubDirectJitter"></div></div>
        <div class="direct-card direct-card--ok" id="act2DirectLoss"><div class="direct-card-label">直连丢包</div><div class="direct-card-value" id="act2ValDirectLoss">—</div><div class="direct-card-sub" id="act2SubDirectLoss"></div></div>
        <div class="direct-card direct-card--warn" id="act2DirectRating"><div class="direct-card-label">预估体验评级</div><div class="direct-card-value" id="act2ValDirectRating">—</div><div class="direct-card-sub" id="act2SubDirectRating"></div></div>
    </div>
    <div class="direct-conclusion" id="act2DirectConclusion">
        <span class="direct-conclusion-icon">◆</span>
        <span class="direct-conclusion-text">优化后本地网络表现良好，但直连游戏服务器延迟仍达 <em>68ms</em>。这是因为游玩体验还取决于运营商骨干网路由与服务器端负载。因此，需要进一步搭建<strong>冠军专线链路</strong>。</span>
    </div>
</div>
```

---

## 任务 2：修改 CSS — Step 2 全部样式

**文件**：`冠军专线开通_v2/style.css`

1. 将 `step-body` 的 `overflow-y: auto` 改为 `overflow-y: hidden`
2. 删除 L825-886 的现有 Step 2 样式（`.optimize-list` / `.opt-item` / `.device-tips` / `.direct-test` / `.narrative-text`）
3. 追加以下全部新样式

### 通用 Act Stage 样式

```css
.activation-page .act-stage {
    display: none; flex-direction: column; gap: 16px; height: 100%;
}
.activation-page .act-stage.active {
    display: flex;
    animation: actStageFadeIn 0.45s cubic-bezier(0.22,0.61,0.36,1) both;
}
.activation-page .act-stage.exiting {
    animation: actStageFadeOut 0.28s ease forwards;
}
@keyframes actStageFadeIn {
    from { opacity: 0; transform: translateY(12px); filter: blur(2px); }
    to   { opacity: 1; transform: translateY(0);   filter: blur(0); }
}
@keyframes actStageFadeOut {
    from { opacity: 1; transform: translateY(0); }
    to   { opacity: 0; transform: translateY(-8px); }
}
```

### Act 2.1 — 铺路启程

```css
.activation-page .pave-visual { display: flex; flex-direction: column; align-items: center; gap: 16px; padding: 32px 0 12px; }
.activation-page .pave-road { position: relative; width: 320px; height: 4px; background: rgba(180,160,120,.08); border-radius: 2px; overflow: hidden; }
.activation-page .pave-road-fill { position: absolute; left: 0; top: 0; height: 100%; width: 0%; background: linear-gradient(90deg, var(--gold-dark), var(--gold-light)); border-radius: 2px; transition: width 1.2s cubic-bezier(0.22,0.61,0.36,1); }
.activation-page .pave-road-fill.done { width: 100%; }
.activation-page .pave-label { font-size: 15px; letter-spacing: 2px; color: var(--text-muted); }
.activation-page .pave-summary { padding: 14px 20px; background: rgba(28,22,16,.4); border: 1px solid rgba(180,160,120,.08); border-radius: var(--radius-sm); opacity: 0; transform: translateY(8px); transition: all .5s ease; }
.activation-page .pave-summary.visible { opacity: 1; transform: translateY(0); }
.activation-page .pave-summary-title { font-size: 13px; letter-spacing: 2px; color: var(--gold); margin-bottom: 12px; }
.activation-page .pave-summary-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px 24px; }
.activation-page .pave-summary-item { display: flex; justify-content: space-between; align-items: center; }
.activation-page .pave-summary-label { font-size: 12px; color: var(--text-muted); letter-spacing: 1px; }
.activation-page .pave-summary-value { font-size: 14px; color: var(--text-light); letter-spacing: 1px; font-family: 'SF Mono', 'Consolas', monospace; }
```

### Act 2.2 — 体检报告

```css
.activation-page .report-card { padding: 20px 24px; background: linear-gradient(160deg, rgba(24,20,14,.7) 0%, rgba(18,14,10,.5) 100%); border: 1px solid rgba(180,160,120,.12); border-radius: var(--radius-md); display: flex; flex-direction: column; gap: 16px; }
.activation-page .report-header { display: flex; align-items: center; justify-content: space-between; }
.activation-page .report-header-left { display: flex; align-items: center; gap: 12px; }
.activation-page .report-icon-wrap { width: 36px; height: 36px; border-radius: 50%; border: 1px solid var(--gold); display: flex; align-items: center; justify-content: center; }
.activation-page .report-icon { color: var(--gold); font-size: 14px; }
.activation-page .report-title { font-size: 18px; letter-spacing: 3px; color: var(--text-white); }
.activation-page .report-sub { font-size: 10px; letter-spacing: 2px; color: var(--text-muted); margin-top: 2px; }
.activation-page .report-grade { display: flex; flex-direction: column; align-items: center; padding: 10px 16px; border: 1px solid var(--success-border); background: var(--success-bg); border-radius: var(--radius-sm); }
.activation-page .report-grade-letter { font-family: -apple-system, 'PingFang SC', 'Microsoft YaHei', serif; font-size: 28px; font-weight: 300; color: var(--success); letter-spacing: 1px; }
.activation-page .report-grade-label { font-size: 10px; letter-spacing: 2px; color: var(--success); }
.activation-page .report-metrics { display: flex; flex-direction: column; gap: 8px; }
.activation-page .report-metric-row { display: flex; align-items: center; gap: 10px; }
.activation-page .report-metric-label { width: 80px; font-size: 12px; color: var(--text-muted); letter-spacing: 1px; flex-shrink: 0; }
.activation-page .report-metric-bar-wrap { flex: 1; height: 5px; background: rgba(180,160,120,.06); border-radius: 3px; overflow: hidden; }
.activation-page .report-metric-bar { height: 100%; width: 0; background: var(--gold); border-radius: 3px; transition: width 0.8s cubic-bezier(0.22,0.61,0.36,1); }
.activation-page .report-metric-val { font-size: 12px; color: var(--text-light); font-family: 'SF Mono', 'Consolas', monospace; width: 65px; text-align: right; }
.activation-page .report-metric-tag { font-size: 10px; padding: 2px 6px; border-radius: 3px; letter-spacing: 1px; flex-shrink: 0; width: 22px; text-align: center; }
.activation-page .report-metric-tag.tag-good { color: var(--success); background: var(--success-bg); }
.activation-page .report-metric-tag.tag-ok { color: #e0a030; background: rgba(224,160,48,.06); }
.activation-page .report-footer { display: flex; align-items: center; justify-content: space-between; padding-top: 12px; border-top: 1px solid rgba(180,160,120,.06); }
.activation-page .report-stamp { display: flex; flex-direction: column; align-items: center; padding: 6px 12px; border: 1px solid var(--success-border); border-radius: 4px; opacity: 0; transform: scale(0.8); transition: all 0.6s cubic-bezier(0.34,1.56,0.64,1); }
.activation-page .report-stamp.visible { opacity: 1; transform: scale(1); }
.activation-page .report-stamp-text { font-size: 13px; letter-spacing: 2px; color: var(--success); }
.activation-page .report-stamp-date { font-size: 9px; color: var(--text-muted); letter-spacing: 1px; }
.activation-page .report-footer-text { font-size: 11px; color: var(--text-muted); letter-spacing: 1px; }
```

### Act 2.3 — 优化执行

```css
.activation-page .opt-banner { display: flex; align-items: center; gap: 8px; padding: 8px 0; }
.activation-page .opt-banner-icon { color: var(--gold); font-size: 10px; }
.activation-page .opt-banner-text { font-size: 13px; letter-spacing: 2px; color: var(--text-muted); }
.activation-page .opt-exec-list { display: flex; flex-direction: column; gap: 10px; }
.activation-page .opt-exec-item { display: flex; align-items: center; gap: 14px; padding: 12px 16px; background: rgba(28,22,16,.5); border: 1px solid rgba(180,160,120,.05); border-radius: var(--radius-sm); transition: all .5s ease; }
.activation-page .opt-exec-item.optimizing { border-color: rgba(200,178,130,.22); background: rgba(200,178,130,.04); }
.activation-page .opt-exec-item.done { border-color: var(--success-border); background: var(--success-bg); }
.activation-page .opt-exec-left { display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0; }
.activation-page .opt-exec-icon { font-size: 14px; color: var(--gold); flex-shrink: 0; }
.activation-page .opt-exec-info { display: flex; flex-direction: column; min-width: 0; }
.activation-page .opt-exec-name { font-size: 15px; letter-spacing: 1px; color: var(--text-light); }
.activation-page .opt-exec-reason { font-size: 10px; color: var(--text-muted); letter-spacing: 1px; margin-top: 1px; }
.activation-page .opt-exec-right { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
.activation-page .opt-exec-before { font-size: 13px; color: var(--text-muted); font-family: 'SF Mono', 'Consolas', monospace; }
.activation-page .opt-exec-arrow { font-size: 13px; color: var(--gold); opacity: .5; }
.activation-page .opt-exec-after { font-size: 15px; color: var(--success); font-family: 'SF Mono', 'Consolas', monospace; min-width: 90px; }
.activation-page .opt-exec-status { font-size: 13px; letter-spacing: 1px; color: rgba(220,200,170,.3); min-width: 60px; text-align: right; flex-shrink: 0; }
.activation-page .opt-exec-item.optimizing .opt-exec-status { color: var(--gold-bright); }
.activation-page .opt-exec-item.done .opt-exec-status { color: var(--success); }
.activation-page .opt-summary { display: flex; align-items: center; gap: 8px; padding: 12px 16px; background: rgba(124,200,138,.04); border: 1px solid var(--success-border); border-radius: var(--radius-sm); opacity: 0; transform: translateY(8px); transition: all .5s ease; }
.activation-page .opt-summary.visible { opacity: 1; transform: translateY(0); }
.activation-page .opt-summary-icon { color: var(--success); font-size: 14px; }
.activation-page .opt-summary-text { font-size: 13px; letter-spacing: 1px; color: var(--success); }
```

### Act 2.4 — 直连验证

```css
.activation-page .direct-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 2px; }
.activation-page .direct-head-title { font-size: 15px; letter-spacing: 2px; color: var(--text-light); }
.activation-page .direct-head-hint { font-size: 11px; color: var(--text-muted); letter-spacing: 1px; }
.activation-page .direct-grid-2x2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.activation-page .direct-card { padding: 16px 14px; background: rgba(28,22,16,.5); border: 1px solid rgba(180,160,120,.06); border-radius: var(--radius-sm); text-align: center; transition: all .5s ease; }
.activation-page .direct-card.revealed { border-color: rgba(200,178,130,.15); }
.activation-page .direct-card--warn { border-color: rgba(224,160,48,.18); background: rgba(224,160,48,.04); }
.activation-page .direct-card--warn.revealed { border-color: rgba(224,160,48,.3); }
.activation-page .direct-card--ok { border-color: var(--success-border); background: var(--success-bg); }
.activation-page .direct-card-label { font-size: 12px; letter-spacing: 2px; color: var(--gold); margin-bottom: 8px; }
.activation-page .direct-card-value { font-family: -apple-system, 'PingFang SC', 'Microsoft YaHei', serif; font-size: 26px; font-weight: 300; color: var(--text-white); margin-bottom: 4px; }
.activation-page .direct-card--warn .direct-card-value { color: #d4a040; }
.activation-page .direct-card--ok .direct-card-value { color: var(--success); }
.activation-page .direct-card-sub { font-size: 11px; color: var(--text-muted); letter-spacing: 1px; }
.activation-page .direct-conclusion { display: flex; align-items: flex-start; gap: 10px; padding: 14px 18px; background: rgba(224,160,48,.03); border: 1px solid rgba(224,160,48,.12); border-radius: var(--radius-sm); opacity: 0; transform: translateY(8px); transition: all .6s ease; }
.activation-page .direct-conclusion.visible { opacity: 1; transform: translateY(0); }
.activation-page .direct-conclusion-icon { color: #d4a040; font-size: 10px; flex-shrink: 0; margin-top: 3px; }
.activation-page .direct-conclusion-text { font-size: 13px; line-height: 1.7; color: var(--text-muted); letter-spacing: 1px; }
.activation-page .direct-conclusion-text em { font-style: normal; color: #d4a040; font-weight: 500; }
.activation-page .direct-conclusion-text strong { color: var(--gold-light); font-weight: 500; }
```

---

## 任务 3：修改 JS — 动画逻辑

**文件**：`冠军专线开通_v2/script.js`

### 3a. 新增 actStageSwitch 辅助函数

在 `actHideNextButton` 函数后（约 L229）添加：

```javascript
// Act-Stage 过渡（step-body 内部的幕切换）
function actStageSwitch(stageEl, cb) {
    var cur = document.querySelector('#actStep2Body .act-stage.active');
    if (cur) {
        cur.classList.add('exiting');
        cur.addEventListener('animationend', function h() {
            cur.removeEventListener('animationend', h);
            cur.classList.remove('active', 'exiting');
            stageEl.classList.add('active');
            if (cb) cb();
        }, { once: true });
    } else {
        stageEl.classList.add('active');
        if (cb) cb();
    }
}
```

### 3b. 重写 actRunStep2

替换 L331-380 的 `actRunStep2` 函数：

```javascript
async function actRunStep2() {
    actShowStep(2);

    // ===== Act 2.1: 铺路启程 =====
    document.getElementById('act2Stage1').classList.add('active');
    await actSleep(300);
    document.getElementById('act2PaveFill').classList.add('done');
    await actSleep(1200);

    document.getElementById('act2PaveISP').textContent = ACT_MOCK.ispSub;
    document.getElementById('act2PaveBW').textContent = ACT_MOCK.bw;
    document.getElementById('act2PaveNAT').textContent = ACT_MOCK.nat;
    document.getElementById('act2PavePing').textContent = ACT_MOCK.ping;
    document.getElementById('act2PaveSummary').classList.add('visible');
    await actSleep(600);

    await new Promise(function(resolve) { actStageSwitch(document.getElementById('act2Stage2'), resolve); });

    // ===== Act 2.2: 网络体检报告 =====
    await actSleep(400);
    var metricRows = document.querySelectorAll('#act2Stage2 .report-metric-row');
    var metricWidths = ['65%', '72%', '80%', '75%', '68%'];
    for (var j = 0; j < metricRows.length; j++) {
        await actSleep(280);
        metricRows[j].querySelector('.report-metric-bar').style.width = metricWidths[j];
        metricRows[j].classList.add('revealed');
    }
    await actSleep(400);
    document.getElementById('act2ReportStamp').classList.add('visible');
    await actSleep(800);

    await new Promise(function(resolve) { actStageSwitch(document.getElementById('act2Stage3'), resolve); });

    // ===== Act 2.3: 优化执行 =====
    await actSleep(300);
    var optData = [
        { after: '262144',     status: '已优化' },
        { after: '禁用',        status: '已优化' },
        { after: '最高优先级',  status: '已配置' },
        { after: 'BBR v3',     status: '已启用' },
        { after: '冠军专线DNS', status: '已配置' }
    ];
    for (var k = 0; k < optData.length; k++) {
        var item = document.getElementById('act2OptExec' + (k + 1));
        var statusEl = document.getElementById('act2OptStatus' + (k + 1));
        var afterEl = document.getElementById('act2OptAfter' + (k + 1));
        item.classList.add('optimizing');
        statusEl.textContent = '优化中...';
        await actSleep(550);
        afterEl.textContent = optData[k].after;
        item.classList.remove('optimizing');
        item.classList.add('done');
        statusEl.textContent = optData[k].status;
        await actSleep(200);
    }
    await actSleep(300);
    document.getElementById('act2OptSummary').classList.add('visible');
    await actSleep(600);

    await new Promise(function(resolve) { actStageSwitch(document.getElementById('act2Stage4'), resolve); });

    // ===== Act 2.4: 直连验证 =====
    await actSleep(400);
    var directCards = [
        { cardId: 'act2DirectPing',   valId: 'act2ValDirectPing',   subId: 'act2SubDirectPing',   value: ACT_MOCK.directPing,    sub: ACT_MOCK.directPingSub },
        { cardId: 'act2DirectJitter', valId: 'act2ValDirectJitter', subId: 'act2SubDirectJitter', value: ACT_MOCK.directJitter,  sub: ACT_MOCK.directJitterSub },
        { cardId: 'act2DirectLoss',   valId: 'act2ValDirectLoss',   subId: 'act2SubDirectLoss',   value: ACT_MOCK.directLoss,    sub: ACT_MOCK.directLossSub },
        { cardId: 'act2DirectRating', valId: 'act2ValDirectRating', subId: 'act2SubDirectRating', value: ACT_MOCK.directRating,  sub: ACT_MOCK.directRatingSub }
    ];
    for (var m = 0; m < directCards.length; m++) {
        await actSleep(320);
        var dc = directCards[m];
        document.getElementById(dc.valId).textContent = dc.value;
        document.getElementById(dc.subId).textContent = dc.sub;
        document.getElementById(dc.cardId).classList.add('revealed');
    }
    await actSleep(400);
    document.getElementById('act2DirectConclusion').classList.add('visible');
    await actSleep(600);
    actCompleteCurrentStep();
    actShowNextButton();
}
```

### 3c. 补充 actResetAll 中 Step 2 的重置逻辑

在 `actResetAll` 函数（约 L578）末尾、重置进度条逻辑之前，追加：

```javascript
// Reset Step 2 act-stages
['act2Stage1','act2Stage2','act2Stage3','act2Stage4'].forEach(function(sid) {
    var el = document.getElementById(sid); if (el) el.classList.remove('active', 'exiting');
});
if (document.getElementById('act2PaveFill')) document.getElementById('act2PaveFill').classList.remove('done');
if (document.getElementById('act2PaveSummary')) document.getElementById('act2PaveSummary').classList.remove('visible');
['act2PaveISP','act2PaveBW','act2PaveNAT','act2PavePing'].forEach(function(id) {
    var el = document.getElementById(id); if (el) el.textContent = '—';
});
var reportMetricRows = document.querySelectorAll('#act2Stage2 .report-metric-row');
reportMetricRows.forEach(function(r) {
    r.classList.remove('revealed');
    var bar = r.querySelector('.report-metric-bar'); if (bar) bar.style.width = '0';
});
if (document.getElementById('act2ReportStamp')) document.getElementById('act2ReportStamp').classList.remove('visible');
for (var oi = 1; oi <= 5; oi++) {
    var item = document.getElementById('act2OptExec' + oi);
    if (item) item.classList.remove('optimizing', 'done');
    var status = document.getElementById('act2OptStatus' + oi);
    if (status) status.textContent = '等待中';
    var after = document.getElementById('act2OptAfter' + oi);
    if (after) after.textContent = '—';
}
if (document.getElementById('act2OptSummary')) document.getElementById('act2OptSummary').classList.remove('visible');
['act2DirectPing','act2DirectJitter','act2DirectLoss','act2DirectRating'].forEach(function(id) {
    var el = document.getElementById(id); if (el) el.classList.remove('revealed');
});
['act2ValDirectPing','act2ValDirectJitter','act2ValDirectLoss','act2ValDirectRating'].forEach(function(id) {
    var el = document.getElementById(id); if (el) el.textContent = '—';
});
['act2SubDirectPing','act2SubDirectJitter','act2SubDirectLoss','act2SubDirectRating'].forEach(function(id) {
    var el = document.getElementById(id); if (el) el.textContent = '';
});
if (document.getElementById('act2DirectConclusion')) document.getElementById('act2DirectConclusion').classList.remove('visible');
```

---

## 验证

1. 打开 `index.html` 预览
2. 通过 MVP 调试面板点击 "② 本地网络优化" 直接跳转到 Step 2
3. 确认 4 幕依次自动播放：铺路动画 → 体检报告 → 优化执行 → 直连测试
4. 确认每幕内容在 440px 内一屏显示，无滚动
5. 确认幕间过渡流畅（fade-out 280ms → fade-in 450ms）
6. 确认"下一步"按钮在 Act 2.4 结束后正确出现
7. 点击"下一步"确认能正常跳转至 Step 3
8. 重新运行完整流程（一键演示），确认 Step 2 从 intro → Step 1 → Step 2 过渡正常
9. 重新进入开通流程，确认 Step 2 状态已完全重置
