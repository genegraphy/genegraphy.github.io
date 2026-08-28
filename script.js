
var lang=localStorage.getItem('hcai_lang')||'ko';
function applyLang(){document.querySelectorAll('[data-ko]').forEach(function(el){var v=el.getAttribute('data-'+lang);if(v!==null)el.innerHTML=v;});document.documentElement.lang=lang;document.body.classList.toggle('en',lang==='en');document.getElementById('lang').innerHTML=(lang==='ko')?'<b>KO</b> / EN':'KO / <b>EN</b>';}
function toggleLang(){lang=(lang==='ko')?'en':'ko';localStorage.setItem('hcai_lang',lang);applyLang();document.getElementById('menu').classList.remove('open');}
applyLang();document.getElementById('yr').textContent=new Date().getFullYear();

(function(){var p=location.pathname.split('/').pop()||'index.html';document.querySelectorAll('.links a').forEach(function(a){if(a.getAttribute('href')===p)a.classList.add('active');});})();
