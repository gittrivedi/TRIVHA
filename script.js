"use strict";

const EXPERT_URL = "https://gittrivedi.github.io/#experts";

const STORAGE_KEYS = {
  news: "cofsconnect_news",
  notes: "cofsconnect_notes",
  gallery: "cofsconnect_gallery",
  events: "cofsconnect_events",
  questions: "cofsconnect_questions",
  adminSession: "cofsconnect_admin_demo_session"
};

const todayISO = new Date().toISOString().slice(0, 10);

const newsData = [
  {
    id: "news-1",
    title: "College Seminar on Sustainable Aquaculture",
    category: "Academic",
    date: "2026-09-28",
    author: "COFsConnect",
    image: "https://images.unsplash.com/photo-1530053969600-caed2596d242?auto=format&fit=crop&w=1000&q=80",
    description: "A focused seminar on sustainable aquaculture systems, resource efficiency and responsible production practices."
  },
  {
    id: "news-2",
    title: "Freshers Orientation Programme",
    category: "College",
    date: "2026-10-03",
    author: "COFsConnect",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1000&q=80",
    description: "Orientation activities, introductions and practical guidance for students beginning their college journey."
  },
  {
    id: "news-3",
    title: "Departmental Practical Schedule Released",
    category: "Examination",
    date: "2026-09-25",
    author: "COFsConnect",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1000&q=80",
    description: "Keep an eye on the latest practical timetable, room details and department-level instructions."
  },
  {
    id: "news-4",
    title: "Inter-College Fisheries Quiz",
    category: "Events",
    date: "2026-10-11",
    author: "COFsConnect",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1000&q=80",
    description: "A knowledge-first quiz bringing together students with an interest in aquatic science and fisheries."
  },
  {
    id: "news-5",
    title: "Student Innovation Showcase",
    category: "Achievements",
    date: "2026-10-16",
    author: "COFsConnect",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1000&q=80",
    description: "A showcase of practical, entrepreneurial and research-oriented ideas developed by students."
  },
  {
    id: "news-6",
    title: "Library Resource Corner Expanded",
    category: "Announcements",
    date: "2026-09-21",
    author: "COFsConnect",
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1000&q=80",
    description: "The shared resource shelf now highlights practical manuals, presentations and revision material."
  }
];

const notesData = [
  {
    id: "note-1",
    subject: "Fish Physiology",
    title: "Digestive System of Finfishes",
    type: "Notes",
    semester: "3rd Semester",
    uploadedBy: "COFsConnect",
    date: "2026-09-18",
    url: "#",
    description: "Structured notes covering major digestive organs, enzymes and physiological roles."
  },
  {
    id: "note-2",
    subject: "Practical Manuals",
    title: "Fish Hatchery Management Practical",
    type: "Practical Manual",
    semester: "3rd Semester",
    uploadedBy: "COFsConnect",
    date: "2026-09-16",
    url: "#",
    description: "A practical checklist covering broodstock selection, conditioning, induced breeding and hatchery observations."
  },
  {
    id: "note-3",
    subject: "Fish Processing",
    title: "Value Addition and Fish Processing",
    type: "Presentation",
    semester: "3rd Semester",
    uploadedBy: "COFsConnect",
    date: "2026-09-14",
    url: "#",
    description: "Presentation resource on value addition, preservation, processing operations and product ideas."
  },
  {
    id: "note-4",
    subject: "Aquaculture",
    title: "Biofloc Technology: Quick Revision",
    type: "Notes",
    semester: "4th Semester",
    uploadedBy: "COFsConnect",
    date: "2026-09-11",
    url: "#",
    description: "Compact review notes on biofloc principles, C:N balancing, microbial communities and management."
  }
];