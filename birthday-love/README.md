# Ulang Tahun Adek Kesayangan

Website ucapan ulang tahun untuk adek kesayangan, lengkap dengan galeri foto, surat dari kakak, musik, dan kejutan kecil. Dibuat dengan Python, HTML5, CSS3, dan vanilla JavaScript, serta tetap menggunakan konfigurasi deploy Vercel yang sudah ada.

## Project structure

```text
birthday-love/
├── app.py
├── public/
│   └── assets/
│       ├── css/
│       │   └── style.css
│       ├── js/
│       │   └── script.js
│       ├── images/
│       │   ├── photo1.jpg
│       │   ├── photo2.jpg
│       │   ├── photo3.jpg
│       │   ├── photo4.jpg
│       │   ├── photo5.jpg
│       │   └── photo6.jpg
│       └── music/
│           └── romantic.mp3
├── requirements.txt
├── vercel.json
├── README.md
```

## Local run

1. Open the project folder and create a virtual environment:

```bash
python -m venv .venv
```

2. Activate it and install dependencies:

Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

macOS/Linux:

```bash
source .venv/bin/activate
pip install -r requirements.txt
```

3. Run the app:

```bash
python app.py
```

4. Open the browser and visit:

```text
http://localhost:8000/
```

## Mengubah ucapan dan foto

Teks surat dan bagian halaman diatur di `app.py`. Untuk mengganti foto, timpa `public/assets/images/photo1.png` sampai `photo6.png` dengan foto pilihan; nama file dan lokasinya harus tetap sama agar galeri langsung menampilkannya.

## Vercel deployment

Vercel detects the Flask app in `app.py` and installs dependencies from `requirements.txt`. Static files are in `public/assets` and are served by Vercel's CDN.

Important:
- `app.py` is the Flask entry point and handles the homepage and `/api` endpoint.
- Put static files under `public/` so Vercel serves them directly.
- `requirements.txt` installs Flask for the serverless app.
- `vercel.json` contains the Vercel configuration schema; no custom routes or legacy PHP runtime are required.

### Deploy to Vercel

1. Push this project to a Git repository.
2. Import the repository in Vercel.
3. Set the project root to the `birthday-love` folder if the repository contains other projects.
4. Keep the detected Flask framework preset and default build settings.
5. Deploy.

Alternatively, from the project folder, install the Vercel CLI and run `vercel` for a preview deployment or `vercel --prod` for production.

## Notes

- No database is used.
- Assets are local and lightweight.
- The page is responsive and optimized for phone, tablet, laptop, and desktop screens.
- Music only starts after user interaction because browsers block autoplay.
