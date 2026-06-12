        // ====================================================================
        // 冠军专线开通全流程 — JavaScript
        // ====================================================================

        // --- DOM 引用 ---
        var viewMain = document.getElementById('viewMain');
        var viewActivation = document.getElementById('viewActivation');
        var viewDelivery = document.getElementById('viewDelivery');

        // --- 视图管理 ---
        function clearAllViews() {
            [viewMain, viewActivation, viewDelivery].forEach(function(v) {
                if (v) { v.classList.remove('active'); }
            });
            closeAvatarDropdown();
        }

        function devGoto(view) {
            clearAllViews();
            if (view === 'main') {
                viewMain.classList.add('active');
            } else if (view === 'activation') {
                viewActivation.classList.add('active');
                actResetAll();
                document.getElementById('actIntro').classList.remove('is-visible');
                document.getElementById('actCeremony').classList.add('is-visible');
                actSpawnGoldParticles();
                setTimeout(function() { actRunStep1(); }, 800);
            } else if (view === 'delivery') {
                viewDelivery.classList.add('active');
                startDelivery({});
            }
        }

        function devJumpToStep(step) {
            clearAllViews();
            viewActivation.classList.add('active');
            actResetAll();

            if (step === 0) {
                // Intro 封面
                document.getElementById('actIntro').classList.add('is-visible');
                document.getElementById('actCeremony').classList.remove('is-visible');
                actSpawnIntroParticles();
                return;
            }

            // 直接进入仪式阶段
            document.getElementById('actIntro').classList.remove('is-visible');
            document.getElementById('actCeremony').classList.add('is-visible');
            actSpawnGoldParticles();

            var runners = [null, actRunStep1, actRunStep2, actRunStep3, actRunStep4];
            setTimeout(function() { runners[step](); }, 400);
        }

        function devJumpToStep2Sub(subAct) {
            clearAllViews();
            viewActivation.classList.add('active');
            actResetAll();
            document.getElementById('actIntro').classList.remove('is-visible');
            document.getElementById('actCeremony').classList.add('is-visible');
            actSpawnGoldParticles();
            actShowStep(2);
            act2HideAllBtns();

            setTimeout(async function() {
                // 瞬间填充前面幕的数据
                act2PopulateActInstant(subAct - 1);

                var stageEl = document.getElementById('act2Stage' + (subAct + 1));
                await new Promise(function(r) { actStageSwitch(stageEl, r); });

                if (subAct === 1) {
                    await actSleep(350);
                    var optData = [
                        { after: '262144', status: '已优化' },
                        { after: '禁用', status: '已优化' },
                        { after: '游戏优先', status: '已配置' },
                        { after: 'BBR v3', status: '已启用' },
                        { after: '冠军专线DNS', status: '已配置' }
                    ];
                    for (var o = 0; o < optData.length; o++) {
                        var idx = o + 1;
                        var itemEl = document.getElementById('act2OptExec' + idx);
                        var statusEl = document.getElementById('act2OptStatus' + idx);
                        var afterEl = document.getElementById('act2OptAfter' + idx);
                        itemEl.classList.add('optimizing');
                        statusEl.textContent = '优化中...';
                        await actSleep(550);
                        afterEl.textContent = optData[o].after;
                        itemEl.classList.remove('optimizing');
                        itemEl.classList.add('done');
                        statusEl.textContent = optData[o].status;
                        // 更新优化进度条
                        var pct = Math.round((o + 1) / optData.length * 100);
                        document.getElementById('act2OptProgressFill').style.width = pct + '%';
                        document.getElementById('act2OptProgressPct').textContent = pct + '%';
                        document.getElementById('act2OptProgressLabel').textContent = '已完成 ' + (o + 1) + '/5';
                        await actSleep(200);
                    }
                    await actSleep(300);
                    document.getElementById('act2OptSummary').classList.add('visible');
                    await actSleep(600);
                } else if (subAct === 2) {
                    await actSleep(400);
                    actCompleteCurrentStep(); actShowNextButton();
                }
            }, 400);
        }

        // ====================================================================
        // 头像下拉菜单
        // ====================================================================
        function toggleAvatarDropdown() {
            var dd = document.getElementById('avatarDropdown');
            var avatar = document.getElementById('topbarAvatar');
            var backdrop = document.getElementById('dropdownBackdrop');
            if (dd.classList.contains('is-open')) {
                closeAvatarDropdown();
            } else {
                dd.classList.add('is-open');
                avatar.classList.add('is-open');
                backdrop.classList.add('is-active');
            }
        }

        function closeAvatarDropdown() {
            var dd = document.getElementById('avatarDropdown');
            var avatar = document.getElementById('topbarAvatar');
            var backdrop = document.getElementById('dropdownBackdrop');
            if (dd) dd.classList.remove('is-open');
            if (avatar) avatar.classList.remove('is-open');
            if (backdrop) backdrop.classList.remove('is-active');
        }

        // ====================================================================
        // 导航：主界面 → 开通 → 交付 → 主界面
        // ====================================================================
        function goToOrderFromMain() {
            closeAvatarDropdown();
            clearAllViews();
            viewActivation.classList.add('active');
            actResetAll();
            document.getElementById('actIntro').classList.add('is-visible');
            actSpawnIntroParticles();
        }

        function backFromActivation() {
            clearAllViews();
            viewMain.classList.add('active');
        }

        function actCompleteToDelivery() {
            clearAllViews();
            viewDelivery.classList.add('active');
            startDelivery(ACT_MOCK);
        }

        function finishDelivery() {
            var flash = document.getElementById('deliveryFlash');
            flash.classList.add('is-active');
            setTimeout(function() {
                flash.classList.remove('is-active');
                clearAllViews();
                viewMain.classList.add('active');
            }, 1000);
        }

        // ====================================================================
        // 开通仪式引擎
        // ====================================================================
        var ACT_MOCK = {
            ip: '113.68.***.42', isp: '中国电信', ispSub: '广东 · 广州',
            bw: '942 Mbps', bwSub: '实测下行',
            bwUp: '487 Mbps', bwUpSub: '实测上行',
            ping: '12 ms', pingSub: '本地网关',
            jitter: '1.2 ms', jitterSub: '延迟波动',
            loss: '0.00%', lossSub: '1000包零丢',
            nat: 'Open (Type 1)', natSub: '最佳连接类型',
            radar: { ping: 0.65, bw: 0.72, bwUp: 0.60, nat: 0.75, loss: 0.80, jitter: 0.68 }, radarGrade: '中等',
            serverName: 'Biubiu-CN-GZ-07', serverInfo: '广州 · 竞技专线节点',
            matchScore: 97,
            matchDetailRTT: '8.2 ms', matchDetailGameLatency: '12.5 ms', matchDetailStability: '±0.8ms', matchDetailBW: '200 Mbps',
            nodeName: 'CHAMPION-GZ-07-A3', nodeIP: '10.88.7.***', encrypt: 'AES-256-GCM',
            tunnelProto: 'WireGuard', dedicatedBW: '200 Mbps', routeHops: '3 跳直达', linkRTT: '8.2 ms',
            directPing: '68 ms', directPingSub: '至游戏服务器（偏高）',
            directJitter: '4.8 ms', directJitterSub: '直连抖动',
            directLoss: '0.15%', directLossSub: '偶有轻微丢包',
            directRating: '中等', directRatingSub: '不建议直接游玩',
            latencyAvg: '68 ms',
            latencyMin: '62 ms',
            latencyJitter: '±4.8 ms'
        };
        var ACT_TOTAL = 4, actCurrentStep = 0, actStepCompleted = false;
        var ACT_NEXT_TEXTS = ['', '下一步：本地网络优化', '下一步：节点匹配度检测', '下一步：专属绑定', '完成交付'];
        var act2StageResolver = null;

        function actSleep(ms) { return new Promise(function(r) { setTimeout(r, ms); }); }

        function actSpawnIntroParticles() {
            var c = document.getElementById('actIntroParticles');
            if (!c) return; c.innerHTML = '';
            for (var i = 0; i < 30; i++) {
                var p = document.createElement('div');
                p.className = 'intro-particle';
                p.style.left = Math.random() * 100 + '%';
                p.style.top = (60 + Math.random() * 40) + '%';
                p.style.animationDelay = Math.random() * 6 + 's';
                p.style.animationDuration = (4 + Math.random() * 4) + 's';
                c.appendChild(p);
            }
        }

        function actSwitchPhase(fromId, toId) {
            document.getElementById(fromId).classList.remove('is-visible');
            document.getElementById(toId).classList.add('is-visible');
        }

        function actStartCeremony() {
            actSwitchPhase('actIntro', 'actCeremony');
            actSpawnGoldParticles();
            setTimeout(function() { actRunStep1(); }, 600);
        }

        function actSpawnGoldParticles() {
            var c = document.getElementById('actGoldParticles');
            if (!c) return; c.innerHTML = '';
            for (var i = 0; i < 15; i++) {
                var p = document.createElement('div');
                p.className = 'gold-particle';
                p.style.left = Math.random() * 100 + '%';
                p.style.top = (65 + Math.random() * 35) + '%';
                p.style.animationDelay = Math.random() * 6 + 's';
                p.style.animationDuration = (5 + Math.random() * 4) + 's';
                c.appendChild(p);
            }
        }

        function actUpdateNavProgress(step, inProgress) {
            var navSteps = document.querySelectorAll('#actNavSteps .nav-step');
            var fill = document.getElementById('actNavProgressFill');
            var txt = document.getElementById('actNavProgressText');
            navSteps.forEach(function(ns, i) {
                var num = i + 1;
                ns.classList.remove('active', 'done');
                var sEl = ns.querySelector('.nav-step-status');
                var iEl = ns.querySelector('.nav-step-indicator');
                if (num < step) { ns.classList.add('done'); sEl.textContent = '已完成'; iEl.textContent = '✓'; }
                else if (num === step) {
                    if (inProgress) { ns.classList.add('active'); sEl.textContent = '进行中...'; iEl.textContent = num; }
                    else { ns.classList.add('done'); sEl.textContent = '已完成'; iEl.textContent = '✓'; }
                } else { sEl.textContent = '等待中'; iEl.textContent = num; }
            });
            var completed = inProgress ? step - 1 : step;
            fill.style.width = (completed / ACT_TOTAL * 100) + '%';
            txt.textContent = completed + ' / ' + ACT_TOTAL;
        }

        function actShowStep(n) {
            actCurrentStep = n;
            actUpdateNavProgress(n, true);
            document.querySelectorAll('#actStepStage .step-panel').forEach(function(p) { p.classList.remove('active', 'entering', 'exiting'); });
            var panel = document.getElementById('actStep' + n);
            if (panel) { panel.classList.add('active', 'entering'); setTimeout(function() { panel.classList.remove('entering'); }, 900); }
        }

        function actCompleteCurrentStep() { actUpdateNavProgress(actCurrentStep, false); }

        function actShowToast(text) {
            var toast = document.getElementById('actStepToast');
            document.getElementById('actToastText').textContent = text;
            toast.classList.add('visible');
            setTimeout(function() { toast.classList.remove('visible'); }, 1500);
        }

        function actShowNextButton() {
            actStepCompleted = true;
            var btn = document.getElementById('actStepNextBtn');
            document.getElementById('actNextBtnText').textContent = ACT_NEXT_TEXTS[actCurrentStep];
            btn.classList.add('visible');
        }

        function actHideNextButton() {
            actStepCompleted = false;
            document.getElementById('actStepNextBtn').classList.remove('visible');
        }

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

        function act2AdvanceStage() {
            if (act2StageResolver) { act2StageResolver(); act2StageResolver = null; }
        }

        function act2HideAllBtns() {
            // 无按钮需要隐藏
        }

        function act2PopulateActInstant(actNum) {
            // 瞬间填充某个幕的全部数据（用于跳过动画）
            // actNum: 1 = 优化执行, 2 = 优化总结
            if (actNum >= 1) {
                // Act 2.1 优化执行
                var optData = [
                    { after: '262144', status: '已优化' },
                    { after: '禁用', status: '已优化' },
                    { after: '游戏优先', status: '已配置' },
                    { after: 'BBR v3', status: '已启用' },
                    { after: '冠军专线DNS', status: '已配置' }
                ];
                for (var o = 0; o < optData.length; o++) {
                    var idx = o + 1;
                    var itemEl = document.getElementById('act2OptExec' + idx);
                    var statusEl = document.getElementById('act2OptStatus' + idx);
                    var afterEl = document.getElementById('act2OptAfter' + idx);
                    if (itemEl) { itemEl.classList.remove('optimizing'); itemEl.classList.add('done'); }
                    if (statusEl) statusEl.textContent = optData[o].status;
                    if (afterEl) afterEl.textContent = optData[o].after;
                }
                document.getElementById('act2OptSummary').classList.add('visible');
                // 填充进度条至 100%
                var optFill2 = document.getElementById('act2OptProgressFill');
                if (optFill2) optFill2.style.width = '100%';
                var optPct2 = document.getElementById('act2OptProgressPct');
                if (optPct2) optPct2.textContent = '100%';
                var optLabel2 = document.getElementById('act2OptProgressLabel');
                if (optLabel2) optLabel2.textContent = '已完成 5/5';
            }
            if (actNum >= 2) {
                // Act 2.2 优化总结（静态内容，无需额外填充）
            }
        }

        function actPlayStepTransition(cb) {
            var currentPanel = document.getElementById('actStep' + actCurrentStep);
            if (currentPanel && currentPanel.classList.contains('active')) {
                currentPanel.classList.add('exiting');
                setTimeout(function() { currentPanel.classList.remove('active', 'exiting'); }, 350);
            }
            var overlay = document.getElementById('actStepTransitionOverlay');
            overlay.classList.add('active');
            setTimeout(function() { overlay.classList.remove('active'); }, 550);
            setTimeout(cb, 700);
        }

        function actGoNextStep() {
            if (!actStepCompleted) return;
            actHideNextButton();
            if (actCurrentStep >= ACT_TOTAL) {
                actPlayStepTransition(function() { actCompleteToDelivery(); });
                return;
            }
            actPlayStepTransition(function() {
                var runners = [null, actRunStep1, actRunStep2, actRunStep3, actRunStep4];
                runners[actCurrentStep + 1]();
            });
        }

        // --- 4 步动画 ---
        async function actRunStep1() {
            actShowStep(1);
            // Phase 1: 雷达扫描进行中，右侧图例同步逐条出现
            var legendVals = [
                { id: 'actLegendPing', val: ACT_MOCK.ping },
                { id: 'actLegendBW', val: ACT_MOCK.bw },
                { id: 'actLegendBWUp', val: ACT_MOCK.bwUp },
                { id: 'actLegendNAT', val: 'Open' },
                { id: 'actLegendLoss', val: ACT_MOCK.loss },
                { id: 'actLegendJitter', val: ACT_MOCK.jitter }
            ];
            var legendItems = document.querySelectorAll('#actRadarLegend .radar-legend-item');
            for (var i = 0; i < legendVals.length; i++) {
                await actSleep(250);
                legendItems[i].classList.add('revealed');
                document.getElementById(legendVals[i].id).textContent = legendVals[i].val;
            }
            // 图例全部出现 → 停止扫描，浮现圆形网格 + 轴标签
            await actSleep(200);
            document.getElementById('actRadarScanGroup').style.display = 'none';
            document.getElementById('actRadarGridGroup').classList.add('visible');
            document.getElementById('actRadarLabelsGroup').classList.add('visible');
            await actSleep(300);
            // Phase 2: 六边形数据多边形从中心展开
            var r = ACT_MOCK.radar, cx = 140, cy = 140, radius = 90;
            var c30 = 0.8660254, s30 = 0.5;
            var targets = [
                { x: cx, y: cy - radius * r.ping },
                { x: cx + radius * c30 * r.bw, y: cy - radius * s30 * r.bw },
                { x: cx + radius * c30 * r.bwUp, y: cy + radius * s30 * r.bwUp },
                { x: cx, y: cy + radius * r.nat },
                { x: cx - radius * c30 * r.loss, y: cy + radius * s30 * r.loss },
                { x: cx - radius * c30 * r.jitter, y: cy - radius * s30 * r.jitter }
            ];
            var polygon = document.getElementById('actRadarData');
            var startTime = performance.now(), duration = 800;
            await new Promise(function(resolve) {
                function animate(t) {
                    var p = Math.min((t - startTime) / duration, 1);
                    var e = 1 - Math.pow(1 - p, 3);
                    var pts = '';
                    for (var i = 0; i < 6; i++) {
                        pts += (cx + (targets[i].x - cx) * e).toFixed(1) + ',' + (cy + (targets[i].y - cy) * e).toFixed(1) + ' ';
                    }
                    polygon.setAttribute('points', pts.trim());
                    if (p < 1) { requestAnimationFrame(animate); } else { resolve(); }
                }
                requestAnimationFrame(animate);
            });
            await actSleep(150);
            // Phase 3: 综合评级
            var scoreEl = document.getElementById('actRadarScore');
            scoreEl.textContent = ACT_MOCK.radarGrade;
            scoreEl.classList.add('visible');
            scoreEl.nextElementSibling.classList.add('visible');
            await actSleep(350);
            // Identity cards
            document.getElementById('actIdentityCards').classList.add('visible');
            await actSleep(250);
            var ipVal = document.getElementById('actValIP');
            ipVal.classList.remove('scanning'); ipVal.textContent = ACT_MOCK.ip;
            document.getElementById('actSubIP').textContent = '已脱敏 · 专属网络身份标识';
            document.getElementById('actIdCardIP').classList.add('revealed');
            await actSleep(300);
            var ispVal = document.getElementById('actValISP');
            ispVal.classList.remove('scanning'); ispVal.textContent = ACT_MOCK.isp;
            document.getElementById('actSubISP').textContent = ACT_MOCK.ispSub + ' · 主干网络服务商';
            document.getElementById('actIdCardISP').classList.add('revealed');
            await actSleep(350);
            // Privacy
            document.getElementById('actDetectPrivacy').classList.add('visible');
            await actSleep(250);
            actCompleteCurrentStep(); actShowNextButton();
        }

        async function actRunStep2() {
            actShowStep(2);
            act2HideAllBtns();

            // === Act 2.1：优化执行 ===
            var stage2 = document.getElementById('act2Stage2');
            await new Promise(function(r) { actStageSwitch(stage2, r); });
            await actSleep(350);
            var optData = [
                { after: '262144', status: '已优化' },
                { after: '禁用', status: '已优化' },
                { after: '游戏优先', status: '已配置' },
                { after: 'BBR v3', status: '已启用' },
                { after: '冠军专线DNS', status: '已配置' }
            ];
            for (var o = 0; o < optData.length; o++) {
                var idx = o + 1;
                var itemEl = document.getElementById('act2OptExec' + idx);
                var statusEl = document.getElementById('act2OptStatus' + idx);
                var afterEl = document.getElementById('act2OptAfter' + idx);
                itemEl.classList.add('optimizing');
                statusEl.textContent = '优化中...';
                await actSleep(550);
                afterEl.textContent = optData[o].after;
                itemEl.classList.remove('optimizing');
                itemEl.classList.add('done');
                statusEl.textContent = optData[o].status;
                // 更新优化进度条
                var pct = Math.round((o + 1) / optData.length * 100);
                document.getElementById('act2OptProgressFill').style.width = pct + '%';
                document.getElementById('act2OptProgressPct').textContent = pct + '%';
                document.getElementById('act2OptProgressLabel').textContent = '已完成 ' + (o + 1) + '/5';
                await actSleep(200);
            }
            // 总结浮现
            await actSleep(300);
            document.getElementById('act2OptSummary').classList.add('visible');
            await actSleep(600);
            // 显示「继续」按钮，等待用户点击
            await actSleep(1000);

            // === Act 2.2：优化总结 ===
            var stage3 = document.getElementById('act2Stage3');
            await new Promise(function(r) { actStageSwitch(stage3, r); });
            await actSleep(600);

            // 自动完成 Step 2，进入 Step 3
            actCompleteCurrentStep(); actShowNextButton();
        }

        async function actRunStep3() {
            actShowStep(3);
            document.getElementById('actMatchLocalInfo').textContent = ACT_MOCK.ispSub;

            var candidates = [
                { nodeId: 0, metric: 'RTT 8.2 ms', selected: true },
                { nodeId: 1, metric: 'RTT 15.6 ms', selected: false },
                { nodeId: 2, metric: 'RTT 32.1 ms', selected: false },
                { nodeId: 3, metric: 'RTT 48.5 ms', selected: false }
            ];

            // Mark local endpoint as connected
            document.querySelector('#actStep3 .match-local').classList.add('connected');

            // Phase 1: Scan all candidate nodes one by one
            for (var i = 0; i < candidates.length; i++) {
                var c = candidates[i];
                var nodeEl = document.getElementById('actMatchNode' + c.nodeId);

                // Start scanning this node
                nodeEl.classList.add('scanning');
                document.getElementById('actMatchMetric' + c.nodeId).textContent = c.metric;
                await actSleep(1200);

                if (!c.selected) {
                    // Eliminate this node
                    nodeEl.classList.remove('scanning');
                    nodeEl.classList.add('eliminated');
                    await actSleep(400);
                } else {
                    // This is the selected node - keep scanning briefly then select
                    await actSleep(500);
                    nodeEl.classList.remove('scanning');
                    nodeEl.classList.add('selected');
                }
            }

            await actSleep(500);

            // Phase 2: Show match result
            document.getElementById('actMatchResult').classList.add('visible');
            var circumference = 2 * Math.PI * 52;
            var offset = circumference * (1 - ACT_MOCK.matchScore / 100);
            document.getElementById('actMatchRing').style.strokeDashoffset = offset;
            var score = 0, scoreEl = document.getElementById('actMatchScoreNum');
            var iv = setInterval(function() { score += 2; if (score >= ACT_MOCK.matchScore) { score = ACT_MOCK.matchScore; clearInterval(iv); } scoreEl.textContent = score; }, 30);
            await actSleep(1200);

            // Phase 3: Show detail cards
            document.getElementById('actMatchDetailCards').classList.add('visible');
            var detailCards = [
                { id: 'actMatchDetailRTT', value: ACT_MOCK.matchDetailRTT },
                { id: 'actMatchDetailGameLatency', value: ACT_MOCK.matchDetailGameLatency },
                { id: 'actMatchDetailStability', value: ACT_MOCK.matchDetailStability },
                { id: 'actMatchDetailBW', value: ACT_MOCK.matchDetailBW }
            ];
            for (var j = 0; j < detailCards.length; j++) {
                await actSleep(200);
                document.getElementById(detailCards[j].id).textContent = detailCards[j].value;
                document.getElementById(detailCards[j].id).closest('.match-detail-card').classList.add('revealed');
            }

            // Phase 4: Show explanation
            await actSleep(300);
            document.getElementById('actMatchExplainText').textContent = '系统基于您的本地网络特征（广东电信、Open NAT、低丢包），在 4 个可用专线节点中为您匹配了位于广州的最优节点';
            document.getElementById('actMatchExplain').classList.add('visible');

            await actSleep(400); actCompleteCurrentStep(); actShowNextButton();
        }

        async function actRunStep4() {
            actShowStep(4);

            var techLogItems = [
                '初始化 WireGuard 隧道协议...',
                '分配专属节点 CHAMPION-GZ-07-A3...',
                '锁定独占 IP 10.88.7.***...',
                '配置 AES-256-GCM 加密通道...',
                '建立双向认证握手...',
                '优化 TCP 窗口至 262144 字节...',
                '调整 MTU 至 1420 最佳适配值...',
                '禁用 Nagle 算法降低延迟...',
                '配置 QoS 最高优先级队列...',
                '启用 BBR 拥塞控制算法...',
                '绑定 200Mbps 独享带宽...',
                '优化路由跳数 3 跳直达...',
                '启用反放大攻击防护...',
                '配置智能 DNS 解析...',
                '内核参数深度调优完成...',
                '专属资源锁定，不与其他用户共享...'
            ];

            var progressFill = document.getElementById('actBindProgressFill');
            var progressPct = document.getElementById('actBindProgressPct');
            var techLog = document.getElementById('actBindTechLog');
            var bindVisual = document.getElementById('actBindVisual');

            techLog.innerHTML = '';
            progressFill.style.width = '0%';
            progressPct.textContent = '0%';
            bindVisual.classList.remove('revealed');

            // 阶段1：进度条 + 技术事项弹幕
            var totalDuration = 5000;
            var steps = 100;
            var interval = totalDuration / steps;
            var logIndex = 0;
            var logInterval = Math.floor(steps / techLogItems.length);

            for (var i = 1; i <= steps; i++) {
                await actSleep(interval);
                progressFill.style.width = i + '%';
                progressPct.textContent = i + '%';

                if (i % logInterval === 0 && logIndex < techLogItems.length) {
                    var item = document.createElement('div');
                    item.className = 'bind-tech-item';
                    item.innerHTML = '<span class="tech-check">✓</span><span class="tech-text">' + techLogItems[logIndex] + '</span>';
                    techLog.appendChild(item);
                    requestAnimationFrame(function() { item.classList.add('visible'); });
                    if (techLog.scrollHeight > techLog.clientHeight) {
                        techLog.scrollTop = techLog.scrollHeight;
                    }
                    logIndex++;
                }
            }

            // 补全剩余技术事项
            while (logIndex < techLogItems.length) {
                await actSleep(120);
                var item2 = document.createElement('div');
                item2.className = 'bind-tech-item';
                item2.innerHTML = '<span class="tech-check">✓</span><span class="tech-text">' + techLogItems[logIndex] + '</span>';
                techLog.appendChild(item2);
                requestAnimationFrame(function() { item2.classList.add('visible'); });
                logIndex++;
            }

            // 进度100%后淡出整个进度区域（含技术事项）
            await actSleep(600);
            document.querySelector('.bind-progress-wrap').classList.add('fade-out');
            await actSleep(500);
            document.getElementById('actBindTechLog').innerHTML = '';

            // 阶段2：显示绑定仪式内容
            bindVisual.classList.add('revealed');
            var ceremony = document.getElementById('actBindCeremony');
            var statusText = document.getElementById('actBindStatusText');

            ceremony.classList.add('binding');
            statusText.textContent = '正在建立冠军专线专属通道...';
            await actSleep(1500);

            statusText.textContent = '专线链路贯通 · 节点锁定中...';
            await actSleep(1500);

            ceremony.classList.remove('binding');
            ceremony.classList.add('bound');
            ceremony.querySelector('.bind-icon').textContent = '✓';
            statusText.textContent = '专属通道已就绪';
            await actSleep(800);

            // 揭示凭证卡片
            var cards = [
                { id: 'actBindNodeName', value: ACT_MOCK.nodeName, desc: 'actBindNodeNameDesc', descText: '该节点已分配给您，不再接受其他用户接入' },
                { id: 'actBindNodeIP', value: ACT_MOCK.nodeIP, desc: 'actBindNodeIPDesc', descText: '您在专线网络中的唯一标识地址' },
                { id: 'actBindEncrypt', value: '独立隧道', desc: 'actBindEncryptDesc', descText: '为您单独建立的加速通道，不与其他用户共享' },
                { id: 'actBindStatus', value: '已绑定' }
            ];
            for (var j = 0; j < cards.length; j++) {
                await actSleep(300);
                var c = cards[j];
                document.getElementById(c.id).textContent = c.value;
                document.getElementById(c.id).closest('.bind-info-card').classList.add('revealed');
                if (c.desc) document.getElementById(c.desc).textContent = c.descText;
            }

            // 独占声明
            await actSleep(400);
            document.getElementById('actBindExclusive').classList.add('visible');

            // 链路指标
            await actSleep(400);
            document.getElementById('actBindMetricProto').textContent = ACT_MOCK.tunnelProto;
            document.getElementById('actBindMetricBW').textContent = ACT_MOCK.dedicatedBW;
            document.getElementById('actBindMetricHops').textContent = ACT_MOCK.routeHops;
            document.getElementById('actBindMetricRTT').textContent = ACT_MOCK.linkRTT;
            document.getElementById('actBindMetrics').classList.add('visible');

            // 兆底承诺
            await actSleep(300);
            document.getElementById('actBindSafety').classList.add('visible');

            await actSleep(400); actCompleteCurrentStep(); actShowNextButton();
        }

        function actResetAll() {
            actCurrentStep = 0; actStepCompleted = false;
            actUpdateNavProgress(0, false);
            actHideNextButton();
            document.getElementById('actIntro').classList.add('is-visible');
            document.getElementById('actCeremony').classList.remove('is-visible');
            // Reset Step 1 radar
            var scanGroup = document.getElementById('actRadarScanGroup');
            if (scanGroup) scanGroup.style.display = '';
            var gridGroup = document.getElementById('actRadarGridGroup');
            if (gridGroup) gridGroup.classList.remove('visible');
            var labelsGroup = document.getElementById('actRadarLabelsGroup');
            if (labelsGroup) labelsGroup.classList.remove('visible');
            var radarData = document.getElementById('actRadarData');
            if (radarData) radarData.setAttribute('points', '140,140 140,140 140,140 140,140 140,140 140,140');
            var rs = document.getElementById('actRadarScore');
            if (rs) { rs.textContent = '—'; rs.classList.remove('visible'); }
            if (rs && rs.nextElementSibling) rs.nextElementSibling.classList.remove('visible');
            document.querySelectorAll('#actRadarLegend .radar-legend-item').forEach(function(item) { item.classList.remove('revealed'); });
            ['actLegendPing','actLegendBW','actLegendBWUp','actLegendNAT','actLegendLoss','actLegendJitter'].forEach(function(id) {
                var el = document.getElementById(id); if (el) el.textContent = '—';
            });
            // Reset identity cards
            var ic = document.getElementById('actIdentityCards'); if (ic) ic.classList.remove('visible');
            ['actIdCardIP','actIdCardISP'].forEach(function(id) {
                var el = document.getElementById(id); if (el) el.classList.remove('revealed');
            });
            var ipVal = document.getElementById('actValIP');
            if (ipVal) { ipVal.classList.add('scanning'); ipVal.textContent = '扫描中...'; }
            var ispVal = document.getElementById('actValISP');
            if (ispVal) { ispVal.classList.add('scanning'); ispVal.textContent = '检测中...'; }
            var subIP = document.getElementById('actSubIP'); if (subIP) subIP.textContent = '';
            var subISP = document.getElementById('actSubISP'); if (subISP) subISP.textContent = '';
            if (document.getElementById('actDetectPrivacy')) document.getElementById('actDetectPrivacy').classList.remove('visible');
            // Reset Step 2 — 2 幕分屏状态
            ['act2Stage2','act2Stage3'].forEach(function(id) {
                var el = document.getElementById(id);
                if (el) el.classList.remove('active', 'exiting');
            });
            // Act 2.1 优化进度重置
            var optFill = document.getElementById('act2OptProgressFill');
            if (optFill) optFill.style.width = '0%';
            var optPct = document.getElementById('act2OptProgressPct');
            if (optPct) optPct.textContent = '0%';
            var optLabel = document.getElementById('act2OptProgressLabel');
            if (optLabel) optLabel.textContent = '准备优化';
            // Act 2.2 优化重置
            for (var oi = 1; oi <= 5; oi++) {
                var itemEl = document.getElementById('act2OptExec' + oi);
                if (itemEl) itemEl.classList.remove('optimizing', 'done');
                var statusEl = document.getElementById('act2OptStatus' + oi);
                if (statusEl) statusEl.textContent = '等待中';
                var afterEl = document.getElementById('act2OptAfter' + oi);
                if (afterEl) afterEl.textContent = '—';
            }
            var optSummary = document.getElementById('act2OptSummary');
            if (optSummary) optSummary.classList.remove('visible');
            // 按钮 + resolver 重置
            act2StageResolver = null;
            act2HideAllBtns();
            // Reset Step 3 candidate nodes
            for (var n = 0; n < 4; n++) {
                var nodeEl = document.getElementById('actMatchNode' + n);
                if (nodeEl) { nodeEl.classList.remove('scanning', 'eliminated', 'selected'); }
                var metricEl = document.getElementById('actMatchMetric' + n);
                if (metricEl) metricEl.textContent = '';
            }
            document.querySelectorAll('#actStep3 .match-endpoint').forEach(function(e) { e.classList.remove('connected'); });
            if (document.getElementById('actMatchResult')) document.getElementById('actMatchResult').classList.remove('visible');
            if (document.getElementById('actMatchRing')) document.getElementById('actMatchRing').style.strokeDashoffset = 326.7;
            if (document.getElementById('actMatchScoreNum')) document.getElementById('actMatchScoreNum').textContent = '—';
            if (document.getElementById('actMatchDetailCards')) document.getElementById('actMatchDetailCards').classList.remove('visible');
            ['actMatchDetailRTT','actMatchDetailGameLatency','actMatchDetailStability','actMatchDetailBW'].forEach(function(id) {
                var el = document.getElementById(id); if (el) { el.textContent = '—'; el.closest('.match-detail-card').classList.remove('revealed'); }
            });
            if (document.getElementById('actMatchExplain')) document.getElementById('actMatchExplain').classList.remove('visible');
            if (document.getElementById('actMatchExplainText')) document.getElementById('actMatchExplainText').textContent = '';
            if (document.getElementById('actBindCeremony')) {
                document.getElementById('actBindCeremony').classList.remove('binding', 'bound');
                var bindIcon = document.getElementById('actBindCeremony').querySelector('.bind-icon');
                if (bindIcon) bindIcon.textContent = '🔗';
            }
            if (document.getElementById('actBindStatusText')) document.getElementById('actBindStatusText').textContent = '准备建立专属通道...';
            ['actBindNodeName','actBindNodeIP','actBindEncrypt','actBindStatus'].forEach(function(id) {
                var el = document.getElementById(id); if (el) { el.textContent = '—'; el.closest('.bind-info-card').classList.remove('revealed'); }
            });
            ['actBindNodeNameDesc','actBindNodeIPDesc','actBindEncryptDesc'].forEach(function(id) {
                var el = document.getElementById(id); if (el) el.textContent = '';
            });
            if (document.getElementById('actBindExclusive')) document.getElementById('actBindExclusive').classList.remove('visible');
            if (document.getElementById('actBindMetrics')) document.getElementById('actBindMetrics').classList.remove('visible');
            ['actBindMetricProto','actBindMetricBW','actBindMetricHops','actBindMetricRTT'].forEach(function(id) {
                var el = document.getElementById(id); if (el) el.textContent = '—';
            });
            if (document.getElementById('actBindSafety')) document.getElementById('actBindSafety').classList.remove('visible');
            // 重置进度条和技术事项
            var progressWrap = document.querySelector('.bind-progress-wrap');
            if (progressWrap) progressWrap.classList.remove('fade-out');
            if (document.getElementById('actBindProgressFill')) {
                document.getElementById('actBindProgressFill').style.width = '0%';
            }
            if (document.getElementById('actBindProgressPct')) {
                document.getElementById('actBindProgressPct').textContent = '0%';
            }
            if (document.getElementById('actBindTechLog')) document.getElementById('actBindTechLog').innerHTML = '';
            if (document.getElementById('actBindVisual')) document.getElementById('actBindVisual').classList.remove('revealed');
            var gp = document.getElementById('actGoldParticles'); if (gp) gp.innerHTML = '';
        }

        // ====================================================================
        // 交付仪式引擎
        // ====================================================================
        function startDelivery(data) {
            data = data || {};
            if (data.nodeName) document.getElementById('dlvNode').textContent = data.nodeName;
            if (data.latencyAvg) document.getElementById('dlvLatency').textContent = data.latencyAvg;
            if (data.matchScore) document.getElementById('dlvMatch').textContent = data.matchScore + '%';

            var dark = document.getElementById('deliveryDark');
            var cardStage = document.getElementById('deliveryCardStage');
            var cta = document.getElementById('deliveryCta');

            dark.classList.remove('is-active');
            cardStage.classList.remove('is-revealed');
            cta.classList.remove('is-visible');

            // Phase 1: 暗场 (0~800ms)
            dark.classList.add('is-active');
            setTimeout(function() { dark.classList.remove('is-active'); }, 800);
            // Phase 2: 粒子汇聚 (400~2000ms)
            setTimeout(function() { runDeliveryParticles(); }, 400);
            // Phase 3: 卡片揭幕 (1500~3500ms)
            setTimeout(function() { cardStage.classList.add('is-revealed'); }, 1500);
            // Phase 4: CTA 浮入 (3500ms)
            setTimeout(function() { cta.classList.add('is-visible'); }, 3500);
        }

        function runDeliveryParticles() {
            var canvas = document.getElementById('deliveryCanvas');
            if (!canvas) return;
            var ctx = canvas.getContext('2d');
            var W = canvas.width, H = canvas.height;
            var particles = [];
            for (var i = 0; i < 80; i++) {
                var angle = Math.random() * Math.PI * 2;
                var dist = 500 + Math.random() * 300;
                particles.push({
                    x: W / 2 + Math.cos(angle) * dist,
                    y: H / 2 + Math.sin(angle) * dist,
                    tx: W / 2 + (Math.random() - 0.5) * 160,
                    ty: H / 2 + (Math.random() - 0.5) * 120,
                    size: 1 + Math.random() * 2.5,
                    alpha: 0.3 + Math.random() * 0.7,
                    speed: 0.5 + Math.random() * 0.5
                });
            }
            var startTime = Date.now();
            var duration = 1600;
            function animate() {
                var elapsed = Date.now() - startTime;
                var progress = Math.min(elapsed / duration, 1);
                ctx.clearRect(0, 0, W, H);
                for (var i = 0; i < particles.length; i++) {
                    var p = particles[i];
                    var t = progress * p.speed;
                    var cx = p.x + (p.tx - p.x) * Math.min(t * 1.5, 1);
                    var cy = p.y + (p.ty - p.y) * Math.min(t * 1.5, 1);
                    var alpha = p.alpha * (progress < 0.7 ? 1 : (1 - (progress - 0.7) / 0.3));
                    ctx.beginPath();
                    ctx.arc(cx, cy, p.size, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(225, 208, 173, ' + alpha + ')';
                    ctx.shadowColor = 'rgba(225, 208, 173, 0.6)';
                    ctx.shadowBlur = 6;
                    ctx.fill();
                }
                if (progress < 1) requestAnimationFrame(animate);
                else ctx.clearRect(0, 0, W, H);
            }
            requestAnimationFrame(animate);
        }

        // ====================================================================
        // 全流程一键演示
        // ====================================================================
        async function playFullFlow() {
            // Step 1: 主界面
            devGoto('main');
            await actSleep(1500);
            // Step 2: 打开头像下拉菜单
            toggleAvatarDropdown();
            await actSleep(2000);
            // Step 3: 点击进入开通仪式封面
            goToOrderFromMain();
            await actSleep(1500);
            // Step 4: 开始开通仪式
            actStartCeremony();
        }

        // ====================================================================
        // 待优化建议 横向手动滚动
        // ====================================================================
        function scrollHW(dir) {
            var track = document.querySelector('.summ-hw-track');
            if (!track) return;
            var scroll = track.parentElement;
            var step = 220; // 卡片宽 210px + gap 10px
            var currentOffset = parseFloat(track.style.transform.replace('translateX(', '').replace('px)', '')) || 0;
            var maxScroll = track.scrollWidth - scroll.clientWidth;
            var newOffset = currentOffset - dir * step;
            newOffset = Math.max(-maxScroll, Math.min(0, newOffset));
            track.style.transform = 'translateX(' + newOffset + 'px)';
        }

        // ====================================================================
        // 初始化
        // ====================================================================
        (function init() {
            viewMain.classList.add('active');
        })();
