/* AFTER DARK SOCIETY — shared behaviour for every page */
(function () {
  "use strict";
  const D = window.ADS || {};
  const C = D.contact || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const NAV = [
    ["index.html", "Home"],
    ["about.html", "About Us"],
    ["events.html", "Upcoming Events"],
    ["gallery.html", "Gallery"],
    ["book.html", "Book Your Table"],
    ["pr.html", "Talk to PR"],
    ["careers.html", "Careers"],
    ["contact.html", "Contact Us"],
    ["sitemap.html", "Site Map"]
  ];
  const here = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  /* ---- Header ------------------------------------------------------------ */
  const header = $("#site-header");
  if (header) {
    header.className = "site-header";
    header.innerHTML = `
      <nav class="nav wrap" aria-label="Main">
        <a class="brand" href="index.html" aria-label="After Dark Society — home">
          <img src="assets/img/after-dark-society.png" alt="After Dark Society" width="739" height="285">
        </a>
        <ul class="nav-links" id="nav-links">
          ${NAV.filter(([h]) => h !== "book.html").map(([h, t]) =>
            `<li><a href="${h}"${h === here ? ' aria-current="page"' : ""}>${t}</a></li>`).join("")}
          <li class="mobile-only-book"><a href="book.html"${here === "book.html" ? ' aria-current="page"' : ""}>Book Your Table</a></li>
        </ul>
        <a class="btn nav-cta" href="book.html">Book a Table</a>
        <button class="nav-toggle" aria-label="Menu" aria-expanded="false" aria-controls="nav-links"><span></span><span></span><span></span></button>
      </nav>`;
    const solid = () => header.classList.toggle("is-solid", scrollY > 30 || !document.querySelector(".hero"));
    solid(); addEventListener("scroll", solid, { passive: true });
    const toggle = $(".nav-toggle", header);
    toggle.addEventListener("click", () => {
      const open = document.body.classList.toggle("menu-open");
      toggle.setAttribute("aria-expanded", open);
    });
    $$(".nav-links a", header).forEach((a) => a.addEventListener("click", () => document.body.classList.remove("menu-open")));
    // the dedicated CTA covers "Book" on desktop; keep it in the overlay menu on mobile
    const style = document.createElement("style");
    style.textContent = "@media (min-width:1081px){.mobile-only-book{display:none}}";
    document.head.appendChild(style);
  }

  /* ---- Footer ------------------------------------------------------------ */
  const footer = $("#site-footer");
  if (footer) {
    footer.className = "site-footer";
    const contactItems = [
      C.email && `<li><a href="mailto:${esc(C.email)}">${esc(C.email)}</a></li>`,
      C.phone && `<li><a href="tel:${esc(C.phone.replace(/\s/g, ""))}">${esc(C.phone)}</a></li>`,
      C.whatsapp && `<li><a href="https://wa.me/${esc(C.whatsapp)}" target="_blank" rel="noopener">WhatsApp</a></li>`,
      C.instagram && `<li><a href="${esc(C.instagram)}" target="_blank" rel="noopener">Instagram</a></li>`,
      C.city && `<li>${esc(C.city)}</li>`
    ].filter(Boolean).join("") || `<li><a href="contact.html">Get in touch</a></li>`;
    footer.innerHTML = `
      <div class="wrap">
        <div class="footer-top">
          <div>
            <img src="assets/img/after-dark-society.png" alt="After Dark Society" width="739" height="285" loading="lazy">
            <div class="footer-ips">
              ${(D.brands || []).map((b) => `<img src="${esc(b.logo)}" alt="${esc(b.name)}" loading="lazy">`).join("")}
            </div>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>${NAV.map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join("")}</ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>${contactItems}</ul>
            <h4 style="margin-top:34px">Our venues</h4>
            <ul>${(D.venues || []).map((v) => v.instagram
              ? `<li><a href="${esc(v.instagram)}" target="_blank" rel="noopener">${esc(v.name)}</a></li>`
              : `<li>${esc(v.name)}</li>`).join("")}</ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} After Dark Society. All rights reserved.</span>
          <span>Strictly 21+. Dress to impress. Right of admission reserved.</span>
        </div>
      </div>`;
  }

  /* ---- Reveal on scroll ------------------------------------------------- */
  const io = "IntersectionObserver" in window ? new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }) : null;
  const watch = (root = document) => $$(".reveal:not(.in)", root).forEach((el) => io ? io.observe(el) : el.classList.add("in"));

  /* ---- Hero particles: drifting gold embers ----------------------------- */
  const canvas = $("#embers");
  if (canvas && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const ctx = canvas.getContext("2d");
    let w, h, dpr, parts = [];
    const resize = () => {
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(110, (w * h) / 14000));
      parts = Array.from({ length: n }, () => spawn(true));
    };
    const spawn = (anywhere) => ({
      x: Math.random() * w, y: anywhere ? Math.random() * h : h + 10,
      r: Math.random() * 1.8 + 0.3, vy: Math.random() * 0.35 + 0.08, vx: (Math.random() - 0.5) * 0.15,
      a: Math.random() * 0.6 + 0.2, t: Math.random() * Math.PI * 2
    });
    let mx = 0, my = 0;
    addEventListener("pointermove", (e) => { mx = (e.clientX / innerWidth - 0.5); my = (e.clientY / innerHeight - 0.5); }, { passive: true });
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.t += 0.02; p.y -= p.vy; p.x += p.vx + Math.sin(p.t) * 0.12;
        if (p.y < -10) Object.assign(p, spawn(false));
        const x = p.x + mx * 20 * p.r, y = p.y + my * 20 * p.r;
        const g = ctx.createRadialGradient(x, y, 0, x, y, p.r * 4);
        g.addColorStop(0, `rgba(243,220,164,${p.a})`); g.addColorStop(1, "rgba(243,220,164,0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, p.r * 4, 0, Math.PI * 2); ctx.fill();
      }
      requestAnimationFrame(tick);
    };
    resize(); addEventListener("resize", resize); tick();
  }

  /* ---- Dates ------------------------------------------------------------- */
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const parseDate = (s) => {
    if (!s) return null;
    const m = String(s).match(/^(\d{4})-(\d{2})(?:-(\d{2}))?(?:T(\d{2}):(\d{2}))?/);
    if (!m) return null;
    return { d: new Date(+m[1], +m[2] - 1, +(m[3] || 1), +(m[4] || 22), +(m[5] || 0)), hasDay: !!m[3] };
  };
  const dateBlock = (s) => {
    const p = parseDate(s);
    if (!p) return `<div class="event-date"><span class="tba">Date<br>TBA</span></div>`;
    const d = p.d;
    return p.hasDay
      ? `<div class="event-date"><b>${String(d.getDate()).padStart(2, "0")}</b>${MONTHS[d.getMonth()]} ${d.getFullYear()}</div>`
      : `<div class="event-date"><b>${MONTHS[d.getMonth()]}</b>${d.getFullYear()}</div>`;
  };

  /* ---- Countdown --------------------------------------------------------- */
  const cd = $("#countdown");
  if (cd) {
    const next = (D.upcoming || [])
      .map((e) => ({ e, p: parseDate(e.date) }))
      .filter((x) => x.p && x.p.d > new Date())
      .sort((a, b) => a.p.d - b.p.d)[0];
    const label = $("#next-label");
    if (next) {
      label.textContent = `Next night · ${next.e.title}${next.e.venue ? " @ " + next.e.venue : ""}`;
      const parts = ["Days", "Hours", "Mins", "Secs"];
      cd.innerHTML = parts.map((p) => `<div><b>00</b><small>${p}</small></div>`).join("");
      const bs = $$("b", cd);
      const run = () => {
        let s = Math.max(0, Math.floor((next.p.d - new Date()) / 1000));
        const v = [Math.floor(s / 86400), Math.floor(s / 3600) % 24, Math.floor(s / 60) % 60, s % 60];
        v.forEach((n, i) => (bs[i].textContent = String(n).padStart(2, "0")));
      };
      run(); setInterval(run, 1000);
    } else {
      label.textContent = "Next night · announcing soon";
      cd.remove();
    }
  }

  /* Brand logo in place of a written brand name */
  const brandOf = (name) => (D.brands || []).find((b) => b.name.toLowerCase() === String(name || "").toLowerCase());
  const mark = (name, cls) => { const b = brandOf(name); return b ? `<img class="${cls}" src="${esc(b.logo)}" alt="${esc(b.name)}" loading="lazy">` : null; };

  /* ---- Renderers --------------------------------------------------------- */
  const render = (id, html) => { const el = document.getElementById(id); if (el) { el.innerHTML = html; watch(el); } };

  render("brands", (D.brands || []).map((b, i) => `
    <article class="brand-card reveal" data-delay="${i + 1}" data-brand="${esc(b.name)}">
      <img src="${esc(b.logo)}" alt="${esc(b.name)} logo" loading="lazy">
      <div>
        <span class="tag">${esc(b.tag)}</span>
        <h3 class="sr-only">${esc(b.name)}</h3>
        <p>${esc(b.text)}</p>
      </div>
    </article>`).join(""));

  render("formats", (D.formats || []).map((f, i) => `
    <article class="format reveal" data-delay="${i % 4}">
      <span class="format-num">${String(i + 1).padStart(2, "0")}</span>
      <small>${esc(f.kicker)}</small>
      ${mark(f.name, "format-logo") ? `<h3 class="format-mark">${mark(f.name, "format-logo")}</h3>` : `<h3 class="display">${esc(f.name)}</h3>`}
      <p>${esc(f.text)}</p>
    </article>`).join(""));

  render("tables", (D.tables || []).map((t, i) => `
    <article class="table-card reveal${t.featured ? " featured" : ""}" data-delay="${i + 1}">
      ${t.featured ? `<span class="chip">Recommended</span>` : ""}
      <h3 class="display">${esc(t.name)}</h3>
      <small>${esc(t.guests)}</small>
      <ul>${(t.perks || []).map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
      <a class="btn${t.featured ? "" : " btn--ghost"}" href="book.html?table=${encodeURIComponent(t.name)}">Request ${esc(t.name)}</a>
    </article>`).join(""));

  render("venues",(D.venues || []).map((v, i) => {
    const inner = `<span class="display">${esc(v.name)}</span><small>${v.instagram ? "Instagram ↗" : "Partner venue"}</small>`;
    return v.instagram
      ? `<a class="venue reveal" data-delay="${i % 4}" href="${esc(v.instagram)}" target="_blank" rel="noopener">${inner}</a>`
      : `<div class="venue reveal" data-delay="${i % 4}">${inner}</div>`;
  }).join(""));

  const eventRow = (e, past) => `
    <li class="event reveal">
      ${dateBlock(e.date)}
      <div>
        ${mark(e.title, "event-logo") ? `<h3 class="event-mark">${mark(e.title, "event-logo")}</h3>` : `<h3>${esc(e.title)}</h3>`}
        <p>${e.brand && !brandOf(e.brand) ? `<span class="chip">${esc(e.brand)}</span>` : ""}${e.venue ? esc(e.venue) : ""}</p>
      </div>
      ${past
        ? (e.album ? `<a class="btn btn--ghost" href="${esc(e.album)}" target="_blank" rel="noopener">See the night</a>` : "")
        : (e.ticketUrl
            ? `<a class="btn" href="${esc(e.ticketUrl)}" target="_blank" rel="noopener">Tickets</a>`
            : `<a class="btn btn--ghost" href="book.html?event=${encodeURIComponent(e.title + (e.venue ? " @ " + e.venue : ""))}">Reserve a table</a>`)}
    </li>`;
  const limit = (el) => +(el && el.dataset.limit) || Infinity;
  const upEl = document.getElementById("upcoming-list");
  render("upcoming-list", (D.upcoming || []).slice(0, limit(upEl)).map((e) => eventRow(e, false)).join(""));
  const pastEl = document.getElementById("past-list");
  render("past-list", (D.past || []).slice(0, limit(pastEl)).map((e) => eventRow(e, true)).join(""));

  render("albums", (D.past || []).filter((p) => p.album).map((p, i) => `
    <a class="album reveal" data-delay="${i + 1}" href="${esc(p.album)}" target="_blank" rel="noopener">
      <small>${esc(p.date ? dateLabel(p.date) : "")}${p.venue ? " · " + esc(p.venue) : ""}</small>
      <span class="display">${esc(p.title)}</span>
      <small style="color:var(--gold)">Open album ↗</small>
    </a>`).join(""));
  function dateLabel(s) { const p = parseDate(s); return p ? (p.hasDay ? `${p.d.getDate()} ${MONTHS[p.d.getMonth()]} ${p.d.getFullYear()}` : `${MONTHS[p.d.getMonth()]} ${p.d.getFullYear()}`) : ""; }

  /* Gallery: real items if provided, otherwise tasteful placeholders */
  const gal = document.getElementById("gallery");
  if (gal) {
    const items = (D.gallery || []).slice(0, limit(gal));
    if (items.length) {
      gal.innerHTML = items.map((g, i) => {
        const cls = ["g-item", "reveal", g.wide && "wide", g.tall && "tall"].filter(Boolean).join(" ");
        const img = g.type === "video"
          ? (g.thumb ? `<img src="${esc(g.thumb)}" alt="${esc(g.caption || "Video")}" loading="lazy">` : `<div class="g-ph">${esc(g.caption || "Watch")}</div>`) + `<span class="play" aria-hidden="true"></span>`
          : `<img src="${esc(g.src)}" alt="${esc(g.caption || "After Dark Society night")}" loading="lazy">`;
        return `<button class="${cls}" data-i="${i}" aria-label="${esc(g.caption || (g.type === "video" ? "Play video" : "Open photo"))}">${img}${g.caption ? `<span class="cap">${esc(g.caption)}</span>` : ""}</button>`;
      }).join("");
      const lb = document.createElement("div");
      lb.className = "lightbox"; lb.setAttribute("role", "dialog"); lb.setAttribute("aria-modal", "true");
      lb.innerHTML = `<button aria-label="Close">×</button><div class="lb-body"></div>`;
      document.body.appendChild(lb);
      const close = () => { lb.classList.remove("open"); $(".lb-body", lb).innerHTML = ""; };
      $("button", lb).addEventListener("click", close);
      lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
      addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
      gal.addEventListener("click", (e) => {
        const b = e.target.closest(".g-item"); if (!b) return;
        const g = items[+b.dataset.i];
        let body;
        if (g.type === "video") {
          const yt = String(g.src).match(/(?:youtu\.be\/|v=|shorts\/)([\w-]{11})/);
          if (!yt) { window.open(g.src, "_blank", "noopener"); return; }
          body = `<iframe src="https://www.youtube-nocookie.com/embed/${yt[1]}?autoplay=1" allow="autoplay; encrypted-media; fullscreen" allowfullscreen title="${esc(g.caption || "Video")}"></iframe>`;
        } else {
          body = `<img src="${esc(g.src)}" alt="${esc(g.caption || "")}">`;
        }
        $(".lb-body", lb).innerHTML = body; lb.classList.add("open"); $("button", lb).focus();
      });
    } else {
      const words = ["Bvanta · 23 Oct", "Kikkat", "Rodolphe · 26 Sep", "Bolly Room", "Sound Society", "After Dark"];
      const shapes = ["wide", "", "tall", "", "", "wide"];
      gal.innerHTML = words.slice(0, Math.min(words.length, limit(gal))).map((w, i) =>
        `<div class="g-item reveal ${shapes[i]}" style="cursor:default"><div class="g-ph" style="--x:${20 + i * 13}%;--y:${30 + (i % 3) * 20}%">${esc(w)}</div></div>`).join("");
    }
    watch(gal);
  }

  /* ---- Forms ------------------------------------------------------------- */
  $$("form[data-form]").forEach((form) => {
    const kind = form.dataset.form;
    const wrap = form.closest(".form");
    // prefill from ?event=
    const ev = new URLSearchParams(location.search).get("event");
    if (ev && form.elements.event) {
      const sel = form.elements.event;
      if (sel.tagName === "SELECT" && ![...sel.options].some((o) => o.value === ev)) sel.add(new Option(ev, ev), 1);
      sel.value = ev;
    }
    // populate table-type chips from data, preselect from ?table=
    const tbl = $("[data-tables]", form);
    if (tbl && (D.tables || []).length) {
      const want = new URLSearchParams(location.search).get("table");
      tbl.innerHTML = D.tables.map((t, i) =>
        `<label><input type="radio" name="table" value="${esc(t.name)}"${(want ? want === t.name : i === 0) ? " checked" : ""}><span>${esc(t.name)} · ${esc(t.guests)}</span></label>`).join("") +
        `<label><input type="radio" name="table" value="Not sure yet"><span>Not sure yet</span></label>`;
    }
    // populate event dropdowns from data
    $$("select[data-events]", form).forEach((sel) => {
      (D.upcoming || []).forEach((e) => {
        const v = e.title + (e.venue ? " @ " + e.venue : "");
        if (![...sel.options].some((o) => o.value === v)) sel.add(new Option(v, v), sel.options.length - 1);
      });
      if (ev) sel.value = ev;
    });

    const fail = (field, msg) => {
      const f = field.closest(".field"); if (!f) return;
      f.classList.add("invalid");
      let e = $(".err", f); if (!e) { e = document.createElement("span"); e.className = "err"; f.appendChild(e); }
      e.textContent = msg;
    };
    form.addEventListener("input", (e) => { const f = e.target.closest(".field"); if (f) { f.classList.remove("invalid"); const er = $(".err", f); if (er) er.textContent = ""; } });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      let ok = true, first = null;
      $$("input, select, textarea", form).forEach((el) => {
        if (!el.checkValidity()) {
          ok = false; first = first || el;
          fail(el, el.validity.valueMissing ? "Required" : el.validity.typeMismatch ? "Please check this" :
            el.validity.rangeUnderflow ? `Must be ${el.min} or older` : el.validity.rangeOverflow ? `Must be ${el.max} or less` : "Please check this");
        }
      });
      const groups = $$("[data-require-one]", form);
      groups.forEach((g) => { if (!$("input:checked", g)) { ok = false; first = first || $("input", g); const f = g.closest(".field"); f.classList.add("invalid"); let er = $(".err", f); if (!er) { er = document.createElement("span"); er.className = "err"; f.appendChild(er); } er.textContent = "Pick at least one"; } });
      if (!ok) { first && first.focus(); return; }

      const fd = new FormData(form);
      const data = {};
      for (const [k, v] of fd.entries()) data[k] = data[k] ? `${data[k]}, ${v}` : v;
      data._form = kind;

      const btn = $("button[type=submit]", form);
      btn.disabled = true; const label = btn.textContent; btn.textContent = "Sending…";
      try {
        if (D.formEndpoint) {
          const res = await fetch(D.formEndpoint, { method: "POST", headers: { "Accept": "application/json", "Content-Type": "application/json" }, body: JSON.stringify(data) });
          if (!res.ok) throw new Error(res.status);
        } else if (C.email) {
          const body = Object.entries(data).filter(([k]) => k !== "_form").map(([k, v]) => `${k}: ${v}`).join("\n");
          location.href = `mailto:${C.email}?subject=${encodeURIComponent("[" + kind + "] After Dark Society")}&body=${encodeURIComponent(body)}`;
        } else {
          console.warn("[After Dark Society] No formEndpoint or contact.email set in assets/js/data.js — submission not sent:", data);
        }
        wrap.classList.add("done");
        wrap.scrollIntoView({ behavior: "smooth", block: "center" });
      } catch (err) {
        btn.disabled = false; btn.textContent = label;
        alert("Sorry — that didn't go through. Please try again, or reach us on Instagram.");
      }
    });
  });

  /* Contact tiles */
  const tiles = document.getElementById("contact-tiles");
  if (tiles) {
    const t = [
      ["WhatsApp", C.whatsapp && `https://wa.me/${C.whatsapp}`, C.whatsapp ? "+" + C.whatsapp : "Coming soon"],
      ["Email", C.email && `mailto:${C.email}`, C.email || "Coming soon"],
      ["Instagram", C.instagram, C.instagram ? "@" + C.instagram.replace(/\/+$/, "").split("/").pop() : "Coming soon"]
    ];
    tiles.innerHTML = t.map(([k, href, v]) => href
      ? `<a class="tile reveal" href="${esc(href)}" target="_blank" rel="noopener"><small>${k}</small><span>${esc(v)}</span></a>`
      : `<div class="tile reveal"><small>${k}</small><span>${esc(v)}</span></div>`).join("");
  }

  watch();
})();
