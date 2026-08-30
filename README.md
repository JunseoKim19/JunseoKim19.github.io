# kimjunseo.com

Personal academic homepage for Junseo Kim, served by GitHub Pages from the
`main` branch of this repository at the domain in [`CNAME`](CNAME).

There is no build step. The site is plain static HTML/CSS/JS — edit the files
and push.

## Layout

```
index.html               The entire site: About, Publications, Contact.
                         Each area is marked with a banner comment.
css/site.css             Site-specific overrides (thumbnails, map, CV icon).
css/vendor-bundle*.css   Bootstrap 4 + Font Awesome, from the Wowchemy theme.
css/wowchemy*.css        Wowchemy theme stylesheet.
js/                      Theme scripts (dark-mode bootstrap, vendor bundle).
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
   - `.article-title` — paper title
   - `.article-style` — venue
   - `.stream-meta` — authors; wrap your own name in `.author-highlighted` and
     add `<i class="author-notes fas fa-star" data-toggle="tooltip"
     title="Equal contribution"></i>` after equal-contribution authors
   - `.btn-links` — link buttons
   - `img.pub-thumb` — thumbnail

Papers are listed newest first.
