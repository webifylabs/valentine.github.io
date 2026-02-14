// Bollywood Romantic Birthday Surprise - Main Script
import { showCountdownScreen as countdownScreen } from './countdown.js';
import { showCakeScreen as cakeScreen } from './cakeScreen.js';
import { showerCelebration } from './celebration.js';
import { createParticles, createStartAgainButton } from './utils.js';

const app = document.getElementById('app');

// Final screen logic (kept here for now)
function showFinalScreen() {
  app.innerHTML = '';
  // Layered glassy background
  const bg = document.createElement('div');
  bg.className = 'final-bg-premium';
  app.appendChild(bg);

  // Add Start Again button
  app.appendChild(createStartAgainButton(startExperience));

  // Grand glowing header
  const header = document.createElement('div');
  header.className = 'bolly-header';
  header.innerHTML = `<span class="bolly-title">Happy Birthday <span class="bolly-heart">❤️</span></span>`;
  app.appendChild(header);

  // Soft entrance animation
  setTimeout(() => header.classList.add('show'), 100);

  // Elegant message section
  const msgWrap = document.createElement('div');
  msgWrap.className = 'bolly-message-wrap';
  msgWrap.style.maxWidth = '2000px';
  msgWrap.style.width = '90vw';
  msgWrap.style.margin = '0 auto';
  msgWrap.innerHTML = `
    <div class="bolly-message" style="max-width:1200px;width:100%;margin:0 auto;font-size:1.18rem;line-height:1.7;word-break:break-word;">
      <span>Happiest Birthday in advance my jaaaaannnnnnnnnnnuuuuuuuu 💗 Even if we can’t meet on 14th March, my heart is already celebrating you babeeeeeeeeeeeeeeee 🤧 And 16th Feb is going to be double special because we’re celebrating your birthday early and completing our 5 beautiful months together, my begammmmmmmmmmmmmmmmmmmmmmmmm jiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii ❤️✨</span><br><br>
      <span>You’re turning 16 my love, sweet sixteen but still my cutest drama factory 😝😁 I don’t just choose you🫶, I choose you and your kalesh🤧, your mood swings😩, your overthinking, your nakhre everything😘. I’ll pick you on your best days and I’ll pick you even tighter on your worst days💗😘. Forever means forever with all the chaos included 😁</span><br><br>
      <span>And one more thing, listen to me carefully jaaaaannnnnnnnnnnuuuuuuuu don’t hide things from me, okay...??!! Don’t overthink alone, don’t lie to me, and please jyada raat tak mat jaga karoo  🤧 Take care of yourself babee the way I would if I was there with you. Your health, your peace, your smile means everything to me. I’m proud of you, I’m grateful for you, and I’m the luckiest that I get to love you. This year I promise to be support you more, annoy you more, and love you louder than everrrrr 😭❤️ I love you sooooooooooooooooooooooooooooooo soooooooooooooo3oooooooooooooooooooooooooooooooooooo muchhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh, alwayssssssssssssssssss and alwayssssssssssssssssss promisssssassssssssssssssssssssssssa. 💞✨</span>
    </div>
  `;
  app.appendChild(msgWrap);
  setTimeout(() => msgWrap.classList.add('show'), 600);

  // Floating/pulsing animation for message
  setInterval(() => msgWrap.classList.toggle('pulse'), 3200);

  // Memories section: overlapping, rotated, glowing
  const images = ['assets/images/photo1.jpeg', 'assets/images/photo2.jpeg', 'assets/images/photo3.jpeg'];
  const memories = document.createElement('div');
  memories.className = 'bolly-memories';
  memories.style.display = 'flex';
  memories.style.justifyContent = 'center';
  memories.style.alignItems = 'center';
  memories.style.gap = '3.5vw';
  memories.style.margin = '2.5em auto 1em auto';
  images.forEach((src, i) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Memory ${i+1}`;
    img.className = 'bolly-memory-img';
    img.style.width = '22vw';
    img.style.maxWidth = '260px';
    img.style.borderRadius = '18px';
    img.style.boxShadow = '0 4px 32px #ffd6d6, 0 2px 8px #e63946';
    img.style.objectFit = 'cover';
    img.style.transition = 'transform 0.4s, box-shadow 0.4s, opacity 0.7s';
    img.style.opacity = '0';
    setTimeout(() => { img.style.opacity = '1'; }, 1200 + i*400);
    img.addEventListener('mouseenter', () => {
      img.style.transform = 'scale(1.08) rotate(2deg)';
      img.style.boxShadow = '0 8px 40px #ffd6d6, 0 4px 16px #e63946';
    });
    img.addEventListener('mouseleave', () => {
      img.style.transform = 'scale(1)';
      img.style.boxShadow = '0 4px 32px #ffd6d6, 0 2px 8px #e63946';
    });
    img.addEventListener('touchstart', () => {
      img.style.transform = 'scale(1.08) rotate(2deg)';
      img.style.boxShadow = '0 8px 40px #ffd6d6, 0 4px 16px #e63946';
      setTimeout(() => {
        img.style.transform = 'scale(1)';
        img.style.boxShadow = '0 4px 32px #ffd6d6, 0 2px 8px #e63946';
      }, 1200);
    });
    memories.appendChild(img);
  });
  app.appendChild(memories);

  // Animate memories container
  setTimeout(() => memories.classList.add('show'), 1200);

  // Subtle background animation: floating hearts, light rays
  for (let i = 0; i < 24; i++) {
    setTimeout(() => {
      createFloatingHeartOrPetalPremium();
    }, i*300);
  }
  // No audio playback
}

// Premium floating hearts/petals for background
function createFloatingHeartOrPetalPremium() {
  const el = document.createElement('div');
  if (Math.random() > 0.5) {
    el.className = 'floating-heart-premium';
    el.innerHTML = `<svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 29s-13-8.35-13-16.5C3 6.5 8.5 3 16 10.5C23.5 3 29 6.5 29 12.5C29 20.65 16 29 16 29Z" fill="#e63946" stroke="#ffd700" stroke-width="2" filter="url(#glow)"/>
      <defs><filter id="glow"><feDropShadow dx="0" dy="0" stdDeviation="2" flood-color="#ffd700"/></filter></defs>
    </svg>`;
  } else {
    el.className = 'floating-petal-premium';
    el.innerHTML = `<svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="16" cy="16" rx="12" ry="6" fill="#ffd6d6"/>
      <ellipse cx="16" cy="16" rx="8" ry="3" fill="#ffb6b9"/>
    </svg>`;
  }
  el.style.left = `${Math.random()*90}vw`;
  el.style.top = `${100 + Math.random()*40}vh`;
  el.style.animationDuration = `${4 + Math.random()*3}s`;
  el.style.opacity = '0.7';
  document.body.appendChild(el);
  setTimeout(() => {
    if (el.parentNode) el.parentNode.removeChild(el);
  }, 7000);
}


// If you want floating hearts/petals, use createFloatingHeartOrPetalPremium or remove this loop.
for (let i = 0; i < 18; i++) {
  setTimeout(() => {
    createFloatingHeartOrPetalPremium();
  }, i*400);
}

// Start the experience
function startExperience() {
  countdownScreen(
    app,
    createParticles,
    () => createStartAgainButton(startExperience),
    () => cakeScreen(
      app,
      () => createStartAgainButton(startExperience),
      showerCelebration,
      showFinalScreen
    )
  );
}

window.addEventListener('DOMContentLoaded', startExperience);
