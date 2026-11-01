# After Dark Society — website

Static website for **After Dark Society** (Exclusive Bollywood Nights, Dubai), home of **Bolly Room** and **Sound Society**.
No build step: plain HTML, CSS and JavaScript. Open `index.html` or host the folder anywhere (GitHub Pages, Netlify, Vercel…).

## Pages

| Page | File |
| --- | --- |
| Home | `index.html` — arrival + countdown, signature experiences, our rhythm, brands, upcoming events, VIP tables, gallery, venues, early-access sign-up |
| About Us | `about.html` |
| Upcoming Events | `events.html` (upcoming + past nights with album links) |
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
- `venues` — Opal Room, Hikari, Zea, Bvanta; add each club's Instagram URL
- `upcoming` — set `date: "2026-12-05T22:00"` and the home-page countdown starts automatically
- `past` — past nights, linked to their Google Drive albums
- `gallery` — **8–12 best photos / videos only.** Put files in `assets/gallery/` and list them

## ⚠️ Before going live: connect the forms

Until `formEndpoint` or `contact.email` is set, forms show "thank you" but **nothing is sent anywhere**.
Easiest option: create a free form at [formspree.io](https://formspree.io), copy its URL
(e.g. `https://formspree.io/f/abcdwxyz`) into `formEndpoint` — all bookings, PR, careers,
contact and early-access submissions then arrive in your inbox.

## Logos

`assets/img/` holds transparent PNG versions of the After Dark Society, Bolly Room and Sound Society logos.
