# Pró-Ativa Raffle (proativaRaffle_v1)

Small static single-page site for the "Pró-Ativa Eletrônica" raffle interface — built with plain HTML, CSS and vanilla JavaScript and ready to be hosted on GitHub Pages.

Demo: open `index.html` locally or serve it with a static server (see below).

## What it does

- Displays raffle information (price, sold tickets, total) that can be updated from a Google Sheets published as CSV.
- Shows a main video card (YouTube thumbnail) and opens the video in a floating modal player.
- Project video buttons open their videos in a new browser tab.
- Purchase/form links are populated dynamically from the sheet.

## Project structure

```
proativaRaffle_v1/
├── index.html
├── README.MD
├── assets/
│   └── img/
├── css/
│   └── main.css
└── js/
	└── main.js
```

## Main files

- `index.html` — single-page markup and elements referenced by the script.
- `css/main.css` — styles extracted from the HTML.
- `js/main.js` — site logic: loading configuration from the sheet, applying texts/hrefs, and controlling the video modal.
- `assets/img/` — images (logos, placeholder, etc.).

## Data source (Google Sheets)

The site loads configuration from a Google Sheet published as CSV. The published CSV URL is currently hardcoded in `js/main.js` as the `SHEET_CSV_URL` constant.

Expected format (simple CSV with header `key,value`):

```
key,value
googleFormUrl,https://forms.gle/...
raffle_price,10
raffle_sold,320
raffle_total,1000
videoUrl,https://youtu.be/...
instagram_link,https://instagram.com/...
graaf_link,https://youtube.com/...
manus_link,https://youtube.com/...
eletroway_link,https://youtube.com/...
```

Mapped keys in `js/main.js` include: `googleFormUrl`, `raffle_price`, `raffle_sold`, `raffle_total`, `daysLeftText`, `videoUrl`, `instagram_link`, `graaf_link`, `manus_link`, `eletroway_link`.

## Running locally

Quick options:

1) Open directly

Open `index.html` in your browser to view the static layout. Note: some features that fetch the published CSV may require serving the files (CORS or browser restrictions).

2) Local static server (recommended)

```bash
# Python 3
python -m http.server 8000
# then open http://localhost:8000/
```

## Testing and debugging

- Open the browser DevTools and look for logs prefixed with `[config]` to debug the sheet fetch.
- If configuration values do not load, check the `SHEET_CSV_URL` value in `js/main.js` and verify the sheet is published as CSV.

## Implementation notes

- No build step — intentionally lightweight for static hosting (GitHub Pages).
- Styles and scripts follow repository conventions: color tokens in `:root` and utility-like classes (`.card`, `.btn`, `.hero`).
- Recent changes included extracting CSS/JS from `index.html`, adding CSV-sheet fetching, a floating video modal, and project video links opening in new tabs.

## Contributing

Small focused contributions are welcome — open a PR. For behavior changes (for example, changing how the CSV is consumed), update `js/main.js` and document the change in `README.MD`.

## License

No license specified — use according to agreement with the project maintainer.

