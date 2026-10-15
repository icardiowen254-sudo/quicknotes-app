// QuickNotes: create, search, delete, and locally save your notes.
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");

const STORAGE_KEY = "quicknotes-notes";
let notes = loadNotes();

function loadNotes() {
  try {
    const savedNotes = localStorage.getItem(STORAGE_KEY);
    const parsedNotes = savedNotes ? JSON.parse(savedNotes) : [];
    return Array.isArray(parsedNotes) ? parsedNotes.filter((note) =>
      note && typeof note.id === "string" &&
      typeof note.text === "string" &&
      ["personal", "work", "study"].includes(note.category) &&
      typeof note.createdAt === "string"
    ) : [];
  } catch (error) {
    console.warn("QuickNotes could not read saved notes.", error);
    return [];
  }
}

function saveNotes() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (error) {
    errorMessage.textContent = "Your browser could not save this note. Check your storage settings.";
    console.warn("QuickNotes could not save notes.", error);
  }
}

function updateCount() {
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
}

function render() {
  notesList.replaceChildren();
  const query = searchInput.value.trim().toLocaleLowerCase();
  const visibleNotes = notes.filter((note) => note.text.toLocaleLowerCase().includes(query));

  if (visibleNotes.length === 0 && query) {
    const empty = document.createElement("li");
    empty.className = "empty-state";
    const heading = document.createElement("strong");
    heading.textContent = "No notes match your search.";
    const hint = document.createElement("span");
    hint.textContent = "Try another word or phrase.";
    empty.append(heading, hint);
    notesList.append(empty);
  } else if (visibleNotes.length === 0 && notes.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty-state";
    const heading = document.createElement("strong");
    heading.textContent = "Your page is a blank canvas.";
    const hint = document.createElement("span");
    hint.textContent = "Add your first note above and it will appear here.";
    empty.append(heading, hint);
    notesList.append(empty);
  } else {
    visibleNotes.forEach((note) => {
      const item = document.createElement("li");
      item.className = `note-card category-${note.category}`;

      const top = document.createElement("div");
      top.className = "note-card-top";

      const text = document.createElement("p");
      text.className = "note-text";
      text.textContent = note.text;

      const category = document.createElement("span");
      category.className = "category-badge";
      category.textContent = note.category.charAt(0).toUpperCase() + note.category.slice(1);
      top.append(text, category);

      const date = document.createElement("p");
      date.className = "note-date";
      const parsedDate = new Date(note.createdAt);
      date.textContent = Number.isNaN(parsedDate.getTime()) ? "Date unavailable" : parsedDate.toLocaleString();

      const bottom = document.createElement("div");
      bottom.className = "note-card-bottom";

      const deleteButton = document.createElement("button");
      deleteButton.className = "delete-button";
      deleteButton.type = "button";
      deleteButton.textContent = "Delete";
      deleteButton.setAttribute("aria-label", `Delete note: ${note.text}`);
      deleteButton.addEventListener("click", () => {
        notes = notes.filter((savedNote) => savedNote.id !== note.id);
        saveNotes();
        render();
      });

      bottom.append(deleteButton);
      item.append(top, date, bottom);
      notesList.append(item);
    });
  }

  updateCount();
}

noteForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = noteInput.value.trim();

  if (!text) {
    errorMessage.textContent = "Please type a note first.";
    noteInput.focus();
    return;
  }

  if (text.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    noteInput.focus();
    return;
  }

  notes.unshift({
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    text,
    category: noteCategory.value,
    createdAt: new Date().toISOString()
  });

  saveNotes();
  noteInput.value = "";
  errorMessage.textContent = "";
  render();
});

searchInput.addEventListener("input", render);

render();
