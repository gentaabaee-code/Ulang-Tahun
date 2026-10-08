document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    const floatingHearts = document.getElementById('floatingHearts');
    const sparklesLayer = document.getElementById('sparklesLayer');
    const musicPlayer = document.getElementById('musicPlayer');
    const bgMusic = document.getElementById('bgMusic');
    const envelope = document.getElementById('envelope');
    const revealEls = document.querySelectorAll('.reveal');
    const statNumbers = document.querySelectorAll('.stat-number');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    const surpriseModal = document.getElementById('surpriseModal');
    const surpriseClose = document.getElementById('surpriseClose');
    const openSurpriseBtn = document.getElementById('openSurprise');
    const loveBtn = document.getElementById('loveBtn');
    const finalMessage = document.getElementById('finalMessage');
    const secretToast = document.getElementById('secretToast');
    const heroHeart = document.getElementById('heroHeart');
    const primaryButtons = document.querySelectorAll('.start-surprise');
    const cursorDot = document.getElementById('cursorDot');

    let secretClicks = 0;
    let musicStarted = false;

    function hideLoadingScreen() {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 1600);
    }

    function createFloatingHearts() {
        const heartSymbols = ['❤', '♡', '♥', '❤'];
        const total = 24;

        for (let i = 0; i < total; i++) {
            const heart = document.createElement('span');
            heart.className = 'floating-heart';
            heart.textContent = heartSymbols[i % heartSymbols.length];
            heart.style.left = `${Math.random() * 100}%`;
            heart.style.animationDuration = `${12 + Math.random() * 12}s`;
            heart.style.fontSize = `${Math.random() * 1.4 + 0.8}rem`;
            heart.style.opacity = `${Math.random() * 0.8 + 0.2}`;
            heart.style.setProperty('--drift-x', `${(Math.random() - 0.5) * 180}px`);
            heart.style.setProperty('--rotate', `${Math.random() * 240 - 120}deg`);
            floatingHearts.appendChild(heart);
        }
    }

    function createSparkles() {
        const total = 26;

        for (let i = 0; i < total; i++) {
            const sparkle = document.createElement('span');
            sparkle.className = 'sparkle';
            sparkle.style.left = `${Math.random() * 100}%`;
            sparkle.style.top = `${Math.random() * 100}%`;
            sparkle.style.width = `${Math.random() * 5 + 3}px`;
            sparkle.style.height = sparkle.style.width;
            sparkle.style.animationDuration = `${3 + Math.random() * 4}s`;
            sparkle.style.animationDelay = `${Math.random() * 2}s`;
            sparkle.style.setProperty('--dx', `${(Math.random() - 0.5) * 120}px`);
            sparkle.style.setProperty('--dy', `${(Math.random() - 0.5) * 120}px`);
            sparklesLayer.appendChild(sparkle);
        }
    }

    function toggleMusic(forcePlay) {
        if (!bgMusic) return;

        if (typeof forcePlay === 'boolean') {
            if (forcePlay) {
                bgMusic.play().catch(() => {});
            } else {
                bgMusic.pause();
            }
            return;
        }

        if (bgMusic.paused) {
            bgMusic.play().catch(() => {});
            musicPlayer.classList.add('playing');
        } else {
            bgMusic.pause();
            musicPlayer.classList.remove('playing');
        }
    }

    function unlockMusic() {
        if (!musicStarted) {
            musicStarted = true;
            bgMusic.volume = 0.6;
            bgMusic.muted = false;
            bgMusic.load();
            toggleMusic(true);
        }
    }

    function animateCounters() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    const numberEl = entry.target.querySelector('.stat-number');
                    if (!numberEl || numberEl.dataset.animated === 'true') return;
                    const target = Number(numberEl.dataset.target || 0);
                    const suffix = numberEl.dataset.suffix || '';
                    let current = 0;
                    const step = Math.max(1, Math.ceil(target / 80));
                    const timer = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        numberEl.textContent = `${current}${suffix}`;
                    }, 25);
                    numberEl.dataset.animated = 'true';
                }
            });
        }, { threshold: 0.35 });

        statNumbers.forEach((number) => {
            number.textContent = '0';
            observer.observe(number.closest('.stat-card'));
        });
    }

    function observeReveal() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.12 });

        revealEls.forEach((el) => observer.observe(el));
    }

    function openLightbox(imageSrc, caption) {
        lightboxImage.src = imageSrc;
        lightboxImage.alt = caption;
        lightboxCaption.textContent = caption;
        lightbox.classList.remove('hidden');
        lightbox.classList.add('visible');
    }

    function closeLightbox() {
        lightbox.classList.remove('visible');
        lightbox.classList.add('hidden');
    }

    function triggerHeartBurst(x, y) {
        const burstCount = 18;
        for (let i = 0; i < burstCount; i++) {
            const heart = document.createElement('span');
            heart.textContent = '❤';
            heart.style.position = 'fixed';
            heart.style.left = `${x}px`;
            heart.style.top = `${y}px`;
            heart.style.fontSize = `${12 + Math.random() * 16}px`;
            heart.style.color = i % 2 === 0 ? '#ff9fc8' : '#ffd9e8';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '150';
            heart.style.transform = 'translate(-50%, -50%)';
            heart.style.animation = `floatUp 1.2s ease-out forwards`;
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 1200);
        }
    }

    function addConfetti() {
        for (let i = 0; i < 28; i++) {
            const piece = document.createElement('span');
            piece.style.position = 'fixed';
            piece.style.left = `${Math.random() * window.innerWidth}px`;
            piece.style.top = '-20px';
            piece.style.width = `${6 + Math.random() * 8}px`;
            piece.style.height = `${10 + Math.random() * 14}px`;
            piece.style.background = ['#ff8ecb', '#ffd7a8', '#fce1f2', '#ffb4c7'][Math.floor(Math.random() * 4)];
            piece.style.borderRadius = '50%';
            piece.style.pointerEvents = 'none';
            piece.style.zIndex = '150';
            piece.style.transform = 'translateY(0) rotate(0deg)';
            piece.style.animation = `dropPiece ${2.6 + Math.random() * 1.4}s ease-in forwards`;
            document.body.appendChild(piece);
            setTimeout(() => piece.remove(), 3600);
        }
    }

    const dropPieceStyle = document.createElement('style');
    dropPieceStyle.textContent = `
        @keyframes dropPiece {
            0% { transform: translate3d(0, 0, 0) rotate(0deg); opacity: 0; }
            15% { opacity: 1; }
            100% { transform: translate3d(${Math.random() * 200 - 100}px, ${window.innerHeight + 100}px, 0) rotate(${Math.random() * 240 - 120}deg); opacity: 0; }
        }
    `;
    document.head.appendChild(dropPieceStyle);

    function triggerSurpriseModal() {
        surpriseModal.classList.remove('hidden');
        surpriseModal.classList.add('visible');
        addConfetti();
        triggerHeartBurst(window.innerWidth / 2, window.innerHeight / 2);
    }

    function closeSurpriseModal() {
        surpriseModal.classList.add('hidden');
        surpriseModal.classList.remove('visible');
    }

    function showSecretToast(message) {
        secretToast.textContent = message;
        secretToast.classList.add('visible');
        clearTimeout(showSecretToast.timeoutId);
        showSecretToast.timeoutId = setTimeout(() => {
            secretToast.classList.remove('visible');
        }, 2200);
    }

    if (envelope) {
        envelope.addEventListener('click', () => {
            envelope.classList.toggle('open');
        });
        envelope.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                envelope.click();
            }
        });
    }

    galleryItems.forEach((item) => {
        item.addEventListener('click', () => {
            const imageSrc = item.dataset.image;
            const title = item.dataset.title || 'Memory';
            openLightbox(imageSrc, title);
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeLightbox();
            closeSurpriseModal();
        }
    });

    if (surpriseClose) {
        surpriseClose.addEventListener('click', closeSurpriseModal);
    }

    surpriseModal.addEventListener('click', (event) => {
        if (event.target === surpriseModal) {
            closeSurpriseModal();
        }
    });

    openSurpriseBtn.addEventListener('click', triggerSurpriseModal);
    loveBtn.addEventListener('click', () => {
        finalMessage.classList.add('visible');
        for (let i = 0; i < 18; i++) {
            const burst = document.createElement('span');
            burst.textContent = '❤';
            burst.style.position = 'fixed';
            burst.style.left = `${Math.random() * window.innerWidth}px`;
            burst.style.top = `${Math.random() * window.innerHeight}px`;
            burst.style.fontSize = `${18 + Math.random() * 20}px`;
            burst.style.color = '#ff74b0';
            burst.style.pointerEvents = 'none';
            burst.style.zIndex = '160';
            burst.style.animation = 'heartbeat 1.2s ease-in-out forwards';
            document.body.appendChild(burst);
            setTimeout(() => burst.remove(), 1200);
        }
    });

    primaryButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const target = document.getElementById(button.dataset.target || 'stats');
            target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            unlockMusic();
        });
    });

    heroHeart.addEventListener('click', () => {
        secretClicks += 1;
        triggerHeartBurst(heroHeart.getBoundingClientRect().left + 30, heroHeart.getBoundingClientRect().top + 30);
        if (secretClicks >= 5) {
            showSecretToast('You found a secret ❤️');
            setTimeout(() => {
                showSecretToast('I love you more than yesterday, but less than tomorrow.');
            }, 600);
            secretClicks = 0;
        }
    });

    document.addEventListener('pointermove', (event) => {
        if (window.matchMedia('(pointer: coarse)').matches) return;
        cursorDot.style.left = `${event.clientX}px`;
        cursorDot.style.top = `${event.clientY}px`;
        if (Math.random() > 0.7) {
            const sparkle = document.createElement('span');
            sparkle.textContent = '✦';
            sparkle.style.position = 'fixed';
            sparkle.style.left = `${event.clientX}px`;
            sparkle.style.top = `${event.clientY}px`;
            sparkle.style.fontSize = `${Math.random() * 10 + 12}px`;
            sparkle.style.opacity = '0.8';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '120';
            sparkle.style.animation = 'heartbeat 0.8s ease-out forwards';
            document.body.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 700);
        }
    });

    const startMusicInteractions = () => {
        unlockMusic();
        document.removeEventListener('pointerdown', startMusicInteractions);
        document.removeEventListener('touchstart', startMusicInteractions);
        document.removeEventListener('keydown', startMusicInteractions);
    };

    document.addEventListener('pointerdown', startMusicInteractions, { once: true });
    document.addEventListener('touchstart', startMusicInteractions, { once: true });
    document.addEventListener('keydown', startMusicInteractions, { once: true });

    const playerToggle = document.querySelector('[data-action="toggle"]');
    const playerMute = document.querySelector('[data-action="mute"]');

    if (playerToggle) {
        playerToggle.addEventListener('click', () => {
            toggleMusic();
            if (bgMusic.paused) {
                playerToggle.textContent = '▶';
            } else {
                playerToggle.textContent = '❚❚';
            }
        });
    }

    if (playerMute) {
        playerMute.addEventListener('click', () => {
            bgMusic.muted = !bgMusic.muted;
            playerMute.textContent = bgMusic.muted ? '🔇' : '🔊';
        });
    }

    bgMusic.addEventListener('play', () => {
        musicPlayer.classList.add('playing');
        if (playerToggle) playerToggle.textContent = '❚❚';
    });

    bgMusic.addEventListener('pause', () => {
        musicPlayer.classList.remove('playing');
        if (playerToggle) playerToggle.textContent = '▶';
    });

    hideLoadingScreen();
    createFloatingHearts();
    createSparkles();
    observeReveal();
    animateCounters();
    if (window.matchMedia('(pointer: coarse)').matches) {
        cursorDot.style.display = 'none';
    }
});
