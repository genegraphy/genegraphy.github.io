// Language toggle (KR/EN), theme toggle, mobile menu, year
(function(){
  const root = document.documentElement;
  const toggleTheme = document.getElementById('theme-toggle');
  const navToggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('nav-menu');
  const year = document.getElementById('year');
  const btnKO = document.getElementById('lang-ko');
  const btnEN = document.getElementById('lang-en');

  // Persist theme
  const savedTheme = localStorage.getItem('theme');
  if(savedTheme === 'light'){ root.classList.add('light'); }

  toggleTheme?.addEventListener('click', ()=>{
    root.classList.toggle('light');
    localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
  });

  // Mobile menu
  navToggle?.addEventListener('click', ()=>{
    const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
    navToggle.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('show');
  });

  if(year){ year.textContent = new Date().getFullYear(); }

  // Language toggle: show elements with data-lang="ko" or "en"
  function setLang(lang){
    document.querySelectorAll('[data-lang]').forEach(el=>{
      const isMatch = el.getAttribute('data-lang') === lang;
      el.hidden = !isMatch;
    });
    btnKO.setAttribute('aria-pressed', String(lang==='ko'));
    btnEN.setAttribute('aria-pressed', String(lang==='en'));
    localStorage.setItem('lang', lang);
  }

  const savedLang = localStorage.getItem('lang') || 'en';
  setLang(savedLang);

  btnKO?.addEventListener('click', ()=>setLang('ko'));
  btnEN?.addEventListener('click', ()=>setLang('en'));
})();



// --- Simple Comments (localStorage) ---
(function(){
  const KEY = "site_comments_v1";
  const nameEl = document.getElementById('c-name');
  const textEl = document.getElementById('c-text');
  const btn    = document.getElementById('c-submit');
  const btnKo  = document.getElementById('c-submit-ko');
  const listEl = document.getElementById('c-list');

  if(!listEl) return;

  function load(){
    try { return JSON.parse(localStorage.getItem(KEY) || "[]"); }
    catch(e){ return []; }
  }
  function save(arr){
    localStorage.setItem(KEY, JSON.stringify(arr));
  }
  function esc(s){
    return s.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  }
  function now(){
    const d = new Date();
    const pad = n => String(n).padStart(2,'0');
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }
  function render(){
    const arr = load();
    listEl.innerHTML = arr.length ? "" : `
      <li class="empty" data-lang="en">Be the first to comment.</li>
      <li class="empty" data-lang="ko" hidden>첫 댓글을 남겨보세요.</li>
    `;
    arr.slice().reverse().forEach(item=>{
      const li = document.createElement('li');
      li.className = 'c-item';
      li.innerHTML = `
        <div class="c-head">
          <strong class="c-name">${esc(item.name || 'Anon')}</strong>
          <span class="c-time">${esc(item.time)}</span>
        </div>
        <p class="c-text">${esc(item.text)}</p>
      `;
      listEl.appendChild(li);
    });
  }
  function submit(){
    const name = (nameEl?.value || '').trim();
    const text = (textEl?.value || '').trim();
    if(!text){ textEl?.focus(); return; }
    const arr = load();
    arr.push({ name, text, time: now() });
    save(arr);
    nameEl && (nameEl.value = '');
    textEl && (textEl.value = '');
    render();
  }

  btn?.addEventListener('click', submit);
  btnKo?.addEventListener('click', submit);
  textEl?.addEventListener('keydown', (e)=>{
    if((e.ctrlKey || e.metaKey) && e.key === 'Enter'){ submit(); }
  });

  render();
})();
