/*
  COFsConnect frontend application
  ---------------------------------
  Edit the data arrays below to change the starter content.
  Edit CSS variables at the top of style.css to change the visual palette.
  Replace image URLs in galleryData/newsData, or add your own images under assets/images.
  Change author/admin wording in index.html where labelled.
  Change the external expert link in index.html if the destination ever changes.

  IMPORTANT SECURITY NOTE:
  The admin login in this file is ONLY a frontend demonstration. The username/password
  are visible to anyone who downloads the site, so this is NOT secure authentication.
  Before using admin controls for real content, connect a backend such as Firebase,
  Supabase or another authenticated API.

  Backend-ready structure:
  - questions/answers are stored in localStorage now.
  - admin-added news, notes, gallery items and events are stored in localStorage.
  - rendering and CRUD functions are intentionally separated so they can be replaced
    with fetch()/SDK/database calls later.
*/

"use strict";

const EXPERT_URL = "https://gittrivedi.github.io/#experts";

const STORAGE_KEYS = {
  heroSlides: "heroSlides",
  news: "news",
  notes: "notes",
  gallery: "gallery",
  events: "events",
  questions: "questions",
  answers: "answers",
  notesRequests: "notesRequests",
  adminSession: "adminSession"
};

const todayISO = new Date().toISOString().slice(0, 10);

// ================================
// HERO IMAGES
// Replace these paths with your own photographs.
// ================================
const heroSlides = [
  { image: "assets/images/hero-1.jpg", title: "Aquatic Life", caption: "Exploring the world beneath the surface." },
  { image: "assets/images/hero-2.jpg", title: "Freshwater Ecosystems", caption: "Where fisheries, science and nature meet." },
  { image: "assets/images/hero-3.jpg", title: "Fisheries Science", caption: "Knowledge, observation and life in water." },
  { image: "assets/images/hero-4.jpg", title: "Aquaculture", caption: "Cultivating aquatic resources with care and science." }
];

const newsData = [
  {
    id: "news-ornamental-lab",
    title: "Ornamental Lab Shifting & Decoration Underway",
    category: "Infrastructure",
    date: "",
    author: "COFsConnect",
    image: "assets/images/news-ornamental-lab.jpg",
    description: "The ornamental fisheries laboratory is currently undergoing shifting and decoration work to reorganize the laboratory environment and create a more suitable space for practical learning, ornamental fish studies and student activities.",
    article: "The ornamental fisheries laboratory is currently undergoing shifting and decoration work. The activity is focused on reorganizing the laboratory environment and improving the space used for practical learning and ornamental fish studies.\n\nThe reorganization can provide a more suitable setting for student activities, observations and practical exposure related to ornamental fisheries. As the work progresses, the laboratory is expected to offer a more organized learning environment for students working with ornamental fish topics."
  },
  {
    id: "news-welcome-2026-2030",
    title: "Welcome to the 2026–2030 Batch",
    category: "College",
    date: "",
    author: "COFsConnect",
    image: "assets/images/news-2026-2030.jpg",
    description: "The new 2026–2030 batch has arrived on campus, beginning a new academic chapter at the College of Fisheries Sciences.",
    article: "The 2026–2030 batch has joined the college following the admission process, beginning a new academic chapter at the College of Fisheries Sciences.\n\nTheir first days on campus mark the beginning of a journey through fisheries education, practical learning and campus life. The college environment will introduce them to academic departments, practical spaces, field-oriented learning and the wider student community.\n\nInteraction with seniors can also become an important part of settling into college, understanding practical routines and discovering the many experiences that sit alongside classroom learning."
  },
  {
    id: "news-shirof-sir",
    title: "Congratulations to Shirof Sir",
    category: "College Community",
    date: "",
    author: "COFsConnect",
    image: "assets/images/news-shirof-sir.jpg",
    description: "A warm college-community update acknowledging that Shirof Sir recently got married.",
    article: "COFsConnect extends warm congratulations to Shirof Sir on his recent marriage.\n\nThis brief college-community note celebrates the occasion respectfully and wishes him happiness for this new chapter. No personal details are included here beyond the update itself."
  },
  {
    id: "news-rave-tour-2022-2026",
    title: "2022–2026 Batch Heads Out for Rave Tour",
    category: "Student Life",
    date: "",
    author: "COFsConnect",
    image: "assets/images/news-rave-tour.jpg",
    description: "The fourth-year 2022–2026 batch is currently on their Rave Tour, marking a memorable part of their final year and college journey.",
    article: "The fourth-year 2022–2026 batch is currently on their Rave Tour, marking a memorable part of their final year and college journey.\n\nFor a final-year batch, experiences away from routine classes can become part of the memories students carry from college. Travel, student bonding and shared moments can add another chapter to the story of a batch approaching the end of its undergraduate journey.\n\nCOFsConnect records this as a student-life update without adding destinations or dates that have not been supplied."
  }
];

const notesData = [
  { id:"note-1", subject:"Fish Physiology", title:"Digestive System of Finfishes", type:"Notes", semester:"3rd Semester", uploadedBy:"COFsConnect", date:"2026-09-18", url:"#", description:"Structured notes covering major digestive organs, enzymes and physiological roles." },
  { id:"note-2", subject:"Practical Manuals", title:"Fish Hatchery Management Practical", type:"Practical Manual", semester:"3rd Semester", uploadedBy:"COFsConnect", date:"2026-09-16", url:"#", description:"A practical checklist covering broodstock selection, conditioning, induced breeding and hatchery observations." },
  { id:"note-3", subject:"Fish Processing", title:"Value Addition and Fish Processing", type:"Presentation", semester:"3rd Semester", uploadedBy:"COFsConnect", date:"2026-09-14", url:"#", description:"Presentation resource on value addition, preservation, processing operations and product ideas." },
  { id:"note-4", subject:"Aquaculture", title:"Biofloc Technology: Quick Revision", type:"Notes", semester:"4th Semester", uploadedBy:"COFsConnect", date:"2026-09-11", url:"#", description:"Compact review notes on biofloc principles, C:N balancing, microbial communities and management." },
  { id:"note-5", subject:"Environmental Science", title:"Lentic and Lotic Water Bodies", type:"Assignment", semester:"2nd Semester", uploadedBy:"COFsConnect", date:"2026-09-09", url:"#", description:"Comparison of flowing and standing aquatic systems with practical field-observation prompts." },
  { id:"note-6", subject:"Entrepreneurship", title:"Raw Material Costing & Inventory Control", type:"Presentation", semester:"3rd Semester", uploadedBy:"COFsConnect", date:"2026-09-07", url:"#", description:"Working notes on production management, raw material costing and inventory control." }
];

// ================================
// GALLERY IMAGES
// Replace these paths with your own college photographs.
// ================================
const GALLERY_CATEGORIES = ["Christmas Gathering","Ganesh Puja","Ganesh Chaturthi","Sarhul","New Year","Freshers","Cultural Fest","College Events","Field Visits","Practical Classes","Aquaculture","Fisheries","Achievements","Other"];
const galleryData = [
  {id:"gallery-christmas-1",category:"Christmas Gathering",event:"Christmas Gathering",image:"assets/images/christmas-01.jpg",caption:"Students during the Christmas gathering.",date:""},
  {id:"gallery-ganesh-puja-1",category:"Ganesh Puja",event:"Ganesh Puja",image:"assets/images/ganesh-puja-01.jpg",caption:"Ganesh Puja at the college.",date:""},
  {id:"gallery-ganesh-chaturthi-1",category:"Ganesh Chaturthi",event:"Ganesh Chaturthi",image:"assets/images/ganesh-chaturthi-01.jpg",caption:"Ganesh Chaturthi celebration.",date:""},
  {id:"gallery-sarhul-1",category:"Sarhul",event:"Sarhul",image:"assets/images/sarhul-01.jpg",caption:"Students during Sarhul celebrations.",date:""},
  {id:"gallery-new-year-1",category:"New Year",event:"New Year",image:"assets/images/new-year-01.jpg",caption:"New Year campus moments.",date:""},
  {id:"gallery-freshers-1",category:"Freshers",event:"Freshers",image:"assets/images/freshers-01.jpg",caption:"Freshers gathering at the college.",date:""},
  {id:"gallery-cultural-1",category:"Cultural Fest",event:"Cultural Fest",image:"assets/images/cultural-fest-01.jpg",caption:"A moment from the cultural programme.",date:""},
  {id:"gallery-college-events-1",category:"College Events",event:"College Events",image:"assets/images/college-event-01.jpg",caption:"Students at a college event.",date:""},
  {id:"gallery-field-1",category:"Field Visits",event:"Field Visits",image:"assets/images/field-visit-01.jpg",caption:"Learning beyond the classroom.",date:""},
  {id:"gallery-practical-1",category:"Practical Classes",event:"Practical Classes",image:"assets/images/practical-01.jpg",caption:"Students during a practical class.",date:""},
  {id:"gallery-aquaculture-1",category:"Aquaculture",event:"Aquaculture",image:"assets/images/aquaculture-01.jpg",caption:"Aquaculture learning in action.",date:""},
  {id:"gallery-fisheries-1",category:"Fisheries",event:"Fisheries",image:"assets/images/fisheries-01.jpg",caption:"Fisheries-focused field learning.",date:""},
  {id:"gallery-achievement-1",category:"Achievements",event:"Achievements",image:"assets/images/achievement-01.jpg",caption:"A student achievement moment.",date:""},
  {id:"gallery-other-1",category:"Other",event:"Other",image:"assets/images/other-01.jpg",caption:"A college moment worth remembering.",date:""}
];

const eventsData = [
  {
    id: "event-1",
    title: "Fisheries Awareness Seminar",
    date: "2026-09-28",
    time: "10:30 AM",
    location: "Seminar Hall",
    organizer: "College Academic Cell",
    description: "A student-facing seminar on the role of fisheries science in sustainable food systems and livelihoods."
  },
  {
    id: "event-2",
    title: "Workshop on Biofloc Technology",
    date: "2026-10-04",
    time: "11:00 AM",
    location: "Aquaculture Lab",
    organizer: "Aquaculture Department",
    description: "Hands-on orientation to biofloc concepts, water-quality management and operational considerations."
  },
  {
    id: "event-3",
    title: "Freshers Orientation",
    date: "2026-10-03",
    time: "9:30 AM",
    location: "College Auditorium",
    organizer: "Student Affairs",
    description: "An introduction to departments, student life, practical learning and campus resources."
  },
  {
    id: "event-4",
    title: "Aquaculture Practical Workshop",
    date: "2026-10-09",
    time: "2:00 PM",
    location: "Hatchery Unit",
    organizer: "Hatchery Teaching Team",
    description: "Practical exposure to breeding workflows, hatchery observations and routine record keeping."
  },
  {
    id: "event-5",
    title: "College Sports Meet",
    date: "2026-10-18",
    time: "8:00 AM",
    location: "College Grounds",
    organizer: "Sports Committee",
    description: "A campus-wide sports day with student teams, friendly competition and community activities."
  }
];

const seniorData = [
  {
    id: "senior-1",
    name: "Senior A",
    course: "B.F.Sc. 2023–27",
    interest: "Aquaculture & Hatchery Management",
    bio: "A sample profile for demonstration. Replace this with a real student profile only with permission from the administrator.",
    answers: 4
  },
  {
    id: "senior-2",
    name: "Senior B",
    course: "B.F.Sc. 2023–27",
    interest: "Fish Nutrition & Feed Technology",
    bio: "A sample peer profile focused on feeding systems, practical work and student resource sharing.",
    answers: 6
  },
  {
    id: "senior-3",
    name: "Senior C",
    course: "B.F.Sc. 2022–26",
    interest: "Fish Processing & Entrepreneurship",
    bio: "A sample profile highlighting value addition, product development and student entrepreneurship.",
    answers: 3
  }
];

const starterQuestions = [
  {
    id: "question-1",
    name: "Student Example",
    year: "B.F.Sc. 2nd Year",
    category: "Practical",
    question: "How should I prepare for the hatchery management practical?",
    date: "2026-09-17",
    answers: [
      { id: "answer-1", name: "Senior Example", text: "Start with broodstock selection, conditioning, breeding protocols and the sequence of induced breeding steps. Make a one-page flowchart before the practical." }
    ]
  },
  {
    id: "question-2",
    name: "Student Example",
    year: "B.F.Sc. 1st Year",
    category: "College Life",
    question: "What should I keep in my practical record file so that it is easy to revise later?",
    date: "2026-09-12",
    answers: [
      { id: "answer-2", name: "Senior Example", text: "Keep the date, objective, materials, procedure, observations, labelled sketches and a short conclusion. Leave a little margin for teacher comments." }
    ]
  }
];

const notesRequestsData = [];

const state = {
  newsFilter: "All",
  newsQuery: "",
  noteFilter: "All",
  noteQuery: "",
  galleryFilter: "All",
  eventQuery: "",
  questionQuery: "",
  lightboxIndex: 0,
  lightboxItems: [],
  answerOpenFor: null,
  adminLoggedIn: false
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

function safeParse(value, fallback = []) {
  try {
    const parsed = JSON.parse(value);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function loadStoredArray(key, starter = []) {
  const raw = localStorage.getItem(key);
  if (!raw) return starter.map(item => ({ ...item }));
  const parsed = safeParse(raw, null);
  return Array.isArray(parsed) ? parsed : starter.map(item => ({ ...item }));
}

function saveArray(key, items) {
  localStorage.setItem(key, JSON.stringify(items));
}

function getNews() { return loadStoredArray(STORAGE_KEYS.news, newsData); }
function getNotes() { return loadStoredArray(STORAGE_KEYS.notes, notesData); }
function getGallery() { return loadStoredArray(STORAGE_KEYS.gallery, galleryData); }
function getEvents() { return loadStoredArray(STORAGE_KEYS.events, eventsData); }
function getQuestions() { return loadStoredArray(STORAGE_KEYS.questions, starterQuestions); }
function getNotesRequests() { return loadStoredArray(STORAGE_KEYS.notesRequests, notesRequestsData); }
function getAnswers() { return loadStoredArray(STORAGE_KEYS.answers, []); }
function getHeroSlides() { return loadStoredArray(STORAGE_KEYS.heroSlides, heroSlides); }

function formatDate(value, options = { day: "numeric", month: "short", year: "numeric" }) {
  if (!value) return "";
  const parsed = new Date(`${value}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return value;
  return new Intl.DateTimeFormat("en-IN", options).format(parsed);
}

function formatEventDate(value) {
  const parsed = new Date(`${value}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return { day: "--", month: "TBA", full: value };
  return {
    day: new Intl.DateTimeFormat("en-IN", { day: "2-digit" }).format(parsed),
    month: new Intl.DateTimeFormat("en-IN", { month: "short" }).format(parsed).toUpperCase(),
    full: new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(parsed)
  };
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function safeUrl(value = "#") {
  const trimmed = String(value).trim();
  if (!trimmed) return "#";
  try {
    const url = new URL(trimmed, window.location.href);
    if (["http:", "https:", "mailto:", "#"].some(protocol => url.protocol === protocol || (protocol === "#" && trimmed.startsWith("#")))) {
      return url.href;
    }
  } catch {
    // Treat invalid URLs as a harmless placeholder.
  }
  return "#";
}

function imageOrFallback(url, alt = "", fallbackTitle = "Fisheries / College Image") {
  const safe = escapeHtml(url || "");
  const safeAlt = escapeHtml(alt);
  const safeTitle = escapeHtml(fallbackTitle);
  if (!safe) return `<div class="gallery-placeholder" role="img" aria-label="${safeAlt}">${safeTitle}</div>`;
  return `<img src="${safe}" alt="${safeAlt}" loading="lazy" onerror="this.hidden=true;this.nextElementSibling.hidden=false;" /><div class="gallery-placeholder" hidden>${safeTitle}<br /><small>Replace the image path in script.js</small></div>`;
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function scrollToSection(id) {
  const target = document.getElementById(id);
  if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
}

function getCurrentNews() {
  const query = state.newsQuery.trim().toLowerCase();
  return getNews()
    .filter(item => state.newsFilter === "All" || item.category === state.newsFilter)
    .filter(item => {
      if (!query) return true;
      return [item.title, item.category, item.author, item.description].some(value => String(value || "").toLowerCase().includes(query));
    })
    .sort((a, b) => String(b.date).localeCompare(String(a.date)));
}

function renderNews(targetId = "newsGrid", limit = null) {
  const target = document.getElementById(targetId);
  if (!target) return;
  let items = getCurrentNews();
  if (limit) items = items.slice(0, limit);
  if (!items.length) {
    target.innerHTML = `<div class="empty-state">No news matches the current filters.</div>`;
    return;
  }
  target.innerHTML = items.map(item => `
    <article class="news-card">
      <div class="news-media">
        ${imageOrFallback(item.image, item.title, item.title)}
      </div>
      <div class="card-body">
        <div class="card-meta">
          <span class="category-label">${escapeHtml(item.category)}</span>
          <span class="date-label">${escapeHtml(formatDate(item.date))}</span>
        </div>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.description)}</p>
        <div class="card-footer">
          <span class="author-line">By ${escapeHtml(item.author || "COFsConnect")}</span>
          <button class="read-more button-reset" type="button" data-news-open="${escapeHtml(item.id)}">Read More →</button>
        </div>
      </div>
    </article>
  `).join("");
}

function renderNotes(targetId = "notesGrid", limit = null) {
  const target = document.getElementById(targetId);
  if (!target) return;
  const query = state.noteQuery.trim().toLowerCase();
  let items = getNotes()
    .filter(item => state.noteFilter === "All" || item.subject === state.noteFilter)
    .filter(item => !query || [item.subject, item.title, item.type, item.semester, item.uploadedBy].some(value => String(value || "").toLowerCase().includes(query)))
    .sort((a, b) => String(b.date).localeCompare(String(a.date)));
  if (limit) items = items.slice(0, limit);
  if (!items.length) {
    target.innerHTML = `<div class="empty-state">No resources match the current filters.</div>`;
    return;
  }
  target.innerHTML = items.map(item => `
    <article class="resource-card">
      <div class="resource-top">
        <div>
          <span class="category-label">${escapeHtml(item.subject)}</span>
        </div>
        <div class="resource-icon" aria-hidden="true">${escapeHtml((item.type || "R").slice(0,1))}</div>
      </div>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.description || "Academic resource shared with the COFsConnect community.")}</p>
      <div class="resource-meta">
        <span class="pill">${escapeHtml(item.type)}</span>
        <span class="pill">${escapeHtml(item.semester)}</span>
        <span class="pill">${escapeHtml(formatDate(item.date))}</span>
      </div>
      <div class="resource-actions">
        <a class="read-more" href="${escapeHtml(safeUrl(item.url))}" target="_blank" rel="noopener noreferrer" data-resource-url="${escapeHtml(item.url || "#")}">View / Download →</a>
      </div>
    </article>
  `).join("");
}

function renderEvents(targetId = "eventsTimeline", limit = null) {
  const target = document.getElementById(targetId);
  if (!target) return;
  const query = state.eventQuery.trim().toLowerCase();
  let items = getEvents()
    .filter(item => !query || [item.title, item.location, item.organizer, item.description].some(value => String(value || "").toLowerCase().includes(query)))
    .sort((a, b) => String(a.date).localeCompare(String(b.date)));
  if (limit) items = items.slice(0, limit);
  if (!items.length) {
    target.innerHTML = `<div class="empty-state">No events match your search.</div>`;
    return;
  }
  target.innerHTML = items.map(item => {
    const date = formatEventDate(item.date);
    return `
      <article class="timeline-item">
        <div class="timeline-date">
          <strong>${escapeHtml(date.day)}</strong>
          <span>${escapeHtml(date.month)}</span>
        </div>
        <span class="timeline-node" aria-hidden="true"></span>
        <div class="event-card">
          <div class="card-meta"><span class="category-label">${escapeHtml(item.organizer)}</span><span class="date-label">${escapeHtml(date.full)}</span></div>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.description)}</p>
          <div class="event-details">
            <span>${escapeHtml(item.time)}</span>
            <span>${escapeHtml(item.location)}</span>
          </div>
          <div class="resource-actions">
            <button class="read-more button-reset" type="button" data-event-details="${escapeHtml(item.id)}">View Details →</button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function filteredGalleryItems() {
  return getGallery().filter(item => state.galleryFilter === "All" || item.category === state.galleryFilter);
}

function renderGalleryFilters() {
  const target = $("#galleryFilters");
  if (!target) return;
  target.innerHTML = ["All", ...GALLERY_CATEGORIES].map(category => `<button class="chip ${state.galleryFilter === category ? "active" : ""}" type="button" data-gallery-filter="${escapeHtml(category)}">${escapeHtml(category)}</button>`).join("");
}

function renderGallery(targetId = "galleryGrid", limit = null) {
  const target = document.getElementById(targetId);
  if (!target) return;
  let items = filteredGalleryItems();
  if (limit) items = items.slice(0, limit);
  if (!items.length) {
    target.innerHTML = `<div class="empty-state">No gallery images match this category.</div>`;
    return;
  }
  target.innerHTML = items.map((item, index) => `
    <button class="gallery-item" type="button" data-gallery-index="${index}" aria-label="Open ${escapeHtml(item.caption)}">
      ${imageOrFallback(item.image, item.caption, item.event || item.category)}
      <span class="gallery-overlay"><strong>${escapeHtml(item.caption)}</strong><span>${escapeHtml(item.category)}</span><small class="gallery-event">${escapeHtml(item.event || item.category)}</small></span>
    </button>
  `).join("");
}

function renderGalleryPreview() {
  const target = $("#homeGalleryGrid");
  if (!target) return;
  const items = getGallery().slice(0, 6);
  target.innerHTML = items.map((item, index) => `
    <button class="gallery-item" type="button" data-gallery-preview-index="${index}" data-gallery-id="${escapeHtml(item.id)}" aria-label="Open ${escapeHtml(item.caption)}">
      ${imageOrFallback(item.image, item.caption)}
      <span class="gallery-overlay"><strong>${escapeHtml(item.caption)}</strong><span>${escapeHtml(item.category)}</span></span>
    </button>
  `).join("");
}

function renderQuestionHighlight() {
  const target = $("#questionHighlight");
  if (!target) return;
  const questions = getQuestions().sort((a, b) => String(b.date).localeCompare(String(a.date)));
  const q = questions[0];
  if (!q) {
    target.innerHTML = `<p class="eyebrow">COMMUNITY QUESTION</p><h3>No questions yet.</h3><p>Ask the first question and start a thread.</p>`;
    return;
  }
  target.innerHTML = `
    <p class="eyebrow">COMMUNITY QUESTION</p>
    <h3>${escapeHtml(q.question)}</h3>
    <p>${escapeHtml(q.answers.length)} ${q.answers.length === 1 ? "answer" : "answers"} • ${escapeHtml(q.category)}</p>
    <div class="question-footer"><span>Asked by ${escapeHtml(q.name)}</span><a class="text-link" href="#ask-seniors">Open thread <span aria-hidden="true">→</span></a></div>
  `;
}

function renderQuestions() {
  const target = $("#questionsList");
  if (!target) return;
  const query = state.questionQuery.trim().toLowerCase();
  const questions = getQuestions()
    .filter(q => !query || [q.question, q.name, q.year, q.category].some(value => String(value || "").toLowerCase().includes(query)))
    .sort((a, b) => String(b.date).localeCompare(String(a.date)));

  if (!questions.length) {
    target.innerHTML = `<div class="empty-state" style="background:#2e2c27;border-color:rgba(255,255,255,.15);color:#bdb6aa;">No questions found.</div>`;
    return;
  }

  target.innerHTML = questions.map(q => {
    const answers = Array.isArray(q.answers) ? q.answers : [];
    const open = state.answerOpenFor === q.id;
    return `
      <article class="question-card">
        <div class="question-head">
          <span class="category-label">${escapeHtml(q.category)}</span>
          <span class="question-author">${escapeHtml(formatDate(q.date))}</span>
        </div>
        <h3>${escapeHtml(q.question)}</h3>
        <p>Asked by ${escapeHtml(q.name)} • ${escapeHtml(q.year)}</p>
        ${answers.length ? `<div class="question-answer">${answers.map(answer => `<div class="answer-row"><strong>${escapeHtml(answer.name)}</strong><p>${escapeHtml(answer.text)}</p></div>`).join("")}</div>` : `<div class="question-answer"><p>No answers yet. Be the first senior to help.</p></div>`}
        <div class="question-actions">
          <button class="button button-light button-compact" type="button" data-answer-toggle="${escapeHtml(q.id)}">${open ? "Close Answer Form" : "Answer this Question"}</button>
        </div>
        ${open ? `
          <form class="answer-form" data-answer-form="${escapeHtml(q.id)}">
            <input name="answerName" required maxlength="60" placeholder="Your name" aria-label="Answer author name" />
            <textarea name="answerText" required maxlength="600" placeholder="Write a helpful answer…" aria-label="Answer text"></textarea>
            <button class="button button-light button-compact" type="submit">Post Answer</button>
          </form>` : ""}
      </article>
    `;
  }).join("");
}

function renderSeniors() {
  const target = $("#seniorGrid");
  if (!target) return;
  target.innerHTML = seniorData.map(person => `
    <article class="senior-card">
      <div class="senior-avatar" aria-hidden="true">${escapeHtml(person.name.slice(-1))}</div>
      <span class="category-label">Peer Mentor</span>
      <h3>${escapeHtml(person.name)}</h3>
      <div class="senior-meta">${escapeHtml(person.course)} • ${escapeHtml(person.interest)}</div>
      <p>${escapeHtml(person.bio)}</p>
      <div class="senior-actions"><button class="read-more button-reset" type="button" data-senior-answers="${escapeHtml(person.id)}">View Answers (${escapeHtml(person.answers)}) →</button></div>
    </article>
  `).join("");
}

function openLightbox(index) {
  const items = filteredGalleryItems();
  if (!items.length) return;
  state.lightboxItems = items;
  state.lightboxIndex = Math.max(0, Math.min(index, items.length - 1));
  renderLightbox();
  $("#lightbox").hidden = false;
  document.body.classList.add("no-scroll");
  $("#lightboxClose").focus();
}

function renderLightbox() {
  const item = state.lightboxItems[state.lightboxIndex];
  if (!item) return;
  const image = $("#lightboxImage");
  image.src = item.image;
  image.alt = item.caption;
  image.onerror = () => { image.removeAttribute("src"); image.alt = `${item.caption} image unavailable`; };
  $("#lightboxCategory").textContent = item.category;
  $("#lightboxTitle").textContent = item.caption;
  $("#lightboxCaption").textContent = `Gallery • ${item.category}`;
}

function closeLightbox() {
  $("#lightbox").hidden = true;
  document.body.classList.remove("no-scroll");
}

function moveLightbox(delta) {
  if (!state.lightboxItems.length) return;
  state.lightboxIndex = (state.lightboxIndex + delta + state.lightboxItems.length) % state.lightboxItems.length;
  renderLightbox();
}

function openNewsDetail(id) {
  const item = getNews().find(entry => entry.id === id);
  if (!item) return;
  const modal = $("#newsModal");
  const image = $("#newsModalImage");
  image.src = item.image || "";
  image.alt = item.title;
  image.onerror = () => { image.removeAttribute("src"); };
  $("#newsModalCategory").textContent = item.category || "News";
  $("#newsModalDate").textContent = item.date ? formatDate(item.date) : "Date not specified";
  $("#newsModalTitle").textContent = item.title;
  $("#newsModalSource").textContent = `Source / author: ${item.author || "COFsConnect"}`;
  $("#newsModalArticle").textContent = item.article || item.description || "";
  modal.hidden = false;
  document.body.classList.add("no-scroll");
  $("#newsModalClose").focus();
}
function closeNewsDetail() {
  $("#newsModal").hidden = true;
  document.body.classList.remove("no-scroll");
}

function openGlobalSearch() {
  $("#globalSearchPanel").hidden = false;
  document.body.classList.add("no-scroll");
  $("#globalSearchInput").focus();
  renderGlobalSearch($("#globalSearchInput").value);
}

function closeGlobalSearch() {
  $("#globalSearchPanel").hidden = true;
  document.body.classList.remove("no-scroll");
}

function searchContent(query) {
  const q = String(query || "").trim().toLowerCase();
  if (!q) return [];
  const results = [];
  getNews().forEach(item => {
    if ([item.title, item.category, item.description, item.author].some(value => String(value || "").toLowerCase().includes(q))) {
      results.push({ type: "News", title: item.title, meta: `${item.category} • ${formatDate(item.date)}`, anchor: "#news" });
    }
  });
  getNotes().forEach(item => {
    if ([item.title, item.subject, item.type, item.semester, item.description].some(value => String(value || "").toLowerCase().includes(q))) {
      results.push({ type: "Resource", title: item.title, meta: `${item.subject} • ${item.type}`, anchor: "#notes" });
    }
  });
  getEvents().forEach(item => {
    if ([item.title, item.location, item.organizer, item.description].some(value => String(value || "").toLowerCase().includes(q))) {
      results.push({ type: "Event", title: item.title, meta: `${formatDate(item.date)} • ${item.location}`, anchor: "#events" });
    }
  });
  getQuestions().forEach(item => {
    if ([item.question, item.name, item.year, item.category].some(value => String(value || "").toLowerCase().includes(q))) {
      results.push({ type: "Question", title: item.question, meta: `${item.category} • ${item.answers.length} answers`, anchor: "#ask-seniors" });
    }
  });
  return results.slice(0, 30);
}

function renderGlobalSearch(query) {
  const target = $("#globalSearchResults");
  const results = searchContent(query);
  if (!String(query).trim()) {
    target.innerHTML = `<div class="no-results">Start typing to search news, notes, events and questions.</div>`;
    return;
  }
  if (!results.length) {
    target.innerHTML = `<div class="no-results">No results found.</div>`;
    return;
  }
  target.innerHTML = results.map(result => `
    <a class="search-result" href="${result.anchor}" data-global-result>
      <span class="result-type">${escapeHtml(result.type)}</span>
      <strong>${escapeHtml(result.title)}</strong>
      <small>${escapeHtml(result.meta)}</small>
    </a>
  `).join("");
}

function submitNotesRequest(event) {
  event.preventDefault();
  const item = {
    id: `request-${Date.now()}`,
    name: $("#requestName").value.trim(),
    semester: $("#requestSemester").value.trim(),
    subject: $("#requestSubject").value.trim(),
    resourceType: $("#requestType").value,
    title: $("#requestTitle").value.trim(),
    message: $("#requestMessage").value.trim(),
    contact: $("#requestContact").value.trim(),
    date: new Date().toISOString(),
    status: "Pending"
  };
  const items = getNotesRequests();
  items.unshift(item);
  saveArray(STORAGE_KEYS.notesRequests, items);
  event.currentTarget.reset();
  const message = $("#notesRequestMessage");
  if (message) message.textContent = "Request submitted. It is now visible in the admin Notes Requests panel.";
  renderAdminStats();
  renderAdminNotesRequests();
  showToast("Notes request submitted.");
}

function renderAdminNotesRequests() {
  const target = $("#adminNotesRequestsList");
  if (!target) return;
  const items = getNotesRequests();
  if (!items.length) { target.innerHTML = `<div class="empty-state">No notes requests yet.</div>`; return; }
  target.innerHTML = items.map(item => `
    <div class="admin-request-row">
      <strong>${escapeHtml(item.title)}</strong>
      <small>${escapeHtml(item.name)} • ${escapeHtml(item.semester)} • ${escapeHtml(item.subject)} • ${escapeHtml(item.resourceType)} • ${escapeHtml(formatDate(item.date?.slice(0,10) || ""))}</small>
      <p>${escapeHtml(item.message || "No additional message.")}</p>
      ${item.contact ? `<small>Contact: ${escapeHtml(item.contact)}</small>` : ""}
      <div class="admin-row-actions">
        <label class="sr-only" for="status-${escapeHtml(item.id)}">Request status</label>
        <select class="status-select" id="status-${escapeHtml(item.id)}" data-request-status="${escapeHtml(item.id)}"><option ${item.status === "Pending" ? "selected" : ""}>Pending</option><option ${item.status === "In Progress" ? "selected" : ""}>In Progress</option><option ${item.status === "Completed" ? "selected" : ""}>Completed</option></select>
        <button class="button button-secondary button-small" type="button" data-delete-request="${escapeHtml(item.id)}">Delete</button>
      </div>
    </div>
  `).join("");
}

function updateNotesRequestStatus(id, status) {
  const items = getNotesRequests();
  const item = items.find(entry => entry.id === id);
  if (!item) return;
  item.status = status;
  saveArray(STORAGE_KEYS.notesRequests, items);
  renderAdminNotesRequests();
  showToast("Request status updated.");
}

function deleteNotesRequest(id) {
  if (!confirmDelete("notes request")) return;
  saveArray(STORAGE_KEYS.notesRequests, getNotesRequests().filter(item => item.id !== id));
  renderAdminNotesRequests();
  renderAdminStats();
  showToast("Notes request deleted.");
}

function submitQuestion(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const question = {
    id: `question-${Date.now()}`,
    name: $("#questionName").value.trim(),
    year: $("#questionYear").value.trim(),
    category: $("#questionCategory").value,
    question: $("#questionText").value.trim(),
    date: todayISO,
    answers: []
  };
  const file = $("#questionAttachment").files[0];
  if (file) question.attachmentName = file.name;
  const items = getQuestions();
  items.unshift(question);
  saveArray(STORAGE_KEYS.questions, items);
  form.reset();
  renderQuestions();
  renderQuestionHighlight();
  renderAdminQuestions();
  showToast("Question submitted successfully.");
}

function submitAnswer(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const questionId = form.dataset.answerForm;
  const items = getQuestions();
  const question = items.find(item => item.id === questionId);
  if (!question) return;
  const name = form.elements.answerName.value.trim();
  const text = form.elements.answerText.value.trim();
  question.answers = Array.isArray(question.answers) ? question.answers : [];
  const answer = { id: `answer-${Date.now()}`, questionId, name, text, date: todayISO };
  question.answers.push(answer);
  const answers = getAnswers();
  answers.push(answer);
  saveArray(STORAGE_KEYS.answers, answers);
  saveArray(STORAGE_KEYS.questions, items);
  state.answerOpenFor = null;
  renderQuestions();
  renderQuestionHighlight();
  renderAdminQuestions();
  showToast("Answer posted.");
}

function renderAdminQuestions() {
  const target = $("#adminQuestionsList");
  if (!target) return;
  const items = getQuestions();
  if (!items.length) {
    target.innerHTML = `<div class="empty-state">No questions to manage.</div>`;
    return;
  }
  target.innerHTML = items.map(q => `
    <div class="admin-q-row">
      <div>
        <strong>${escapeHtml(q.question)}</strong>
        <small>${escapeHtml(q.category)} • ${escapeHtml(q.name)} • ${q.answers.length} answers</small>
      </div>
      <div class="admin-row-actions">
        <button class="button button-secondary button-small" type="button" data-admin-delete-question="${escapeHtml(q.id)}">Delete</button>
      </div>
    </div>
  `).join("");
}

function renderAdminStats() {
  const target = $("#adminStats");
  if (!target) return;
  const stats = [
    ["News", getNews().length],
    ["Resources", getNotes().length],
    ["Gallery", getGallery().length],
    ["Events", getEvents().length],
    ["Questions", getQuestions().length],
    ["Notes Requests", getNotesRequests().length]
  ];
  target.innerHTML = stats.map(([label, value]) => `<div class="admin-stat"><strong>${value}</strong><span>${label}</span></div>`).join("");
}

function setAdminLogin(isLoggedIn) {
  state.adminLoggedIn = isLoggedIn;
  const loginPanel = $("#adminLoginPanel");
  const dashboard = $("#adminDashboard");
  if (isLoggedIn) {
    loginPanel.hidden = true;
    dashboard.hidden = false;
    sessionStorage.setItem(STORAGE_KEYS.adminSession, "true");
    renderAdminStats();
    renderAdminQuestions();
    renderAdminNotesRequests();
    renderAdminNewsList();
    renderAdminGalleryList();
  } else {
    loginPanel.hidden = false;
    dashboard.hidden = true;
    sessionStorage.removeItem(STORAGE_KEYS.adminSession);
  }
}

function loginAdmin(event) {
  event.preventDefault();
  const username = $("#adminUsername").value.trim();
  const password = $("#adminPassword").value;
  const message = $("#adminLoginMessage");
  if (username === "admin" && password === "admin123") {
    message.textContent = "Login successful.";
    setAdminLogin(true);
    showToast("Admin dashboard unlocked for this browser session.");
  } else {
    message.textContent = "Login failed. Check your credentials.";
  }
}

function confirmDelete(label) {
  return window.confirm(`Delete ${label}? This action cannot be undone in this browser.`);
}

function getCollectionByStorageKey(key) {
  const map = {
    [STORAGE_KEYS.news]: getNews,
    [STORAGE_KEYS.notes]: getNotes,
    [STORAGE_KEYS.gallery]: getGallery,
    [STORAGE_KEYS.events]: getEvents,
    [STORAGE_KEYS.questions]: getQuestions
  };
  return map[key] ? map[key]() : [];
}

function deleteById(key, id, label) {
  if (!confirmDelete(label)) return;
  const data = getCollectionByStorageKey(key);
  const filtered = data.filter(item => item.id !== id);
  saveArray(key, filtered);
  refreshAllContent();
  showToast(`${label} deleted.`);
}

function addAdminNews(event) {
  event.preventDefault();
  const item = {
    id: `news-admin-${Date.now()}`,
    title: $("#adminNewsTitle").value.trim(),
    category: $("#adminNewsCategory").value,
    date: $("#adminNewsDate").value,
    author: $("#adminNewsAuthor").value.trim(),
    image: $("#adminNewsImage").value.trim(),
    description: $("#adminNewsDescription").value.trim()
  };
  const data = getNews();
  data.unshift(item);
  saveArray(STORAGE_KEYS.news, data);
  event.currentTarget.reset();
  $("#adminNewsAuthor").value = "COFsConnect";
  renderAdminStats();
  refreshAllContent();
  showToast("News added.");
}

function addAdminNote(event) {
  event.preventDefault();
  const item={id:`note-admin-${Date.now()}`,subject:$("#adminNoteSubject").value,title:$("#adminNoteTitle").value.trim(),type:$("#adminNoteType").value,semester:$("#adminNoteSemester").value.trim(),uploadedBy:$("#adminNoteUploadedBy").value.trim(),date:$("#adminNoteDate").value,url:$("#adminNoteUrl").value.trim()||"#",description:$("#adminNoteDescription").value.trim()||"Admin-added academic resource."};
  const data=getNotes(); data.unshift(item); saveArray(STORAGE_KEYS.notes,data); event.currentTarget.reset(); $("#adminNoteUploadedBy").value="COFsConnect Admin"; renderAdminStats(); refreshAllContent(); showToast("Resource added.");
}

function addAdminGallery(event) {
  event.preventDefault();
  const item = { id:`gallery-admin-${Date.now()}`, caption:$("#adminGalleryCaption").value.trim(), category:$("#adminGalleryCategory").value, event:$("#adminGalleryEvent").value.trim(), image:$("#adminGalleryImage").value.trim(), date:$("#adminGalleryDate").value };
  const data=getGallery(); data.unshift(item); saveArray(STORAGE_KEYS.gallery,data); event.currentTarget.reset(); renderAdminStats(); refreshAllContent(); showToast("Gallery image added.");
}

function addAdminEvent(event) {
  event.preventDefault();
  const item = {
    id: `event-admin-${Date.now()}`,
    title: $("#adminEventTitle").value.trim(),
    date: $("#adminEventDate").value,
    time: $("#adminEventTime").value.trim(),
    location: $("#adminEventLocation").value.trim(),
    organizer: $("#adminEventOrganizer").value.trim(),
    description: $("#adminEventDescription").value.trim()
  };
  const data = getEvents();
  data.unshift(item);
  saveArray(STORAGE_KEYS.events, data);
  event.currentTarget.reset();
  renderAdminStats();
  refreshAllContent();
  showToast("Event added.");
}

let editingNewsId = null;

function resetAdminNewsForm() {
  editingNewsId = null;
  $("#adminNewsForm").reset();
  $("#adminNewsAuthor").value = "COFsConnect";
  $("#adminNewsFormTitle").textContent = "Add News";
  $("#adminNewsSubmit").textContent = "Add News";
  $("#adminNewsCancelEdit").hidden = true;
}

function editAdminNews(id) {
  const item = getNews().find(entry => entry.id === id);
  if (!item) return;
  editingNewsId = id;
  $("#adminNewsTitle").value = item.title || "";
  $("#adminNewsCategory").value = item.category || "College";
  $("#adminNewsDate").value = item.date || "";
  $("#adminNewsAuthor").value = item.author || "COFsConnect";
  $("#adminNewsImage").value = item.image || "";
  $("#adminNewsDescription").value = item.description || "";
  $("#adminNewsArticle").value = item.article || "";
  $("#adminNewsFormTitle").textContent = "Edit News";
  $("#adminNewsSubmit").textContent = "Save Changes";
  $("#adminNewsCancelEdit").hidden = false;
  document.getElementById("adminNewsForm").scrollIntoView({behavior:"smooth", block:"center"});
}

function renderAdminNewsList() {
  const target = $("#adminNewsList");
  if (!target) return;
  const items = getNews();
  target.innerHTML = items.map(item => `<div class="admin-content-row"><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.category)} • ${escapeHtml(item.date ? formatDate(item.date) : "Date not specified")}</small><div class="admin-row-actions"><button class="button button-secondary button-small" type="button" data-edit-news="${escapeHtml(item.id)}">Edit</button><button class="button button-secondary button-small" type="button" data-delete-news="${escapeHtml(item.id)}">Delete</button></div></div>`).join("") || `<div class="empty-state">No news items.</div>`;
}

function renderAdminGalleryList() {
  const target = $("#adminGalleryList");
  if (!target) return;
  const items = getGallery();
  target.innerHTML = items.map(item => `<div class="admin-content-row"><strong>${escapeHtml(item.caption)}</strong><small>${escapeHtml(item.category)} • ${escapeHtml(item.event || item.category)}</small><div class="admin-row-actions"><button class="button button-secondary button-small" type="button" data-delete-gallery="${escapeHtml(item.id)}">Delete</button></div></div>`).join("") || `<div class="empty-state">No gallery items.</div>`;
}

function addAdminNewsEnhanced(event) {
  event.preventDefault();
  const item = {
    id: editingNewsId || `news-admin-${Date.now()}`,
    title: $("#adminNewsTitle").value.trim(), category: $("#adminNewsCategory").value, date: $("#adminNewsDate").value,
    author: $("#adminNewsAuthor").value.trim(), image: $("#adminNewsImage").value.trim(), description: $("#adminNewsDescription").value.trim(), article: $("#adminNewsArticle").value.trim()
  };
  const data = getNews();
  const index = data.findIndex(entry => entry.id === item.id);
  if (index >= 0) data[index] = item; else data.unshift(item);
  saveArray(STORAGE_KEYS.news, data);
  resetAdminNewsForm();
  refreshAllContent();
  showToast(index >= 0 ? "News updated." : "News added.");
}

function refreshAllContent() {
  renderNews();
  renderNews("latestNewsGrid", 3);
  renderNotes();
  renderNotes("featuredNotesGrid", 3);
  renderEvents();
  renderEvents("homeEventsList", 3);
  renderGalleryFilters();
  renderGallery();
  renderGalleryPreview();
  renderQuestions();
  renderQuestionHighlight();
  renderAdminStats();
  renderAdminQuestions();
  renderAdminNotesRequests();
  renderAdminNewsList();
  renderAdminGalleryList();
}

function bindNavigation() {
  const toggle = $("#navToggle");
  const nav = $("#primaryNav");
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });
  $$("#primaryNav a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");
  }));
}

function bindFilters() {
  document.addEventListener("click", event => {
    const newsFilter = event.target.closest("[data-news-filter]");
    if (newsFilter) {
      state.newsFilter = newsFilter.dataset.newsFilter;
      $$('[data-news-filter]').forEach(btn => btn.classList.toggle("active", btn.dataset.newsFilter === state.newsFilter));
      renderNews();
      return;
    }
    const noteFilter = event.target.closest("[data-note-filter]");
    if (noteFilter) {
      state.noteFilter = noteFilter.dataset.noteFilter;
      $$('[data-note-filter]').forEach(btn => btn.classList.toggle("active", btn.dataset.noteFilter === state.noteFilter));
      renderNotes();
      return;
    }
    const galleryFilter = event.target.closest("[data-gallery-filter]");
    if (galleryFilter) {
      state.galleryFilter = galleryFilter.dataset.galleryFilter;
      renderGalleryFilters();
      renderGallery();
    }
  });
}

function bindSearch() {
  $("#newsSearch").addEventListener("input", event => {
    state.newsQuery = event.target.value;
    renderNews();
  });
  $("#notesSearch").addEventListener("input", event => {
    state.noteQuery = event.target.value;
    renderNotes();
  });
  $("#eventsSearch").addEventListener("input", event => {
    state.eventQuery = event.target.value;
    renderEvents();
  });
  $("#questionSearch").addEventListener("input", event => {
    state.questionQuery = event.target.value;
    renderQuestions();
  });
}

function bindGlobalSearch() {
  const openButton = $("#openGlobalSearch");
  if (openButton) openButton.addEventListener("click", openGlobalSearch);
  $("#closeGlobalSearch").addEventListener("click", closeGlobalSearch);
  $$('[data-close-global-search]').forEach(el => el.addEventListener("click", closeGlobalSearch));
  $("#globalSearchInput").addEventListener("input", event => renderGlobalSearch(event.target.value));
  $("#globalSearchInput").addEventListener("keydown", event => {
    if (event.key === "Escape") closeGlobalSearch();
  });
  $("#globalSearchResults").addEventListener("click", event => {
    const link = event.target.closest("[data-global-result]");
    if (!link) return;
    closeGlobalSearch();
  });
}

function bindGallery() {
  $("#galleryGrid").addEventListener("click", event => {
    const button = event.target.closest("[data-gallery-index]");
    if (button) openLightbox(Number(button.dataset.galleryIndex));
  });
  $("#homeGalleryGrid").addEventListener("click", event => {
    const button = event.target.closest("[data-gallery-preview-index]");
    if (!button) return;
    const items = getGallery();
    const index = items.findIndex(item => item.id === button.dataset.galleryId);
    state.lightboxItems = items; state.lightboxIndex = index >= 0 ? index : 0;
    renderLightbox(); $("#lightbox").hidden = false; document.body.classList.add("no-scroll");
  });
  $("#lightboxClose").addEventListener("click", closeLightbox);
  $$('[data-close-lightbox]').forEach(el => el.addEventListener("click", closeLightbox));
  $("#lightboxPrev").addEventListener("click", () => moveLightbox(-1));
  $("#lightboxNext").addEventListener("click", () => moveLightbox(1));
  $("#newsModalClose").addEventListener("click", closeNewsDetail);
  $("#newsModalBack").addEventListener("click", closeNewsDetail);
  $$('[data-close-news]').forEach(el => el.addEventListener("click", closeNewsDetail));
  document.addEventListener("keydown", event => {
    if (!$("#lightbox").hidden) {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") moveLightbox(-1);
      if (event.key === "ArrowRight") moveLightbox(1);
    }
    if (!$("#globalSearchPanel").hidden && event.key === "Escape") closeGlobalSearch();
    if (!$("#newsModal").hidden && event.key === "Escape") closeNewsDetail();
  });
}

function bindQuestions() {
  $("#questionForm").addEventListener("submit", submitQuestion);
  $("#questionsList").addEventListener("click", event => {
    const toggle = event.target.closest("[data-answer-toggle]");
    if (!toggle) return;
    const id = toggle.dataset.answerToggle;
    state.answerOpenFor = state.answerOpenFor === id ? null : id;
    renderQuestions();
  });
  $("#questionsList").addEventListener("submit", event => {
    const form = event.target.closest("[data-answer-form]");
    if (form) submitAnswer(event);
  });
}

function bindAdmin() {
  $("#adminLoginForm").addEventListener("submit", loginAdmin);
  $("#adminLogout").addEventListener("click", () => { setAdminLogin(false); showToast("Admin session closed."); });
  $("#adminNewsForm").addEventListener("submit", addAdminNewsEnhanced);
  $("#adminNewsCancelEdit").addEventListener("click", resetAdminNewsForm);
  $("#adminNotesForm").addEventListener("submit", addAdminNote);
  $("#adminGalleryForm").addEventListener("submit", addAdminGallery);
  $("#adminEventsForm").addEventListener("submit", addAdminEvent);
  $("#notesRequestForm").addEventListener("submit", submitNotesRequest);
  $("#adminQuestionsList").addEventListener("click", event => {
    const deleteBtn = event.target.closest("[data-admin-delete-question]");
    if (deleteBtn) deleteById(STORAGE_KEYS.questions, deleteBtn.dataset.adminDeleteQuestion, "question");
  });
  $("#adminNotesRequestsList").addEventListener("change", event => { const select = event.target.closest("[data-request-status]"); if (select) updateNotesRequestStatus(select.dataset.requestStatus, select.value); });
  $("#adminNotesRequestsList").addEventListener("click", event => { const btn = event.target.closest("[data-delete-request]"); if (btn) deleteNotesRequest(btn.dataset.deleteRequest); });
  $("#adminNewsList").addEventListener("click", event => {
    const edit = event.target.closest("[data-edit-news]"); if (edit) { editAdminNews(edit.dataset.editNews); return; }
    const del = event.target.closest("[data-delete-news]"); if (del) deleteById(STORAGE_KEYS.news, del.dataset.deleteNews, "news item");
  });
  $("#adminGalleryList").addEventListener("click", event => { const del = event.target.closest("[data-delete-gallery]"); if (del) deleteById(STORAGE_KEYS.gallery, del.dataset.deleteGallery, "gallery image"); });
  const collectionSelect = $("#deleteCollection"), itemSelect = $("#deleteItem");
  function updateItems() {
    const collection = collectionSelect.value;
    const keyMap = { notes:getNotes, events:getEvents };
    const items = keyMap[collection]();
    itemSelect.innerHTML = items.map(item => `<option value="${escapeHtml(item.id)}">${escapeHtml(item.title || item.caption)}</option>`).join("") || `<option value="">No items</option>`;
  }
  collectionSelect.addEventListener("change", updateItems);
  $("#deleteSelectedItem").addEventListener("click", () => { const collection=collectionSelect.value, id=itemSelect.value; if (!id) return; deleteById(STORAGE_KEYS[collection], id, collection === "notes" ? "resource" : "event"); updateItems(); });
  updateItems();
}

function addAdminDeleteControls() { /* Management controls are part of the admin dashboard markup. */ }

function bindResetButtons() {
  $("#clearNewsFilters").addEventListener("click", () => {
    state.newsFilter = "All";
    state.newsQuery = "";
    $("#newsSearch").value = "";
    $$("[data-news-filter]").forEach(btn => btn.classList.toggle("active", btn.dataset.newsFilter === "All"));
    renderNews();
  });
  $("#clearNotesFilters").addEventListener("click", () => {
    state.noteFilter = "All";
    state.noteQuery = "";
    $("#notesSearch").value = "";
    $$("[data-note-filter]").forEach(btn => btn.classList.toggle("active", btn.dataset.noteFilter === "All"));
    renderNotes();
  });
  $("#clearEventSearch").addEventListener("click", () => {
    state.eventQuery = "";
    $("#eventsSearch").value = "";
    renderEvents();
  });
}

function bindCardButtons() {
  document.addEventListener("click", event => {
    const newsButton = event.target.closest("[data-news-open]");
    if (newsButton) {
      const item = getNews().find(entry => entry.id === newsButton.dataset.newsOpen);
      if (item) {
        openNewsDetail(item.id);
      }
      return;
    }

    const eventButton = event.target.closest("[data-event-details]");
    if (eventButton) {
      const item = getEvents().find(entry => entry.id === eventButton.dataset.eventDetails);
      if (item) {
        window.alert(`${item.title}\n\n${item.description}\n\n${formatDate(item.date)} at ${item.time}\n${item.location}\nOrganized by ${item.organizer}`);
      }
      return;
    }

    const seniorButton = event.target.closest("[data-senior-answers]");
    if (seniorButton) {
      const person = seniorData.find(entry => entry.id === seniorButton.dataset.seniorAnswers);
      if (person) {
        window.alert(`${person.name}\n${person.course}\n${person.interest}\n\nSample profile for COFsConnect. Replace this with an administrator-approved profile when deploying.`);
      }
    }
  });
}

function setupRevealObserver() {
  const elements = $$(".reveal");
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    elements.forEach(el => el.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  elements.forEach(el => observer.observe(el));
}

function initialiseDateDefaults() {
  const galleryCategory = $("#adminGalleryCategory");
  if (galleryCategory) galleryCategory.innerHTML = GALLERY_CATEGORIES.map(category => `<option>${escapeHtml(category)}</option>`).join("");
  ["#adminNewsDate", "#adminNoteDate", "#adminEventDate", "#adminGalleryDate"].forEach(selector => {
    const el = $(selector);
    if (el) el.value = todayISO;
  });
}

function handleResourcePlaceholderLinks() {
  document.addEventListener("click", event => {
    const link = event.target.closest("[data-resource-url]");
    if (!link) return;
    const url = link.dataset.resourceUrl;
    if (!url || url === "#") {
      event.preventDefault();
      showToast("This resource is a placeholder. Add a real PDF/PPT/DOCX link from the Admin dashboard.");
    }
  });
}

let heroIndex = 0;
let heroTimer = null;
let heroInteracting = false;

function renderHeroDots() {
  const target = $("#heroSlideDots");
  if (!target) return;
  const slides = getHeroSlides();
  target.innerHTML = slides.map((_, i) => `<button class="hero-slide-dot ${i === heroIndex ? "active" : ""}" type="button" role="tab" aria-label="Show slide ${i+1}" aria-selected="${i === heroIndex}"></button>`).join("");
}
function showHeroSlide(index, userInteraction = false) {
  const slides = getHeroSlides(); if (!slides.length) return;
  heroIndex = (index + slides.length) % slides.length;
  const slide = slides[heroIndex];
  const image = $("#heroSlideImage");
  image.classList.add("is-changing");
  window.setTimeout(() => {
    image.src = slide.image; image.alt = slide.title; image.onload = () => image.classList.remove("is-changing");
    image.onerror = () => { image.classList.remove("is-changing"); };
  }, 120);
  $("#heroSlideTitle").textContent = slide.title;
  $("#heroSlideCaption").textContent = slide.caption;
  renderHeroDots();
  if (userInteraction) restartHeroAutoplay();
}
function stopHeroAutoplay() { if (heroTimer) { clearInterval(heroTimer); heroTimer = null; } }
function startHeroAutoplay() { stopHeroAutoplay(); if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return; heroTimer = setInterval(() => { if (!heroInteracting) showHeroSlide(heroIndex + 1); }, 5600); }
function restartHeroAutoplay() { startHeroAutoplay(); }
function bindHeroSlideshow() {
  const stage = $("#heroSlideStage"); if (!stage) return;
  renderHeroDots(); showHeroSlide(0);
  $("#heroPrev").addEventListener("click", () => showHeroSlide(heroIndex - 1, true));
  $("#heroNext").addEventListener("click", () => showHeroSlide(heroIndex + 1, true));
  $("#heroSlideDots").addEventListener("click", event => { const dot = event.target.closest(".hero-slide-dot"); if (dot) showHeroSlide(Array.from($("#heroSlideDots").children).indexOf(dot), true); });
  stage.addEventListener("mouseenter", () => { heroInteracting = true; stopHeroAutoplay(); });
  stage.addEventListener("mouseleave", () => { heroInteracting = false; startHeroAutoplay(); });
  stage.addEventListener("focusin", () => { heroInteracting = true; stopHeroAutoplay(); });
  stage.addEventListener("focusout", () => { heroInteracting = false; startHeroAutoplay(); });
  stage.addEventListener("touchstart", () => { heroInteracting = true; stopHeroAutoplay(); }, {passive:true});
  stage.addEventListener("touchend", () => { heroInteracting = false; startHeroAutoplay(); }, {passive:true});
  startHeroAutoplay();
}

function setupApp() {
  if (!localStorage.getItem(STORAGE_KEYS.heroSlides)) saveArray(STORAGE_KEYS.heroSlides, heroSlides);
  if (!localStorage.getItem(STORAGE_KEYS.news)) saveArray(STORAGE_KEYS.news, newsData);
  if (!localStorage.getItem(STORAGE_KEYS.notes)) saveArray(STORAGE_KEYS.notes, notesData);
  if (!localStorage.getItem(STORAGE_KEYS.gallery)) saveArray(STORAGE_KEYS.gallery, galleryData);
  if (!localStorage.getItem(STORAGE_KEYS.events)) saveArray(STORAGE_KEYS.events, eventsData);
  if (!localStorage.getItem(STORAGE_KEYS.questions)) saveArray(STORAGE_KEYS.questions, starterQuestions);
  if (!localStorage.getItem(STORAGE_KEYS.notesRequests)) saveArray(STORAGE_KEYS.notesRequests, notesRequestsData);
  if (!localStorage.getItem(STORAGE_KEYS.answers)) saveArray(STORAGE_KEYS.answers, []);
  bindNavigation();
  bindFilters();
  bindHeroSlideshow();
  bindSearch();
  bindGlobalSearch();
  bindGallery();
  bindQuestions();
  bindAdmin();
  bindResetButtons();
  bindCardButtons();
  handleResourcePlaceholderLinks();
  initialiseDateDefaults();
  refreshAllContent();
  renderSeniors();
  setupRevealObserver();
  addAdminDeleteControls();

  const existingSession = sessionStorage.getItem(STORAGE_KEYS.adminSession) === "true";
  setAdminLogin(existingSession);

  // Keep all hash navigation inside the same document for GitHub Pages.
  window.addEventListener("hashchange", () => {
    if (window.location.hash === "#experts") return;
    const id = window.location.hash.replace("#", "");
    if (id && document.getElementById(id)) {
      document.getElementById(id).scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

document.addEventListener("DOMContentLoaded", setupApp);
