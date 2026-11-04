# Lerne Deutsch

Free German practice workbooks by level: lessons with memory diagrams, a one-page cheat sheet and self-tests. Plain HTML, CSS and JavaScript: no build step, no backend.

| Level | Start page | What's inside |
|---|---|---|
| A1 | [a1/](a1/index.html) | Deutsch A1 Trainer: 14 lessons in 4 parts (grammar, letters and numbers, topics, Goethe-Zertifikat A1), a cheat sheet, 21 tests and a 10-question mixed test |
| A2 | coming later | |

Live site: https://lydialim.github.io/lerne-deutsch/

## Structure

```
lerne-deutsch/
├── README.md
├── index.html                landing page: choose a level
├── assets/                   shared by every level
│   ├── css/style.css         design system (colours: der blue, die red, das green, plural purple)
│   └── js/
│       ├── common.js         helpers + per-level browser storage
│       ├── layout.js         page header and level menu (reads window.LEVEL)
│       └── quiz.js           test engine (reads TESTS and GROUPS)
└── a1/
    ├── index.html            overview of all A1 lessons
    ├── grammatik.html        Teil A · lessons 1–7
    ├── zahlen.html           Teil B · lessons 8–9
    ├── themen.html           Teil C · lessons 10–13
    ├── pruefung.html         Teil D · lesson 14 + study tips
    ├── spickzettel.html      cheat sheet
    ├── tests.html            all tests (open one directly: tests.html#artikel)
    └── js/
        ├── level.js          A1 menu + storage prefix
        ├── data.js           word lists, sentences, number and time helpers
        ├── tests.js          A1 test definitions (TESTS, GROUPS)
        └── lessons.js        interactive parts of the lessons
```

## Where to change things

- **Lesson text:** edit the page for that part (`a1/grammatik.html`, …). Each lesson is one `<section class="lesson" id="l-…">`.
- **Test questions:** add items to the lists in `a1/js/data.js` (for example `NOUNS`, `WQ`, `ORDER`).
- **A new test:** add an entry to `TESTS` in `a1/js/tests.js` and its key to `GROUPS`. Link to it from a lesson with `<a class="go" href="tests.html#key">`.
- **Colours and fonts:** `assets/css/style.css`.

## Add a new level (for example A2)

1. Copy `a1/` to `a2/`.
2. In `a2/js/level.js`, change `id`, `level`, `title` and the menu.
3. Replace the lessons, `data.js` and `tests.js` with A2 content. `assets/` stays shared.
4. Add A2 to the table above and to the root `index.html`.

## Use it

- **Online:** GitHub Pages serves this repo at https://lydialim.github.io/lerne-deutsch/.
- **Locally:** open `index.html` in a browser.

Test scores are saved only in each visitor's own browser (localStorage).
