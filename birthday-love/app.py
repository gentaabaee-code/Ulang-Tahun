from __future__ import annotations

import json
from pathlib import Path
from textwrap import dedent

from flask import Flask, Response, send_from_directory

app = Flask(__name__)
PUBLIC_ASSETS = Path(__file__).resolve().parent / "public" / "assets"

LETTER_PARAGRAPHS = [
    "Untuk adekku tersayang,",
    "Selamat ulang tahun! Semoga hari ini penuh tawa, kejutan manis, dan makanan enak.",
    "Terima kasih sudah jadi adek yang selalu bikin suasana rumah lebih ramai.",
    "Walaupun kadang julidnya tajam dan komentarnya nggak ada rem, kamu tetap adek paling gemas dan selalu disayang.",
    "Semoga semua yang kamu cita-citakan satu per satu tercapai. Semoga sehat, bahagia, dan selalu dikelilingi orang-orang baik.",
    "Jangan lupa tetap jadi diri sendiri: seru, berani, dan sedikit julid biar rumah nggak sepi.",
    "Kalau hari ini kamu boleh minta apa saja, semoga terkabul—kecuali minta aku berhenti gangguin kamu.",
    "Selamat ulang tahun, Dek! 🎂🎉",
    "Sayang selalu dari kakakmu. 💛",
]

STATS = [
    {"value": 1, "label": "Adek Kesayangan", "suffix": ""},
    {"value": 100, "label": "Tingkat Kejulidan", "suffix": "%"},
    {"value": 999, "label": "Tingkah Bikin Ketawa", "suffix": "+"},
    {"value": 100, "label": "Disayang Kakak", "suffix": "%"},
]

GALLERY = [
    {"title": "Gaya Andalan Dek", "alt": "Foto adek kesayangan"},
    {"title": "Gaya Muka Cemberut", "alt": "Cemberut Terus"},
    {"title": "Senyum Dulu, Julid Kemudian", "alt": "Senyum manis adek"},
    {"title": "Foto Buang Muka", "alt": "Kenangan seru  adek"},
    {"title": "Senyum Julid", "alt": "Foto adek"},
    {"title": "Bintang Hari Ini", "alt": "Adek yang sedang berulang tahun"},
]

TIMELINE = [
    {"title": "🎈 Awal Cerita", "text": "Dari kecil sampai sekarang, selalu ada saja cerita tentang kamu."},
    {"title": "🎂 Momen Paling Diingat", "text": "Banyak momen kocak yang masih bikin kakak senyum sendiri."},
    {"title": "🎉 Makin Besar", "text": "Kamu tumbuh jadi adek yang hebat, seru, dan makin jago nge-julid."},
    {"title": "✨ Hari Ini", "text": "Semoga tahun barumu penuh petualangan dan hal-hal yang bikin bahagia."},
]

REASONS = [
    {"icon": "😄", "title": "Ketawamu", "description": "Bikin suasana langsung ramai dan ikut bikin kakak ketawa."},
    {"icon": "💬", "title": "Julidnya", "description": "Kadang pedas, tapi rumah jadi nggak pernah sepi."},
    {"icon": "🧁", "title": "Baik Hatinya", "description": "Di balik komentar pedas, kamu selalu perhatian."},
    {"icon": "🌟", "title": "Semangatnya", "description": "Kamu berani mencoba hal baru dan terus berkembang."},
    {"icon": "🎁", "title": "Jadi Dirimu", "description": "Adek paling unik, paling gemas, dan selalu disayang."},
]


def render_page() -> str:
    story_items = "".join(
        f'''
        <article class="story-item">
            <div class="story-icon">🎉</div>
            <div class="story-content">
                <h3>{item["title"]}</h3>
                <p>{item["text"]}</p>
            </div>
        </article>
        '''
        for item in TIMELINE
    )

    gallery_items = "".join(
        f'''
        <button class="gallery-item" type="button" data-image="/assets/images/photo{index + 1}.png" data-title="{item['title']}" aria-label="Open {item['title']}">
            <img src="/assets/images/photo{index + 1}.png" alt="{item['alt']}" loading="lazy">
            <span>{item['title']}</span>
        </button>
        '''
        for index, item in enumerate(GALLERY)
    )

    stats_cards = "".join(
        f'''
        <article class="stat-card">
            <span class="stat-number" data-target="{item['value']}" data-suffix="{item['suffix']}">0</span>
            <small>{item['label']}</small>
        </article>
        '''
        for item in STATS
    )

    reasons_cards = "".join(
        f'''
        <article class="reason-card">
            <div class="reason-icon">{item['icon']}</div>
            <h3>{item['title']}</h3>
            <p>{item['description']}</p>
        </article>
        '''
        for item in REASONS
    )

    letter_paragraphs = "".join(f"<p>{paragraph}</p>" for paragraph in LETTER_PARAGRAPHS)

    return dedent(
        f"""
        <!DOCTYPE html>
        <html lang="id">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="description" content="Ucapan ulang tahun spesial untuk adek kesayangan, meski suka julid.">
            <title>Selamat Ulang Tahun, Dek!</title>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:wght@600;700&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
            <link rel="stylesheet" href="/assets/css/style.css">
        </head>
        <body>
            <div class="loading-screen" id="loadingScreen" aria-live="polite">
                <div class="loading-heart">🎂</div>
                <p>Menyiapkan kejutan kecil buat adek...</p>
                <div class="loading-bar" aria-hidden="true"><span></span></div>
            </div>

            <div class="floating-balloons" id="floatingBalloons" aria-hidden="true"></div>
            <div class="sparkles-layer" id="sparklesLayer" aria-hidden="true"></div>
            <div class="cursor-dot" id="cursorDot" aria-hidden="true"></div>

            <audio id="bgMusic" loop preload="auto">
                <source src="/assets/music/romantic.mp3" type="audio/mpeg">
            </audio>

            <div class="music-player" id="musicPlayer" aria-label="Music player">
                <div class="player-disc-wrap">
                    <div class="player-disc"></div>
                </div>
                <div class="player-meta">
                    <span class="now-playing">🎵 Musik latar</span>
                    <strong>Lagu Favorit</strong>
                </div>
                <div class="player-controls">
                    <button class="player-btn" type="button" data-action="toggle" aria-label="Play or pause music">▶</button>
                    <button class="player-btn" type="button" data-action="mute" aria-label="Mute or unmute music">🔊</button>
                </div>
            </div>

            <main>
                <section class="hero section reveal" id="home">
                    <div class="hero-badge">Hari spesial adek kesayangan 🎈</div>
                    <h1>
                        Selamat Ulang Tahun, Dek! <span class="pulse-heart">🎂</span>
                    </h1>
                    <p class="subtitle">Hari ini panggungnya kamu—meski besok tetap suka julid. 😜</p>
                    <p class="scroll-text" id="typingLine">Yuk, lihat kejutan kecil dari kakak...</p>
                    <div class="hero-actions">
                        <button class="primary-btn start-surprise" type="button" data-target="stats">Mulai Kejutannya ✨</button>
                    </div>
                    <button class="hero-main-heart" id="heroHeart" type="button" aria-label="Klik untuk kejutan rahasia">🎁</button>
                    <div class="secret-toast" id="secretToast" aria-live="polite"></div>
                </section>

                <section class="section stats reveal" id="stats">
                    <div class="section-heading">
                        <p>Nambah umur, nambah seru</p>
                        <h2>Seberapa Spesial Adek? 🎉</h2>
                    </div>
                    <div class="stats-grid">
                        {stats_cards}
                    </div>
                </section>

                <section class="section letter reveal" id="letter">
                    <div class="section-heading">
                        <p>Pesan kecil dari kakak</p>
                        <h2>Surat Kecil Buat Adek 💌</h2>
                    </div>

                    <div class="envelope-wrap">
                        <button class="envelope" id="envelope" type="button" aria-label="Buka surat dari kakak">
                            <div class="envelope-flap"></div>
                            <div class="envelope-front"></div>
                            <div class="envelope-paper"></div>
                        </button>

                        <article class="love-letter" id="loveLetter">
                            {letter_paragraphs}
                        </article>
                    </div>
                </section>

                <section class="section gallery reveal" id="memories">
                    <div class="section-heading">
                        <p>Galeri si paling julid</p>
                        <h2>Kenangan Foto Adek 📸</h2>
                    </div>
                    <div class="gallery-grid">
                        {gallery_items}
                    </div>
                </section>

                <section class="section story reveal" id="story">
                    <div class="section-heading">
                        <p>Cerita kita dari dulu</p>
                        <h2>Kakak & Adek 🎈</h2>
                    </div>

                    <div class="story-timeline">
                        {story_items}
                    </div>
                </section>

                <section class="section reasons reveal" id="reasons">
                    <div class="section-heading">
                        <p>Hal-hal yang bikin kakak sayang</p>
                        <h2>Kenapa Adek Spesial? 🌟</h2>
                    </div>

                    <div class="reasons-grid">
                        {reasons_cards}
                    </div>
                </section>

                <section class="section surprise reveal" id="surprise">
                    <button class="big-surprise-btn" id="openSurprise" type="button">Klik untuk Kejutan Lagi 🎁</button>
                </section>

                <section class="section final reveal" id="final">
                    <div class="final-heart">🎂</div>
                    <h2>Selamat Ulang Tahun, Adek Hebat! 🎉</h2>
                    <p>Semoga harimu penuh tawa, bahagia, dan semua hal yang kamu suka.</p>
                    <p class="signature">Dari kakak yang selalu sayang,<br>meski sering kamu julidin 💛</p>
                </section>
            </main>

            <footer>
                Dibuat dengan sayang (dan sedikit sabar menghadapi julidmu) 💛
            </footer>

            <div class="lightbox hidden" id="lightbox" role="dialog" aria-modal="true" aria-label="Photo preview">
                <button class="lightbox-close" id="lightboxClose" type="button" aria-label="Close photo preview">×</button>
                <img id="lightboxImage" src="" alt="Expanded memory preview">
                <p id="lightboxCaption"></p>
            </div>

            <div class="surprise-modal hidden" id="surpriseModal" role="dialog" aria-modal="true" aria-labelledby="surpriseTitle">
                <div class="surprise-content">
                    <button class="surprise-close" id="surpriseClose" type="button" aria-label="Close surprise popup">×</button>
                    <h3 id="surpriseTitle">SELAMAT ULANG TAHUN, DEK! 🎂</h3>
                    <p>Semoga semua doa baikmu terkabul. Untuk hari ini, kakak maafkan semua julidmu. 😜</p>
                    <button class="love-btn" id="loveBtn" type="button">Peluk Kakak 🤗</button>
                    <p class="final-message" id="finalMessage">Adek tetap jadi favorit kakak—bahkan saat lagi julid. 💛</p>
                </div>
            </div>

            <script src="/assets/js/script.js"></script>
        </body>
        </html>
        """
    ).strip()


@app.get("/")
def home() -> Response:
    return Response(render_page(), mimetype="text/html")


@app.get("/assets/<path:filename>")
def serve_asset(filename: str) -> Response:
    return send_from_directory(PUBLIC_ASSETS, filename)


@app.get("/api")
@app.get("/api/")
def api_payload() -> Response:
    payload = {
        "status": "success",
        "message": "Kejutan ulang tahun untuk adek kesayangan sudah siap.",
        "project": "birthday-love",
        "for": "Adek kesayangan",
        "type": "ucapan ulang tahun untuk adek",
    }
    return Response(json.dumps(payload, ensure_ascii=False, indent=2), mimetype="application/json")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
