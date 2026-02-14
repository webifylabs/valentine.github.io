// Countdown Screen Logic

export function showCountdownScreen(app, createParticles, createStartAgainButton, showCakeScreen) {
  app.innerHTML = '';
  const bg = createParticles(36);
  app.appendChild(bg);

  // Add Start Again button
  app.appendChild(createStartAgainButton());

  const overlay = document.createElement('div');
  overlay.className = 'bolly-card';
  overlay.style.position = 'fixed';
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.zIndex = 100;
  overlay.style.flexDirection = 'column';
  overlay.style.background = 'rgba(40,10,60,0.7)';
  overlay.innerHTML = '<div style="color:#ffd700;font-size:2.2rem;text-align:center;text-shadow:0 0 16px #e63946,0 0 8px #ffd700;">Click to unwrap your birthday surprise</div>';
  app.appendChild(overlay);

  overlay.addEventListener('click', startCountdown, { once: true });
  overlay.addEventListener('touchstart', startCountdown, { once: true });

  function startCountdown() {
    overlay.remove();
    runCountdown();
  }

  function runCountdown() {
    const countdown = document.createElement('div');
    countdown.style.position = 'absolute';
    countdown.style.top = '50%';
    countdown.style.left = '50%';
    countdown.style.transform = 'translate(-50%, -50%)';
    countdown.style.zIndex = '2';
    app.appendChild(countdown);

    let numbers = ['3', '2', '1'];
    let idx = 0;

    function animateNumber() {
      countdown.innerHTML = '';
      const num = document.createElement('div');
      num.className = 'countdown-number';
      num.textContent = numbers[idx];
      countdown.appendChild(num);
      setTimeout(() => {
        idx++;
        if (idx < numbers.length) {
          animateNumber();
        } else {
          setTimeout(() => {
            showCakeScreen();
          }, 900);
        }
      }, 1400);
    }
    animateNumber();
  }
}
