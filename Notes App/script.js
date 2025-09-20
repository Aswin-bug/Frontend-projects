const notesContainer = document.querySelector(".notes-container"); //Finds the first element in the DOM that matches .notes-container, You only have one container for all notes. You don’t need multiple; you just need the single <div class="notes-container">. so this is the best choice
const createBtn = document.querySelector(".btn");  //Finds the first element that matches .btn. In your HTML, You only want one "Create Notes" button, so grabbing the first match is enough.
let notes = document.querySelectorAll(".input-box");  //You’re dynamically creating multiple notes (<p class="input-box">...</p>)You want to attach behavior to each of them (e.g., delete, save).

function showNotes() {
  notesContainer.innerHTML = localStorage.getItem("notes");
}

showNotes();

createBtn.addEventListener("click", () => {
  let inputBox = document.createElement("p");
  let image = document.createElement("img");
  inputBox.className = "input-box";
  inputBox.setAttribute("contenteditable", "true"); //contenteditable  -> makes the element’s text directly editable in the browser.
  image.src = "./images/delete.png";
  notesContainer.appendChild(inputBox).appendChild(image);
});

function storeNotes() {
  localStorage.setItem("notes", notesContainer.innerHTML);
}

notesContainer.addEventListener("click", function (e) {    //the value of this (function(e)) inside refers to the element the event is bound to (notesContainer here).arrow functions don’t have their own this. They take this from the outer scope (lexical this).
  if (e.target.tagName === "IMG") {
    e.target.parentElement.remove();
    storeNotes();
  } else if (e.target.tagName === "P") {
    notes = document.querySelectorAll(".input-box");
    notes.forEach((note) => {
      note.onkeyup = function () {     // onkeyup is an event listener, every time you type something and release a key, it auto-saves the notes to storage.
        storeNotes();
      };
    });
  }
});

document.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        document.execCommand("InsertLineBreak");
        event.preventDefault();
    }
})
