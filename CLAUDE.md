# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

"Lerne Deutsch": static German-learning workbooks, one folder per CEFR level (only `a1/` exists). Plain HTML, CSS and vanilla JavaScript. There is no build step, package manager, linter or test suite, and no git repo here. To check a change, open `index.html` (or a page under `a1/`) in a browser. Pages are served from GitHub Pages, so keep all links relative. Content is bilingual: German first, with English in `<span class="en">(…)</span>`. Keep that convention in new text. `README.md` has the full file tree.

## Architecture

**Shared code (`assets/`) vs per-level code (`a1/`).** `assets/js/*` and `assets/css/style.css` serve every level. Everything level-specific sits in `<level>/js/` and is wired in through globals, with no modules or imports. Script load order in each HTML page therefore matters.

- `a1/js/level.js` sets `window.LEVEL` (id, title, top-nav `pages`, and `parts`, the lesson list for the phone lesson menu). `assets/js/common.js` reads `LEVEL.id` to prefix every localStorage key (`lstore`, e.g. `a1:best`). `assets/js/layout.js` builds the header, tabs, bottom bar and lesson sheet into `<header id="site-header">` and `<footer id="site-footer">`. The footer text for all pages lives in `layout.js`.
- `a1/js/tests.js` defines the globals `TESTS`, `GROUPS` and `RULES`, which `assets/js/quiz.js` consumes. The `quiz.js` header comment documents the test and question object shapes (`kind` choice/input/order/mixed, `say` for listening, and so on). `tests.html#<key>` opens a test directly. `data.js` holds all the word lists that the test `gen()` functions, the picture cards and the lessons draw from. `lessons.js` drives the interactive widgets inside lessons.
- `assets/js/speech.js` adds 🔊 buttons automatically to `.train`, `[data-say]` and table columns headed Beispiel/Deutsch/Satz/Wort.

**Lessons are hand-written HTML.** Each lesson is a `<section class="lesson" id="l-…">` in one of `grammatik.html`, `zahlen.html`, `themen.html` or `pruefung.html`. Each lesson page also has its own `<nav class="subnav">` of anchors.

## Lessons

Lessons are numbered 1–23 with no "+" add-ons. Folded sub-lessons are `<h3 class="sub" id="l-…">` inside their parent section (the old ids still work as anchors but are not in the menu). Only top-level `section.lesson` ids belong in `level.js` `parts` and the `.subnav`.

## Keep in sync

Adding, renaming or reordering a lesson means updating all of these:

1. The `<section>` in its page.
2. That page's `.subnav` links.
3. `parts` in `a1/js/level.js` (the phone lesson menu).
4. `a1/index.html` (the overview) and the lesson counts in `README.md`.

Adding a test means adding it to `TESTS` and its key to `GROUPS` in `tests.js`, otherwise it won't show up on the tests page.

## New level

Copy `a1/` to `a2/`, then edit `level.js` (`id`, `level`, `title`, menu), replace the content files, and add the level to the root `index.html` and the README table. `assets/` stays shared.

## Design

Gender colours are part of the design system in `assets/css/style.css`: der = blue, die = red, das = green, plural = purple. Use the existing CSS variables (`--der`, `--die`, `--das`) rather than new colours. Fonts are self-hosted in `assets/fonts/`, with no external requests (the footer's privacy note promises no cookies, tracking or external fonts), so don't add CDN scripts, fonts or analytics.
