(() => {
  'use strict';

  const I18N = window.ROBUSTX_I18N;
  let lang = 'zh';
  let currentNetMode = 'online';
  let currentDim = 0;
  let currentScene = 0;

  /* ---------- Snapshot Original ZH DOM for Lossless Toggle ---------- */
  const zhTextMap = {};
  const zhHtmlMap = {};
  const zhPhMap = {};
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const k = el.getAttribute('data-i18n');
    if (!(k in zhTextMap)) zhTextMap[k] = el.textContent;
  });
  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    const k = el.getAttribute('data-i18n-html');
    if (!(k in zhHtmlMap)) zhHtmlMap[k] = el.innerHTML;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const k = el.getAttribute('data-i18n-placeholder');
    if (!(k in zhPhMap)) zhPhMap[k] = el.getAttribute('placeholder') || '';
  });

  /* ---------- Toast ---------- */
  let toastTimer;
  function showToast(msg) {
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
  }

  /* ---------- Sticky Header Scroll State ---------- */
  const header = document.getElementById('site-header');
  function updateHeader() {
    header.classList.toggle('is-scrolled', window.scrollY > 36);
  }
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  /* ---------- Mega Menu & Mobile Drawer ---------- */
  const megaTrigger = document.getElementById('mega-trigger');
  const megaMenu = document.getElementById('mega-menu');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  function setMega(open) {
    megaMenu.classList.toggle('open', open);
    header.classList.toggle('is-open', open);
    megaTrigger.setAttribute('aria-expanded', String(open));
  }
  function closeMobile() {
    mobileDrawer.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    if (!megaMenu.classList.contains('open')) header.classList.remove('is-open');
  }

  megaTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    setMega(!megaMenu.classList.contains('open'));
  });
  document.addEventListener('click', (e) => {
    if (!megaMenu.contains(e.target) && e.target !== megaTrigger) setMega(false);
  });
  document.querySelectorAll('.mega-link').forEach((el) => {
    el.addEventListener('click', () => setMega(false));
  });

  menuToggle.addEventListener('click', () => {
    const open = mobileDrawer.classList.toggle('open');
    header.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
  });
  document.querySelectorAll('.mobile-link').forEach((a) => a.addEventListener('click', closeMobile));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      setMega(false);
      closeMobile();
    }
  });

  /* ---------- Interactive Architectural Cutaway Blueprint ---------- */
  const bpCanvas = document.getElementById('blueprint-canvas');
  const cloudCard = document.getElementById('cloud-card');

  function renderNetState(mode) {
    currentNetMode = mode;
    const st = I18N.netStates[lang][mode];
    document.querySelectorAll('[data-network]').forEach((b) => {
      const active = b.dataset.network === mode;
      b.classList.toggle('is-active', active);
      b.setAttribute('aria-pressed', String(active));
    });
    bpCanvas.dataset.state = mode;
    cloudCard.classList.toggle('is-offline', mode === 'offline');
    document.getElementById('network-description').textContent = st.localDesc;
    document.getElementById('cloud-label').textContent = st.cloudLabel;
    document.getElementById('cloud-sub').textContent = st.cloudSub;
    document.getElementById('bp-state-pill').textContent = st.pill;
  }

  document.querySelectorAll('[data-network]').forEach((btn) => {
    btn.addEventListener('click', () => renderNetState(btn.dataset.network));
  });

  /* ---------- Editorial 5-Dimension Interactive Benchmark & Full Matrix ---------- */
  function renderBenchmarkDim(idx) {
    currentDim = idx;
    const d = I18N.benchmarkDims[lang][idx];
    if (!d) return;
    document.querySelectorAll('.dim-tab').forEach((t) => {
      const active = Number(t.dataset.dim) === idx;
      t.classList.toggle('is-active', active);
      t.setAttribute('aria-selected', String(active));
    });
    document.getElementById('cmp-r-badge').textContent = d.rBadge;
    document.getElementById('cmp-r-text').textContent = d.rText;
    document.getElementById('cmp-w-badge').textContent = d.wBadge;
    document.getElementById('cmp-w-text').textContent = d.wText;
    document.getElementById('cmp-h-badge').textContent = d.hBadge;
    document.getElementById('cmp-h-text').textContent = d.hText;
  }

  function renderFullMatrix() {
    const tbody = document.getElementById('matrix-tbody');
    tbody.innerHTML = I18N.benchmarkDims[lang].map((row) => `
      <tr>
        <td class="m-dim">${row.dim}</td>
        <td class="m-robustx">${row.rText}</td>
        <td>${row.wText}</td>
        <td>${row.hText}</td>
      </tr>`).join('');
  }

  document.querySelectorAll('.dim-tab').forEach((tab) => {
    tab.addEventListener('click', () => renderBenchmarkDim(Number(tab.dataset.dim)));
  });

  const matrixBtn = document.getElementById('toggle-full-matrix');
  const matrixWrap = document.getElementById('full-matrix-wrap');
  function updateMatrixButtonLabel() {
    const expanded = !matrixWrap.hidden;
    const m = I18N.meta[lang];
    document.getElementById('matrix-btn-label').textContent = expanded ? m.matrixCollapse : m.matrixExpand;
    matrixBtn.setAttribute('aria-expanded', String(expanded));
    matrixBtn.querySelector('span:last-child').textContent = expanded ? '↑' : '↓';
  }
  matrixBtn.addEventListener('click', () => {
    matrixWrap.hidden = !matrixWrap.hidden;
    updateMatrixButtonLabel();
  });

  /* ---------- 6 Living Scenarios ---------- */
  I18N.scenes.zh.forEach((s) => { const i = new Image(); i.src = s.image; });
  const sceneTabs = [...document.querySelectorAll('[data-scene]')];

  function selectScene(idx, focusTab = false, animate = true) {
    currentScene = idx;
    const list = I18N.scenes[lang];
    const s = list[idx];
    sceneTabs.forEach((t, i) => {
      t.setAttribute('aria-selected', String(i === idx));
      t.tabIndex = i === idx ? 0 : -1;
    });
    document.getElementById('scene-detail').setAttribute('aria-labelledby', 'tab-' + idx);
    document.getElementById('scene-title').textContent = s.title;
    document.getElementById('scene-description').textContent = s.desc;
    document.getElementById('scene-counter').textContent = String(idx + 1).padStart(2, '0') + ' / 0' + list.length;

    const cuesEl = document.getElementById('scene-settings');
    cuesEl.replaceChildren(...s.cues.map(([k, v]) => {
      const li = document.createElement('li');
      const sp = document.createElement('span');
      sp.textContent = k;
      const st = document.createElement('strong');
      st.textContent = v;
      li.append(sp, st);
      return li;
    }));

    document.getElementById('scene-time').innerHTML = `<strong>${s.time}</strong><span>${s.tag}</span>`;

    const img = document.getElementById('scene-image');
    if (animate) {
      img.classList.add('is-switching');
      setTimeout(() => {
        img.src = s.image;
        img.alt = s.title;
        img.classList.remove('is-switching');
      }, 140);
    } else {
      img.src = s.image;
      img.alt = s.title;
    }

    if (focusTab) sceneTabs[idx].focus();
  }

  sceneTabs.forEach((tab, i) => {
    tab.addEventListener('click', () => selectScene(i));
    tab.addEventListener('keydown', (e) => {
      let next;
      if (e.key === 'ArrowRight') next = (i + 1) % sceneTabs.length;
      if (e.key === 'ArrowLeft') next = (i + sceneTabs.length - 1) % sceneTabs.length;
      if (e.key === 'Home') next = 0;
      if (e.key === 'End') next = sceneTabs.length - 1;
      if (next !== undefined) { e.preventDefault(); selectScene(next, true); }
    });
  });
  document.getElementById('scene-prev').addEventListener('click', () => {
    selectScene((currentScene + 5) % 6);
  });
  document.getElementById('scene-next').addEventListener('click', () => {
    selectScene((currentScene + 1) % 6);
  });

  /* ---------- Render 6-Card Journal Grid ---------- */
  const journalGrid = document.getElementById('journal-grid');
  function renderJournalGrid() {
    const articles = I18N.journalArticles[lang];
    const readLabel = I18N.meta[lang].readJournal;
    journalGrid.innerHTML = '';
    articles.forEach((art, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'journal-card reveal is-visible';
      btn.dataset.journal = String(idx);
      btn.innerHTML = `
        <div class="journal-img"><img src="${art.img}" alt="${art.title}" loading="lazy" /></div>
        <div class="journal-body">
          <p class="eyebrow">${art.tag}</p>
          <h3>${art.title}</h3>
          <p>${art.summary}</p>
          <span class="journal-more">${readLabel}</span>
        </div>`;
      journalGrid.appendChild(btn);
    });
  }

  /* ---------- Full-Site Language Switcher ---------- */
  function applyLanguage(nextLang, notify = false) {
    lang = nextLang;
    const meta = I18N.meta[lang];
    document.documentElement.lang = meta.htmlLang;
    document.title = meta.title;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const k = el.getAttribute('data-i18n');
      const val = lang === 'en' ? I18N.enText[k] : zhTextMap[k];
      if (val !== undefined) el.textContent = val;
    });

    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const k = el.getAttribute('data-i18n-html');
      const val = lang === 'en' ? I18N.enHtml[k] : zhHtmlMap[k];
      if (val !== undefined) el.innerHTML = val;
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const k = el.getAttribute('data-i18n-placeholder');
      const val = lang === 'en' ? I18N.enPlaceholder[k] : zhPhMap[k];
      if (val !== undefined) el.setAttribute('placeholder', val);
    });

    const toggleBtn = document.getElementById('lang-toggle');
    toggleBtn.textContent = lang === 'en' ? '繁中' : 'EN';
    toggleBtn.setAttribute('aria-label', lang === 'en' ? '切換為繁體中文' : 'Switch to English');

    renderNetState(currentNetMode);
    renderBenchmarkDim(currentDim);
    renderFullMatrix();
    updateMatrixButtonLabel();
    selectScene(currentScene, false, false);
    renderJournalGrid();

    if (notify) showToast(meta.toastSwitched);
  }

  document.getElementById('lang-toggle').addEventListener('click', () => {
    applyLanguage(lang === 'zh' ? 'en' : 'zh', true);
  });

  /* ---------- Editorial Dialog (Solutions, Journal & Privacy) ---------- */
  const dialog = document.getElementById('detail-dialog');
  const dTag = document.getElementById('detail-tag');
  const dTitle = document.getElementById('detail-title');
  const dMedia = document.getElementById('detail-media');
  const dImg = document.getElementById('detail-img');
  const dBody = document.getElementById('detail-body');

  function openDialog({ tag, title, img, body }) {
    dTag.textContent = tag;
    dTitle.textContent = title;
    if (img) {
      dImg.src = img;
      dImg.alt = title;
      dMedia.hidden = false;
    } else {
      dMedia.hidden = true;
    }
    dBody.innerHTML = body;
    dialog.showModal();
  }

  document.addEventListener('click', (e) => {
    const det = e.target.closest('[data-detail]');
    if (det && I18N.solutionSpecs[lang][det.dataset.detail]) {
      openDialog(I18N.solutionSpecs[lang][det.dataset.detail]);
      return;
    }
    const jrn = e.target.closest('[data-journal]');
    if (jrn) {
      const art = I18N.journalArticles[lang][Number(jrn.dataset.journal)];
      if (art) openDialog(art);
    }
  });

  document.getElementById('privacy-open').addEventListener('click', () => {
    openDialog(I18N.privacyDialog[lang]);
  });

  document.getElementById('dialog-close').addEventListener('click', () => dialog.close());
  document.getElementById('detail-contact').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });

  /* ---------- Role Pre-Selection & Copy Buttons ---------- */
  document.querySelectorAll('[data-role-idx]').forEach((link) => {
    link.addEventListener('click', () => {
      const radio = document.querySelector(`input[name="role"][value="${link.dataset.roleIdx}"]`);
      if (radio) radio.checked = true;
    });
  });

  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const m = I18N.meta[lang];
      const msg = btn.dataset.copyType === 'phone' ? m.copiedPhone : m.copiedEmail;
      try {
        await navigator.clipboard.writeText(btn.dataset.copy);
        showToast(msg);
      } catch {
        showToast(m.copyFallback + btn.dataset.copy);
      }
    });
  });

  /* ---------- Consultation Form Actions (Localized Brief) ---------- */
  const form = document.getElementById('consult-form');
  const formStatus = document.getElementById('form-status');

  function buildBrief() {
    const m = I18N.meta[lang];
    const fd = new FormData(form);
    const roleIdx = fd.get('role') || '0';
    const roleEl = document.querySelector(`[data-i18n="role_${roleIdx}"]`);
    const roleLabel = roleEl ? roleEl.textContent : '';
    const stageIdx = fd.get('stage') || '0';
    const stageEl = document.querySelector(`[data-i18n="stage_${stageIdx}"]`);
    const stageLabel = stageEl ? stageEl.textContent : '';

    const name = (fd.get('name') || '').toString().trim() || m.notProvided;
    const phone = (fd.get('phone') || '').toString().trim() || m.notProvided;
    const email = (fd.get('email') || '').toString().trim() || m.notProvided;
    const message = (fd.get('message') || '').toString().trim() || m.notProvided;
    const f = m.briefFields;
    const sep = lang === 'en' ? ': ' : '：';
    return [
      m.briefHeader,
      `${f[0]}${sep}${roleLabel}`,
      `${f[1]}${sep}${name}`,
      `${f[2]}${sep}${phone}`,
      `${f[3]}${sep}${email}`,
      `${f[4]}${sep}${stageLabel}`,
      `${f[5]}${sep}${message}`
    ].join('\n');
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const m = I18N.meta[lang];
    const brief = buildBrief();
    const subject = encodeURIComponent(m.mailSubjectPrefix + (form.name.value.trim() || m.mailSubjectFallback));
    const body = encodeURIComponent(brief);
    window.location.href = `mailto:cash@robustx.com.tw?subject=${subject}&body=${body}`;
    formStatus.textContent = m.mailStatus;
    showToast(m.mailToast);
  });

  document.getElementById('copy-brief').addEventListener('click', async () => {
    const m = I18N.meta[lang];
    try {
      await navigator.clipboard.writeText(buildBrief());
      formStatus.textContent = m.briefCopiedStatus;
      showToast(m.briefCopiedToast);
    } catch {
      formStatus.textContent = m.briefCopyErr;
    }
  });

  document.getElementById('download-brief').addEventListener('click', () => {
    const m = I18N.meta[lang];
    const blob = new Blob([buildBrief()], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = m.briefFileName;
    a.click();
    URL.revokeObjectURL(url);
    showToast(m.briefDownloadedToast);
  });

  /* ---------- Gentle Editorial Scroll Reveal ---------- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- Initial Render ---------- */
  applyLanguage('zh', false);
})();
