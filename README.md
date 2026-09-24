# COFsConnect

A responsive frontend-only academic community portal for fisheries students.

## Files

- `index.html` - page structure and content
- `style.css` - visual design and responsive layout
- `script.js` - content, search, gallery lightbox, Ask Seniors and demo admin tools
- `assets/` - place local images/icons here when desired

## Run locally

1. Open the folder in VS Code.
2. Open `index.html` directly in a browser, or use the VS Code Live Server extension.
3. No Node.js or build step is required.

## Demo admin

Username: `admin`  
Password: `admin123`

This is deliberately only a frontend demonstration. The credentials and localStorage data are not secure.

## Editing content

Initial content is stored near the top of `script.js` in:
- `newsSeed`
- `notesSeed`
- `eventsSeed`
- `gallerySeed`
- `questionSeed`
- `seniorData`

The Admin section can also add/delete local browser content.

## Real deployment

The site can be deployed to GitHub Pages as a static website.

For a real multi-user question/answer system, file uploads, accounts and shared admin editing, connect the JavaScript data layer to a backend such as Firebase or Supabase. Do not store real passwords in frontend JavaScript.

## Expert link

The “Meet the Experts” buttons point to:
https://gittrivedi.github.io/#experts
