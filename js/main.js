// ── Grid overlay — thin black lines revealing the layout ──
(function () {
  const overlay = document.createElement('div');
  overlay.className = 'grid-overlay';
  overlay.setAttribute('aria-hidden', 'true');

  overlay.innerHTML =
    '<div class="grid-frame"></div>' +
    '<div class="grid-cols"></div>' +
    '<div class="grid-rule top"></div>' +
    '<div class="grid-rule bottom"></div>';

  const railL = document.createElement('div');
  railL.className = 'grid-rail left';
  railL.innerHTML = '<span>GRIDS — Graphic &amp; Brand Design Studio</span>';

  const railR = document.createElement('div');
  railR.className = 'grid-rail right';
  railR.innerHTML = '<span>Portfolio — Seoul, KR</span>';

  const ticks = document.createElement('div');
  ticks.innerHTML =
    '<div class="grid-tick tl">Grid · 12</div>' +
    '<div class="grid-tick tr">37.55°N 126.99°E</div>' +
    '<div class="grid-tick bl">© 2026</div>' +
    '<div class="grid-tick br">GRIDS</div>';

  document.body.prepend(overlay);
  document.body.appendChild(railL);
  document.body.appendChild(railR);
  while (ticks.firstChild) document.body.appendChild(ticks.firstChild);
})();

// ── Image preview on project list hover ──
// Exposed as window.bindProjectRows so dynamically injected rows
// (e.g. on category.html) can be wired up after they're added.
const preview    = document.getElementById('cursorPreview');
const previewImg = document.getElementById('previewImg');

if (preview && previewImg) {
  document.addEventListener('mousemove', e => {
    let x = e.clientX + 24;
    let y = e.clientY - 120;
    const pw = 340, ph = 255;
    if (x + pw > window.innerWidth  - 16) x = e.clientX - pw - 24;
    if (y + ph > window.innerHeight - 16) y = window.innerHeight - ph - 16;
    if (y < 16) y = 16;
    preview.style.transform = `translate(${x}px, ${y}px)`;
  });

  window.bindProjectRows = function (scope) {
    (scope || document).querySelectorAll('.project-row[data-img]').forEach(row => {
      if (row.dataset.previewBound) return;
      row.dataset.previewBound = '1';
      row.addEventListener('mouseenter', () => {
        previewImg.src = row.getAttribute('data-img');
        preview.classList.add('active');
      });
      row.addEventListener('mouseleave', () => {
        preview.classList.remove('active');
      });
    });
  };
  window.bindProjectRows();
} else {
  window.bindProjectRows = function () {};
}

// ── Grid crosshair cursor — full-screen vertical + horizontal lines
//    crossing at the mouse position ──
(function () {
  if (document.body.dataset.cursor === 'default') return;
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:10;';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  let dpr = window.devicePixelRatio || 1;
  let mouseX = window.innerWidth  / 2;
  let mouseY = window.innerHeight / 2;
  let visible = false;

  function resize() {
    dpr = window.devicePixelRatio || 1;
    canvas.width  = window.innerWidth  * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener('resize', resize);
  resize();

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    visible = true;
  });
  document.addEventListener('mouseleave', () => { visible = false; });

  function draw() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    ctx.clearRect(0, 0, w, h);

    if (visible) {
      // crisp 1px hairlines: snap to half-pixel
      const cx = Math.round(mouseX) + 0.5;
      const cy = Math.round(mouseY) + 0.5;

      ctx.strokeStyle = 'rgba(0,0,0,0.9)';
      ctx.lineWidth = 1;

      ctx.beginPath();
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx, h);   // vertical
      ctx.moveTo(0, cy);
      ctx.lineTo(w, cy);   // horizontal
      ctx.stroke();

      // small solid node at the intersection
      ctx.fillStyle = 'rgba(0,0,0,0.9)';
      ctx.fillRect(cx - 2.5, cy - 2.5, 5, 5);
    }

    requestAnimationFrame(draw);
  }

  draw();
})();
