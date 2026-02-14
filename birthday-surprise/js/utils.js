// Utility Functions

export function createParticles(count) {
  const bg = document.createElement('div');
  bg.className = 'countdown-bg';
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.width = `${8 + Math.random()*16}px`;
    p.style.height = p.style.width;
    p.style.left = `${Math.random()*100}vw`;
    p.style.top = `${Math.random()*100}vh`;
    p.style.animationDuration = `${4 + Math.random()*3}s`;
    bg.appendChild(p);
  }
  return bg;
}

export function createStartAgainButton(showCountdownScreen) {
  const btn = document.createElement('button');
  btn.textContent = 'Start Again';
  btn.className = 'start-again-btn';
  btn.style.position = 'fixed';
  btn.style.bottom = '32px';
  btn.style.right = '32px';
  btn.style.zIndex = 9999;
  btn.style.padding = '12px 28px';
  btn.style.fontSize = '1.1rem';
  btn.style.background = 'linear-gradient(90deg,#e63946,#ffd700)';
  btn.style.color = '#fff';
  btn.style.border = 'none';
  btn.style.borderRadius = '24px';
  btn.style.boxShadow = '0 2px 16px #ffd70055';
  btn.style.cursor = 'pointer';
  btn.style.fontFamily = "'Poppins','Segoe UI',Arial,sans-serif";
  btn.style.fontWeight = '700';
  btn.style.letterSpacing = '1px';
  btn.addEventListener('click', () => {
    showCountdownScreen();
  });
  return btn;
}
