# kimjunseo.com

Personal academic homepage for Junseo Kim, served by GitHub Pages from the
`main` branch of this repository at the domain in [`CNAME`](CNAME).

There is no build step. The site is plain static HTML/CSS/JS — edit the files
and push.

## Layout

```
index.html               The entire site: About, Publications, Contact.
                         Each area is marked with a banner comment.
css/site.css             Site-specific overrides (filter bar, thumbnails, map).
js/site.js               Site-specific behaviour (publication search + filter).
css/vendor-bundle*.css   Bootstrap 4 + Font Awesome, from the Wowchemy theme.
css/wowchemy*.css        Wowchemy theme stylesheet.
js/site-init.js          Applies the light/dark preference before first paint.
js/                      Vendored theme scripts (jQuery + Bootstrap bundle).
en/js/wowchemy*.js       Main theme behaviour script.
webfonts/                Font Awesome web fonts, referenced by the vendor CSS.
media/                   Avatar and favicons.
publication/<slug>/      Per-paper PDF and thumbnail image.
uploads/                 CV PDF.
manifest.webmanifest     Web app manifest.
sitemap.xml              Sitemap.
```

The CSS and JS bundles are vendored build artifacts from the
[Wowchemy](https://github.com/wowchemy/wowchemy-hugo-themes) Hugo theme the site
originally came from. Treat them as read-only; put custom rules in
`css/site.css` instead.

## Adding a publication

1. Drop the PDF and a thumbnail image into `publication/<slug>/`.
2. Copy an existing `<div class="media stream-item view-compact">` block in the
   Publications section of `index.html` and edit it in place:
   - `data-topics` — one or more topics, space separated (see below)
   - `.article-title` — paper title; once published, wrap the text in an
     `<a>` pointing at the publisher page (unpublished work stays plain text)
   - `.article-style` — venue
   - `.stream-meta` — authors; wrap your own name in `.author-highlighted` and
     add `<i class="author-notes fas fa-star" data-toggle="tooltip"
     title="Equal contribution"></i>` after equal-contribution authors
   - `.btn-links` — link buttons
   - `img.pub-thumb` — thumbnail, or drop the whole `.ml-3` block if there
     isn't one yet

Entries are ordered newest first by publication year; order within a year is
not significant. Rearrange the blocks to reorder them.

## Search and topic filter

The search box and the buttons above the publication list are one control
surface: a paper shows when it satisfies both. Each button carries a
`data-topic`, each paper a space-separated `data-topics`, and `js/site.js`
matches them and fills in the counts — so the numbers never drift from the
markup, and they follow the search, always reporting how many papers a button
would actually reveal. A paper can hold several topics and appear under
several buttons.

Search covers title, venue and authors only; link labels are excluded so that
typing "pdf" does not match everything. Query words are ANDed, and superscripts
fold to digits so "m3rs" finds M³RS.

| `data-topics` value    | Button                |
| ---------------------- | --------------------- |
| `localization-mapping` | Localization & Mapping |
| `computer-vision`      | Computer Vision       |
| `datasets-benchmarks`  | Datasets & Benchmarks |
| `learning`             | Learning              |
| `planning-control`     | Planning & Control    |

To add a topic, add a button to `.pub-filter` in `index.html` and tag at least
one paper with it. Without JavaScript the filter does nothing and every paper
stays visible.

## Light and dark

The navbar menu offers Light and Dark. The choice is stored in `localStorage`
under `wcTheme` (`0` light, `1` dark) and applied by `js/site-init.js`, which
runs first thing in `<body>` so the page never flashes the wrong theme. The
bundled theme script owns the menu itself: it binds the `js-set-theme-*`
classes and ticks the active item.

The navbar icon shows which theme is active — a moon in dark, a sun in light.
`js/site.js` seeds it from the body class on load and then follows the
`wcThemeChange` event the theme script fires on every switch.

A first-time visitor gets dark, set by `DEFAULT_THEME` in `js/site-init.js`;
change that constant to `'0'` to default to light. Any other stored value —
including `2`, the theme's "follow the OS" mode, which this menu no longer
offers — is normalised back to the default on the next visit.

The menu carries a hidden third item, `js-set-theme-auto`. The theme script's
menu-highlighting function dereferences all three items without a null check,
so removing it from the DOM breaks every switch; `d-none` keeps it out of the
menu instead.

Both palettes already live in the theme stylesheet, keyed on `body.dark` —
there is nothing to build.
