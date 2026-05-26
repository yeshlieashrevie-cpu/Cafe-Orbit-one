(function () {
  const canvas = document.getElementById('stars');
  const ctx = canvas.getContext('2d');
  let stars = [];
  const COUNT = 180;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function rand(a, b) { return a + Math.random() * (b - a); }

  function createStar() {
    const palette = [
      [255,255,255],
      [198,255,51],
      [125,57,235]
    ];
    const c = palette[Math.floor(Math.random() * palette.length)];
    return {
      x: rand(0, canvas.width),
      y: rand(0, canvas.height),
      r: rand(0.25, 1.6),
      alpha: rand(0.05, 0.9),
      speed: rand(0.002, 0.007),
      phase: rand(0, Math.PI * 2),
      color: c
    };
  }

  function initStars() { stars = Array.from({ length: COUNT }, createStar); }

  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frame += 0.01;
    stars.forEach(s => {
      const a = s.alpha * (0.4 + 0.6 * Math.sin(frame * s.speed * 60 + s.phase));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${s.color[0]},${s.color[1]},${s.color[2]},${a})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); initStars(); });
  resize(); initStars(); draw();
})();

document.getElementById('add-contact-btn').addEventListener('click', function () {
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'FN:Café Orbit',
    'ORG:Café Orbit',
    'TEL;TYPE=CELL:+639931737690',
    'EMAIL:cafeorbitinquiries@gmail.com',
    'URL:YOUR_FACEBOOK_URL_HERE',
    'NOTE:Café Orbit — Web design & consulting',
    'END:VCARD'
  ].join('\n');

  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = 'CafeOrbit.vcf';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('Contact saved to your device!');
});

function showToast(msg) {
  const t = document.getElementById('toast');
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3200);
}

document.querySelectorAll('.project-card, .contact-card').forEach(card => {
  card.addEventListener('mousemove', function (e) {
    const r  = card.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width  / 2) / (r.width  / 2);
    const dy = (e.clientY - r.top  - r.height / 2) / (r.height / 2);
    card.style.transform = `translateY(-4px) perspective(700px) rotateX(${dy * -4}deg) rotateY(${dx * 4}deg)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});
