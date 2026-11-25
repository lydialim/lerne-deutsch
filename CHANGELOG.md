# Changelog

Changes to the lerne-deutsch practice site from **11 Nov to 25 Nov 2026**.
Automatic "Update footer date and cache version [skip ci]" commits are left out.

## 24 Nov 2026

### Added
- **Buchseiten:** workbook pages 58, 59, 62, 65, 132, 136–139 and 142–143 from the 24 Nov class.

## 19 Nov 2026

### Added
- **Deutsch entdecken** (new page, was the der/die/das explainer). It is now a hub for language facts, and gender is its first topic:
  - detective steps, an endings explorer, meaning groups, exceptions and history
  - donut diagram with legend, labelled comparison bars, and a takeaway line
  - why articles change with the case
  - why twin words (homonyms) differ, shown with the full article + word, plural and English meaning
  - what Duden, CELEX and HaGenLex are; "Wie oft" percentages and noun totals per source
  - Mark Twain references
- **Familie lesson:**
  - family tree picture with Papa/Mama, and more tap-to-hear scene and picture cards
  - Geschwister and mein/meine/mein (Kursbuch S. 55)
  - Urgroß-, Stief- and Schwieger- words, cousin, and an aunt/uncle table
  - Neffe, Nichte, Halbbruder/-schwester, an Enkel row in the tree, and Stammbaum
  - Possessivartikel table for all persons (S. 56)
- **Grammatik:** haben in the verb table, Perfekt (with a test), Imperativ du/ihr/Sie.
- **Bildkarten:** explain why a noun is der/die/das (ending, compound, meaning group, exceptions), with links to Deutsch entdecken. Drinks: why *das* Bier, and a coffee/tea group.
- **Uhrzeit:** when to use official vs everyday time, building blocks, clock picture, and an ordered 5-minute table. *nach* is shown as plus and *vor* as minus.
- **Stories and dialogues pages:** tap-to-translate reading view, one illustration per story, longer stories, two news reports, sentence cards with word-by-word gloss plus English, tap a sentence to listen, one translation switch and a jump list.
- **Buchseiten:** card layout with the last class on top, a page jump bar, tap-to-hear page numbers, and page 56.
- Word and question totals shown on the site.
- Footer date updated automatically by a GitHub Action.

### Changed
- **Familie** reorganised into 5 parts: tree, words, S. 55 grammar, speaking, listening.
- **Navigation:** mobile "Mehr" tab and menu sheet, tile-based overview. The bottom bar is site-wide; the black bar and the lesson menu show only this page's sections. All lessons moved to the Mehr pane.
- **Overview:** Deutsch entdecken first as a featured tile; groups mirror the Mehr menu.
- **Cheat sheet** refreshed: clock words, times-of-day bar, Mein Tag.
- die/der/das order used everywhere.
- Generic exam wording.
- `data.js` / `karten.js` split so pages load only what they need; scripts deferred.
- Every script (not only the CSS) is cache-busted and versioned automatically on each push.

### Fixed
- German accuracy fixes: Donnerstag, Viertel, loan words, capitals, Cola/Joghurt/E-Mail/Butter notes, the -o tendency, the Airbus exception.
- Hundreds/ones order label on numbers.
- Alphabet guide fixes and new pronunciation visuals.
- Mobile: horizontal overflow of the word grid, cut-off lesson scenes, even 2-column word tiles, case table fit, Mädchen line break, hidden empty detail boxes.
- Timeline keeps inline bold/italic inline.
- Stale counts.

## 18 Nov 2026

### Added
- Footer shows the last-updated date.

## 17 Nov 2026

### Added
- **Buchseiten** reference page.
- Mein Tag, time-of-day and clock words, and 17 new cards from the course sessions.

### Changed
- Tageszeiten moved after Uhrzeit, with time ranges synced.
- Essen and Adjektive decks split; cross-links added.

### Removed
- 6 duplicate cards.

## 12 Nov 2026

### Added
- **Lektion 14:** möchten, mögen, nehmen, essen, plus Frühstück, Mittagessen, Abendessen.
