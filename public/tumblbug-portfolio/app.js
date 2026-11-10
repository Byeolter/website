(function () {
  var dlg = document.getElementById('dlg');
  var head = document.getElementById('dlg-head');
  var body = document.getElementById('dlg-body');
  var lastTrigger = null;

  var covers = {
    templemoa: { img: 'assets/tm-graphic.webp' },
    dognal: { bg: 'linear-gradient(160deg,#e3f5ee,#bfe6d8)', icon: 'assets/icon-dognal.webp' },
    shortsguard: { bg: 'linear-gradient(160deg,#232b44,#0f1424)', icon: 'assets/icon-shortsguard.webp' },
    missions: { bg: 'linear-gradient(135deg,#3ec5a8,#2a8fbd)', text: 'Compose · MVVM' },
    whomadethis: { img: 'assets/whomade-web.webp' }
  };

  function openProject(key, trigger) {
    var tpl = document.getElementById('t-' + key);
    if (!tpl) return;
    var c = covers[key] || {};
    head.innerHTML = '';
    if (c.img) {
      var img = document.createElement('img');
      img.src = c.img;
      img.alt = '';
      head.appendChild(img);
    } else {
      var ph = document.createElement('div');
      ph.className = 'ph-big';
      ph.style.background = c.bg || '#ddd';
      if (c.icon) {
        var ic = document.createElement('img');
        ic.src = c.icon;
        ic.alt = '';
        ph.appendChild(ic);
      } else ph.textContent = c.text || '';
      head.appendChild(ph);
    }
    var x = document.createElement('button');
    x.className = 'dlg-x';
    x.type = 'button';
    x.setAttribute('aria-label', '닫기');
    x.textContent = '✕';
    x.addEventListener('click', function () { dlg.close(); });
    head.appendChild(x);
    body.innerHTML = '';
    body.appendChild(tpl.content.cloneNode(true));
    lastTrigger = trigger || null;
    if (typeof dlg.showModal === 'function') dlg.showModal();
    else dlg.setAttribute('open', '');
  }

  document.querySelectorAll('[data-key]').forEach(function (el) {
    el.addEventListener('click', function () { openProject(el.getAttribute('data-key'), el); });
  });

  dlg.addEventListener('click', function (e) {
    if (e.target === dlg) dlg.close();
  });
  dlg.addEventListener('close', function () {
    if (lastTrigger) lastTrigger.focus();
  });

  var pills = document.querySelectorAll('.pill');
  var cards = document.querySelectorAll('.card');
  pills.forEach(function (p) {
    p.addEventListener('click', function () {
      var f = p.getAttribute('data-filter');
      pills.forEach(function (q) { q.setAttribute('aria-pressed', q === p ? 'true' : 'false'); });
      cards.forEach(function (c) {
        var cats = (c.getAttribute('data-cats') || '').split(' ');
        c.hidden = !(f === 'all' || cats.indexOf(f) !== -1);
      });
    });
  });
})();
