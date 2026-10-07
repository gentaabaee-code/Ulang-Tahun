# Birthday Love Website

A romantic birthday landing page built with PHP native, HTML5, CSS3, and vanilla JavaScript. It is designed to work in XAMPP/localhost and can also be adapted for Vercel deployment.

## Project structure

```text
birthday-love/
├── index.php
├── vercel.json
├── README.md
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   ├── images/
│   │   ├── photo1.jpg
│   │   ├── photo2.jpg
│   │   ├── photo3.jpg
│   │   ├── photo4.jpg
│   │   ├── photo5.jpg
│   │   └── photo6.jpg
│   └── music/
│       └── romantic.mp3
└── api/
    └── index.php
```

## Local run (XAMPP / localhost)

1. Copy the folder `birthday-love` into your local web root.
2. Start Apache in XAMPP.
3. Open the browser and visit:

```text
http://localhost/birthday-love/
```

If your local root is different, adjust the URL accordingly.

## Editing the letter text

The main love letter text is centralized in `index.php` at the top of the file inside the `$letterParagraphs` array. You can modify the text there easily.

## Vercel notes

Vercel does not run a plain PHP application the same way as a traditional server like XAMPP. For a PHP-backed project on Vercel, the usual setup is to use a serverless PHP runtime and route requests through `api/*.php`.

This project includes a Vercel-compatible PHP configuration in `vercel.json`.

Important:
- `index.php` is the main frontend page for local development.
- `api/index.php` provides the serverless PHP endpoint used by Vercel.
- `vercel.json` tells Vercel to route PHP requests using `vercel-php@0.7.3`.

## Deploy to Vercel

1. Push this project into a Git repository.
2. Import the repository in Vercel.
3. Set the root folder to the project directory.
4. Deploy.

If Vercel reports a runtime issue, confirm that the project contains the `vercel.json` configuration and that the `api/*.php` files are correct.

## Notes

- No database is used.
- Assets are local and lightweight.
- The page is responsive and optimized for phone, tablet, laptop, and desktop screens.
- Music only starts after user interaction because browsers block autoplay.
