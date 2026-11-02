/* ==========================================================================
   AFTER DARK SOCIETY — site content
   Edit this one file to update events, venues, gallery and contact details.
   Every page reads from here, so you never have to touch the HTML.
   ========================================================================== */

window.ADS = {
  /* ---- Contact & forms -------------------------------------------------- */
  contact: {
    email: "",          // e.g. "hello@yourdomain.com" — used for mailto links + form fallback
    phone: "",          // e.g. "+91 98xxxxxxx"
    whatsapp: "",       // digits only, with country code, e.g. "9198xxxxxxxx"
    instagram: "https://www.instagram.com/_dubaiafterdark_/",
    city: "Dubai"
  },

  /* Where form submissions go. Paste the Google Apps Script "Web app URL"
     (https://script.google.com/macros/s/…/exec) and every form lands as a row in
     the "After Dark Society — Website Submissions" Google Sheet.
     See google-apps-script/Code.gs for the set-up steps. */
  formEndpoint: "https://script.google.com/macros/s/AKfycbyOpuICDOLfSsrVEm7rjFeB2hOWf42VFykPwv_Xx_RTL6kZoAhLwBmqx07BU--ZtKCr4Q/exec",

  /* ---- Our brands (IPs) ------------------------------------------------- */
  brands: [
    {
      name: "Bolly Room",
      logo: "assets/img/bolly-room.png",
      tag: "Bollywood, turned all the way up",
      text: "Our flagship Bollywood party — big hooks, bigger drops, and a room that sings every word back."
    },
    {
      name: "Sound Society",
      logo: "assets/img/sound-society.png",
      tag: "For the ones who follow the sound",
      text: "A curated music series built around the DJ — deeper cuts, longer sets, and a crowd that came for the music."
    }
  ],

  /* ---- Signature experiences (event formats) -------------------------- */
  formats: [
    { name: "Exclusive Bollywood Nights", kicker: "After Dark Society", text: "Our signature: the biggest Bollywood anthems, remixed for the club, in the city's best rooms." },
    { name: "Bolly Room",                 kicker: "High-energy",        text: "Bollywood and desi bangers at full volume — the night everyone sings along to." },
    { name: "Sound Society",              kicker: "Music-led",          text: "DJ-first sessions with deeper, longer sets for the crowd that follows the sound." },
    { name: "Private & Celebrations",     kicker: "Made to order",      text: "Birthdays, launches and private buy-outs, produced by the After Dark team." }
  ],

  /* ---- VIP tables --------------------------------------------------------
     Names / inclusions are drafts — confirm with your team before launch. */
  tables: [
    { name: "Lounge",  guests: "2–4 guests",  perks: ["Reserved table", "Guest-list entry", "Dedicated server"] },
    { name: "VIP",     guests: "4–8 guests",  perks: ["Prime table by the dance floor", "Priority entry", "Bottle presentation"], featured: true },
    { name: "Society", guests: "8–15 guests", perks: ["Private booth / section", "Personal host all night", "Signature bottle show"] }
  ],

  /* ---- Partner venues -------------------------------------------------- */
  /* Add each club's Instagram URL (and area) and the card becomes a link automatically.
     Add logo: "assets/img/venues/<file>.png" and the logo replaces the written name. */
  venues: [
    { name: "Opal Room", area: "DIFC", instagram: "https://www.instagram.com/opalroomdifc/", logo: "assets/img/venues/opal-room.png" },
    { name: "Hikari",    area: "DIFC", instagram: "https://www.instagram.com/hikaridifc/", logo: "assets/img/venues/hikari.png" },
    { name: "Zea",       area: "",     instagram: "https://www.instagram.com/zea.dubai/", logo: "assets/img/venues/zea.png" },
    { name: "Bvanta",    area: "",     instagram: "https://www.instagram.com/bvantadubai/", logo: "assets/img/venues/bvanta.png" }
  ],

  /* ---- Events ----------------------------------------------------------- */
  /* date: "YYYY-MM-DD" or "YYYY-MM-DDTHH:MM" (Dubai time), or null for "Date TBA".
     The home page countdown locks onto the next upcoming event with a date
     (10pm when no time is given). An event with a poster is featured as "Next up". */
  upcoming: [
    {
      title: "Desi Pataka", subtitle: "Diwali Edition", brand: "After Dark Society",
      venue: "Opal Room", address: "16th Floor, Emirates Financial Tower, DIFC, Dubai",
      date: "2026-11-07", lineup: ["Rahul", "Amaan", "Vishal"],
      phones: ["056 341 4140", "054 215 7865"],
      poster: "assets/events/desi-pataka.jpg", ticketUrl: ""
    },
    { title: "Bolly Room",         brand: "Bolly Room",                venue: "Hikari",    date: null, ticketUrl: "" },
    { title: "Sound Society",      brand: "Sound Society",             venue: "Zea",       date: null, ticketUrl: "" }
  ],

  past: [
    { title: "Bvanta Night",  venue: "Bvanta", date: "2026-10-23", album: "https://drive.google.com/drive/folders/1PJgzR2z7PqdHw_Lj-auENoRCYYCLsvZK" },
    { title: "Kikkat",        venue: "",       date: "2026-10",    album: "https://drive.google.com/drive/folders/1n6__yLr28z2DTSR0unLfyDlkLBJfbq1l" },
    { title: "Rodolphe",      venue: "",       date: "2026-09-26", album: "https://drive.google.com/drive/folders/1KY7ctE85QecnnGBucxbuTohvwrC0zf96" }
  ],

  /* ---- Gallery ---------------------------------------------------------- */
  /* Keep this short and strong — 8–12 of the best shots, not everything.
     Put the files in assets/gallery/ and list them here.
     type: "photo" | "clip" (short .mp4 that plays silently in the grid) | "video" (YouTube / Instagram link) */
  gallery: [
    { type: "photo", src: "assets/gallery/the-crowd.jpg",         caption: "The crowd",         wide: true },
    { type: "photo", src: "assets/gallery/live-percussion.jpg",   caption: "Live percussion",   tall: true },
    { type: "photo", src: "assets/gallery/front-row.jpg",         caption: "Front row" },
    { type: "photo", src: "assets/gallery/main-room.jpg",         caption: "Sound Society · the main room", wide: true },
    { type: "photo", src: "assets/gallery/table-celebration.jpg", caption: "Table celebrations" },
    { type: "clip",  src: "assets/gallery/behind-the-decks.mp4", poster: "assets/gallery/behind-the-decks-poster.jpg", caption: "Behind the decks", tall: true },
    { type: "photo", src: "assets/gallery/blue-hour.jpg",         caption: "Blue hour on the floor", tall: true },
    { type: "photo", src: "assets/gallery/on-the-runway.jpg",     caption: "On the runway",     wide: true },
    { type: "photo", src: "assets/gallery/into-the-crowd.jpg",    caption: "Into the crowd",    wide: true },
    // { type: "video", src: "https://www.youtube.com/watch?v=XXXX", thumb: "assets/gallery/aftermovie.jpg", caption: "Aftermovie" },
  ]
};
