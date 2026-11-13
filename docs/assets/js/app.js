// Shared: header/footer injection, lang toggle, copy buttons, tooltips data.
(function () {
  const LANGS = ['ru', 'en'];
  const PAGES = [
    ['index.html', { ru: 'Главная', en: 'Home' }],
    ['macros.html', { ru: 'Макросы', en: 'Macros' }],
    ['talents.html', { ru: 'Таланты', en: 'Talents' }],
    ['hero.html', { ru: 'Герой', en: 'Hero' }],
    ['guide.html', { ru: 'Гайд', en: 'Guide' }],
  ];

  function getLang() {
    const u = new URLSearchParams(location.search);
    return (u.get('lang') || localStorage.getItem('wlang') || 'ru').slice(0, 2);
  }
  function setLang(l) {
    localStorage.setItem('wlang', l);
    const u = new URL(location);
    u.searchParams.set('lang', l);
    location.href = u;
  }
  const lang = LANGS.includes(getLang()) ? getLang() : 'ru';

  // Keep the UI intact when an upstream game icon is missing or its CDN is unavailable.
  document.addEventListener('error', event => {
    const img=event.target;
    if (img instanceof HTMLImageElement && img.src.includes('wow.zamimg.com')) {
      if(img.dataset.fallbackSrc&&!img.dataset.iconFallback){img.dataset.iconFallback='1';img.src=img.dataset.fallbackSrc;}
      else img.src='assets/icons/item-missing.svg';
    }
  }, true);

  function h(html) {
    const t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstChild;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    // header
    const cur = location.pathname.split('/').pop() || 'index.html';
    const nav = PAGES.map(([f, n]) =>
      `<a href="${f}?lang=${lang}" class="${f === cur ? 'on' : ''}">${n[lang]}</a>`
    ).join('');
    app.prepend(h(`
      <header class="top">
        <a class="logo" href="index.html?lang=${lang}">
          <img src="assets/icons/logo.jpg" alt="">
          <span class="t">WoW 3.3.5 · Fury</span>
        </a>
        <nav>${nav}</nav>
        <button class="lang-btn" id="langBtn">${lang === 'ru' ? 'EN' : 'RU'}</button>
      </header>`));
    document.getElementById('langBtn').onclick = () => setLang(lang === 'ru' ? 'en' : 'ru');

    // footer
    app.append(h(`
      <footer class="bot">
        <span>WotLK 3.3.5a · ${lang === 'ru' ? 'Воин — Неистовство' : 'Fury Warrior'}</span>
        <a href="https://github.com/Genocide12/wow-335-macros" target="_blank" rel="noopener">GitHub</a>
        <span style="margin-left:auto" class="muted">${lang === 'ru' ? 'Иконки: Wowhead / zamimg' : 'Icons: Wowhead / zamimg'}</span>
      </footer>`));

  });

  // Delegation supports buttons rendered after DOMContentLoaded; decode old encoded payloads.
  document.addEventListener('click', async event => {
    const btn = event.target.closest('[data-copy]');
    if (!btn) return;
    let txt = btn.getAttribute('data-copy') || '';
    try { txt = decodeURIComponent(txt); } catch (_) {}
    let copied = false;
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(txt);
      else throw new Error('clipboard unavailable');
      copied = true;
    } catch (_) {
      const ta = document.createElement('textarea');
      ta.value = txt; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.focus(); ta.select();
      try { copied = document.execCommand('copy'); } catch (_) {}
      ta.remove();
    }
    const old = btn.textContent;
    btn.textContent = copied ? '✓' : (lang === 'ru' ? 'Выделено' : 'Selected');
    btn.classList.add('ok');
    if (!copied) { const pre=btn.parentElement.querySelector('pre'); if(pre){const r=document.createRange();r.selectNodeContents(pre);getSelection().removeAllRanges();getSelection().addRange(r);} }
    setTimeout(() => { btn.textContent = old; btn.classList.remove('ok'); }, 1400);
  });

  // export helpers
  window.W = {
    lang,
    // Wowhead CDN serves every WotLK icon — nothing is stored in the repo
    icon(name, size) {
      return `https://wow.zamimg.com/images/wow/icons/${size || 'large'}/${name}.jpg`;
    },
    hint(text, bottom) {
      return `<span class="hint${bottom ? ' b' : ''}"><span class="dot">?</span><span class="tip">${text}</span></span>`;
    }
  };
})();
