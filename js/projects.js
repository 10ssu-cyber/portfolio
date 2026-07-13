// ── Single source of truth for the project list ──
// Rendered on both the home page and the category pages so the list
// (and its links to each detail page) stays in one place.
window.PROJECTS = [
  { num: '001', title: 'Retrace Collection Pony',        cat: 'Book Design, Editorial', slug: 'editorial-design',  yr: '2023',    href: 'work/hyundai-pony.html', img: 'REF/Hyundai_Pony_1.jpg' },
  { num: '002', title: 'Seoul Mediacity Biennale Identity', cat: 'Brand Identity',       slug: 'brand-identity',    yr: '2023',    href: 'work/project-02.html',   img: 'REF/Mediacity Biennale_1.jpg' },
  { num: '003', title: 'Un-Printed Ideas 4',             cat: 'Exhibition Design',      slug: 'exhibition-design', yr: '2024',    href: 'work/project-03.html',   img: 'REF/Moka_1.jpg' },
  { num: '004', title: 'SAC Music Festival',             cat: 'Graphic Design',         slug: 'graphic-design',    yr: '2023–24', href: 'work/project-04.html',   img: 'REF/SSM_1.jpg' },
  { num: '005', title: 'Alternate Space Loop',           cat: 'Exhibition Design',      slug: 'exhibition-design', yr: '2024',    href: 'work/project-05.html',   img: 'REF/Loop1.jpg' },
  { num: '006', title: 'Outernet Signature Motion',      cat: 'Motion Graphic',         slug: 'motion-graphic',    yr: '2023',    href: 'work/project-06.html',   img: 'REF/Outernet_1.jpg' },
  { num: '007', title: "Leenalchi 'Damnyo'",             cat: 'Graphic Design',         slug: 'graphic-design',    yr: '2023',    href: 'work/project-07.html',   img: 'REF/Leenalchi_1.jpg' },
  { num: '008', title: 'DDP Countdown 2025',             cat: 'Motion Graphic',         slug: 'motion-graphic',    yr: '2024',    href: 'work/project-08.html',   img: '' },
  { num: '009', title: 'Coming Soon',                    cat: '—',                      slug: '',                  yr: '—',       href: 'work/project-09.html',   img: '' },
  { num: '010', title: 'Coming Soon',                    cat: '—',                      slug: '',                  yr: '—',       href: 'work/project-10.html',   img: '' }
];

// Render the project rows into `container`, optionally filtered by a
// category slug. Each row is an <a> linking to the project detail page.
// Returns the number of rows rendered.
window.renderProjectRows = function (container, opts) {
  if (!container) return 0;
  opts = opts || {};
  var slug = opts.cat || null;
  var base = opts.base || '';           // path prefix if used from a subfolder
  var rows = window.PROJECTS.filter(function (p) {
    return !slug || p.slug === slug;
  });

  var frag = document.createDocumentFragment();
  rows.forEach(function (p) {
    var a = document.createElement('a');
    a.href = base + p.href;
    a.className = 'project-row';
    if (p.slug) a.setAttribute('data-cat', p.slug);
    if (p.img)  a.setAttribute('data-img', base + p.img);
    a.innerHTML =
      '<span class="num">'   + p.num   + '</span>' +
      '<span class="title">' + p.title + '</span>' +
      '<span class="cat">'   + p.cat   + '</span>' +
      '<span class="yr">'    + p.yr    + '</span>';
    frag.appendChild(a);
  });
  container.appendChild(frag);

  if (window.bindProjectRows) window.bindProjectRows();
  return rows.length;
};
