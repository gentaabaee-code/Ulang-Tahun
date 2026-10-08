# Birthday Love Website

A romantic birthday landing page built with Python, HTML5, CSS3, and vanilla JavaScript. It is configured for Vercel deployment and uses Flask to serve the page and API endpoint.

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

## Editing the letter text

The main love letter text is centralized in `app.py` inside the `LETTER_PARAGRAPHS` list. Adjust the text there to personalize the message.

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
