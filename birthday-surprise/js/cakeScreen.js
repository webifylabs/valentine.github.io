// Cake & Candle Screen Logic

export function showCakeScreen(app, createStartAgainButton, showerCelebration, showFinalScreen) {
  app.innerHTML = '';
  app.classList.remove('screen-shake');
  const cakeScreen = document.createElement('div');
  cakeScreen.className = 'cake-screen bolly-card';
  cakeScreen.style.position = 'relative';
  cakeScreen.style.overflow = 'hidden';
  cakeScreen.style.width = '100vw';
  cakeScreen.style.height = '100dvh'; // Use dynamic viewport height for mobile
  cakeScreen.style.maxWidth = '100vw';
  cakeScreen.style.maxHeight = '100dvh';
  cakeScreen.style.touchAction = 'manipulation';

  // Inject Google Fonts for Great Vibes, Playfair Display, and Poppins if not present
  if (!document.getElementById('cake-gfonts')) {
    const link = document.createElement('link');
    link.id = 'cake-gfonts';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:wght@700&family=Poppins:wght@400;600&display=swap';
    document.head.appendChild(link);
  }
  // Inject premium typography CSS if not present
  if (!document.getElementById('cake-typography-style')) {
    const style = document.createElement('style');
    style.id = 'cake-typography-style';
    style.innerHTML = `
      .cake-headline {
        font-family: 'Great Vibes', cursive;
        font-size: clamp(1.5rem, 7vw, 2.8rem);
        color: #FF6F91;
        text-shadow: 0 2px 12px #FFD6E0, 0 1px 0 #FFD6E0, 0 0 0.5em #FFD6E0;
        letter-spacing: 0.08em;
        font-weight: 400;
        margin-bottom: 0.15em;
        line-height: 1.1;
        animation: cakeHeadlinePop 1.2s cubic-bezier(.4,2,.6,1) 1;
      }
      @keyframes cakeHeadlinePop {
        0% { transform: scale(0.7) translateY(40px); opacity:0; }
        60% { transform: scale(1.12) translateY(-8px); opacity:1; }
        100% { transform: scale(1) translateY(0); opacity:1; }
      }
      .cake-name {
        font-family: 'Playfair Display', serif;
        font-size: clamp(1rem, 4vw, 1.3rem);
        color: #B76E79;
        font-weight: 700;
        letter-spacing: 0.04em;
        margin-bottom: 0.2em;
        margin-top: 0.1em;
        line-height: 1.2;
      }
      .cake-text {
        font-family: 'Poppins', sans-serif;
        font-size: clamp(0.9rem, 3vw, 1.05rem);
        color: #B08D57;
        font-weight: 400;
        opacity: 0.82;
        margin-top: 1.1em;
        letter-spacing: 0.01em;
        line-height: 1.5;
      }
      .cake-typography-wrap {
        text-align: center;
        margin-top: 0.5em;
        margin-bottom: 0.2em;
        padding: 0 2vw;
      }
      @media (max-width: 600px) {
        .cake-headline { font-size: 1.5rem; }
        .cake-name { font-size: 1rem; }
        .cake-text { font-size: 0.9rem; }
        .cake-typography-wrap { padding: 0 3vw; }
      }
    `;
    document.head.appendChild(style);
  }
  cakeScreen.innerHTML = `
    <svg id="cake" width="220" height="220" viewBox="0 0 220 220" style="display:block;margin:0 auto;">
      <defs>
        <radialGradient id="flameGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fffbe6"/>
          <stop offset="60%" stop-color="#ffd700"/>
          <stop offset="100%" stop-color="#ff9800"/>
        </radialGradient>
        <radialGradient id="flameGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fffbe6" stop-opacity="0.7"/>
          <stop offset="100%" stop-color="#ffd700" stop-opacity="0"/>
        </radialGradient>
        <filter id="flameBlur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3"/>
        </filter>
      </defs>
      <!-- Candle group -->
      <g id="svg-candle" style="cursor:pointer;">
        <!-- Candle body -->
        <rect x="104" y="30" width="12" height="40" rx="6" fill="#fff" stroke="#ddd" stroke-width="1.5"/>
        <!-- Candle stripes -->
        <rect x="104" y="38" width="12" height="4" rx="2" fill="#ffd6d6"/>
        <rect x="104" y="46" width="12" height="4" rx="2" fill="#ffd6d6"/>
        <!-- Flame -->
        <g id="svg-flame">
          <!-- Outer glow -->
          <ellipse cx="110" cy="28" rx="13" ry="18" fill="url(#flameGlow)" filter="url(#flameBlur)" opacity="0.7">
            <animate attributeName="opacity" values="0.7;0.4;0.7" dur="1.2s" repeatCount="indefinite"/>
            <animate attributeName="ry" values="18;14;18" dur="1.2s" repeatCount="indefinite"/>
          </ellipse>
          <!-- Main flame -->
          <ellipse cx="110" cy="26" rx="7" ry="13" fill="url(#flameGrad)" opacity="0.92">
            <animate attributeName="opacity" values="0.92;0.7;0.92" dur="0.7s" repeatCount="indefinite"/>
            <animate attributeName="ry" values="13;10;13" dur="0.7s" repeatCount="indefinite"/>
          </ellipse>
          <!-- Inner highlight -->
          <ellipse cx="110" cy="29" rx="3.2" ry="6" fill="#fffbe6" opacity="0.55">
            <animate attributeName="opacity" values="0.55;0.2;0.55" dur="0.8s" repeatCount="indefinite"/>
            <animate attributeName="ry" values="6;4;6" dur="0.8s" repeatCount="indefinite"/>
          </ellipse>
        </g>
      </g>
      <!-- Cake base -->
      <ellipse cx="110" cy="180" rx="80" ry="30" fill="#a88679"/>
      <ellipse cx="110" cy="160" rx="80" ry="30" fill="#f7d9b4"/>
      <rect x="30" y="100" width="160" height="60" rx="30" fill="#f7d9b4"/>
      <ellipse cx="110" cy="100" rx="80" ry="30" fill="#a88679"/>
      <ellipse cx="110" cy="100" rx="70" ry="22" fill="#fffbe6"/>
      <ellipse cx="110" cy="100" rx="60" ry="16" fill="#ffd6d6"/>
      <ellipse cx="110" cy="100" rx="50" ry="10" fill="#ffb6b9"/>
      <!-- Sprinkles -->
      <circle cx="80" cy="100" r="3" fill="#e63946"/>
      <circle cx="140" cy="105" r= "2.5" fill="#ffd700"/>
      <circle cx="120" cy="95" r="2.5" fill="#a83279"/>
      <circle cx="100" cy="110" r="2" fill="#ffb6b9"/>
      <circle cx="160" cy="100" r="2" fill="#e63946"/>
      <circle cx="60" cy="105" r="2.5" fill="#ffd700"/>
      <circle cx="110" cy="110" r="2.5" fill="#a83279"/>
    </svg>
    <div class="cake-typography-wrap">
      <h1 class="cake-headline">Happy Birthday!</h1>
      <div class="cake-name">..........</div>
      <div class="cake-text">Click on the candle to light it up!</div>
    </div>
  `;
  app.appendChild(cakeScreen);

  // Add Start Again button
  app.appendChild(createStartAgainButton());

  // Rotation logic for SVG cake
  const svgCake = cakeScreen.querySelector('#cake');
  let cakeRotation = 0;
  let isDragging = false;
  let lastX = 0;
  svgCake.style.transition = 'transform 0.2s cubic-bezier(.4,2,.6,1)';
  svgCake.style.transformOrigin = '50% 80%';
  function onPointerDown(e) {
    isDragging = true;
    lastX = (e.touches ? e.touches[0].clientX : e.clientX);
    document.body.style.cursor = 'grabbing';
  }
  function onPointerMove(e) {
    if (!isDragging) return;
    const x = (e.touches ? e.touches[0].clientX : e.clientX);
    cakeRotation += (x - lastX) * 0.7;
    lastX = x;
    svgCake.style.transform = `rotate(${cakeRotation}deg)`;
  }
  function onPointerUp() {
    isDragging = false;
    document.body.style.cursor = '';
  }
  svgCake.addEventListener('mousedown', onPointerDown);
  svgCake.addEventListener('touchstart', onPointerDown, { passive: true });
  window.addEventListener('mousemove', onPointerMove);
  window.addEventListener('touchmove', onPointerMove, { passive: false });
  window.addEventListener('mouseup', onPointerUp);
  window.addEventListener('touchend', onPointerUp);

  // Candle click (SVG candle group)
  let flameLit = false;
  const svgCandle = svgCake.querySelector('#svg-candle');
  const svgFlame = svgCake.querySelector('#svg-flame');
  svgFlame.style.opacity = 0; // Start unlit
  svgCandle.addEventListener('click', () => {
    if (flameLit) return;
    flameLit = true;
    // On mobile, scroll to cake area to ensure visibility
    if (window.innerWidth < 700) {
      setTimeout(() => {
        cakeScreen.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
    // Animate flame in
    svgFlame.style.opacity = 1;
    // Remove the instruction text
    const cakeText = cakeScreen.querySelector('.cake-text');
    if (cakeText && cakeText.parentNode) cakeText.parentNode.removeChild(cakeText);

    // --- Romantic floating hearts ---
    const heartsContainer = document.createElement('div');
    heartsContainer.style.position = 'fixed';
    heartsContainer.style.left = '0';
    heartsContainer.style.top = '0';
    heartsContainer.style.width = '100vw';
    heartsContainer.style.height = '100vh';
    heartsContainer.style.pointerEvents = 'none';
    heartsContainer.style.zIndex = '1000';
    document.body.appendChild(heartsContainer);

    let heartsActive = true;
    function createHeart() {
      if (!heartsActive) return;
      const svgNS = 'http://www.w3.org/2000/svg';
      const heart = document.createElementNS(svgNS, 'svg');
      heart.setAttribute('width', '38');
      heart.setAttribute('height', '34');
      heart.setAttribute('viewBox', '0 0 38 34');
      heart.style.position = 'absolute';
      heart.style.left = (10 + Math.random() * 80) + 'vw';
      heart.style.top = '100vh';
      heart.style.opacity = 0.7 + Math.random() * 0.3;
      heart.style.transform = `scale(${0.7 + Math.random() * 0.7})`;
      heart.innerHTML = `<path d="M19 32s-13-8.35-17-15.5C-1.5 8.5 7.5 1 19 10.5 30.5 1 39.5 8.5 36 16.5 32 23.65 19 32 19 32z" fill="#e63946" stroke="#fff" stroke-width="1.5"/>`;
      heartsContainer.appendChild(heart);
      // Animate upward
      const duration = 3600 + Math.random() * 2200;
      const finalTop = 10 + Math.random() * 40;
      setTimeout(() => {
        heart.style.transition = `top ${duration}ms cubic-bezier(.4,2,.6,1), opacity 1.2s`;
        heart.style.top = finalTop + 'vh';
        heart.style.opacity = 0;
      }, 30);
      setTimeout(() => {
        if (heart.parentNode) heart.parentNode.removeChild(heart);
      }, duration + 1200);
    }
    function heartsLoop() {
      if (!heartsActive) return;
      createHeart();
      setTimeout(heartsLoop, 350 + Math.random() * 350);
    }
    heartsLoop();
    // Add countdown circle indicator
    const circleWrap = document.createElement('div');
    circleWrap.style.display = 'flex';
    circleWrap.style.justifyContent = 'center';
    circleWrap.style.alignItems = 'center';
    circleWrap.style.marginTop = '18px';
    circleWrap.style.position = 'relative';
    circleWrap.style.height = '70px';
    cakeScreen.appendChild(circleWrap);
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', '64');
    svg.setAttribute('height', '64');
    svg.setAttribute('viewBox', '0 0 64 64');
    svg.style.display = 'block';
    svg.style.position = 'relative';
    circleWrap.appendChild(svg);
    // Background circle
    const bgCircle = document.createElementNS(svgNS, 'circle');
    bgCircle.setAttribute('cx', '32');
    bgCircle.setAttribute('cy', '32');
    bgCircle.setAttribute('r', '28');
    bgCircle.setAttribute('stroke', '#ffd6d6');
    bgCircle.setAttribute('stroke-width', '7');
    bgCircle.setAttribute('fill', 'none');
    svg.appendChild(bgCircle);
    // Foreground animated circle
    const fgCircle = document.createElementNS(svgNS, 'circle');
    fgCircle.setAttribute('cx', '32');
    fgCircle.setAttribute('cy', '32');
    fgCircle.setAttribute('r', '28');
    fgCircle.setAttribute('stroke', '#e63946');
    fgCircle.setAttribute('stroke-width', '7');
    fgCircle.setAttribute('fill', 'none');
    fgCircle.setAttribute('stroke-linecap', 'round');
    fgCircle.setAttribute('transform', 'rotate(-90 32 32)');
    fgCircle.style.transition = 'stroke-dashoffset 0.8s linear';
    svg.appendChild(fgCircle);
    // Countdown text
    const countdownText = document.createElement('div');
    countdownText.style.position = 'absolute';
    countdownText.style.left = '0';
    countdownText.style.top = '0';
    countdownText.style.width = '64px';
    countdownText.style.height = '64px';
    countdownText.style.display = 'flex';
    countdownText.style.alignItems = 'center';
    countdownText.style.justifyContent = 'center';
    countdownText.style.fontFamily = 'Poppins, sans-serif';
    countdownText.style.fontWeight = '600';
    countdownText.style.fontSize = '1.3rem';
    countdownText.style.color = '#e63946';
    countdownText.style.userSelect = 'none';
    circleWrap.appendChild(countdownText);
    // Animate circle and text
    const totalSeconds = 10;
    const circumference = 2 * Math.PI * 28;
    fgCircle.setAttribute('stroke-dasharray', circumference);
    fgCircle.setAttribute('stroke-dashoffset', '0');
    let secondsLeft = totalSeconds;
    countdownText.textContent = secondsLeft;
    function updateCircle() {
      secondsLeft--;
      const offset = circumference * (1 - (secondsLeft / totalSeconds));
      fgCircle.setAttribute('stroke-dashoffset', offset);
      countdownText.textContent = secondsLeft > 0 ? secondsLeft : '';
      if (secondsLeft > 0) {
        setTimeout(updateCircle, 1000);
      }
    }
    setTimeout(updateCircle, 1000);
    // Show final screen after 10s
    setTimeout(() => {
      heartsActive = false;
      if (heartsContainer.parentNode) heartsContainer.parentNode.removeChild(heartsContainer);
      cakeScreen.removeChild(circleWrap);
      showFinalScreen();
    }, totalSeconds * 1000);
  });
}
