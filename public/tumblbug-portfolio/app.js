(function () {
  var dlg = document.getElementById('dlg');
  var head = document.getElementById('dlg-head');
  var body = document.getElementById('dlg-body');
  var lastTrigger = null;

  var covers = {
    templemoa: { img: 'assets/tm-feature.webp' },
    dognal: { bg: 'linear-gradient(135deg,#ffb36b,#ff7a59)', text: 'Dognal 도그널' },
    shortsguard: { bg: 'linear-gradient(135deg,#2b2d42,#5c5f7a)', text: '쇼츠 그만 댓글 그만' },
    missions: { bg: 'linear-gradient(135deg,#3ec5a8,#2a8fbd)', text: 'Compose · MVVM' },
    whomadethis: { bg: 'linear-gradient(135deg,#ffd56b,#ff8fb1)', text: 'Who Made This' }
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
      ph.textContent = c.text || '';
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
