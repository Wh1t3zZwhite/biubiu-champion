/* ============================================================
   冠军专线 · 开通中配置环节 — 交互逻辑
   左侧导航 + 右侧内容 · 手动推进 · 转场动效
   ============================================================ */

// --- 模拟数据 ---
const MOCK = {
    ip: '113.68.***.42',
    isp: '中国电信',
    ispSub: '广东 · 广州',
    bw: '942 Mbps',
    bwSub: '实测下行',
    ping: '12 ms',
    pingSub: '本地网关',
    loss: '0.00%',
    lossSub: '1000包零丢',
    nat: 'Open (Type 1)',
    natSub: '最佳连接类型',
    serverName: 'Biubiu-CN-GZ-07',
    serverInfo: '广州 · 竞技专线节点',
    matchScore: 97,
    nodeName: 'CHAMPION-GZ-07-A3',
    nodeIP: '10.88.7.***',
    encrypt: 'AES-256-GCM',
    tunnelProto: 'WireGuard',
    dedicatedBW: '200 Mbps',
    routeHops: '3 跳直达',
    linkRTT: '8.2 ms',
    latencyAvg: '8.2 ms',
    latencyMin: '6 ms',
    latencyJitter: '±1.3 ms',
};

const TOTAL_STEPS = 7;
let currentStep = 0;
let stepCompleted = false;

const STEP_LABELS = [
    '', '网络检测', '配置优化', '服务器匹配',
    '专属绑定', '联调测试', '环境就绪', '售后保障'
];

const NEXT_STEP_TEXTS = [
    '',
    '下一步：配置优化',
    '下一步：服务器匹配',
    '下一步：专属绑定',
    '下一步：联调测试',
    '下一步：环境就绪',
    '下一步：售后保障',
    '下一步：完成交付'
];

// --- Utility ---
function $(sel) { return document.querySelector(sel); }
function $$(sel) { return document.querySelectorAll(sel); }
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function switchScreen(from, to) {
    document.getElementById(from).classList.remove('active');
    document.getElementById(to).classList.add('active');
}

// --- Particles ---
function spawnParticles(container, count) {
    const el = document.getElementById(container);
    if (!el) return;
    el.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'intro-particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.top = (60 + Math.random() * 40) + '%';
        p.style.animationDelay = Math.random() * 6 + 's';
        p.style.animationDuration = (4 + Math.random() * 4) + 's';
        el.appendChild(p);
    }
}

function spawnGoldParticles() {
    const container = document.getElementById('goldParticles');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 15; i++) {
        const p = document.createElement('div');
        p.className = 'gold-particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.top = (65 + Math.random() * 35) + '%';
        p.style.animationDelay = Math.random() * 6 + 's';
        p.style.animationDuration = (5 + Math.random() * 4) + 's';
        container.appendChild(p);
    }
}

// --- Left Nav Progress ---
function updateNavProgress(step, inProgress) {
    const navSteps = $$('.nav-step');
    const progressFill = $('#navProgressFill');
    const progressText = $('#navProgressText');

    if (step <= 0) {
        navSteps.forEach(ns => {
            ns.classList.remove('active', 'done');
            ns.querySelector('.nav-step-status').textContent = '等待中';
            ns.querySelector('.nav-step-indicator').textContent = ns.dataset.step;
        });
        progressFill.style.width = '0%';
        progressText.textContent = '0 / ' + TOTAL_STEPS;
        return;
    }

    navSteps.forEach((ns, i) => {
        const stepNum = i + 1;
        ns.classList.remove('active', 'done');
        const statusEl = ns.querySelector('.nav-step-status');
        const indicatorEl = ns.querySelector('.nav-step-indicator');

        if (stepNum < step) {
            ns.classList.add('done');
            statusEl.textContent = '已完成';
            indicatorEl.textContent = '✓';
        } else if (stepNum === step) {
            if (inProgress) {
                ns.classList.add('active');
                statusEl.textContent = '进行中...';
                indicatorEl.textContent = stepNum;
            } else {
                ns.classList.add('done');
                statusEl.textContent = '已完成';
                indicatorEl.textContent = '✓';
            }
        } else {
            statusEl.textContent = '等待中';
            indicatorEl.textContent = stepNum;
        }
    });

    // Progress bar: completed steps / total
    const completedCount = inProgress ? step - 1 : step;
    const pct = (completedCount / TOTAL_STEPS) * 100;
    progressFill.style.width = pct + '%';
    progressText.textContent = completedCount + ' / ' + TOTAL_STEPS;
}

function showStep(n) {
    currentStep = n;
    updateNavProgress(n, true);
    $$('.step-panel').forEach(p => {
        p.classList.remove('active', 'entering', 'exiting');
    });
    const panel = $('#step' + n);
    if (panel) {
        panel.classList.add('active', 'entering');
        setTimeout(() => panel.classList.remove('entering'), 900);
    }
}

function completeCurrentStep() {
    updateNavProgress(currentStep, false);
}

// --- Toast ---
async function showToast(text) {
    const toast = $('#stepToast');
    $('#toastText').textContent = text;
    toast.classList.add('visible');
    await sleep(1500);
    toast.classList.remove('visible');
}

// --- Manual Advance Button ---
function showNextButton() {
    stepCompleted = true;
    const btn = $('#stepNextBtn');
    const textEl = $('#nextBtnText');
    textEl.textContent = NEXT_STEP_TEXTS[currentStep];
    btn.classList.add('visible');
}

function hideNextButton() {
    stepCompleted = false;
    const btn = $('#stepNextBtn');
    btn.classList.remove('visible');
}

// --- Step Transition ---
async function playStepTransition() {
    const currentPanel = $('#step' + currentStep);

    // 1. Current panel exits
    if (currentPanel && currentPanel.classList.contains('active')) {
        currentPanel.classList.add('exiting');
        await sleep(350);
        currentPanel.classList.remove('active', 'exiting');
    }

    // 2. Beam sweep overlay
    const overlay = $('#stepTransitionOverlay');
    overlay.classList.add('active');
    spawnTransitionBurst();
    await sleep(550);
    overlay.classList.remove('active');

    // 3. Breathing pause
    await sleep(150);
}

function spawnTransitionBurst() {
    const container = $('#stepStage');
    if (!container) return;
    const centerX = container.offsetWidth / 2;
    const centerY = container.offsetHeight / 2;

    for (let i = 0; i < 12; i++) {
        const spark = document.createElement('div');
        spark.className = 'transition-spark';
        spark.style.left = centerX + 'px';
        spark.style.top = centerY + 'px';
        const angle = (i / 12) * Math.PI * 2;
        const dist = 50 + Math.random() * 70;
        spark.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
        spark.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
        container.appendChild(spark);
        setTimeout(() => spark.remove(), 800);
    }
}

// --- goNextStep (button click handler) ---
async function goNextStep() {
    if (!stepCompleted) return;
    hideNextButton();

    if (currentStep >= TOTAL_STEPS) {
        // Final step done → transition to complete
        await playStepTransition();
        $('#summaryNode').textContent = MOCK.nodeName;
        $('#summaryIP').textContent = MOCK.nodeIP;
        $('#summaryLatency').textContent = MOCK.latencyAvg;
        $('#summaryMatch').textContent = MOCK.matchScore + '%';
        switchScreen('screenCeremony', 'screenComplete');
        spawnParticles('completeParticles', 30);
        return;
    }

    // Play transition then execute next step
    await playStepTransition();

    const nextStep = currentStep + 1;
    const runners = [null, runStep1, runStep2, runStep3, runStep4, runStep5, runStep6, runStep7];
    await runners[nextStep]();
}

// ============================================================
// Step Animations
// ============================================================

// Step 1: 网络检测
async function runStep1() {
    showStep(1);
    const cards = [
        { id: 'detectIP', val: 'valIP', sub: 'subIP', value: MOCK.ip, subText: '已脱敏' },
        { id: 'detectISP', val: 'valISP', sub: 'subISP', value: MOCK.isp, subText: MOCK.ispSub },
        { id: 'detectBW', val: 'valBW', sub: 'subBW', value: MOCK.bw, subText: MOCK.bwSub },
        { id: 'detectPing', val: 'valPing', sub: 'subPing', value: MOCK.ping, subText: MOCK.pingSub },
        { id: 'detectLoss', val: 'valLoss', sub: 'subLoss', value: MOCK.loss, subText: MOCK.lossSub },
        { id: 'detectNAT', val: 'valNAT', sub: 'subNAT', value: MOCK.nat, subText: MOCK.natSub },
    ];
    for (const c of cards) {
        await sleep(500);
        const valEl = document.getElementById(c.val);
        valEl.classList.remove('scanning');
        valEl.textContent = c.value;
        document.getElementById(c.sub).textContent = c.subText;
        document.getElementById(c.id).classList.add('revealed');
    }
    await sleep(300);
    completeCurrentStep();
    showNextButton();
}

// Step 2: 配置优化
async function runStep2() {
    showStep(2);
    const opts = [
        { after: '262144', status: '已优化' },
        { after: '冠军专线DNS', status: '已配置' },
        { after: '禁用', status: '已优化' },
        { after: '1420', status: '已适配' },
        { after: '最高优先级', status: '已配置' },
    ];
    const items = $$('#optimizeList .opt-item');
    for (let i = 0; i < items.length; i++) {
        items[i].classList.add('optimizing');
        document.getElementById('optStatus' + (i + 1)).textContent = '优化中...';
        await sleep(600);
        document.getElementById('optAfter' + (i + 1)).textContent = opts[i].after;
        items[i].classList.remove('optimizing');
        items[i].classList.add('done');
        document.getElementById('optStatus' + (i + 1)).textContent = opts[i].status;
        await sleep(200);
    }
    completeCurrentStep();
    showNextButton();
}

// Step 3: 服务器匹配
async function runStep3() {
    showStep(3);
    $('#matchLocalInfo').textContent = MOCK.ispSub;
    const line = $('#matchLine');
    line.classList.add('scanning');
    await sleep(2500);
    line.classList.remove('scanning');
    line.classList.add('connected');
    $('#matchLineData').textContent = 'RTT ' + MOCK.ping;

    const serverEndpoint = $('.match-server');
    serverEndpoint.classList.add('connected');
    $('#matchServerName').textContent = MOCK.serverName;
    $('#matchServerInfo').textContent = MOCK.serverInfo;
    $('.match-local').classList.add('connected');

    await sleep(300);
    const result = $('#matchResult');
    result.classList.add('visible');
    const circumference = 2 * Math.PI * 52;
    const offset = circumference * (1 - MOCK.matchScore / 100);
    $('#matchRing').style.strokeDashoffset = offset;

    let score = 0;
    const scoreEl = $('#matchScoreNum');
    const scoreInterval = setInterval(() => {
        score += 2;
        if (score >= MOCK.matchScore) {
            score = MOCK.matchScore;
            clearInterval(scoreInterval);
        }
        scoreEl.textContent = score;
    }, 30);

    await sleep(1500);
    completeCurrentStep();
    showNextButton();
}

// Step 4: 专属绑定
async function runStep4() {
    showStep(4);
    const ceremony = $('#bindCeremony');
    const statusText = $('#bindStatusText');

    // 阶段 1：通道创建
    ceremony.classList.add('binding');
    statusText.textContent = '正在建立冠军专线专属通道...';
    await sleep(1500);

    // 阶段 2：链路贯通
    statusText.textContent = '专线链路贯通 · 节点锁定中...';
    await sleep(1500);

    // 阶段 3：绑定锁定
    ceremony.classList.remove('binding');
    ceremony.classList.add('bound');
    ceremony.querySelector('.bind-icon').textContent = '✓';
    statusText.textContent = '专属通道已就绪';
    await sleep(800);

    // 揭示凭证卡片
    const cards = [
        { id: 'bindNodeName', value: MOCK.nodeName, desc: 'bindNodeNameDesc', descText: '该节点已分配给您，不再接受其他用户接入' },
        { id: 'bindNodeIP', value: MOCK.nodeIP, desc: 'bindNodeIPDesc', descText: '您在专线网络中的唯一标识地址' },
        { id: 'bindEncrypt', value: '独立隧道', desc: 'bindEncryptDesc', descText: '为您单独建立的加速通道，不与其他用户共享' },
        { id: 'bindStatus', value: '已绑定' },
    ];
    for (const c of cards) {
        await sleep(300);
        const el = document.getElementById(c.id);
        el.textContent = c.value;
        el.closest('.bind-info-card').classList.add('revealed');
        if (c.desc) {
            document.getElementById(c.desc).textContent = c.descText;
        }
    }

    // 独占声明
    await sleep(400);
    $('#bindExclusive').classList.add('visible');

    // 链路指标
    await sleep(400);
    $('#bindMetricProto').textContent = MOCK.tunnelProto;
    $('#bindMetricBW').textContent = MOCK.dedicatedBW;
    $('#bindMetricHops').textContent = MOCK.routeHops;
    $('#bindMetricRTT').textContent = MOCK.linkRTT;
    $('#bindMetrics').classList.add('visible');

    // 兆底承诺
    await sleep(300);
    $('#bindSafety').classList.add('visible');

    await sleep(400);
    completeCurrentStep();
    showNextButton();
}

// Step 5: 联调测试
async function runStep5() {
    showStep(5);
    const canvas = $('#latencyCanvas');
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;

    const points = [];
    const count = 40;
    for (let i = 0; i < count; i++) {
        points.push(6 + Math.random() * 5 + Math.sin(i * 0.3) * 2);
    }

    ctx.clearRect(0, 0, W, H);
    const stepW = W / (count - 1);

    for (let i = 0; i < count; i++) {
        const x = i * stepW;
        const y = H - (points[i] / 100) * H;

        if (i === 0) {
            ctx.beginPath();
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }

        ctx.strokeStyle = 'rgba(200,178,130,0.8)';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.strokeStyle = 'rgba(200,178,130,0.2)';
        ctx.lineWidth = 6;
        ctx.stroke();

        if (i < count - 1) {
            ctx.beginPath();
            ctx.moveTo(x, y);
        }

        await sleep(40);
    }

    ctx.lineTo(W, H);
    ctx.lineTo(0, H);
    ctx.closePath();
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, 'rgba(200,178,130,0.15)');
    grad.addColorStop(1, 'rgba(200,178,130,0)');
    ctx.fillStyle = grad;
    ctx.fill();

    await sleep(200);
    $('#latAvg').textContent = MOCK.latencyAvg;
    await sleep(300);
    $('#latMin').textContent = MOCK.latencyMin;
    await sleep(300);
    $('#latJitter').textContent = MOCK.latencyJitter;
    await sleep(300);
    const resultEl = $('#latResult');
    resultEl.textContent = '冠军级';
    resultEl.classList.add('pass');

    await sleep(400);
    completeCurrentStep();
    showNextButton();
}

// Step 6: 环境就绪
async function runStep6() {
    showStep(6);
    const items = $$('#cleanupList .cleanup-item');
    for (const item of items) {
        await sleep(500);
        item.classList.add('done');
        item.querySelector('.cleanup-icon').textContent = '✓';
        item.querySelector('.cleanup-status').textContent = '已完成';
    }
    await sleep(400);
    $('#readyBadge').classList.add('visible');
    await sleep(400);
    completeCurrentStep();
    showNextButton();
}

// Step 7: 售后保障
async function runStep7() {
    showStep(7);
    const cards = $$('#step7 .service-card');
    for (let i = 0; i < cards.length; i++) {
        await sleep(350);
        cards[i].classList.add('visible');
    }
    await sleep(1000);
    completeCurrentStep();
    showNextButton();
}

// ============================================================
// Main Flow
// ============================================================

async function startCeremony() {
    switchScreen('screenIntro', 'screenCeremony');
    spawnGoldParticles();
    await sleep(800);
    await runStep1();
}

function resetAll() {
    currentStep = 0;
    stepCompleted = false;
    updateNavProgress(0);
    hideNextButton();

    // Reset step 1 (网络检测)
    ['IP','ISP','BW','Ping','Loss','NAT'].forEach(k => {
        const valEl = document.getElementById('val' + k);
        valEl.classList.add('scanning');
        valEl.textContent = '检测中...';
        document.getElementById('sub' + k).textContent = '';
        document.getElementById('detect' + k).classList.remove('revealed');
    });
    $('#valIP').textContent = '扫描中...';
    $('#valBW').textContent = '测量中...';
    $('#valPing').textContent = '探测中...';

    // Reset step 2 (配置优化)
    $$('#optimizeList .opt-item').forEach((item, i) => {
        item.classList.remove('optimizing', 'done');
        document.getElementById('optAfter' + (i+1)).textContent = '—';
        document.getElementById('optStatus' + (i+1)).textContent = '待优化';
    });

    // Reset step 3 (服务器匹配)
    $('#matchLine').classList.remove('scanning', 'connected');
    $('#matchLineData').textContent = '探测中...';
    $('.match-local').classList.remove('connected');
    $('.match-server').classList.remove('connected');
    $('#matchServerName').textContent = '专线节点';
    $('#matchServerInfo').textContent = '匹配中...';
    $('#matchResult').classList.remove('visible');
    $('#matchRing').style.strokeDashoffset = 326.7;
    $('#matchScoreNum').textContent = '—';

    // Reset step 4 (专属绑定)
    $('#bindCeremony').classList.remove('binding', 'bound');
    $('#bindCeremony').querySelector('.bind-icon').textContent = '🔗';
    $('#bindStatusText').textContent = '准备建立专属通道...';
    ['bindNodeName','bindNodeIP','bindEncrypt','bindStatus'].forEach(id => {
        document.getElementById(id).textContent = '—';
        document.getElementById(id).closest('.bind-info-card').classList.remove('revealed');
    });
    ['bindNodeNameDesc','bindNodeIPDesc','bindEncryptDesc'].forEach(id => {
        document.getElementById(id).textContent = '';
    });
    $('#bindExclusive').classList.remove('visible');
    $('#bindMetrics').classList.remove('visible');
    ['bindMetricProto','bindMetricBW','bindMetricHops','bindMetricRTT'].forEach(id => {
        document.getElementById(id).textContent = '—';
    });
    $('#bindSafety').classList.remove('visible');

    // Reset step 5 (联调测试)
    const canvas = $('#latencyCanvas');
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    $('#latAvg').textContent = '—';
    $('#latMin').textContent = '—';
    $('#latJitter').textContent = '—';
    const latResult = $('#latResult');
    latResult.textContent = '—';
    latResult.classList.remove('pass');

    // Reset step 6 (环境就绪)
    $$('#cleanupList .cleanup-item').forEach(item => {
        item.classList.remove('done');
        item.querySelector('.cleanup-icon').textContent = '◇';
        item.querySelector('.cleanup-status').textContent = '等待中';
    });
    $('#readyBadge').classList.remove('visible');

    // Reset step 7 (售后保障)
    $$('#step7 .service-card').forEach(card => card.classList.remove('visible'));

    // Clear particles
    const gp = document.getElementById('goldParticles');
    if (gp) gp.innerHTML = '';

    switchScreen('screenComplete', 'screenIntro');
}

// --- Init ---
spawnParticles('introParticles', 30);
