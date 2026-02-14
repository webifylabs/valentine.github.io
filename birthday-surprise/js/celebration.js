// Celebration Shower Logic

export function showerCelebration(parent, count = 32, interval = 60) {
  const shapes = ['balloon', 'ribbon', 'heart'];
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const type = shapes[Math.floor(Math.random()*shapes.length)];
      let el = document.createElement('div');
      el.className = 'shower-' + type;
      el.style.left = `${10 + Math.random()*80}vw`;
      el.style.top = '-8vh';
      el.style.position = 'fixed';
      el.style.zIndex = 20;
      el.style.pointerEvents = 'none';
      if (type === 'balloon') {
        el.innerHTML = `<svg width="38" height="60" viewBox="0 0 38 60"><ellipse cx="19" cy="24" rx="16" ry="22" fill="#e63946" stroke="#ffd700" stroke-width="2"/><rect x="16" y="44" width="6" height="12" rx="3" fill="#ffd700"/><path d="M19 56 Q17 59 19 60 Q21 59 19 56" stroke="#a83279" stroke-width="1.5" fill="none"/></svg>`;
      } else if (type === 'ribbon') {
        el.innerHTML = `<svg width="32" height="48" viewBox="0 0 32 48"><path d="M16 0 Q24 16 8 32 Q20 40 16 48" stroke="#ffd700" stroke-width="4" fill="none"/><circle cx="16" cy="0" r="4" fill="#a83279"/></svg>`;
      } else {
        el.innerHTML = `<svg width="36" height="36" viewBox="0 0 32 32"><path d="M16 29s-13-8.35-13-16.5C3 6.5 8.5 3 16 10.5C23.5 3 29 6.5 29 12.5C29 20.65 16 29 16 29Z" fill="#e63946" stroke="#ffd700" stroke-width="2"/></svg>`;
      }
      el.style.transition = 'transform 2.2s cubic-bezier(.4,2,.6,1), opacity 0.7s';
      parent.appendChild(el);
      setTimeout(() => {
        el.style.transform = `translateY(${90 + Math.random()*10}vh) rotate(${Math.random()*60-30}deg)`;
        el.style.opacity = 0.7 + Math.random()*0.3;
      }, 30);
      setTimeout(() => {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, 3740);
    }, i*interval);
  }
}
