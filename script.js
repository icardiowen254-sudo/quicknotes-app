// QuickNotes: the first step is adding notes and rendering them safely.
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");

let notes = [];

function render() {
  notesList.replaceChildren();

  notes.forEach((note) => {
    const item = document.createElement("li");
    item.className = `note-card category-${note.category}`;

    const text = document.createElement("p");
    text.className = "note-text";
    text.textContent = note.text;

    const category = document.createElement("span");
    category.className = "category-badge";
    category.textContent = note.category.charAt(0).toUpperCase() + note.category.slice(1);

    const top = document.createElement("div");
    top.className = "note-card-top";
    top.append(text, category);
    item.append(top);
    notesList.append(item);
  });
}

noteForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = noteInput.value.trim();
  if (!text) return;

  notes.unshift({
    id: Date.now().toString(),
    text,
    category: noteCategory.value,
    createdAt: new Date().toISOString()
  });

  noteInput.value = "";
  render();
});
