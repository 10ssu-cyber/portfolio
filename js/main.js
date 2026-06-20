// Cursor-following image preview for project list
const preview = document.getElementById('cursorPreview');
const previewImg = document.getElementById('previewImg');

if (preview && previewImg) {
  const rows = document.querySelectorAll('.project-row[data-img]');
  let posX = 0, posY = 0;

  document.addEventListener('mousemove', e => {
    let x = e.clientX + 24;
    let y = e.clientY - 120;

    const pw = 340, ph = 255;
    if (x + pw > window.innerWidth - 16) x = e.clientX - pw - 24;
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
