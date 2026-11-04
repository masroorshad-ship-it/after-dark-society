# After Dark Society — website

Static website for **After Dark Society** (Exclusive Bollywood Nights, Dubai), home of **Bolly Room** and **Sound Society**.
No build step: plain HTML, CSS and JavaScript.

**Live domain:** https://afterdarksociety.social (hosted on GitHub Pages — see *Going live* below).

## Pages

| Page | File |
| --- | --- |
| Home | `index.html` — arrival + countdown, our rhythm, signature experiences, next-up event + upcoming events, gallery highlights, VIP tables, venues, early-access sign-up |
| About Us | `about.html` |
| Upcoming Events | `events.html` (upcoming nights) |
| Gallery | `gallery.html` |
| Book Your Table | `book.html` (concierge request form) |
| Talk to PR | `pr.html` |
| Careers | `careers.html` — first name, last name, age, music genre, expectations (+ phone/email so you can reply) |
| Contact Us | `contact.html` |
| Site Map | `sitemap.html` — the visitor journey, based on the Sound Society DXB visual sitemap |

## Editing content — one file

Everything that changes lives in **`assets/js/data.js`**:

- `contact` — email, phone, WhatsApp, Instagram, city
- `formEndpoint` — where form submissions are sent (see below)
- `brands`, `formats`, `tables` (VIP table names/perks — drafts, please confirm)
- `venues` — Opal Room, Bvanta; add each club's Instagram URL
- `upcoming` — set `date: "2026-12-05T22:00"` and the home-page countdown starts automatically
- `gallery` — **8–12 best photos / videos only.** Put files in `assets/gallery/` and list them

## Form submissions → Google Sheet

Every form (table bookings, PR, careers, contact, early access) is saved as a row in the Google Sheet
**"After Dark Society — Website Submissions"**, one tab per form, with a *Status* column for your team.

Set-up (once): open the Sheet → **Extensions → Apps Script** → paste `google-apps-script/Code.gs` →
**Deploy → New deployment → Web app** (Execute as *Me*, access *Anyone*) → copy the Web app URL into
`formEndpoint` in `assets/js/data.js`. Until that URL is set, forms show "thank you" but nothing is saved.

## Logos

`assets/img/` holds transparent PNG versions of the After Dark Society, Bolly Room and Sound Society logos.

## Going live on afterdarksociety.social (GitHub Pages)

The repo already contains `CNAME` (the domain), `.nojekyll`, `404.html`, `robots.txt` and `sitemap.xml`.

1. **Turn on Pages** — GitHub repo → **Settings → Pages** → *Build and deployment*:
   Source **Deploy from a branch**, branch **`claude/folder-data-extraction-hbhuqs`**, folder **`/ (root)`** → **Save**.
2. **Custom domain** — on the same page type `afterdarksociety.social` → **Save**.
3. **DNS at your domain registrar** (where you bought the domain):

   | Type  | Name / Host | Value |
   |-------|-------------|-------|
   | A     | `@`         | `185.199.108.153` |
   | A     | `@`         | `185.199.109.153` |
   | A     | `@`         | `185.199.110.153` |
   | A     | `@`         | `185.199.111.153` |
   | CNAME | `www`       | `masroorshad-ship-it.github.io` |

   Delete any other A / AAAA / CNAME records for `@` and `www` (e.g. the registrar's "parked" page).
4. Wait for DNS (usually 10 minutes – a few hours), then tick **Enforce HTTPS** on the Pages settings page.
