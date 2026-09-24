# COFsConnect

COFsConnect is a responsive frontend-only academic community portal for fisheries students.

## Files

- `index.html` - page structure, hero slideshow, news, request notes, gallery, Ask Seniors, events and admin UI.
- `style.css` - existing Roman/classical academic visual system plus the enhancement layer.
- `script.js` - starter content, localStorage data layer, slideshow, filtering, search, gallery lightbox, news details, Request Notes and admin tools.
- `assets/images/` - place your own hero, news and gallery photographs here.
- `assets/notes/` - optional location for local PDFs/PPTs/DOCX files.

## Run locally / GitHub Pages

1. Keep `index.html`, `style.css` and `script.js` in the same folder.
2. Create `assets/images/`.
3. Open `index.html` directly or use VS Code Live Server.
4. GitHub Pages can serve the folder directly. No Node.js or build step is required.

## Hero photographs

At the top of `script.js`, edit the `heroSlides` array. Example:

```javascript
const heroSlides = [
  {
    image: "assets/images/hero-1.jpg",
    title: "Freshwater Life",
    caption: "Discovering aquatic ecosystems."
  }
];
```

The slideshow reads all hero images from this one array. Add or remove objects without changing the HTML.

## Gallery photographs

Gallery starter metadata is in `galleryData`. Replace the local paths such as `assets/images/christmas-01.jpg` with your photographs. The category list is stored in `GALLERY_CATEGORIES`.

To add a new category:

1. Add its name to `GALLERY_CATEGORIES`.
2. Add gallery objects with that exact category name.
3. The filter buttons and Admin Gallery category selector will update automatically.

The Admin Gallery form can also add an image path, caption, category, event/festival name and date. Delete actions use browser confirmation.

## News

News starter content is stored in `newsData`. Each item supports title, category, date, author/source, image, short description and a full article. Future articles can be added to the array or through the Admin Dashboard.

## Request Notes

Students can submit a request from the public `Request Notes` section. Requests are stored in `localStorage` under `notesRequests` with a `Pending`, `In Progress` or `Completed` status. The Admin Dashboard can change the status or delete a request.

The structure is intentionally backend-ready, but this GitHub Pages version remains browser-local. A real multi-user deployment should replace the localStorage data layer and frontend-only login with Firebase, Supabase or another authenticated backend.

## Admin

The existing frontend login remains available for local testing. It is not secure authentication because credentials and data live in the browser. Do not use real passwords or sensitive data in this static version.

The dashboard now includes:

- Add/edit/delete News
- Add/delete Notes
- Add Events and delete Notes/Events
- Add/delete Gallery Images
- Manage Questions and Senior Answers
- Manage Notes Requests and request status

## External expert link

All `Meet the Experts` links point to:
https://gittrivedi.github.io/#experts

## Branding

Public wording uses `Managed by Tryva`. The site remains branded as `COFsConnect` with the tagline `Connect. Learn. Share. Grow.`.
