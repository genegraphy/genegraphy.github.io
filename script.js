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