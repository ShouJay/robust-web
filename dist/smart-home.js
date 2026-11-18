
    const ASSETS = {
  "hero": "assets/smart-home/hero.jpg",
  "light": "assets/smart-home/light.jpg",
  "curtain": "assets/smart-home/curtain.jpg",
  "bedroom": "assets/smart-home/bedroom.jpg",
  "panel": "assets/smart-home/panel.jpg",
  "case_jian": "assets/smart-home/case_jian.jpg",
  "case_hsu": "assets/smart-home/case_hsu.jpg",
  "partner_ciao": "assets/smart-home/partner_ciao.jpg"
};

    document.querySelectorAll('[data-asset]').forEach((img) => {
      const key = img.getAttribute('data-asset');
      if (ASSETS[key]) img.src = ASSETS[key];
    });

    let toastTimer;
    function showToast(msg) {
      const t = document.getElementById('toast');
      t.textContent = msg;
      t.classList.add('show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
    }

    // Mega Menu
    const megaTrigger = document.getElementById('mega-trigger');
    const megaMenu = document.getElementById('mega-menu');
    function setMega(open) {
      megaMenu.classList.toggle('open', open);
      megaTrigger.setAttribute('aria-expanded', String(open));
    }
    megaTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      setMega(!megaMenu.classList.contains('open'));
    });
    document.addEventListener('click', (e) => {
      if (!megaMenu.contains(e.target) && e.target !== megaTrigger) setMega(false);
    });
    document.querySelectorAll('.mega-link').forEach((el) => el.addEventListener('click', () => setMega(false)));

    // Mobile Drawer
    const menuToggle = document.getElementById('menu-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    function closeMobile() {
      mobileDrawer.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
    menuToggle.addEventListener('click', () => {
      const open = mobileDrawer.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(open));
    });
    document.querySelectorAll('.mobile-link').forEach((a) => a.addEventListener('click', closeMobile));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { setMega(false); closeMobile(); }
    });

    // Bilingual Toggle
    const i18n = {
      zh: {
        nav_products: '產品系統', nav_solutions: '整合方案', nav_living: '生活情境',
        nav_tech: '智慧核心', nav_projects: '實績與夥伴', nav_journal: '專欄誌', nav_cta: '預約諮詢',
        hero_eyebrow: 'FOR TODAY AND TOMORROW · 隱形管家與生活哲學',
        hero_title: '真正的奢華，<br />是讓科技隱形於生活之中。',
        hero_sub: '讓空間學會思考，在您開口之前，一切已然就緒。匯聚歐美頂尖開源核心與台灣在地精品級全屋客製工藝，為層峰宅邸打造無需妥協的智慧生活標準。',
        hero_cta: '預約私人體驗', hero_sec: '探索全屋方案',
        phil_eyebrow: 'A HOME THAT UNDERSTANDS YOU',
        phil_title: '生活的從容，<br />來自恰到好處的智慧。'
      },
      en: {
        nav_products: 'Systems', nav_solutions: 'Solutions', nav_living: 'Lifestyle',
        nav_tech: 'Core Tech', nav_projects: 'Projects', nav_journal: 'Journal', nav_cta: 'Consult',
        hero_eyebrow: 'FOR TODAY AND TOMORROW · QUIET LUXURY SMART LIVING',
        hero_title: 'True luxury is technology<br />that disappears into life.',
        hero_sub: 'Spaces that think ahead—tailored in Taiwan upon the world’s leading open-source Home Assistant core and local Zigbee/Matter architecture.',
        hero_cta: 'Book Private Experience', hero_sec: 'Explore Total Solution',
        phil_eyebrow: 'A HOME THAT UNDERSTANDS YOU',
        phil_title: 'Effortless living,<br />shaped by thoughtful intelligence.'
      }
    };
    let lang = 'zh';
    document.getElementById('lang-toggle').addEventListener('click', () => {
      lang = lang === 'zh' ? 'en' : 'zh';
      document.querySelectorAll('[data-i18n]').forEach((el) => {
        const k = el.getAttribute('data-i18n');
        if (i18n[lang][k]) el.innerHTML = i18n[lang][k];
      });
      showToast(lang === 'en' ? 'Switched key headings to English' : '已切換為繁體中文標題');
    });

    // Interactive Network Switcher (from ROBUSTX-Review-v2)
    const networkDescriptions = {
      online: '家中控制主機協調已配置的本地設備；遠端存取與外部資料服務依需要連線。',
      offline: '已配置的本地燈光、窗簾與自動化可繼續運作；遠端存取、即時氣象與雲端限定功能會受到影響。'
    };
    document.querySelectorAll('[data-network]').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-network]').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
        const offline = btn.dataset.network === 'offline';
        document.getElementById('network-description').textContent = networkDescriptions[btn.dataset.network];
        document.getElementById('cloud-path').classList.toggle('offline', offline);
        document.getElementById('cloud-label').textContent = offline ? '外部服務暫不可用（本地設備持續運作）' : '外部服務可連線';
      });
    });

    // 6-Scene Interactive Simulator (Minimalist Review-v2 3-Row Content + G2 Underline 2-Line Tabs + G2 Images)
    const scenes = [
      { time:'07:00', tag:'A GENTLE BEGINNING', title:'讓晨光，比鬧鐘先說早安。', desc:'窗簾緩緩開啟，暖光漸亮，空調調至預設的舒適溫度。讓一天從自然、柔和的喚醒開始。', image:'bedroom', mode:'', settings:[['窗簾','漸進開啟'],['燈光','柔和漸亮'],['空調','舒適預設']] },
      { time:'09:00', tag:'PEACE OF MIND, AWAY FROM HOME', title:'您安心出門，家接手日常。', desc:'確認全員離家後，關閉指定燈光與空調，拉上窗簾減少日曬，並啟動清掃。冰箱等必要設備保留供電。', image:'hero', mode:'', settings:[['非必要設備','關閉'],['掃地機器人','開始清掃'],['門窗感應','啟用提醒']] },
      { time:'20:00', tag:'YOUR PRIVATE CINEMA', title:'一場電影，一次光影轉場。', desc:'開啟觀影情境，窗簾閉合、主燈漸暗，僅留柔和的氛圍光。相容設備亦可規劃暫停播放時的走道補光。', image:'hero', mode:'movie', settings:[['窗簾','閉合遮光'],['主燈','漸暗'],['氛圍燈','柔和保留']] },
      { time:'23:00', tag:'REST, BEAUTIFULLY', title:'夜深了，讓溫柔的光帶路。', desc:'入睡後關閉非必要燈光、閉合窗簾。半夜起身時，以低亮度床底或地腳暖光引導動線，避免主燈打擾家人。', image:'bedroom', mode:'night', settings:[['主燈','關閉'],['窗簾','閉合'],['起夜照明','低亮度暖光']] },
      { time:'14:00', tag:'COMFORT, CONSIDERED', title:'舒適與節能，可以一起思考。', desc:'依照度、溫濕度與門窗狀態設定連動。窗戶持續開啟時，可暫停指定區域空調；日照強烈時，透過遮陽減少熱負載。', image:'curtain', mode:'', settings:[['遮陽','依日照調整'],['空調','依環境連動'],['用電資訊','依設備支援顯示']] },
      { time:'18:30', tag:'MAKE ROOM FOR CONNECTION', title:'把準備交給家，把時間留給相聚。', desc:'一鍵啟動迎賓情境，調整客廳照明與窗簾，並暫緩部分自動關燈邏輯，讓家人與賓客自在停留。', image:'light', mode:'', settings:[['客廳照明','明亮舒適'],['窗簾','迎賓預設'],['自動關燈','指定區域暫緩']] }
    ];
    const sceneTabs = [...document.querySelectorAll('[data-scene]')];
    function selectScene(idx, focus = false) {
      const s = scenes[idx];
      sceneTabs.forEach((t, i) => {
        t.setAttribute('aria-selected', String(i === idx));
        t.tabIndex = i === idx ? 0 : -1;
      });
      document.getElementById('scene-panel').setAttribute('aria-labelledby', 'tab-' + idx);
      document.getElementById('scene-title').textContent = s.title;
      document.getElementById('scene-description').textContent = s.desc;

      const list = document.getElementById('scene-settings');
      list.replaceChildren(...s.settings.map(([k, v]) => {
        const li = document.createElement('li');
        const sp = document.createElement('span');
        sp.textContent = k;
        const st = document.createElement('strong');
        st.textContent = v;
        li.append(sp, st);
        return li;
      }));

      const clock = document.getElementById('scene-time');
      clock.replaceChildren(document.createTextNode(s.time));
      const tag = document.createElement('span');
      tag.textContent = s.tag;
      clock.append(tag);

      const vis = document.getElementById('living-visual');
      vis.className = 'living-visual ' + (s.mode || '');
      const img = document.getElementById('scene-image');
      img.src = ASSETS[s.image];
      img.alt = s.title + ' 情境示意';
      if (focus) sceneTabs[idx].focus();
    }
    sceneTabs.forEach((tab, i) => {
      tab.addEventListener('click', () => selectScene(i));
      tab.addEventListener('keydown', (e) => {
        let n;
        if (e.key === 'ArrowRight') n = (i + 1) % sceneTabs.length;
        if (e.key === 'ArrowLeft') n = (i + sceneTabs.length - 1) % sceneTabs.length;
        if (e.key === 'Home') n = 0;
        if (e.key === 'End') n = sceneTabs.length - 1;
        if (n !== undefined) { e.preventDefault(); selectScene(n, true); }
      });
    });

    // Architecture Comparison Filter
    document.querySelectorAll('.arch-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.arch-tab').forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        const target = tab.getAttribute('data-arch');
        ['robustx', 'wifi', 'homekit'].forEach((c) => {
          const show = target === 'all' || target === c;
          document.querySelectorAll('.col-' + c).forEach((cell) => {
            cell.style.display = show ? '' : 'none';
          });
        });
      });
    });

    // 6 Curated Journal Articles (Added Deep-Dive on 6 Living Scenarios & AI Adaptive Learning + 24H Safety)
    const journalData = [
      {
        tag: 'LIGHTING DESIGN', img: 'light',
        title: '見光不見燈：垂直照度如何重塑豪宅空間氣度',
        summary: '為什麼真正舒適的空間從不依賴刺眼的主燈？從漫反射光場、深杯防眩筒燈到青空燈的建築光影心法。',
        body: '<p>真正的空間質感不在於燈具瓦數有多高，而在於「看不到光源，但整個空間都在發光」。透過提升牆面垂直照度（Vertical Illuminance）與建立漫反射光場，能徹底消除眩光與地面光斑，讓空間視覺更開闊、人眼更放鬆。</p><p>我們提供 55mm 至 150mm 全尺寸深杯防眩筒燈（有效控制 UGR 眩光值）、高低壓線性鋁槽燈帶、磁吸軌道系統，以及專為無窗空間與地下室打造的「青空燈」，全系列皆可無段式調整色溫與亮度。</p>'
      },
      {
        tag: 'ADAPTIVE LIVING & AI', img: 'case_jian',
        title: '六大生活情境與 AI 自適應學習：從天文日照到毫米波的無感協同',
        summary: '深入解析晨間喚醒、離家設防、劇院觀影、起夜引導與智慧節能的精準觸發邏輯，以及不強迫接管的 AI 行為學習。',
        body: '<p>簡約的居家體驗背後，是精準的環境參數與行為邏輯協同運作：</p><ul><li><strong>01 晨間喚醒：</strong>結合屋主鬧鐘與所在地天文日出時間，紗簾緩緩開啟 45%，臥室燈帶以 3000K 暖光從極低亮度漸進甦醒，空調切換至 25°C 舒適送風。</li><li><strong>02 離家守護：</strong>確認全員離家後自動關閉非必要燈光與空調（保留冰箱與除濕機供電）、拉上遮光簾保護實木地板與皮沙發，並排程掃地機器人清掃與啟動門窗警戒。</li><li><strong>03 劇院觀影：</strong>啟動電視或投影機時雙層窗簾閉合遮光，主燈熄滅僅留 15% 2700K 洗牆氛圍光；影片按下暫停時走道微亮方便起身，繼續播放則再度隱去。</li><li><strong>04 深夜舒眠與起夜：</strong>半夜起身時由毫米波存在感應觸發「夜燈邏輯」，僅點亮 10% 床底或地腳暖光引導動線，絕不驚擾枕邊人。</li><li><strong>05 智慧節能：</strong>串接氣象預報與室內外溫差微調冷氣，陽台門窗開啟超時即自動暫停該區空調，午後西曬自動閉合遮陽 80%。</li><li><strong>06 訪客／派對：</strong>一鍵切換 85% 4000K 高演色明亮光場與景觀紗簾，並暫時解除無人自動關燈邏輯。</li></ul><h3>AI Adaptive Learning · 自適應行為學習</h3><p>系統會在背景默默觀察您的日常微調習慣（例如每晚 9 點閱讀時習慣將亮度調至 65%、色溫 3500K、冷氣 25°C）。經您確認同意後，未來在相同時刻便會自動為您調校至最喜愛的狀態。</p>'
      },
      {
        tag: 'LOCAL ARCHITECTURE', img: 'hero',
        title: '斷網依然運轉：為什麼層峰宅邸拒絕雲端依賴',
        summary: '剖析傳統 Wi-Fi 與海外雲端伺服器的延遲與斷線痛點，看見本地端 Mesh 網狀網路的絕對穩定力。',
        body: '<p>坊間常見的 Wi-Fi 智慧家電需將訊號繞道海外雲端伺服器，不僅受限於家中牆面遮蔽，尖峰時段更常發生延遲數秒甚至無回應的窘境。</p><p>ROBUSTX 以 Home Assistant（瑞士開放家庭基金會治理）為核心，搭配 Zigbee 與 Matter 網狀網路（Mesh），設備越多訊號越強，且已配置為本地控制的運算 100% 在家中本地主機完成，對外斷網依然維持順暢運作（註：遠端存取與氣象等外部服務仍須連網，斷網亦不等於停電備援）。</p>'
      },
      {
        tag: 'SAFETY & ESCAPE GUIDANCE', img: 'bedroom',
        title: '24H 防災與視覺逃生引導：整合環境偵測與緊急動線照明',
        summary: '整合煙霧、CO、瓦斯、甲醛與 PM2.5 偵測；緊急警報時強制全屋燈光高亮度閃爍並照亮大門逃生動線。',
        body: '<p>真正的居家安全，不僅止於防盜，更在於危機發生當下的黃金應變。ROBUSTX 系統於全屋整合煙霧、一氧化碳（CO）、瓦斯、甲醛與 PM2.5 環境感測器，全天候監測空氣品質與異常風險。</p><p>當偵測到緊急煙霧或瓦斯警報時，系統除了即時推播通知屋主外，更可強制連動全屋智慧照明進入高亮度閃爍警示模式，同時點亮走道與玄關大門的逃生引導動線，在濃煙或深夜睡眠中為家人爭取最寶貴的避難時間（註：輔助安全機制仍需搭配符合法規之建築消防設備）。</p>'
      },
      {
        tag: 'ELECTRICAL CRAFT', img: 'panel',
        title: '水電工藝革新：免拉雙切控制線的極簡配電哲學',
        summary: '大幅簡化樓梯間與床頭雙切／三切線路，省去昂貴配電箱總斷電接觸器，日後改邏輯免敲牆。',
        body: '<p>傳統樓梯間、長走廊或床頭的雙切與三切開關，需要水電師傅拉設繁瑣的控制線迴路；全屋一鍵斷電更需在配電箱加裝昂貴的電磁接觸器。</p><p>透過 ROBUSTX 智慧開關架構，僅需將火線與零線拉至燈具端，其餘位置開關僅需供電即可透過無線訊號連動。任何按鍵皆可設定「一鍵全關（並自動保留冰箱與除濕機供電）」，日後想更改控制邏輯只需在軟體調整，完全無需敲牆改線。</p>'
      },
      {
        tag: 'SHADING & ECOSYSTEM', img: 'curtain',
        title: '光與風的協奏：進口布料客製與跨品牌家電整合',
        summary: '整合電動蛇行簾、太陽軌跡防曬、大金／日立等變頻空調雙向控制與 Apple HomePod Siri 語音操作。',
        body: '<p>智慧遮陽支援大中小蛇行布簾／紗簾、捲簾、斑馬簾、羅馬簾、蜂巢簾與日夜簾。若屋主或設計師有指定的進口布料，我們亦可單獨提供預調校靜音電機與精密軌道進行客製安裝，並依據經緯度於午後烈日直射時自動閉合保護木地板與真皮沙發。</p><p>同時深度串接日立、國際牌、LG、三菱、大金等台灣主流變頻空調與除濕機，整合掃地機器人、洗衣機與傳統紅外線（IR）風扇音響，並支援橋接 Apple HomePod 進行全屋分區語音聲控。</p>'
      }
    ];
    const jGrid = document.getElementById('journal-grid');
    journalData.forEach((art, idx) => {
      const card = document.createElement('article');
      card.className = 'j-card';
      card.innerHTML = `
        <img src="${ASSETS[art.img]}" alt="${art.title}" loading="lazy" />
        <div class="j-body">
          <div>
            <p class="eyebrow" style="margin-bottom:8px;">${art.tag}</p>
            <h3>${art.title}</h3>
            <p class="sum">${art.summary}</p>
          </div>
          <span class="text-link">閱讀全文 <span>↗</span></span>
        </div>`;
      card.addEventListener('click', () => openDetail('journal-' + idx));
      jGrid.appendChild(card);
    });

    // Native <dialog> Details
    const detailsMap = {
      light: {
        tag: '01 · ARCHITECTURAL LIGHTING',
        title: '建築級智慧照明與光影系統規格',
        img: 'light',
        body: '<p><strong>核心理念：</strong>透過提升牆面垂直照度與建立漫反射光場，實現「見光不見燈」的純粹美學，消除眩光與地面光斑。</p><ul><li><strong>全尺寸防眩筒燈：</strong>55mm、75mm、95mm、115mm、150mm 開孔尺寸；白、黑、金、銀外框；平整面、深杯防眩（UGR 控制）與可調角度伸縮款。</li><li><strong>線性燈條與鋁槽系統：</strong>嵌入與明裝鋁槽，黑白擴散罩，多種功率穩定電源供應器，適用天花板間接照明與洗牆光帶。</li><li><strong>磁吸式軌道系統：</strong>明裝／暗裝軌道，自由搭配泛光模組、格柵防眩射燈與吊燈。</li><li><strong>獨家青空燈：</strong>模擬自然藍天與陽光入射角，消除無窗空間與地下室封閉壓迫感。</li><li><strong>調光控制：</strong>全系列內建通訊模組，支援無段式色溫（暖黃光至清澈白光）與無段亮度微調，部分款式支援 RGB 氛圍變換。</li></ul>'
      },
      shade: {
        tag: '02 · MOTORIZED SHADING',
        title: '全自動智慧電動窗簾與遮陽規格',
        img: 'curtain',
        body: '<p><strong>核心理念：</strong>自然採光與人造光場無縫接力，兼顧隱私保護、紫外線防護與靜音體感。</p><ul><li><strong>左右開布簾／紗簾：</strong>暗裝（預留窗簾盒）與明裝軌道；支援大蛇、中蛇、小蛇波浪褶皺；雙開、左單開、右單開與左右各單開。</li><li><strong>上下開捲簾系列：</strong>整片式捲簾、調光斑馬簾、羅馬簾、隔熱蜂巢簾（風琴簾）與日夜簾。</li><li><strong>設計師布料客製：</strong>支援屋主或設計師指定進口布料，由我們單獨提供預調校靜音電機與精密軌道進行整合安裝。</li><li><strong>貼心機能：</strong>百分比精準定位、輕拉自動啟動、停電依然可順暢手動操作，並依太陽軌跡自動閉合保護木地板與真皮沙發。</li></ul>'
      },
      control: {
        tag: '03 · TACTILE CONTROLS & HUB',
        title: '精品智慧面板、配電革新與跨品牌中樞',
        img: 'panel',
        body: '<p><strong>核心理念：</strong>將牆面開關化為空間藝術品，同時徹底簡化傳統水電複雜配線並打破家電品牌孤島。</p><ul><li><strong>精品開關面板：</strong>台規／歐規尺寸，金屬、鋼化玻璃與親膚霧面材質，1～4 鍵配置，高階款內建精密電量統計晶片監測各迴路能耗。</li><li><strong>配電革新：</strong>免拉樓梯／床頭雙切控制線，無需配電箱加裝昂貴接觸器；任何按鍵皆可設定「一鍵全關（自動保留冰箱與除濕機供電）」。</li><li><strong>雙向空調與除濕機整合：</strong>深度支援日立、國際牌、LG、三菱、大金，雙向控制溫度、模式、風速風向並彙整溫濕度與能耗數據。</li><li><strong>生活家電與語音：</strong>整合掃地機器人、洗衣機、傳統紅外線（IR）家電，並可橋接 Apple HomePod / Siri 進行自然語音聲控。</li></ul>'
      },
      privacy: {
        tag: 'PRIVACY / 網站隱私說明',
        title: '您的資料，由您決定如何分享。',
        body: '<p>本單頁網站不設訪客帳號，不使用第三方追蹤碼，也不於伺服器儲存表單資料。填寫之資訊僅用於在您的郵件程式建立草稿，或於您本機下載需求摘要文字檔。</p><p>若透過電話或電子郵件聯繫 Cash，相關資訊僅供專案規劃與回覆諮詢使用。</p>'
      }
    };
    journalData.forEach((art, idx) => {
      detailsMap['journal-' + idx] = { tag: art.tag, title: art.title, img: art.img, body: art.body };
    });

    const dialog = document.getElementById('detail-dialog');
    function openDetail(key) {
      const d = detailsMap[key];
      if (!d) return;
      document.getElementById('detail-tag').textContent = d.tag;
      document.getElementById('detail-title').textContent = d.title;
      const imgHtml = d.img && ASSETS[d.img] ? `<img class="modal-hero" src="${ASSETS[d.img]}" alt="${d.title}" />` : '';
      document.getElementById('detail-body').innerHTML = imgHtml + d.body;
      document.getElementById('detail-contact').hidden = key === 'privacy';
      dialog.showModal();
    }
    document.querySelectorAll('[data-detail]').forEach((el) => {
      el.addEventListener('click', () => openDetail(el.getAttribute('data-detail')));
    });
    document.getElementById('privacy-open').addEventListener('click', () => openDetail('privacy'));
    document.getElementById('dialog-close').addEventListener('click', () => dialog.close());
    document.getElementById('detail-contact').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) {
        const r = dialog.getBoundingClientRect();
        if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close();
      }
    });

    // Role pre-select links
    document.querySelectorAll('[data-role]').forEach((el) => {
      el.addEventListener('click', (e) => {
        const targetRole = e.currentTarget.getAttribute('data-role');
        const radio = document.querySelector(`input[name="role"][value="${targetRole}"]`);
        if (radio) radio.checked = true;
      });
    });

    // Copy buttons
    document.querySelectorAll('.copy-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const text = btn.getAttribute('data-copy');
        const msg = btn.getAttribute('data-msg');
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(() => showToast(msg)).catch(() => showToast(text));
        } else {
          showToast(text);
        }
      });
    });

    // Dual-Track Functional Form
    const form = document.getElementById('consult-form');
    const statusEl = document.getElementById('form-status');
    function buildBrief() {
      const fd = new FormData(form);
      return [
        'ROBUSTX 智慧家居規劃諮詢',
        '',
        '身份 / 專案角色：' + (fd.get('role') || ''),
        '稱呼：' + (fd.get('name') || ''),
        '聯絡電話：' + (fd.get('phone') || ''),
        '電子郵件：' + (fd.get('email') || ''),
        '空間進度：' + (fd.get('stage') || ''),
        '',
        '需求說明：',
        fd.get('message') || '希望進一步討論智慧家居規劃',
        '',
        '專屬顧問：Cash / 0986-327-014 / cash@robustx.com.tw'
      ].join('\n');
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('f-name').value.trim();
      const subject = '智慧家居規劃諮詢｜' + name;
      window.location.href = 'mailto:cash@robustx.com.tw?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(buildBrief());
      statusEl.textContent = '已請求開啟郵件草稿（尚未自動寄出）。若裝置未設定郵件程式，可點擊右側「下載需求摘要 (.txt)」。';
      showToast('已建立給 Cash 的郵件草稿');
    });

    document.getElementById('download-brief').addEventListener('click', () => {
      if (!form.reportValidity()) return;
      const blob = new Blob(['\ufeff' + buildBrief()], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'ROBUSTX-智慧家居需求摘要.txt';
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      statusEl.textContent = '已下載「ROBUSTX-智慧家居需求摘要.txt」，歡迎傳送至 cash@robustx.com.tw 或 Line 聯繫 Cash。';
      showToast('已下載需求摘要檔案');
    });
