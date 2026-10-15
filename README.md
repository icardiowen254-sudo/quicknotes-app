# QuickNotes

QuickNotes is a lightweight, responsive note-taking app that helps you capture small reminders and ideas, organize them into Personal, Work, and Study categories, and find them again quickly. Notes are saved in your browser, so they stay available when you return to the app on the same browser and device.

## Features

- Add notes with Personal, Work, or Study categories.
- Validate empty notes and notes longer than 200 characters.
- Search notes instantly with a case-insensitive search.
- Delete individual notes.
- See a live count of all saved notes.
- View each note's category and creation date/time.
- Save notes in browser `localStorage` so they persist between visits.
- Responsive layout for desktop and mobile screens.
- Accessible labels, helpful error messages, and safe text rendering.

## How to run locally

1. Download or clone this repository.
2. Keep `index.html`, `style.css`, and `script.js` together in the same folder.
3. Open `index.html` in a modern web browser. No build tools or dependencies are required.
4. Add a note, choose a category, and use the search field to filter your notes.

Notes are stored in the current browser's local storage. Clearing that browser's site data will remove the saved notes, and notes do not automatically sync between devices.

## What I learned

- How semantic HTML, labels, forms, and accessible feedback help make a page easier to use.
- How CSS Flexbox, grid, reusable classes, and media queries create a responsive interface.
- How JavaScript events and DOM methods can add, render, search, and delete items dynamically.
- How to validate user input and use `textContent` to display text safely.
- How `JSON.stringify()`, `JSON.parse()`, and `localStorage` can persist data in the browser.
