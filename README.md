# Lerne Deutsch

Free, self-contained German practice workbooks: lessons, memory diagrams, a cheat sheet and self-tests. Each level lives in its own folder and is a single HTML file with no build step and no backend.

| Level | Link | What's inside |
|---|---|---|
| A1 | [a1/](a1/) | Deutsch A1 Trainer: 14 lessons (grammar, letters and numbers, topics, Goethe-Zertifikat A1), a cheat sheet, 21 tests and a 10-question mixed test |
| A2 | coming later | |

## Structure

```
lerne-deutsch/
├── README.md
└── a1/
    └── index.html   (Deutsch A1 Trainer)
```

## Use it

- **Locally:** open `a1/index.html` in a browser.
- **Online for free:** upload the folder to GitHub and turn on GitHub Pages (Settings → Pages), or drag the folder onto app.netlify.com/drop. The trainer is then at `…/a1/`.

## Add a new level

Create a folder next to `a1/` (for example `a2/index.html`) and add a row to the table above.

Test scores are saved only in the visitor's own browser (localStorage).
