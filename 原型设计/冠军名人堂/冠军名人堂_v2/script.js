
        // ========== Particles for both views ==========
        function spawnParticle(container, isDetail) {
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
                id: 'PERO', name: 'PeRo 战队', tag: '少年自建·三冠王朝',
                partnerDivision: '《PUBG》分部',
                honors: [
                    {y: '2025', t: 'PCL 春季赛 总冠军 / 大满贯'},
                    {y: '2024', t: 'PCS 三连冠 / 沙特电竞世界杯 PUBG 亚军'},
                    {y: '2023', t: 'PCL 夏季赛 冠军'},
                    {y: '2022', t: '由 Aixleft 牵头自建，半年内夺冠'},
                ],
                bridge: '由 <strong>Aixleft</strong> 牵头自建，PeRo 用三年时间，把"少年队"打成了 PUBG 国内最难绕开的名字。<em>每一次决赛圈的呼吸、每一次落地成盒前的反扑</em>——biubiu 与 PeRo 一路同行，见证这群少年把不甘心打成一座座奖杯。'
            },
            '4am': {
                id: '4AM', name: '4 Angry Men', tag: '老牌劲旅·永不熄火',
                partnerDivision: '《PUBG》分部',
                honors: [
                    {y: '2024', t: '多届国内 PUBG 顶级赛事决赛圈常客'},
                    {y: '2021', t: 'PGI.S 全球总决赛 亚军'},
                    {y: '2019', t: 'PCL 春季赛 冠军'},
                    {y: '2017', t: '战队成立·由韦神等老将组建'},
                ],
                bridge: '从端游元年坚守到今天，4AM 是中国 PUBG 永远的"<em>四个愤怒的男人</em>"。八年起伏，他们从未真正离场。biubiu 与 4AM 一道，<strong>把每一份"再来一局"的执拗</strong>，托在身后。'
            },
            falcons: {
                id: 'FALCONS', name: 'Team Falcons', tag: '沙特豪门·跨项目王者',
                partnerDivision: '《街霸6》分部',
                honors: [
                    {y: '2025', t: '沙特电竞世界杯 多项目冠军 / 俱乐部总积分第一'},
                    {y: '2024', t: 'EWC 街霸6 / Apex / CS 多项目登顶'},
                    {y: '2023', t: '收购多支顶级战队，组建全项目矩阵'},
                ],
                bridge: '从利雅得出发，Falcons 把猎鹰旗帜插上了格斗、FPS、MOBA 多个赛道。在《街霸6》分部，他们集结了世界顶级的格斗游戏选手——<em>一帧之差，便是冠亚之分</em>。biubiu 与 Falcons《街霸6》分部并肩，把每一次出招的专注，<strong>稳稳守在它该有的位置</strong>。'
            },
            '17': {
                id: '17 GAMING', name: '17 战队', tag: '韧性 · 战术之师',
                partnerDivision: '《PUBG》分部',
                honors: [
                    {y: '2024', t: 'PCL 多站决赛圈入围 / 战术执行最优队伍'},
                    {y: '2023', t: 'PCL 夏季赛 季军'},
                    {y: '2022', t: '战队整编重组，确立战术核心打法'},
                ],
                bridge: '17 战队以战术见长——缩圈前的每一次转点、交火时的每一次卡位，都建立在毫秒级的判断之上。biubiu 与 17 一路同行，<strong>把这份冷静背后的那一秒不确定</strong>，从画面里抹去。'
            },
            ig: {
                id: 'IG', name: 'Invictus Gaming', tag: 'S8 冠军·永不为奴',
                partnerDivision: '《英雄联盟》分部',
                honors: [
                    {y: '2018', t: '英雄联盟 全球总决赛 冠军（S8）'},
                    {y: '2017', t: 'LPL 春季赛 冠军'},
                    {y: '2012', t: 'DOTA2 国际邀请赛 TI2 冠军'},
                ],
                bridge: '2018 年仁川，IG 把第一座银龙杯捧回中国。"<em>永不为奴</em>"——不是一句口号，是上头之前对操作上限的绝对自信。biubiu 与 IG《英雄联盟》分部并肩，<strong>让这份自信，永远敢于被兑现</strong>。'
            },
            rng: {
                id: 'RNG', name: 'Royal Never Give Up', tag: 'MSI 三冠·永不言弃',
                partnerDivision: '《英雄联盟》分部',
                honors: [
                    {y: '2022', t: 'MSI 季中冠军赛 冠军（队史第三冠）'},
                    {y: '2021', t: 'MSI 季中冠军赛 冠军'},
                    {y: '2018', t: 'MSI 季中冠军赛 冠军 / LPL 春夏双冠'},
                ],
                bridge: '三座 MSI 奖杯，让 RNG 成为中国战队海外赛事的代名词。"<em>Never Give Up</em>"——从落后五千经济到翻盘水晶，靠的不只是心态，是每一次走位与技能释放的精准抵达。biubiu 与 RNG《英雄联盟》分部一路同行，<strong>把"永不言弃"稳稳兜住</strong>。'
            },
            ag: {
                id: 'AG', name: 'AG 超玩会', tag: '王者荣耀·六冠之师',
                partnerDivision: '《王者荣耀》分部',
                honors: [
                    {y: '2024', t: 'KPL 世冠杯 冠军（队史第六冠）'},
                    {y: '2021', t: 'KPL 春季赛 冠军 / 世冠杯 冠军'},
                    {y: '2019', t: 'KPL 春季赛 冠军 / 秋季赛 冠军'},
                    {y: '2017', t: 'KPL 秋季赛 冠军（首冠）'},
                ],
                bridge: 'AG 超玩会，是 KPL 历史上奖杯最多的战队之一。<em>5v5 的胜负，常常压在 0.3 秒的位移判断上</em>——一次走神，整波团灭。biubiu 与 AG 一路同行，<strong>把决胜瞬间的那 0.3 秒，稳稳还给选手</strong>。'
            },
            edg: {
                id: 'EDG', name: 'Edward Gaming', tag: 'S11 全球总冠军',
                partnerDivision: '《英雄联盟》分部',
                honors: [
                    {y: '2021', t: '英雄联盟 全球总决赛 冠军（S11）'},
                    {y: '2017', t: 'MSI 季中冠军赛 冠军'},
                    {y: '2015', t: 'MSI 季中冠军赛 冠军 / LPL 五冠'},
                ],
                bridge: '2021 年冰岛，EDG 让全国玩家在凌晨的宿舍楼里集体沸腾。世界冠军的背后，是<em>无数次训练赛里对操作精度的极致打磨</em>。biubiu 与 EDG《英雄联盟》分部并肩，<strong>把训练场上的稳定，带进每一次出征</strong>。'
            }
        };

        // ========== View switching ==========
        const viewHall = document.getElementById('viewHall');
        const viewDetail = document.getElementById('viewDetail');
        const viewTeam = document.getElementById('viewTeam');

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
            const hallPage = document.querySelector('#viewHall .hall-page');
            const overlay = document.getElementById('ceremonyOverlay');
            const wrappers = document.querySelectorAll('#viewHall .card-wrapper');
            let chosen = null;
            wrappers.forEach(w => {
                if (w.getAttribute('onclick') && w.getAttribute('onclick').includes(`'${champKey}'`)) {
                    chosen = w;
                }
            });

            // Phase 1: launch — chosen card lifts and glows, others retreat
            hallPage.classList.add('is-launching');
            if (chosen) chosen.classList.add('is-chosen');

            // Phase 2: zoom + flash + sparks
            setTimeout(() => {
                if (chosen) chosen.classList.add('is-zooming');
                overlay.classList.add('is-active');
                spawnSparks();
            }, 320);

            // Phase 3: swap to detail mid-flash
            setTimeout(() => {
                updateChampion(champKey);
                viewHall.classList.remove('active');
                viewDetail.classList.add('active');
                viewDetail.classList.add('just-revealed');
            }, 850);

            // Phase 4: cleanup
            setTimeout(() => {
                hallPage.classList.remove('is-launching');
                if (chosen) {
                    chosen.classList.remove('is-chosen');
                    chosen.classList.remove('is-zooming');
                }
                overlay.classList.remove('is-active');
                viewDetail.classList.remove('just-revealed');
            }, 1800);
        }

        function showHall() {
            viewDetail.classList.remove('active');
            viewTeam.classList.remove('active');
            viewTeam.classList.remove('just-revealed');
            setTimeout(() => viewHall.classList.add('active'), 100);
        }

        function showTeam(key) {
            const data = teams[key];
            if (!data) return;
            document.getElementById('teamId').textContent = data.id;
            document.getElementById('teamNameCn').textContent = data.name;
            document.getElementById('teamTag').textContent = data.tag;
            document.getElementById('teamImage').textContent = data.name + ' · 队徽';
            document.getElementById('teamPartnerDivision').textContent = data.partnerDivision;
            document.getElementById('teamHonors').innerHTML = data.honors.map(h =>
                `<div class="honor-item"><span class="honor-year">${h.y}</span><span>${h.t}</span></div>`
            ).join('');
            document.getElementById('teamBridge').innerHTML = data.bridge;

            viewHall.classList.remove('active');
            viewDetail.classList.remove('active');
            viewTeam.classList.add('active');
            viewTeam.classList.remove('just-revealed');
            void viewTeam.offsetWidth;
            viewTeam.classList.add('just-revealed');
            setTimeout(() => viewTeam.classList.remove('just-revealed'), 1200);
        }

        let currentChamp = null;
        let isSwitching = false;

        function applyChampionData(key) {
            const data = champions[key];
            if (!data) return;
            document.getElementById('champTag').textContent = data.tag;
            document.getElementById('champId').textContent = data.id.toUpperCase();
            document.getElementById('champName').textContent = data.name;
            document.getElementById('champIntro').textContent = data.intro;
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
                setTimeout(enter, 300);
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
    