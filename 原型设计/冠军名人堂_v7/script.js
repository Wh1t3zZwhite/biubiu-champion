        // ========== Particles for both views ==========
        // Only spawn into containers whose parent .view is currently active.
        // Prevents background views from accumulating ~80 always-animating
        // DOM nodes and dragging down framerate / hover responsiveness.
        function spawnParticle(container, isDetail) {
            if (!container) return;
            const view = container.closest('.view');
            if (view && !view.classList.contains('active')) return;
            const p = document.createElement('div');
            p.className = isDetail ? 'detail-particle' : 'particle';
            p.style.left = (10 + Math.random() * 80) + '%';
            p.style.bottom = '0';
            const s = isDetail ? (1 + Math.random() * 0.5) : (1 + Math.random() * 1.5);
            p.style.width = s + 'px';
            p.style.height = s + 'px';
            p.style.animationDuration = (8 + Math.random() * 5) + 's';
            container.appendChild(p);
            setTimeout(() => p.remove(), 14000);
        }

        const hallP = document.getElementById('hallParticles');
        const detailP = document.getElementById('detailParticles');
        for (let i = 0; i < 12; i++) setTimeout(() => spawnParticle(hallP, false), i * 180);
        setInterval(() => spawnParticle(hallP, false), 500);
        for (let i = 0; i < 10; i++) setTimeout(() => spawnParticle(detailP, true), i * 200);
        setInterval(() => spawnParticle(detailP, true), 600);
        const teamP = document.getElementById('teamParticles');
        for (let i = 0; i < 10; i++) setTimeout(() => spawnParticle(teamP, true), i * 200);
        setInterval(() => spawnParticle(teamP, true), 600);

        // ========== Champion data ==========
        const champions = {
            xiaohai: {
                tag: '中国格斗电竞传奇', id: 'XIAOHAI', name: '曾卓君',
                quote: '生来为赢。',
                // Street Fighter 6 — deep violet × magenta fused with imperial gold
                accentHalo: 'radial-gradient(circle, rgba(168, 90, 220, 0.38) 0%, rgba(120, 60, 180, 0.14) 35%, transparent 70%)',
                accentFloor: 'radial-gradient(ellipse, rgba(190, 110, 230, 0.42) 0%, rgba(140, 90, 200, 0.12) 40%, transparent 75%)',
                accentBgOverlay: 'radial-gradient(ellipse at 50% 30%, rgba(110, 50, 170, 0.32) 0%, rgba(60, 25, 110, 0.22) 40%, rgba(20, 10, 38, 0.0) 80%), linear-gradient(160deg, rgba(80, 30, 130, 0.28) 0%, rgba(30, 15, 55, 0.18) 60%, rgba(8, 6, 15, 0.0) 100%)',
                accentAtmosTop: 'radial-gradient(ellipse, rgba(190, 110, 230, 0.18) 0%, rgba(225, 208, 173, 0.08) 45%, transparent 75%)',
                accentAtmosSide: 'radial-gradient(ellipse at 45% 60%, rgba(150, 90, 210, 0.16) 0%, transparent 70%)',
                intro: '6岁入行，从拳皇到街霸再到饿狼传说，跨越三个游戏时代依然封王，53项国际冠军，让格斗游戏的中国冠军不止是头衔。',
                bridge: '对局正酣，画面忽然陷入慢放；指令明明按下，角色却纹丝不动。在街霸6的线上战场，每一位玩家都经历过这样的时刻——输不在判断，不在操作，而在你与对手之间，<em>那段不可控的距离</em>。<strong>从未在一帧上妥协的人</strong>，biubiu与 Xiaohai 联手深度共研，以世界冠军的严苛标准校准每一帧传输，为<strong>街霸6</strong>定制冠军专线。',
                game: '街霸6', gameEn: 'STREET FIGHTER 6',
                cta: '了解《街霸6》冠军专线',
                stats: [{n:'53', u:'项', l:'International Titles'}, {n:'18', u:'年', l:'Pro Career'}, {n:'3', u:'代', l:'Game Eras'}],
                signatures: ['街霸6', '拳皇', '饿狼传说'],
                plateNo: '01', plateYear: '2024',
                honors: [
                    {y: '2025', t: '沙特电竞世界杯 街霸6 卫冕冠军'},
                    {y: '2024', t: '沙特电竞世界杯 街霸6 冠军'},
                    {y: '2023', t: 'EVO 街霸6 季军 / Capcom Cup 八强'},
                    {y: '2022', t: 'Capcom Pro Tour 多站冠军'},
                    {y: '2019', t: 'EVO 第三人格斗游戏 季军'},
                    {y: '2017', t: 'SFV 中国区总冠军'},
                    {y: '2009', t: 'KOF 世界冠军 — 中国第一个格斗游戏世界冠军'},
                ]
            },
            aixleft: {
                tag: 'FPS第一天才少年', id: 'AIXLEFT', name: '左梓轩',
                quote: '莫问少年凌云志，曾许天下第一流。',
                // PUBG — gunmetal smoke × ember orange fused with deep gold
                accentHalo: 'radial-gradient(circle, rgba(230, 130, 55, 0.34) 0%, rgba(190, 105, 50, 0.12) 35%, transparent 70%)',
                accentFloor: 'radial-gradient(ellipse, rgba(240, 140, 65, 0.42) 0%, rgba(210, 130, 60, 0.12) 40%, transparent 75%)',
                accentBgOverlay: 'radial-gradient(ellipse at 50% 35%, rgba(180, 95, 40, 0.22) 0%, rgba(90, 60, 40, 0.18) 40%, rgba(20, 18, 14, 0.0) 80%), linear-gradient(160deg, rgba(70, 60, 50, 0.32) 0%, rgba(40, 32, 24, 0.22) 60%, rgba(10, 8, 6, 0.0) 100%)',
                accentAtmosTop: 'radial-gradient(ellipse, rgba(235, 145, 75, 0.16) 0%, rgba(225, 208, 173, 0.08) 45%, transparent 75%)',
                accentAtmosSide: 'radial-gradient(ellipse at 45% 60%, rgba(200, 120, 60, 0.14) 0%, transparent 70%)',
                intro: '15岁守望先锋国服第一，转战 PUBG 后自建 PeRo 战队，PCS 三连冠、PCL 春季赛四项全满贯。永远在加速，永不止步。',
                bridge: '决赛圈的对枪，从来不只是手速的较量。你先开镜、先扣下扳机，回放里却是对方先将你击倒。你明明已经贴进掩体，击杀提示却在下一刻传来。不是输给操作，是输给了你与对手之间，<em>那段看不见的时差</em>。<strong>从未在一发子弹上妥协的人</strong>，biubiu与 Aixleft 联手深度共研，以世界冠军的严苛标准校准每一次响应，为<strong>PUBG</strong>定制冠军专线。',
                game: 'PUBG 绝地求生', gameEn: 'PUBG: BATTLEGROUNDS',
                cta: '了解《PUBG》冠军专线',
                stats: [{n:'4', u:'冠', l:'PCL Grand Slam'}, {n:'3', u:'连', l:'PCS Champion'}, {n:'15', u:'岁', l:'OW No.1 China'}],
                signatures: ['PUBG', '守望先锋', '无畏契约'],
                plateNo: '02', plateYear: '2025',
                honors: [
                    {y: '2025', t: 'PCL 春季赛 总冠军 / MVP / 淘汰王 / 伤害王'},
                    {y: '2024', t: 'PCS 三连冠 / 沙特电竞世界杯 PUBG 亚军'},
                    {y: '2023', t: 'PCL 夏季赛 冠军'},
                    {y: '2022', t: '自建 PeRo 战队，半年内夺冠'},
                    {y: '2020', t: 'PCL 多站决赛圈 MVP'},
                    {y: '2017', t: '守望先锋国服天梯第一'},
                ]
            },
            guo: {
                tag: '永恒之塔传奇', id: 'GUOYONGJUN', name: '郭永军',
                quote: '团里的位置，是用时间一点一点熬出来的。',
                // AION 2 — celestial sapphire × cyan glow fused with champagne gold
                accentHalo: 'radial-gradient(circle, rgba(120, 185, 245, 0.38) 0%, rgba(80, 140, 220, 0.13) 35%, transparent 70%)',
                accentFloor: 'radial-gradient(ellipse, rgba(140, 200, 250, 0.42) 0%, rgba(100, 160, 230, 0.12) 40%, transparent 75%)',
                accentBgOverlay: 'radial-gradient(ellipse at 50% 30%, rgba(70, 130, 210, 0.32) 0%, rgba(40, 80, 150, 0.22) 40%, rgba(10, 18, 38, 0.0) 80%), linear-gradient(160deg, rgba(40, 90, 160, 0.28) 0%, rgba(20, 45, 90, 0.18) 60%, rgba(6, 10, 20, 0.0) 100%)',
                accentAtmosTop: 'radial-gradient(ellipse, rgba(130, 195, 245, 0.22) 0%, rgba(225, 208, 173, 0.09) 45%, transparent 75%)',
                accentAtmosSide: 'radial-gradient(ellipse at 45% 60%, rgba(100, 170, 230, 0.16) 0%, transparent 70%)',
                intro: '永恒之塔顶级玩家，多年深耕，经验丰富。',
                bridge: '团本副本进行到第三十分钟，技能循环刚跟上节奏——画面突然定格。等到回神时，整队已经躺在副本入口。对永恒之塔玩家来说，最难受的从来不是 BOSS，是那一秒不知道发生了什么的网络；<em>半小时的协作，毁于一瞬</em>。<strong>对每一次操作的精度极致要求</strong>，biubiu与郭永军联手深度共研，以世界冠军的严苛标准校准每一次响应，为<strong>永恒之塔</strong>定制冠军专线。',
                game: '永恒之塔', gameEn: 'AION',
                cta: '了解《永恒之塔》冠军专线',
                stats: [{n:'12', u:'年', l:'In Aion'}, {n:'8', u:'冠', l:'Cross-Server Wins'}, {n:'1', u:'位', l:'National Top'}],
                signatures: ['永恒之塔'],
                plateNo: '03', plateYear: '2025',
                honors: [
                    {y: '2024', t: '永恒之塔国服顶级玩家'},
                    {y: '2023', t: '多次跨服赛事胜出'},
                ]
            }
        };

        // ========== Team data ==========
        const teams = {
            pero: {
                id: 'PERO', name: 'PeRo 战队', tag: '',
                partnerDivision: '《PUBG》分部',
                accentHalo: 'radial-gradient(circle, rgba(220, 170, 110, 0.20) 0%, rgba(220, 170, 110, 0.05) 35%, transparent 65%)',
                honors: [
                    {y: '2025', t: 'PCL 春季赛 总冠军 / 大满贯'},
                    {y: '2024', t: 'PCS 三连冠 / 沙特电竞世界杯 PUBG 亚军'},
                    {y: '2023', t: 'PCL 夏季赛 冠军'},
                    {y: '2022', t: '由 Aixleft 牵头自建，半年内夺冠'},
                ],
                bridge: '由 <strong>Aixleft</strong> 牵头自建，PeRo 用三年时间，把"少年队"打成了 PUBG 国内最难绕开的名字。<em>每一次决赛圈的呼吸、每一次落地成盒前的反扑</em>——biubiu 与 PeRo 一路同行，见证这群少年把不甘心打成一座座奖杯。'
            },
            '4am': {
                id: '4AM', name: '4 Angry Men', tag: '',
                partnerDivision: '《PUBG》分部',
                accentHalo: 'radial-gradient(circle, rgba(220, 170, 110, 0.20) 0%, rgba(220, 170, 110, 0.05) 35%, transparent 65%)',
                honors: [
                    {y: '2024', t: '多届国内 PUBG 顶级赛事决赛圈常客'},
                    {y: '2021', t: 'PGI.S 全球总决赛 亚军'},
                    {y: '2019', t: 'PCL 春季赛 冠军'},
                    {y: '2017', t: '战队成立·由韦神等老将组建'},
                ],
                bridge: '从端游元年坚守到今天，4AM 是中国 PUBG 永远的"<em>四个愤怒的男人</em>"。八年起伏，他们从未真正离场。biubiu 与 4AM 一道，<strong>把每一份"再来一局"的执拗</strong>，托在身后。'
            },
            falcons: {
                id: 'FALCONS', name: 'Team Falcons', tag: '',
                partnerDivision: '《街霸6》分部',
                accentHalo: 'radial-gradient(circle, rgba(217, 125, 88, 0.20) 0%, rgba(217, 125, 88, 0.05) 35%, transparent 65%)',
                honors: [
                    {y: '2025', t: '沙特电竞世界杯 多项目冠军 / 俱乐部总积分第一'},
                    {y: '2024', t: 'EWC 街霸6 / Apex / CS 多项目登顶'},
                    {y: '2023', t: '收购多支顶级战队，组建全项目矩阵'},
                ],
                bridge: '从利雅得出发，Falcons 把猎鹰旗帜插上了格斗、FPS、MOBA 多个赛道。在《街霸6》分部，他们集结了世界顶级的格斗游戏选手——<em>一帧之差，便是冠亚之分</em>。biubiu 与 Falcons《街霸6》分部并肩，把每一次出招的专注，<strong>稳稳守在它该有的位置</strong>。'
            },
            '17': {
                id: '17 GAMING', name: '17 战队', tag: '',
                partnerDivision: '《PUBG》分部',
                accentHalo: 'radial-gradient(circle, rgba(220, 170, 110, 0.20) 0%, rgba(220, 170, 110, 0.05) 35%, transparent 65%)',
                honors: [
                    {y: '2024', t: 'PCL 多站决赛圈入围 / 战术执行最优队伍'},
                    {y: '2023', t: 'PCL 夏季赛 季军'},
                    {y: '2022', t: '战队整编重组，确立战术核心打法'},
                ],
                bridge: '17 战队以战术见长——缩圈前的每一次转点、交火时的每一次卡位，都建立在毫秒级的判断之上。biubiu 与 17 一路同行，<strong>把这份冷静背后的那一秒不确定</strong>，从画面里抹去。'
            },
            ig: {
                id: 'IG', name: 'Invictus Gaming', tag: '',
                partnerDivision: '《英雄联盟》分部',
                accentHalo: 'radial-gradient(circle, rgba(155, 140, 215, 0.20) 0%, rgba(155, 140, 215, 0.05) 35%, transparent 65%)',
                honors: [
                    {y: '2018', t: '英雄联盟 全球总决赛 冠军（S8）'},
                    {y: '2017', t: 'LPL 春季赛 冠军'},
                    {y: '2012', t: 'DOTA2 国际邀请赛 TI2 冠军'},
                ],
                bridge: '2018 年仁川，IG 把第一座银龙杯捧回中国。"<em>永不为奴</em>"——不是一句口号，是上头之前对操作上限的绝对自信。biubiu 与 IG《英雄联盟》分部并肩，<strong>让这份自信，永远敢于被兑现</strong>。'
            },
            rng: {
                id: 'RNG', name: 'Royal Never Give Up', tag: '',
                partnerDivision: '《英雄联盟》分部',
                accentHalo: 'radial-gradient(circle, rgba(220, 130, 130, 0.20) 0%, rgba(220, 130, 130, 0.05) 35%, transparent 65%)',
                honors: [
                    {y: '2022', t: 'MSI 季中冠军赛 冠军（队史第三冠）'},
                    {y: '2021', t: 'MSI 季中冠军赛 冠军'},
                    {y: '2018', t: 'MSI 季中冠军赛 冠军 / LPL 春夏双冠'},
                ],
                bridge: '三座 MSI 奖杯，让 RNG 成为中国战队海外赛事的代名词。"<em>Never Give Up</em>"——从落后五千经济到翻盘水晶，靠的不只是心态，是每一次走位与技能释放的精准抵达。biubiu 与 RNG《英雄联盟》分部一路同行，<strong>把"永不言弃"稳稳兜住</strong>。'
            },
            ag: {
                id: 'AG', name: 'AG 超玩会', tag: '',
                partnerDivision: '《王者荣耀》分部',
                accentHalo: 'radial-gradient(circle, rgba(220, 140, 100, 0.20) 0%, rgba(220, 140, 100, 0.05) 35%, transparent 65%)',
                honors: [
                    {y: '2024', t: 'KPL 世冠杯 冠军（队史第六冠）'},
                    {y: '2021', t: 'KPL 春季赛 冠军 / 世冠杯 冠军'},
                    {y: '2019', t: 'KPL 春季赛 冠军 / 秋季赛 冠军'},
                    {y: '2017', t: 'KPL 秋季赛 冠军（首冠）'},
                ],
                bridge: 'AG 超玩会，是 KPL 历史上奖杯最多的战队之一。<em>5v5 的胜负，常常压在 0.3 秒的位移判断上</em>——一次走神，整波团灭。biubiu 与 AG 一路同行，<strong>把决胜瞬间的那 0.3 秒，稳稳还给选手</strong>。'
            },
            edg: {
                id: 'EDG', name: 'Edward Gaming', tag: '',
                partnerDivision: '《英雄联盟》分部',
                accentHalo: 'radial-gradient(circle, rgba(155, 140, 215, 0.20) 0%, rgba(155, 140, 215, 0.05) 35%, transparent 65%)',
                honors: [
                    {y: '2021', t: '英雄联盟 全球总决赛 冠军（S11）'},
                    {y: '2017', t: 'MSI 季中冠军赛 冠军'},
                    {y: '2015', t: 'MSI 季中冠军赛 冠军 / LPL 五冠'},
                ],
                bridge: '2021 年冰岛，EDG 让全国玩家在凌晨的宿舍楼里集体沸腾。世界冠军的背后，是<em>无数次训练赛里对操作精度的极致打磨</em>。biubiu 与 EDG《英雄联盟》分部并肩，<strong>把训练场上的稳定，带进每一次出征</strong>。'
            }
        };

        // ========== Game data ==========
        const games = {
            pubg: {
                bgClass: 'bg-pubg',
                logo: 'PUBG',
                tagline: '五月新模式 · 赏金行动',
                name: '绝地求生',
                mode: '全新模式：赏金行动!',
                platforms: '同步加速Steam / Epic',
                launchText: '电竞加速',
                server: '亚服',
                bottomText: 'biubiu联动PCL送福利，瓜分100万G币！每周三周四免费加速！电竞加速更快更稳！',
                tools: [
                    {icon: '送', color: '#ff8a4d', name: '送好友加速卡'},
                    {icon: '⊕', color: '#5cb4f7', name: '外置准星', badge: '未开启'},
                    {icon: '金', color: '#ff8a4d', name: '赏金行动'},
                    {icon: '▶', color: '#a87aff', name: '直播掉宝-new'},
                    {icon: '〰', color: '#5cf28a', name: '脚步声增强'},
                    {icon: '⊕', color: '#5cb4f7', name: '卡大厅修复', badge: '已开启', badgeType: 'on'},
                ]
            },
            sf6: {
                bgClass: 'bg-sf6',
                logo: 'SF6',
                tagline: 'STREET FIGHTER 6',
                name: '街头霸王6',
                mode: '好友对战修复',
                platforms: '同步加速Steam',
                launchText: '电竞加速',
                server: '',
                bottomText: '官宣！世界冠军小孩正式成为biubiu加速器品牌代言人！',
                tools: [
                    {icon: '易', color: '#ff8a4d', name: '账号交易'},
                    {icon: '联', color: '#5cb4f7', name: '好友联机低延迟'},
                    {icon: 'SF', color: '#5c8af7', name: '角色排位数据'},
                    {icon: '▶', color: '#a87aff', name: '直播掉宝-new'},
                    {icon: '玩', color: '#ff5530', name: 'MOD'},
                    {icon: 'Q', color: '#8a9ab0', name: '加速保障Q群'},
                ]
            },
            aion2: {
                bgClass: 'bg-aion',
                logo: 'AION 2',
                tagline: '高速下载 · 专享IP · 同步支持PURPLE平台',
                name: '永恒之塔2',
                mode: 'PURPLE平台下载',
                platforms: '同步加速Steam / NCPurple',
                launchText: '立即加速',
                server: '港澳台服',
                bottomText: '',
                tools: [
                    {icon: '汉', color: '#5cf28a', name: '简中汉化', badge: '未开启'},
                    {icon: '地', color: '#ff8a4d', name: '大地图互动'},
                    {icon: '礼', color: '#ff5530', name: '福利兑换码'},
                    {icon: '数', color: '#5cb4f7', name: 'DPS统计(第三方)'},
                    {icon: '★', color: '#8a9ab0', name: '角色评分'},
                    {icon: '易', color: '#ff8a4d', name: '账号交易'},
                ]
            }
        };

        function shadeColor(hex) {
            // simple darker shade for icon gradient
            const c = hex.replace('#', '');
            const num = parseInt(c, 16);
            const r = Math.max(0, ((num >> 16) & 0xff) - 50);
            const g = Math.max(0, ((num >> 8) & 0xff) - 50);
            const b = Math.max(0, (num & 0xff) - 50);
            return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
        }

        function showGame(key) {
            const data = games[key];
            if (!data) return;

            document.getElementById('gameHeroBg').className = 'game-hero-bg ' + data.bgClass;
            document.getElementById('gameLogo').textContent = data.logo;
            document.getElementById('gameTagline').textContent = data.tagline;
            document.getElementById('gameName').textContent = data.name;

            const modePill = document.getElementById('gameModePill');
            if (data.mode) {
                modePill.textContent = data.mode;
                modePill.style.display = '';
            } else {
                modePill.style.display = 'none';
            }

            document.getElementById('gamePlatforms').textContent = data.platforms;
            document.getElementById('launchText').textContent = data.launchText;

            const championBtn = document.getElementById('championLineBtn');
            const championMap = { sf6: 'xiaohai', pubg: 'aixleft', aion2: 'guo' };
            const detailKey = championMap[key];
            if (detailKey) {
                championBtn.style.display = '';
                championBtn.onclick = () => {
                    detailReturnTo = 'game';
                    detailReturnGameKey = key;
                    // v7 new: 圣光降临过场（替代原 devGoto 硬切）
                    playDivineLight(detailKey, key);
                };
            } else {
                championBtn.style.display = 'none';
            }

            const serverChip = document.getElementById('serverChip');
            if (data.server) {
                serverChip.textContent = data.server;
                serverChip.style.display = '';
            } else {
                serverChip.style.display = 'none';
            }

            const bottomStrip = document.getElementById('gameBottomStrip');
            if (data.bottomText) {
                document.getElementById('gameBottomText').textContent = data.bottomText;
                bottomStrip.style.display = '';
            } else {
                bottomStrip.style.display = 'none';
            }

            document.getElementById('toolsList').innerHTML = data.tools.map(t => {
                const badgeHtml = t.badge
                    ? `<div class="tool-badge ${t.badgeType === 'on' ? 'badge-on' : ''}">${t.badge}</div>`
                    : '';
                return `
                    <div class="tool-item">
                        <div class="tool-icon" style="background: linear-gradient(135deg, ${t.color}, ${shadeColor(t.color)});">${t.icon}</div>
                        <div class="tool-name">${t.name}</div>
                        ${badgeHtml}
                        <div class="tool-arrow">›</div>
                    </div>
                `;
            }).join('');

            // Sidebar active state (both plaza and game sidebars)
            document.querySelectorAll('.game-card[data-game]').forEach(card => {
                card.classList.toggle('is-active', card.dataset.game === key);
            });

            // Switch views
            viewPlaza.classList.remove('active');
            viewHall.classList.remove('active');
            viewDetail.classList.remove('active');
            viewTeam.classList.remove('active');
            viewTeam.classList.remove('just-revealed');
            viewGame.classList.add('active');
        }

        // ========== View switching ==========
        const viewPlaza = document.getElementById('viewPlaza');
        const viewHall = document.getElementById('viewHall');
        const viewDetail = document.getElementById('viewDetail');
        const viewTeam = document.getElementById('viewTeam');
        const viewGame = document.getElementById('viewGame');

        // 进入名人堂主页：用「冠军时光长廊」隧道作仪式过场。
        // 历史/底蕴语义在这里更自然，且名人堂是低频深度入口，4s 仪式不会让人厌烦。
        function openHallFromPlaza() {
            playTunnelEntrance(() => {
                // 中场切到名人堂（tunnel 仍盖在上面），淡出后玩家直接看到名人堂
                viewPlaza.classList.remove('active');
                viewGame.classList.remove('active');
                viewDetail.classList.remove('active');
                viewTeam.classList.remove('active');
                viewHall.classList.add('active');
            });
        }

        function showPlaza() {
            viewHall.classList.remove('active');
            viewDetail.classList.remove('active');
            viewTeam.classList.remove('active');
            viewTeam.classList.remove('just-revealed');
            viewGame.classList.remove('active');
            document.querySelectorAll('.game-card[data-game]').forEach(c => c.classList.remove('is-active'));
            viewPlaza.classList.add('active');
        }

        function spawnSparks() {
            const container = document.getElementById('ceremonySparks');
            if (!container) return;
            container.innerHTML = '';
            const count = 22;
            for (let i = 0; i < count; i++) {
                const s = document.createElement('div');
                s.className = 'spark';
                const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
                const dist = 180 + Math.random() * 220;
                const dx = Math.cos(angle) * dist;
                const dy = Math.sin(angle) * dist;
                const dur = 0.7 + Math.random() * 0.5;
                const delay = Math.random() * 0.15;
                s.style.setProperty('--dx', dx + 'px');
                s.style.setProperty('--dy', dy + 'px');
                s.animate(
                    [
                        { transform: 'translate(0, 0) scale(0.6)', opacity: 0 },
                        { transform: `translate(${dx * 0.3}px, ${dy * 0.3}px) scale(1.2)`, opacity: 1, offset: 0.25 },
                        { transform: `translate(${dx}px, ${dy}px) scale(0.3)`, opacity: 0 }
                    ],
                    { duration: dur * 1000, delay: delay * 1000, easing: 'cubic-bezier(0.22, 0.61, 0.36, 1)', fill: 'forwards' }
                );
                container.appendChild(s);
            }
            setTimeout(() => { container.innerHTML = ''; }, 1600);
        }

        function showDetail(champKey) {
            // 从名人堂进入详情：返回时回到名人堂
            detailReturnTo = null;
            detailReturnGameKey = null;
            const hallPage = document.querySelector('#viewHall .hall-page');
            const overlay = document.getElementById('ceremonyOverlay');
            const wrappers = document.querySelectorAll('#viewHall .card-wrapper');
            let chosen = null;
            wrappers.forEach(w => {
                if (w.getAttribute('onclick') && w.getAttribute('onclick').includes(`'${champKey}'`)) {
                    chosen = w;
                }
            });

            // Phase 1 (0ms): single zoom — chosen card scales 1.0→1.45 in one motion.
            // (is-zooming wins specificity over is-chosen, so applying both at once
            // bypasses the earlier 1.08 "wind-up" stage for a tighter, cleaner feel.)
            hallPage.classList.add('is-launching');
            if (chosen) {
                chosen.classList.add('is-chosen');
                chosen.classList.add('is-zooming');
            }

            // Phase 2 (~400ms): peak of zoom — gold flash overlay + sparks burst
            setTimeout(() => {
                overlay.classList.add('is-active');
                spawnSparks();
            }, 400);

            // Phase 3 (~700ms): swap to detail mid-flash
            setTimeout(() => {
                updateChampion(champKey);
                viewHall.classList.remove('active');
                viewDetail.classList.add('active');
                viewDetail.classList.add('just-revealed');
            }, 700);

            // Phase 4 (~1300ms): cleanup
            setTimeout(() => {
                hallPage.classList.remove('is-launching');
                if (chosen) {
                    chosen.classList.remove('is-chosen');
                    chosen.classList.remove('is-zooming');
                }
                overlay.classList.remove('is-active');
                viewDetail.classList.remove('just-revealed');
            }, 1300);
        }

        function showHall() {
            viewPlaza.classList.remove('active');
            viewDetail.classList.remove('active');
            viewTeam.classList.remove('active');
            viewTeam.classList.remove('just-revealed');
            viewGame.classList.remove('active');
            setTimeout(() => viewHall.classList.add('active'), 100);
        }

        function showTeam(key) {
            const data = teams[key];
            if (!data) return;
            const teamPage = document.querySelector('#viewTeam .team-page');
            if (data.accentHalo) teamPage.style.setProperty('--team-halo', data.accentHalo);
            else teamPage.style.removeProperty('--team-halo');
            const teamIdEl = document.getElementById('teamId');
            if (teamIdEl) teamIdEl.textContent = data.id;
            document.getElementById('teamNameCn').textContent = data.name;
            const teamTagEl = document.getElementById('teamTag');
            teamTagEl.textContent = data.tag || '';
            teamTagEl.style.display = data.tag ? '' : 'none';
            document.getElementById('teamImage').textContent = data.name + ' · 队徽';
            document.getElementById('teamPartnerDivision').textContent = data.partnerDivision;
            document.getElementById('teamHonors').innerHTML = data.honors.map(h =>
                `<div class="honor-item"><span class="honor-year">${h.y}</span><span>${h.t}</span></div>`
            ).join('');

            // 并肩同行文案（直接复用 bridge 字段：讲战队底蕴 + biubiu 与战队的关系）
            const partnershipBlock = document.getElementById('teamPartnershipBlock');
            const partnershipEl = document.getElementById('teamPartnership');
            if (data.bridge) {
                partnershipEl.innerHTML = data.bridge;
                partnershipBlock.style.display = '';
            } else {
                partnershipEl.innerHTML = '';
                partnershipBlock.style.display = 'none';
            }

            viewHall.classList.remove('active');
            viewDetail.classList.remove('active');
            viewTeam.classList.add('active');
            viewTeam.classList.remove('just-revealed');
            void viewTeam.offsetWidth;
            viewTeam.classList.add('just-revealed');
            setTimeout(() => viewTeam.classList.remove('just-revealed'), 1200);
        }

        // ========== Grand entrance (game page → champion detail) ==========
        // "金幕开启 · 圣堂驾临" — a vertical gold light beam sweeps right→left.
        // The game page exits to the left with motion blur + dim, while the
        // champion detail page slides in from the right just behind the beam's
        // leading edge, settling with a brief golden inner halo. Total ~1.6s.
        let pushBusy = false;
        function spawnGrandSparks() {
            const container = document.getElementById('grandCurtainSparks');
            const portal = document.getElementById('grandPortal');
            if (!container || !portal) return;
            container.innerHTML = '';
            const cRect = container.getBoundingClientRect();
            const pRect = portal.getBoundingClientRect();
            const cx = pRect.left + pRect.width / 2 - cRect.left;
            const cy = pRect.top + pRect.height / 2 - cRect.top;
            const baseR = pRect.width / 2;
            const count = 44;
            for (let i = 0; i < count; i++) {
                const s = document.createElement('div');
                s.className = 'grand-spark';
                // Mostly perimeter sparks; a few that streak outward
                const angle = (Math.PI * 2 * i) / count + Math.random() * 0.25;
                const tangential = (Math.random() - 0.5) * 0.6; // small tangential push
                const r0 = baseR * (0.82 + Math.random() * 0.18);
                const outward = 30 + Math.random() * 90;
                const r1 = r0 + outward;
                const a1 = angle + tangential;
                const x0 = cx + Math.cos(angle) * r0;
                const y0 = cy + Math.sin(angle) * r0;
                const x1 = cx + Math.cos(a1) * r1;
                const y1 = cy + Math.sin(a1) * r1;
                const size = 2 + Math.random() * 2.8;
                s.style.left = '0px';
                s.style.top = '0px';
                s.style.width = size + 'px';
                s.style.height = size + 'px';
                container.appendChild(s);
                const dur = 0.7 + Math.random() * 0.6;
                const delay = 0.12 + Math.random() * 0.55;
                s.animate(
                    [
                        { transform: `translate(${x0}px, ${y0}px) scale(0.4)`, opacity: 0 },
                        { transform: `translate(${x0 + (x1 - x0) * 0.25}px, ${y0 + (y1 - y0) * 0.25}px) scale(1.2)`, opacity: 1, offset: 0.2 },
                        { transform: `translate(${x1}px, ${y1}px) scale(0.3)`, opacity: 0 }
                    ],
                    { duration: dur * 1000, delay: delay * 1000, easing: 'cubic-bezier(0.4, 0, 0.6, 1)', fill: 'forwards' }
                );
            }
            setTimeout(() => { container.innerHTML = ''; }, 1600);
        }

        function curtainRevealToDetail(detailKey, e) {
            if (pushBusy) return;
            pushBusy = true;
            const curtain = document.getElementById('grandCurtain');
            const gameView = document.getElementById('viewGame');
            const gamePage = gameView ? gameView.querySelector('.plaza-page') : null;
            const detailView = document.getElementById('viewDetail');
            const detailPage = detailView ? detailView.querySelector('.detail-page') : null;
            if (!curtain || !gamePage || !detailView || !detailPage) {
                devGoto('detail', detailKey);
                pushBusy = false;
                return;
            }

            // Resolve portal origin: click coords → button center → page center fallback
            let cx, cy;
            if (e && (typeof e.clientX === 'number') && (e.clientX || e.clientY)) {
                cx = e.clientX; cy = e.clientY;
            } else {
                const btn = document.getElementById('championLineBtn');
                if (btn) {
                    const r = btn.getBoundingClientRect();
                    cx = r.left + r.width / 2;
                    cy = r.top + r.height / 2;
                } else {
                    const r = curtain.getBoundingClientRect();
                    cx = r.left + r.width / 2;
                    cy = r.top + r.height / 2;
                }
            }

            const setOrigin = (el) => {
                if (!el) return;
                const r = el.getBoundingClientRect();
                el.style.setProperty('--px', (cx - r.left) + 'px');
                el.style.setProperty('--py', (cy - r.top) + 'px');
            };
            setOrigin(curtain);
            setOrigin(gamePage);

            // Phase A (0ms): activate portal layer + game page begins to collapse into portal
            curtain.classList.add('is-active');
            gamePage.classList.add('grand-exit-left');

            // Phase B (~30ms): portal opens, sparks fly off the ring
            requestAnimationFrame(() => {
                curtain.classList.add('is-sweeping');
                spawnGrandSparks();
            });

            // Phase C (~420ms): mount detail page + clip-reveal it through the portal
            setTimeout(() => {
                if (typeof applyChampionData === 'function') {
                    applyChampionData(detailKey);
                    currentChamp = detailKey;
                } else {
                    devGoto('detail', detailKey);
                    return;
                }
                setOrigin(detailView);
                setOrigin(detailPage);
                detailView.classList.add('active');
                detailView.classList.add('grand-enter-right');
                detailPage.classList.add('grand-landing');
            }, 420);

            // Phase D (~1250ms): portal closes back down
            setTimeout(() => {
                curtain.classList.add('is-closing');
            }, 1250);

            // Phase E (~1750ms): cleanup
            setTimeout(() => {
                curtain.classList.remove('is-active', 'is-sweeping', 'is-closing');
                gamePage.classList.remove('grand-exit-left');
                detailView.classList.remove('grand-enter-right');
                detailPage.classList.remove('grand-landing');
                gameView.classList.remove('active');
                // Clear inline custom props so future runs recompute cleanly
                [curtain, gamePage, detailView, detailPage].forEach(el => {
                    if (el) { el.style.removeProperty('--px'); el.style.removeProperty('--py'); }
                });
                pushBusy = false;
            }, 1750);
        }

        // ========== (Legacy) Soft-focus push transition kept for reference ==========
        function _legacyPushTransition(detailKey) {
            const overlay = document.getElementById('pushOverlay');
            const gamePage = document.querySelector('#viewGame .plaza-page');
            if (!overlay || !gamePage) { devGoto('detail', detailKey); return; }
            overlay.classList.remove('is-black');
            overlay.classList.add('is-active');
            gamePage.classList.add('push-out');
            requestAnimationFrame(() => overlay.classList.add('is-black'));
            setTimeout(() => {
                devGoto('detail', detailKey);
                const detailPage = document.querySelector('#viewDetail .detail-page');
                if (detailPage) detailPage.classList.add('push-in');
                requestAnimationFrame(() => overlay.classList.remove('is-black'));
            }, 520);

            // Phase 3: cleanup once both halves of the push have settled
            setTimeout(() => {
                overlay.classList.remove('is-active', 'is-black');
                gamePage.classList.remove('push-out');
                const detailPage = document.querySelector('#viewDetail .detail-page');
                if (detailPage) detailPage.classList.remove('push-in');
                pushBusy = false;
            }, 1300);
        }

        // ========== Hall Tunnel — 冠军时光长廊 入场过场 (v6.1) ==========
        // 视角处在一个旋转方筒的内部，筒壁上贴着"冠军时刻"占位卡片，
        // 整体匀速向后退（视觉上是摄像机沿轴心穿行）+ 缓慢自转。
        // 总时长 ~4s，过场结束后切到冠军详情页。
        const TUNNEL_DURATION = 5000; // 隧道飞行/光晕主动画段时长（粒子延迟也以此为基准）
        const TUNNEL_RING_COUNT = 10;     // 沿 Z 轴的"环"数，决定隧道纵深感
        const TUNNEL_SIDES = 5;           // 每个环上的面板数（五边形截面，比 6 面更稀疏）
        const TUNNEL_RADIUS = 380;        // 圆筒半径
        const TUNNEL_RING_GAP = 520;      // 相邻环之间的 Z 距离（拉大让纵向更稀疏）
        const TUNNEL_FILL_RATIO = 0.6;    // 每个面板位置的填充概率（0–1），让分布有疏密
        const TUNNEL_MIN_PER_RING = 2;    // 每环至少保留的面板数，避免出现整环全空

        function buildTunnel() {
            const rings = document.getElementById('tunnelRings');
            if (!rings) return;
            rings.innerHTML = '';
            let placedCount = 0;
            // 远 → 近 摆面板
            for (let r = 0; r < TUNNEL_RING_COUNT; r++) {
                const z = -(r * TUNNEL_RING_GAP);
                // 隔环错半个 sector，避免视觉上面板 z 序整齐对齐造成"格栅"感
                const phaseOffset = (r % 2 === 0) ? 0 : (360 / TUNNEL_SIDES) / 2;

                // 先决定本环哪些 sector 放面板：按概率掷骰子，
                // 如果数量低于 TUNNEL_MIN_PER_RING 则随机补齐到下限
                const slots = [];
                for (let i = 0; i < TUNNEL_SIDES; i++) {
                    if (Math.random() < TUNNEL_FILL_RATIO) slots.push(i);
                }
                while (slots.length < TUNNEL_MIN_PER_RING) {
                    const candidate = Math.floor(Math.random() * TUNNEL_SIDES);
                    if (!slots.includes(candidate)) slots.push(candidate);
                }

                slots.forEach(i => {
                    const angle = (360 / TUNNEL_SIDES) * i + phaseOffset;
                    const panel = document.createElement('div');
                    panel.className = 'tunnel-panel';
                    placedCount++;
                    panel.textContent = '冠军时刻 ' + String(placedCount).padStart(2, '0');
                    // 摆位：rotateZ → translateY → rotateX(90deg) 把面板贴到圆筒内壁，
                    // 法线指向轴心（=摄像机所在方向），保证面板正面对着摄像机
                    panel.style.transform =
                        'translateZ(' + z + 'px) rotateZ(' + angle + 'deg) translateY(' + TUNNEL_RADIUS + 'px) rotateX(90deg)';
                    rings.appendChild(panel);
                });
            }
        }

        function spawnTunnelStreaks() {
            const layer = document.getElementById('tunnelStreaks');
            if (!layer) return;
            layer.innerHTML = '';
            // 使用 layer 自身（= 隧道画面）尺寸算中心点，而不是 window，
            // 因为隧道已经被裁切在 .app 原型框内（1400×800）。
            const w = layer.clientWidth || layer.offsetWidth || 1400;
            const h = layer.clientHeight || layer.offsetHeight || 800;
            const cx = w / 2;
            const cy = h / 2;
            const count = 60;
            for (let i = 0; i < count; i++) {
                const s = document.createElement('div');
                s.className = 'tunnel-streak';
                layer.appendChild(s);
                // 起点靠近中心（"远"），终点接近边缘（"近"）。
                const angle = Math.random() * Math.PI * 2;
                const r0 = 40 + Math.random() * 80;
                const r1 = Math.max(w, h) * 0.7;
                const x0 = cx + Math.cos(angle) * r0;
                const y0 = cy + Math.sin(angle) * r0;
                const x1 = cx + Math.cos(angle) * r1;
                const y1 = cy + Math.sin(angle) * r1;
                const dur  = 1.6 + Math.random() * 1.4;
                const delay = Math.random() * (TUNNEL_DURATION / 1000) * 0.85;
                const rotate = (angle * 180 / Math.PI) + 90;
                s.animate(
                    [
                        { transform: 'translate(' + x0 + 'px, ' + y0 + 'px) rotate(' + rotate + 'deg) scaleY(0.4)', opacity: 0 },
                        { transform: 'translate(' + (x0 + (x1 - x0) * 0.3) + 'px, ' + (y0 + (y1 - y0) * 0.3) + 'px) rotate(' + rotate + 'deg) scaleY(1)', opacity: 0.85, offset: 0.25 },
                        { transform: 'translate(' + x1 + 'px, ' + y1 + 'px) rotate(' + rotate + 'deg) scaleY(2)', opacity: 0 }
                    ],
                    { duration: dur * 1000, delay: delay * 1000, easing: 'cubic-bezier(0.4, 0, 0.6, 1)', fill: 'forwards' }
                );
            }
        }

        // 通用隧道入场过场（v6.1 暴力加速版）：
        // 调用方传入 onSwitch（在白光全屏时切视图的回调）和可选的 onSettled。
        //
        // 时序（总长 ~6.7s）：
        //   0      巡航 + 起飞（5s 强 ease-in，前段大幅延长营造漫步感、后段冲刺）
        //   4700ms 暖白幕快速升起（0.35s）盖满屏幕
        //   5000ms 切到目标视图（玩家看不到，被白幕盖住）
        //   5200ms tunnel 淡出（已在白幕之下，不可见）
        //   5400ms 暖白幕开始 1.3s 慢淡出 — 名人堂"浮出"
        //   6700ms 清理 DOM
        function playTunnelEntrance(onSwitch, onSettled) {
            if (pushBusy) {
                if (typeof onSwitch === 'function') onSwitch();
                return;
            }
            const tunnel = document.getElementById('grandTunnel');
            const rings = document.getElementById('tunnelRings');
            const veil = document.getElementById('tunnelVeil');
            if (!tunnel || !rings || !veil) {
                if (typeof onSwitch === 'function') onSwitch();
                return;
            }
            pushBusy = true;

            // 清掉上次残留状态
            rings.classList.remove('is-flying');
            tunnel.classList.remove('is-active');
            veil.classList.remove('is-rising', 'is-fading');

            buildTunnel();

            // Phase A (0ms)：tunnel 渐入 + rings 起飞 + 粒子流
            requestAnimationFrame(() => {
                tunnel.classList.add('is-active');
                spawnTunnelStreaks();
                requestAnimationFrame(() => {
                    rings.classList.add('is-flying');
                });
            });

            // Phase B (4700ms)：暖白幕迅速升起（0.35s ease-in），承接"突破白光"瞬间
            setTimeout(() => {
                veil.classList.add('is-rising');
            }, 4700);

            // Phase C (5000ms)：切到目标视图（此时白幕已全屏，切换不可见）
            setTimeout(() => {
                if (typeof onSwitch === 'function') onSwitch();
            }, 5000);

            // Phase D (5200ms)：tunnel 退场（已被白幕盖住，玩家无感）
            setTimeout(() => {
                tunnel.classList.remove('is-active');
            }, 5200);

            // Phase E (5400ms)：暖白幕开始 1.3s 慢淡出 — 名人堂"浮出"显形
            setTimeout(() => {
                veil.classList.remove('is-rising');
                veil.classList.add('is-fading');
            }, 5400);

            // Phase F (6700ms)：清理 DOM、释放 busy
            setTimeout(() => {
                rings.classList.remove('is-flying');
                rings.innerHTML = '';
                const layer = document.getElementById('tunnelStreaks');
                if (layer) layer.innerHTML = '';
                veil.classList.remove('is-fading', 'is-rising');
                pushBusy = false;
                if (typeof onSettled === 'function') onSettled();
            }, 6700);
        }

        // ========== MVP Dev Panel — direct view jumps ==========
        function devGoto(view, key) {
            // Hard-reset all view states
            [viewPlaza, viewHall, viewDetail, viewTeam, viewGame].forEach(v => {
                v.classList.remove('active');
                v.classList.remove('just-revealed');
            });
            document.querySelectorAll('.game-card[data-game]').forEach(c => c.classList.remove('is-active'));
            const hallPage = document.querySelector('#viewHall .hall-page');
            if (hallPage) hallPage.classList.remove('is-launching');
            document.querySelectorAll('#viewHall .card-wrapper').forEach(w => {
                w.classList.remove('is-chosen');
                w.classList.remove('is-zooming');
            });
            const overlay = document.getElementById('ceremonyOverlay');
            if (overlay) overlay.classList.remove('is-active');
            const switchOverlay = document.getElementById('detailSwitchOverlay');
            if (switchOverlay) switchOverlay.classList.remove('is-active');
            isSwitching = false;

            if (view === 'plaza') {
                viewPlaza.classList.add('active');
            } else if (view === 'hall') {
                viewHall.classList.add('active');
            } else if (view === 'detail' && key) {
                viewDetail.classList.add('active');
                currentChamp = null;
                applyChampionData(key);
                currentChamp = key;
            } else if (view === 'team' && key) {
                showTeam(key);
            } else if (view === 'game' && key) {
                showGame(key);
            }
        }

        let currentChamp = null;
        let isSwitching = false;
        let detailReturnTo = null;       // 'game' 表示返回时回到游戏加速界面
        let detailReturnGameKey = null;  // 对应的游戏 key

        function backFromDetail() {
            if (detailReturnTo === 'game' && detailReturnGameKey) {
                const k = detailReturnGameKey;
                detailReturnTo = null;
                detailReturnGameKey = null;
                showGame(k);
            } else {
                showHall();
            }
        }

        function applyChampionData(key) {
            const data = champions[key];
            if (!data) return;
            const detailPage = document.querySelector('#viewDetail .detail-page');
            if (data.accentHalo) detailPage.style.setProperty('--champ-halo', data.accentHalo);
            else detailPage.style.removeProperty('--champ-halo');
            if (data.accentFloor) detailPage.style.setProperty('--champ-floor', data.accentFloor);
            else detailPage.style.removeProperty('--champ-floor');
            if (data.accentBgOverlay) detailPage.style.setProperty('--champ-bg-overlay', data.accentBgOverlay);
            else detailPage.style.removeProperty('--champ-bg-overlay');
            if (data.accentAtmosTop) detailPage.style.setProperty('--champ-atmos-top', data.accentAtmosTop);
            else detailPage.style.removeProperty('--champ-atmos-top');
            if (data.accentAtmosSide) detailPage.style.setProperty('--champ-atmos-side', data.accentAtmosSide);
            else detailPage.style.removeProperty('--champ-atmos-side');
            document.getElementById('champTag').textContent = data.tag;
            document.getElementById('champId').textContent = data.id.toUpperCase();
            document.getElementById('champName').textContent = data.name;
            document.getElementById('champIntro').textContent = data.intro;
            const quoteEl = document.getElementById('champQuote');
            if (data.quote) {
                quoteEl.textContent = data.quote;
                quoteEl.style.display = '';
            } else {
                quoteEl.style.display = 'none';
            }
            document.getElementById('bridgeText').innerHTML = data.bridge;
            document.getElementById('ctaText').textContent = data.cta;
            const honorsList = document.getElementById('honorsList');
            honorsList.innerHTML = data.honors.map(h =>
                `<div class="honor-item"><span class="honor-year">${h.y}</span><span>${h.t}</span></div>`
            ).join('');

            // Update active nav
            document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
            const target = document.querySelector(`.nav-item[data-champ="${key}"]`);
            if (target) target.classList.add('active');
        }

        function updateChampion(key, opts) {
            opts = opts || {};
            if (isSwitching) return;
            if (key === currentChamp && !opts.force) return;

            const detailPage = document.querySelector('#viewDetail .detail-page');
            // If first load or forced (e.g. opening from hall), skip exit transition
            const skipExit = !!opts.skipExit || currentChamp === null;

            const enter = () => {
                applyChampionData(key);
                currentChamp = key;
                detailPage.classList.remove('is-switching');
                // restart entrance animations
                detailPage.classList.remove('is-entering');
                // force reflow so animation replays
                void detailPage.offsetWidth;
                detailPage.classList.add('is-entering');
                // stagger honor items
                const items = detailPage.querySelectorAll('.honor-item');
                items.forEach((el, i) => {
                    el.style.animationDelay = (0.28 + i * 0.06) + 's';
                });
                setTimeout(() => {
                    detailPage.classList.remove('is-entering');
                    isSwitching = false;
                }, 900);
            };

            isSwitching = true;
            if (skipExit) {
                enter();
            } else {
                detailPage.classList.remove('is-entering');
                detailPage.classList.add('is-switching');
                // Ceremonial beam sweep — fires across the page mid-switch
                const switchOverlay = document.getElementById('detailSwitchOverlay');
                if (switchOverlay) {
                    switchOverlay.classList.remove('is-active');
                    void switchOverlay.offsetWidth;
                    switchOverlay.classList.add('is-active');
                    setTimeout(() => switchOverlay.classList.remove('is-active'), 900);
                }
                setTimeout(enter, 320);
            }
        }

        // Patch showDetail so the entrance animation plays on first open
        const _origShowDetail = showDetail;
        showDetail = function(champKey) {
            currentChamp = null; // force entrance animation
            isSwitching = false;
            _origShowDetail(champKey);
        };

        // Detail page nav switching
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => updateChampion(item.dataset.champ));
        });

        // Initialize currentChamp for first detail open
        currentChamp = 'xiaohai';

        // ===================== Video Modal =====================
        (function() {
            const modal = document.getElementById('videoModal');
            const stage = document.getElementById('videoModalStage');
            const closeBtn = document.getElementById('videoModalClose');
            if (!modal) return;

            function openVideoModal() {
                modal.classList.add('is-open');
                modal.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
                // To swap in a real video later:
                // stage.innerHTML = '<video src="..." controls autoplay></video>';
            }
            function closeVideoModal() {
                modal.classList.remove('is-open');
                modal.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
                const v = stage.querySelector('video');
                if (v) { try { v.pause(); v.currentTime = 0; } catch(e) {} }
                const ifr = stage.querySelector('iframe');
                if (ifr) { ifr.src = ifr.src; }
            }

            modal.addEventListener('click', (e) => {
                if (e.target.dataset && e.target.dataset.close === '1') closeVideoModal();
            });
            if (closeBtn) closeBtn.addEventListener('click', closeVideoModal);
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modal.classList.contains('is-open')) closeVideoModal();
            });

            // Delegate clicks on the in-page video tile to open the modal
            // v7: card class changed from .video-feature → .video-card; keep both selectors
            // for back-compat in case any legacy markup re-enters the page.
            document.addEventListener('click', (e) => {
                const trigger = e.target.closest('.video-card, .video-feature .video-area, .video-feature');
                if (!trigger) return;
                openVideoModal();
            });

            window.openVideoModal = openVideoModal;
            window.closeVideoModal = closeVideoModal;
        })();

        // ========== 冠军名人堂开屏弹窗（v6.1） ==========
        // 行为：页面加载后短暂延迟弹出（让玩家先看见 plaza 一眼），关闭/CTA 后不再自动弹。
        // 生产环境可改为 sessionStorage / localStorage 记录"已看过"以避免反复弹。
        (function setupHallSplash() {
            const splash = document.getElementById('hallSplash');
            const closeBtn = document.getElementById('hallSplashClose');
            const cta = document.getElementById('hallSplashCta');
            if (!splash || !closeBtn || !cta) return;

            let dismissed = false;

            function showSplash() {
                // 显式调用一律允许重新弹出（dev 面板调试需要反复触发）
                dismissed = false;
                splash.classList.add('is-visible');
                splash.setAttribute('aria-hidden', 'false');
            }

            function hideSplash(after) {
                dismissed = true;
                splash.classList.remove('is-visible');
                splash.setAttribute('aria-hidden', 'true');
                // 等淡出动画结束（CSS transition 0.5s）再执行后续动作
                setTimeout(() => {
                    if (typeof after === 'function') after();
                }, 500);
            }

            // 进入页面后稍作停顿再自动弹出一次（plaza 短暂可见 → 弹窗浮起）；
            // 此自动弹出仍受 dismissed 影响，避免在已关闭后被某些事件重复触发。
            window.addEventListener('load', () => {
                setTimeout(() => {
                    if (!dismissed) showSplash();
                }, 400);
            });

            closeBtn.addEventListener('click', () => hideSplash());
            cta.addEventListener('click', () => {
                // 关闭弹窗后，触发"前往名人堂"的隧道入场动画
                hideSplash(() => {
                    if (typeof openHallFromPlaza === 'function') {
                        openHallFromPlaza();
                    }
                });
            });

            // 暴露给 dev panel / 控制台调试，方便重放
            window.showHallSplash = showSplash;
            window.hideHallSplash = hideSplash;
        })();


        // ============================================================
        // v7 patch — extend champion data & override render functions
        // (Appended to bypass mid-file Edit truncation issue)
        // ============================================================

        // 1. Extend xiaohai
        Object.assign(champions.xiaohai, {
            creditName: 'Xiaohai',
            intro: '六岁拿起手柄，从街机厅一路打进世界总决赛——「生来为赢」是他给这条路最简短的注脚。曾卓君是少有能跨越游戏代际、在每一代格斗游戏都封王的人，也是国人心中「格斗大魔王」的代名词。',
            roleLabel: '招牌角色', roleValue: '不知火舞',
            cta: '了解《街霸6》冠军专线',
            pains: [
                {icon: '⏱', title: '出招延迟', sub: '帧级延迟，连招断点失败'},
                {icon: '⚡', title: '联机断连', sub: '关键回合突然掉线'},
                {icon: '⊘', title: '跨区匹配', sub: '高 ping 进国际服对战'},
                {icon: '↯', title: '帧数不稳', sub: '帧率波动影响判断'}
            ],
            painLead: '在《街霸6》的线上战场，Xiaohai 长期感受到这些痛点——',
            cooperation: [
                '于是 biubiu 与 Xiaohai 联手共研。从匹配阶段的跨区路由，到对局中的指令同步，再到弱网环境下的画面稳定——每一段都按世界冠军的严苛标准被一遍遍重测、一遍遍打磨。Xiaohai 把"一帧不容偏差"的偏执拆成具体的工程指标，让 biubiu 的算法团队对照他在世界赛上的实战数据反复对齐。',
                '最终，这条专为《街霸6》打磨的冠军专线落地——它把过去只在世界冠军比赛环境里才稳定的网络体验，带到每一位街霸玩家的对局里。从此每一次出招、每一次连段，都不会再输在那段不可控的距离上。'
            ]
        });
        (function() {
            const shorts = ['EWC 卫冕', 'EWC 冠军', 'EVO 季军', 'CPT 多站冠军', 'EVO 季军', 'SFV 冠军', 'KOF 世冠'];
            champions.xiaohai.honors.forEach((h, i) => { h.short = shorts[i] || h.t; });
        })();

        // 2. Extend aixleft
        Object.assign(champions.aixleft, {
            creditName: 'Aixleft',
            intro: '十五岁在守望先锋国服把天梯打到第一，转战 PUBG 后自建战队带新生军团夺冠——「莫问少年凌云志，曾许天下第一流」是他对自己最早的承诺。左梓轩把「少年感」和「统治力」长在了同一个人身上，也把「PeRo」这个名字钉进了 PUBG 中国十年里最难绕开的位置。',
            roleLabel: '队内位置', roleValue: '突破手 / IGL',
            cta: '了解《PUBG》冠军专线',
            pains: [
                {icon: '◎', title: '射击命中卡顿', sub: '锁定瞬间画面延迟'},
                {icon: '◇', title: '场景互动延迟', sub: '搜物资 / 上车 / 开门慢半拍'},
                {icon: '⇨', title: '移动漂移', sub: '位移与画面对不上'},
                {icon: '☷', title: '队友通讯不同步', sub: '语音与画面延迟错位'}
            ],
            painLead: '在《PUBG》的决赛圈实战，Aixleft 长期感受到这些痛点——',
            cooperation: [
                '于是 biubiu 与 Aixleft 联手共研。从开镜瞬间的延迟控制，到队伍语音的同步精度，再到决赛圈毫秒级的对枪环境——每一项都被对照训练赛与世界赛事的实战数据一项项重测。Aixleft 把"快他半秒"的诉求拆成可被调优的网络指标，让 biubiu 的工程团队按职业选手的极限标准反复优化。',
                '最终，这条专为《PUBG》打磨的冠军专线落地——它把过去只属于世界级战队训练赛的网络体验，带到每一位 PUBG 玩家的决赛圈里。从此先开镜、先击杀，画面与判定不再有那看不见的时差。'
            ]
        });
        (function() {
            const shorts = ['PCL 大满贯', 'PCS 三连冠', 'PCL 夏冠', 'PeRo 自建', 'PCL MVP', 'OW 国服 No.1'];
            champions.aixleft.honors.forEach((h, i) => { h.short = shorts[i] || h.t; });
        })();

        // 3. Extend guo
        Object.assign(champions.guo, {
            creditName: '郭永军',
            intro: '把每一个晚上都泡进永恒之塔的人。郭永军不是因为天赋耀眼被人记住——「团里的位置，是用时间一点一点熬出来的」，他用十年时间，把这句话熬成了团里那个永远在的位置。',
            roleLabel: '招牌职业', roleValue: '剑星',
            cta: '了解《永恒之塔》冠军专线',
            pains: [
                {icon: '⊗', title: '团本掉线', sub: '副本进行中突然断连'},
                {icon: '⌛', title: '技能延迟', sub: '技能释放慢半拍'},
                {icon: '⇋', title: '跨服传送卡顿', sub: '换图等待过长'},
                {icon: '☴', title: '团战丢包', sub: '大规模团战时数据丢失'}
            ],
            painLead: '在《永恒之塔》的团本副本里，郭永军长期感受到这些痛点——',
            cooperation: [
                '于是 biubiu 与郭永军联手共研。从大型团战的吞吐稳定性，到跨服传送的瞬时响应，再到长副本中的连接保活——每一项都基于真实副本数据反复打磨。郭永军把十年老手对网络的直觉变成可被工程兑现的承诺，让 biubiu 的工程团队按团本生死线的标准做适配。',
                '最终，这条专为《永恒之塔》打磨的冠军专线落地——它把过去顶级公会团本环境才有的网络稳定性，带到每一位永恒之塔玩家的副本与团战里。从此每一次释放、每一次走位，都不会再被那一秒不知道发生了什么的网络毁掉。'
            ]
        });
        (function() {
            const shorts = ['国服顶级', '跨服胜出'];
            champions.guo.honors.forEach((h, i) => { h.short = shorts[i] || h.t; });
        })();

        // 4. Override applyChampionData with v7 rendering
        applyChampionData = function(key) {
            const data = champions[key];
            if (!data) return;
            const detailPage = document.querySelector('#viewDetail .detail-page-v7');
            if (!detailPage) return;

            const setVar = (k, v) => v ? detailPage.style.setProperty(k, v) : detailPage.style.removeProperty(k);
            setVar('--champ-halo', data.accentHalo);
            setVar('--champ-floor', data.accentFloor);
            setVar('--champ-bg-overlay', data.accentBgOverlay);
            setVar('--champ-atmos-top', data.accentAtmosTop);
            setVar('--champ-atmos-side', data.accentAtmosSide);

            const setText = (id, text) => { const el = document.getElementById(id); if (el) el.textContent = text || ''; };
            setText('champId', (data.id || '').toUpperCase());
            setText('champName', data.name);
            setText('champTag', data.tag);

            const quoteEl = document.getElementById('champQuote');
            if (quoteEl) {
                if (data.quote) { quoteEl.textContent = data.quote; quoteEl.style.display = ''; }
                else { quoteEl.style.display = 'none'; }
            }

            setText('champGame', data.game);
            setText('champRoleLabel', data.roleLabel || '招牌角色');
            setText('champRoleValue', data.roleValue);
            setText('champIntro', data.intro);
            setText('ctaText', data.cta);
            setText('videoCardTitle', '冠军专访 · ' + (data.name || ''));

            const honorsRow = document.getElementById('honorsRow');
            if (honorsRow) {
                const top3 = (data.honors || []).slice(0, 3);
                const rows = top3.map(function(h) {
                    return '<div class="honor-row-v7"><span class="honor-year-v7">' + h.y + '</span><span class="honor-text-v7">' + (h.t || '') + '</span></div>';
                }).join('');
                honorsRow.innerHTML =
                    '<div class="honors-title-v7"><span class="title-rule"></span><span class="title-text">荣誉时刻</span></div>' +
                    '<div class="honors-list-v7">' + rows + '</div>';
            }

            const painGrid = document.getElementById('painGrid');
            if (painGrid && Array.isArray(data.pains)) {
                painGrid.innerHTML = data.pains.map(function(p, i) {
                    var num = String(i + 1);
                    if (num.length < 2) num = '0' + num;
                    return '<div class="pain-row">' +
                        '<span class="pain-num">' + num + '</span>' +
                        '<div class="pain-text-block">' +
                            '<div class="pain-title">' + (p.title || '') + '</div>' +
                            '<div class="pain-sub">' + (p.sub || '') + '</div>' +
                        '</div>' +
                        '</div>';
                }).join('');
            }

            setText('painLead', data.painLead);

            const coopCreditEl = document.getElementById('coopCredit');
            if (coopCreditEl) {
                const creditName = data.creditName || data.name || '';
                coopCreditEl.innerHTML = 'biubiu &times; <span class="credit-name">' + creditName + '</span>';
            }

            const coopEl = document.getElementById('coopText');
            if (coopEl) {
                const paras = Array.isArray(data.cooperation) ? data.cooperation : [data.cooperation || ''];
                coopEl.innerHTML = paras.map(function(p) { return '<p>' + p + '</p>'; }).join('');
            }

            document.querySelectorAll('.nav-item').forEach(function(n) { n.classList.remove('active'); });
            const target = document.querySelector('.nav-item[data-champ="' + key + '"]');
            if (target) target.classList.add('active');
        };

        // 5. Override updateChampion to use v7 selector
        updateChampion = function(key, opts) {
            opts = opts || {};
            if (isSwitching) return;
            if (key === currentChamp && !opts.force) return;

            const detailPage = document.querySelector('#viewDetail .detail-page-v7');
            const skipExit = !!opts.skipExit || currentChamp === null;

            const enter = function() {
                applyChampionData(key);
                currentChamp = key;
                if (!detailPage) { isSwitching = false; return; }
                detailPage.classList.remove('is-switching');
                detailPage.classList.remove('is-entering');
                void detailPage.offsetWidth;
                detailPage.classList.add('is-entering');
                setTimeout(function() {
                    detailPage.classList.remove('is-entering');
                    isSwitching = false;
                }, 900);
            };

            isSwitching = true;
            if (skipExit || !detailPage) {
                enter();
            } else {
                detailPage.classList.remove('is-entering');
                detailPage.classList.add('is-switching');
                const switchOverlay = document.getElementById('detailSwitchOverlay');
                if (switchOverlay) {
                    switchOverlay.classList.remove('is-active');
                    void switchOverlay.offsetWidth;
                    switchOverlay.classList.add('is-active');
                    setTimeout(function() { switchOverlay.classList.remove('is-active'); }, 900);
                }
                setTimeout(enter, 320);
            }
        };


        // ============================================================
        // DIVINE LIGHT — 游戏加速界面 → 冠军详情页 入场过场（v7 new）
        //
        // 4 阶段时序（总长 ~3s）：
        //   Phase A  0ms      darken      — 暗幕盖住游戏页 + 粒子开始升起
        //   Phase B  500ms    column      — 金色光柱降下 + 触地涟漪
        //   Phase C  1500ms   burst       — 内核爆开 + 金光辐射 + 背景tint显形
        //   Phase D  2500ms   settle      — 切到详情页 + 光柱化为聚光 + 自身淡出
        //            3000ms   cleanup     — 移除所有 phase 类、释放 pushBusy
        //
        // 关键设计：末帧 .dl-spotlight 颜色 = 详情页 layer1 accent halo，
        // 切视图发生在 phase C 末尾、phase D 初，用户感知是"光柱化为详情页聚光"。
        // ============================================================
        function spawnDLParticles() {
            const layer = document.getElementById('dlParticles');
            if (!layer) return;
            layer.innerHTML = '';
            const count = 42;
            for (let i = 0; i < count; i++) {
                const p = document.createElement('div');
                p.className = 'dl-particle';
                // 70% 粒子集中在光柱核心区域 (44%-56%)，做"光柱里的尘埃"感
                // 30% 粒子撒在光柱外侧 (28%-72%)，做空气中浮尘
                let leftPct;
                if (Math.random() < 0.7) {
                    leftPct = 44 + Math.random() * 12;   // 核心：44-56%
                } else {
                    leftPct = 28 + Math.random() * 44;   // 外侧：28-72%
                }
                p.style.left = leftPct + '%';
                // 起点更分散在画面下半部（不只是 30px），让上升轨迹更长更自然
                p.style.bottom = (Math.random() * 120) + 'px';
                const size = 1.2 + Math.random() * 2.2;
                p.style.width = size + 'px';
                p.style.height = size + 'px';
                const dur = 2.6 + Math.random() * 2.2;
                const delay = Math.random() * 2.0;
                p.style.animationDuration = dur + 's';
                p.style.animationDelay = delay + 's';
                // 核心粒子稍亮，外侧粒子更淡
                if (leftPct > 42 && leftPct < 58) {
                    p.style.opacity = '';  // 用 CSS animation 的 opacity
                } else {
                    p.style.filter = 'brightness(0.65)';
                }
                layer.appendChild(p);
            }
            // 自动清理
            setTimeout(function() {
                if (layer) layer.innerHTML = '';
            }, 5500);
        }

        function playDivineLight(detailKey, sourceGameKey) {
            if (pushBusy) return;
            const overlay = document.getElementById('divineLight');
            const data = champions[detailKey];
            if (!overlay || !data) {
                // 兜底：直接硬切
                devGoto('detail', detailKey);
                return;
            }
            pushBusy = true;

            // 清掉残留 phase 类
            overlay.classList.remove(
                'is-active', 'phase-darken', 'phase-column',
                'phase-burst', 'phase-settle'
            );

            // 把冠军专属色写到 CSS 变量
            //   --dl-tint：背景色擦亮后的整体氛围色
            //   --dl-spotlight：末帧的聚光底图（跟详情页 layer1 accent halo 视觉一致）
            if (data.accentBgOverlay) {
                overlay.style.setProperty('--dl-tint', data.accentBgOverlay);
            }
            if (data.accentHalo) {
                overlay.style.setProperty(
                    '--dl-spotlight',
                    'radial-gradient(ellipse 700px 750px at 50% 42%, ' +
                    'rgba(225, 208, 173, 0.18) 0%, transparent 70%), ' +
                    data.accentHalo
                );
            }

            // Phase A (0ms)：暗幕 + 粒子
            overlay.classList.add('is-active');
            requestAnimationFrame(function() {
                overlay.classList.add('phase-darken');
                spawnDLParticles();
            });

            // Phase B (500ms)：光柱降下
            setTimeout(function() {
                overlay.classList.add('phase-column');
            }, 500);

            // Phase C (1500ms)：内核爆开 + 背景色擦亮
            setTimeout(function() {
                overlay.classList.add('phase-burst');
            }, 1500);

            // Phase D (2500ms)：动效收束 —— 仅做平滑淡出，不做视图跳转
            // (原跳转逻辑已移除：现在只用于演示动效本身，播完回到来源页面)
            setTimeout(function() {
                overlay.classList.add('phase-fadeout');
            }, 2500);

            // Phase E (3200ms)：清理
            setTimeout(function() {
                overlay.classList.remove(
                    'is-active', 'phase-darken', 'phase-column',
                    'phase-burst', 'phase-settle', 'phase-fadeout'
                );
                overlay.style.removeProperty('--dl-tint');
                overlay.style.removeProperty('--dl-spotlight');
                const layer = document.getElementById('dlParticles');
                if (layer) layer.innerHTML = '';
                pushBusy = false;
            }, 3200);
        }

        // 暴露给 dev 面板调试
        window.playDivineLight = playDivineLight;

        // ========== Banner Stack — 双卡覆盖滑动切换 ==========
        // 两张卡反向滑动互换位置。z-index 在动画中点（两卡完全重合）交换，
        // 视觉上零跳变。
        var _stackBusy = false;
        function toggleBannerStack() {
            var stack = document.getElementById('bannerStack');
            if (!stack || _stackBusy) return;
            _stackBusy = true;

            var card1 = stack.querySelector('.stack-card-1');
            var card2 = stack.querySelector('.stack-card-2');
            var isState1 = stack.classList.contains('state-1');

            // 1) 锁住当前 z-index（用 inline style 覆盖 CSS）
            card1.style.zIndex = isState1 ? '2' : '1';
            card2.style.zIndex = isState1 ? '1' : '2';

            // 2) 切换位置状态 → 触发 left 的 CSS transition
            stack.classList.replace(
                isState1 ? 'state-1' : 'state-2',
                isState1 ? 'state-2' : 'state-1'
            );

            // 3) 在动画中点（两卡完全重合时）移除 inline z-index，
            //    让 CSS 的新 z-index 生效 —— 视觉零跳变
            setTimeout(function() {
                card1.style.zIndex = '';
                card2.style.zIndex = '';
            }, 275);

            // 4) 同步侧栏卡片
            syncSidebarCards(!isState1);

            // 5) 动画结束后释放锁
            setTimeout(function() {
                _stackBusy = false;
            }, 560);
        }

        // 侧栏卡片跟随主 Banner 同步切换
        function syncSidebarCards(isState1) {
            var entry1 = document.querySelector('#sidebarStack .sidebar-entry-1');
            var entry2 = document.querySelector('#sidebarStack .sidebar-entry-2');
            if (!entry1 || !entry2) return;
            if (isState1) {
                entry1.classList.add('is-top');
                entry2.classList.remove('is-top');
            } else {
                entry2.classList.add('is-top');
                entry1.classList.remove('is-top');
            }
        }

        // 点击底层卡片露出的边缘也触发切换
        document.addEventListener('click', function(e) {
            var stack = document.getElementById('bannerStack');
            if (!stack) return;
            var rect = stack.getBoundingClientRect();
            var clickX = e.clientX - rect.left;
            // 露出区域在右侧 88%-100%
            if (clickX > rect.width * 0.88) {
                e.stopPropagation();
                toggleBannerStack();
            }
        });
