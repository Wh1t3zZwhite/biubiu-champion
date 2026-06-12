
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

        const champions = {
            xiaohai: {
                tag: '中国格斗电竞传奇', id: 'Xiaohai', name: '曾卓君',
                intro: '6岁入行，从拳皇到街霸再到饿狼传说，跨越三个游戏时代依然封王，53项国际冠军，让格斗游戏的中国冠军不止是头衔。',
                bridge: '<strong>从未在一帧上妥协的人</strong>，对网络的要求同样精确到帧。格斗游戏的胜负在帧间决定，对 Xiaohai 而言，网络抖动就是一次断连、一场失败。biubiu 加速器与 Xiaohai 联手，以冠军的标准校准每一帧传输，为<strong>街霸6</strong>定制冠军专线。',
                cta: '了解同款专线',
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
                tag: 'FPS第一天才少年', id: 'Aixleft', name: '左梓轩',
                intro: '15岁守望先锋国服第一，转战 PUBG 后自建 PeRo 战队，PCS 三连冠、PCL 春季赛四项全满贯。永远在加速，永不止步。',
                bridge: '<strong>从未在一发子弹上妥协的人</strong>，对网络的要求同样精确到毫秒。FPS 的胜负在瞬间决定，对 Aixleft 而言，每一次延迟都可能是一次开镜延后、一场遗憾。biubiu 加速器与 Aixleft 联手，以冠军的标准校准每一次响应，为<strong>PUBG</strong>定制冠军专线。',
                cta: '了解同款专线',
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
                tag: '永恒之塔传奇', id: 'GuoYongJun', name: '郭永军',
                intro: '永恒之塔顶级玩家，多年深耕，经验丰富。',
                bridge: '<strong>对每一次操作的精度极致要求</strong>。biubiu 加速器与郭永军联手，为<strong>永恒之塔</strong>定制冠军专线。',
                cta: '了解同款专线',
                honors: [
                    {y: '2024', t: '永恒之塔国服顶级玩家'},
                    {y: '2023', t: '多次跨服赛事胜出'},
                ]
            }
        };

        const viewHall = document.getElementById('viewHall');
        const viewDetail = document.getElementById('viewDetail');

        function showDetail(champKey) {
            updateChampion(champKey);
            viewHall.classList.remove('active');
            setTimeout(() => viewDetail.classList.add('active'), 100);
        }

        function showHall() {
            viewDetail.classList.remove('active');
            setTimeout(() => viewHall.classList.add('active'), 100);
        }

        function updateChampion(key) {
            const data = champions[key];
            if (!data) return;
            document.getElementById('champTag').textContent = data.tag;
            document.getElementById('champId').textContent = data.id;
            document.getElementById('champName').textContent = data.name;
            document.getElementById('champIntro').textContent = data.intro;
            document.getElementById('bridgeText').innerHTML = data.bridge;
            document.getElementById('ctaText').textContent = data.cta;
            const honorsList = document.getElementById('honorsList');
            honorsList.innerHTML = data.honors.map(h =>
                `<div class="honor-item"><span class="honor-year">${h.y}</span><span>${h.t}</span></div>`
            ).join('');
            document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
            const target = document.querySelector(`.nav-item[data-champ="${key}"]`);
            if (target) target.classList.add('active');
        }

        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => updateChampion(item.dataset.champ));
        });
    