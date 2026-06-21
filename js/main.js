// ── Image preview on project list hover ──
const preview   = document.getElementById('cursorPreview');
const previewImg = document.getElementById('previewImg');

if (preview && previewImg) {
  const rows = document.querySelectorAll('.project-row[data-img]');

  document.addEventListener('mousemove', e => {
    let x = e.clientX + 24;
    let y = e.clientY - 120;
    const pw = 340, ph = 255;
    if (x + pw > window.innerWidth  - 16) x = e.clientX - pw - 24;
    if (y + ph > window.innerHeight - 16) y = window.innerHeight - ph - 16;
    if (y < 16) y = 16;
    preview.style.transform = `translate(${x}px, ${y}px)`;
  });

  rows.forEach(row => {
    row.addEventListener('mouseenter', () => {
      previewImg.src = row.getAttribute('data-img');
      preview.classList.add('active');
    });
    row.addEventListener('mouseleave', () => {
      preview.classList.remove('active');
    });
  });
}

// ── Clock cursor — lines radiate from mouse position ──
(function () {
  if (document.body.dataset.cursor === 'default') return;
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:10;';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  let mouseX = window.innerWidth  / 2;
  let mouseY = window.innerHeight / 2;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const cx = mouseX;
    const cy = mouseY;
    const R  = Math.hypot(canvas.width, canvas.height);

    const now = new Date();
    const h   = now.getHours() % 12;
    const m   = now.getMinutes();
    const s   = now.getSeconds(); // integer → tick movement

    const secAngle  = (s       / 60) * Math.PI * 2 - Math.PI / 2;
    const minAngle  = ((m + s  / 60) / 60) * Math.PI * 2 - Math.PI / 2;
    const hourAngle = ((h + m  / 60) / 12) * Math.PI * 2 - Math.PI / 2;

    function line(angle, width, opacity) {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      ctx.beginPath();
      ctx.moveTo(cx - cos * R, cy - sin * R);
      ctx.lineTo(cx + cos * R, cy + sin * R);
      ctx.strokeStyle = `rgba(0,0,0,${opacity})`;
      ctx.lineWidth   = width;
      ctx.stroke();
    }

    line(hourAngle, 1, 1);
    line(minAngle,  1, 1);
    line(secAngle,   7, 1);

    // Center dot
    ctx.beginPath();
    ctx.arc(cx, cy, 3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,0,0,0.9)';
    ctx.fill();

    requestAnimationFrame(draw);
  }

  draw();
})();
