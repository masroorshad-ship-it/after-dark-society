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

  /* ---- The Sound Society family ----------------------------------------
     Sound Society is the parent company; After Dark Society and Bolly Room are
     its brands. Used for the family section, logos and footer. */
  family: {
    parent: {
      name: "Sound Society", logo: "assets/img/sound-society.png",
      kicker: "The parent company · Melodic techno", id: "sound-society", photo: "assets/gallery/main-room.jpg",
      expect: ["Melodic techno and deep, hypnotic sets", "Big sound and light production", "A crowd that came for the music"],
      text: "Dubai's home for melodic techno: long, hypnotic sets, deep sound and a crowd that came for the music. Sound Society produces and manages every brand in the family."
    },
    children: [
      {
        name: "Bolly Room", logo: "assets/img/bolly-room.png",
        kicker: "Boiler Room-style Bollywood", id: "bolly-room", photo: "assets/gallery/front-row.jpg",
        expect: ["DJ in the middle of the crowd", "Raw, close-up and filmed", "Bollywood edits you won't hear anywhere else"],
        text: "Bollywood, Boiler Room style. The DJ plays in the middle of the room with the crowd all around, every drop up close and filmed raw."
      },
      {
        name: "After Dark Society", logo: "assets/img/after-dark-society.png", here: true,
        kicker: "Full desi madness", id: "after-dark-society", photo: "assets/gallery/the-crowd.jpg",
        expect: ["Bollywood and Punjabi bangers all night", "Dhol, live percussion and big moments", "VIP tables and bottle shows"],
        text: "The loudest night in the family: Bollywood bangers, dhol drops and full desi madness from the first song to the last."
      }
    ]
  },

  /* Brand logos shown in place of written names (events, footer). */
  brands: [
    { name: "Sound Society", logo: "assets/img/sound-society.png" },
    { name: "Bolly Room",    logo: "assets/img/bolly-room.png" }
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
    { title: "Bolly Room",         brand: "Bolly Room",    tagline: "Boiler Room-style Bollywood", venue: "Hikari", date: null, ticketUrl: "" },
    { title: "Sound Society",      brand: "Sound Society", tagline: "Melodic techno",              venue: "Zea",    date: null, ticketUrl: "" }
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
