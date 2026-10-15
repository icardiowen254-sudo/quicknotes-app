// QuickNotes: add notes, validate input, delete notes, and keep the count current.
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

let notes = [];

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

  notes.forEach((note) => {
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
    date.textContent = new Date(note.createdAt).toLocaleString();

    const bottom = document.createElement("div");
    bottom.className = "note-card-bottom";

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("aria-label", `Delete note: ${note.text}`);
    deleteButton.addEventListener("click", () => {
      notes = notes.filter((savedNote) => savedNote.id !== note.id);
      render();
    });

    bottom.append(deleteButton);
    item.append(top, date, bottom);
    notesList.append(item);
  });

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

  noteInput.value = "";
  errorMessage.textContent = "";
  render();
});
