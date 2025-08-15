(function(){
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  const navToggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('nav-menu');
  const year = document.getElementById('year');

  const saved = localStorage.getItem('theme');
  if(saved === 'light'){ root.classList.add('light'); }

  toggle?.addEventListener('click', ()=>{
    root.classList.toggle('light');
    localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
  });

  navToggle?.addEventListener('click', ()=>{
    const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
    navToggle.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('show');
  });

  if(year){ year.textContent = new Date().getFullYear(); }

  const chips = document.querySelectorAll('.filters .chip');
  const items = document.querySelectorAll('#pubs > li');
  chips.forEach(chip => chip.addEventListener('click', ()=>{
    chips.forEach(c=>c.classList.remove('active'));
    chip.classList.add('active');
    const f = chip.dataset.filter;
    items.forEach(li => {
      if(f==='all'){ li.style.display='list-item'; }
      else{
        const tags = li.getAttribute('data-tags') || '';
        li.style.display = tags.includes(f) ? 'list-item' : 'none';
      }
    });
  }));
})();