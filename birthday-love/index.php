<?php
$letterParagraphs = [
    'Sayangku,',
    'Selamat ulang tahun untuk seseorang yang begitu berarti dalam hidupku.',
    'Terima kasih sudah hadir dan membuat hari-hariku menjadi lebih indah.',
    'Aku mungkin tidak selalu bisa mengungkapkan semuanya dengan kata-kata, tapi aku ingin kamu tahu bahwa kehadiranmu sangat berarti bagiku.',
    'Semoga di usia barumu ini semua impianmu perlahan menjadi kenyataan.',
    'Semoga kamu selalu bahagia, sehat, dan dikelilingi orang-orang yang menyayangimu.',
    'Dan semoga aku masih bisa menjadi salah satu alasan kecil di balik senyummu.',
    'Happy Birthday, My Love ❤️',
    'I love you.'
];

$stats = [
    ['value' => 365, 'label' => '365 Days', 'suffix' => ''],
    ['value' => 12, 'label' => '12 Months', 'suffix' => ''],
    ['value' => 999, 'label' => 'Countless Memories', 'suffix' => '+'],
    ['value' => 1, 'label' => 'One Special Person', 'suffix' => '']
];

$gallery = [
    ['title' => 'First Memory ❤️', 'alt' => 'First memory together'],
    ['title' => 'That Beautiful Day', 'alt' => 'Beautiful day together'],
    ['title' => 'Your Sweet Smile', 'alt' => 'Sweet smile'],
    ['title' => 'One Of My Favorite Moments', 'alt' => 'Favorite moment'],
    ['title' => 'Us ❤️', 'alt' => 'Us together'],
    ['title' => 'Forever & Always', 'alt' => 'Forever and always']
];

$timeline = [
    ['title' => '✨ The Beginning', 'text' => 'Where our story started...'],
    ['title' => '❤️ The First Memory', 'text' => 'A moment I will always remember.'],
    ['title' => '🌹 Growing Together', 'text' => 'Every day became another beautiful memory.'],
    ['title' => '💍 Today', 'text' => 'And I hope there will be many more chapters.']
];

$reasons = [
    ['icon' => '❤️', 'title' => 'Your Smile', 'description' => 'Because your smile can make my worst day better.'],
    ['icon' => '🌸', 'title' => 'Your Kindness', 'description' => 'Your kindness makes you even more beautiful.'],
    ['icon' => '✨', 'title' => 'Your Presence', 'description' => 'Everything feels better when you are around.'],
    ['icon' => '🥰', 'title' => 'Your Personality', 'description' => 'I love the way you are.'],
    ['icon' => '💖', 'title' => 'Simply You', 'description' => 'Because you are you. And that is more than enough.']
];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Happy Birthday to my love.">
    <title>Happy Birthday, My Love</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:wght@600;700&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <div class="loading-screen" id="loadingScreen" aria-live="polite">
        <div class="loading-heart">❤️</div>
        <p>Preparing something special for you...</p>
        <div class="loading-bar" aria-hidden="true"><span></span></div>
    </div>

    <div class="floating-hearts" id="floatingHearts" aria-hidden="true"></div>
    <div class="sparkles-layer" id="sparklesLayer" aria-hidden="true"></div>
    <div class="cursor-dot" id="cursorDot" aria-hidden="true"></div>

    <audio id="bgMusic" loop preload="auto">
        <source src="assets/music/romantic.mp3" type="audio/mpeg">
    </audio>

    <div class="music-player" id="musicPlayer" aria-label="Music player">
        <div class="player-disc-wrap">
            <div class="player-disc"></div>
        </div>
        <div class="player-meta">
            <span class="now-playing">🎵 Now Playing</span>
            <strong>Our Song</strong>
        </div>
        <div class="player-controls">
            <button class="player-btn" type="button" data-action="toggle" aria-label="Play or pause music">▶</button>
            <button class="player-btn" type="button" data-action="mute" aria-label="Mute or unmute music">🔊</button>
        </div>
    </div>

    <main>
        <section class="hero section reveal" id="home">
            <div class="hero-badge">For the girl of my dreams</div>
            <h1>
                Happy Birthday, My Love <span class="pulse-heart">❤️</span>
            </h1>
            <p class="subtitle">Today is all about you.</p>
            <p class="scroll-text" id="typingLine">Scroll down for your little surprise...</p>
            <div class="hero-actions">
                <button class="primary-btn start-surprise" type="button" data-target="stats">Start the Surprise ✨</button>
            </div>
            <button class="hero-main-heart" id="heroHeart" type="button" aria-label="A secret heart">❤️</button>
            <div class="secret-toast" id="secretToast" aria-live="polite"></div>
        </section>

        <section class="section stats reveal" id="stats">
            <div class="section-heading">
                <p>Another Beautiful Year With You</p>
                <h2>Another Beautiful Year With You ❤️</h2>
            </div>
            <div class="stats-grid">
                <?php foreach ($stats as $stat): ?>
                    <article class="stat-card">
                        <span class="stat-number" data-target="<?= htmlspecialchars((string) $stat['value']) ?>" data-suffix="<?= htmlspecialchars((string) $stat['suffix']) ?>">0</span>
                        <small><?= htmlspecialchars((string) $stat['label']) ?></small>
                    </article>
                <?php endforeach; ?>
            </div>
        </section>

        <section class="section letter reveal" id="letter">
            <div class="section-heading">
                <p>A Little Letter For You</p>
                <h2>A Little Letter For You 💌</h2>
            </div>

            <div class="envelope-wrap">
                <button class="envelope" id="envelope" type="button" aria-label="Open love letter">
                    <div class="envelope-flap"></div>
                    <div class="envelope-front"></div>
                    <div class="envelope-paper"></div>
                </button>

                <article class="love-letter" id="loveLetter">
                    <?php foreach ($letterParagraphs as $paragraph): ?>
                        <p><?= htmlspecialchars($paragraph) ?></p>
                    <?php endforeach; ?>
                </article>
            </div>
        </section>

        <section class="section gallery reveal" id="memories">
            <div class="section-heading">
                <p>Our Little Memories</p>
                <h2>Our Little Memories 📸</h2>
            </div>
            <div class="gallery-grid">
                <?php foreach ($gallery as $index => $item): ?>
                    <button class="gallery-item" type="button" data-image="assets/images/photo<?= $index + 1 ?>.jpg" data-title="<?= htmlspecialchars($item['title']) ?>" aria-label="Open <?= htmlspecialchars($item['title']) ?>">
                        <img src="assets/images/photo<?= $index + 1 ?>.jpg" alt="<?= htmlspecialchars($item['alt']) ?>" loading="lazy">
                        <span><?= htmlspecialchars($item['title']) ?></span>
                    </button>
                <?php endforeach; ?>
            </div>
        </section>

        <section class="section story reveal" id="story">
            <div class="section-heading">
                <p>Our Story</p>
                <h2>Our Story ❤️</h2>
            </div>

            <div class="story-timeline">
                <?php foreach ($timeline as $item): ?>
                    <article class="story-item">
                        <div class="story-icon">♥</div>
                        <div class="story-content">
                            <h3><?= htmlspecialchars($item['title']) ?></h3>
                            <p><?= htmlspecialchars($item['text']) ?></p>
                        </div>
                    </article>
                <?php endforeach; ?>
            </div>
        </section>

        <section class="section reasons reveal" id="reasons">
            <div class="section-heading">
                <p>Reasons Why I Love You</p>
                <h2>Reasons Why I Love You ❤️</h2>
            </div>

            <div class="reasons-grid">
                <?php foreach ($reasons as $reason): ?>
                    <article class="reason-card">
                        <div class="reason-icon"><?= htmlspecialchars($reason['icon']) ?></div>
                        <h3><?= htmlspecialchars($reason['title']) ?></h3>
                        <p><?= htmlspecialchars($reason['description']) ?></p>
                    </article>
                <?php endforeach; ?>
            </div>
        </section>

        <section class="section surprise reveal" id="surprise">
            <button class="big-surprise-btn" id="openSurprise" type="button">Click For One More Surprise 💝</button>
        </section>

        <section class="section final reveal" id="final">
            <div class="final-heart">❤️</div>
            <h2>Happy Birthday, Beautiful ❤️</h2>
            <p>May your days always be filled with happiness.</p>
            <p class="signature">With all my love,<br>Your Favorite Person ❤️</p>
        </section>
    </main>

    <footer>
        Made with ❤️ especially for you.
    </footer>

    <div class="lightbox hidden" id="lightbox" role="dialog" aria-modal="true" aria-label="Photo preview">
        <button class="lightbox-close" id="lightboxClose" type="button" aria-label="Close photo preview">×</button>
        <img id="lightboxImage" src="" alt="Expanded memory preview">
        <p id="lightboxCaption"></p>
    </div>

    <div class="surprise-modal hidden" id="surpriseModal" role="dialog" aria-modal="true" aria-labelledby="surpriseTitle">
        <div class="surprise-content">
            <button class="surprise-close" id="surpriseClose" type="button" aria-label="Close surprise popup">×</button>
            <h3 id="surpriseTitle">YOU ARE MY FAVORITE PERSON ❤️</h3>
            <p>Thank you for being part of my life.</p>
            <button class="love-btn" id="loveBtn" type="button">I Love You Too ❤️</button>
            <p class="final-message" id="finalMessage">Forever starts with you. ❤️</p>
        </div>
    </div>

    <script src="assets/js/script.js"></script>
</body>
</html>
