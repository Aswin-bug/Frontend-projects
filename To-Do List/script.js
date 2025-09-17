const inputBox = document.getElementById("input-box");
const taskContainer = document.getElementById("task-container");

function addTask() {
  if (inputBox.value === "") {
    alert("Please type something");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    taskContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputBox.value = "";
  saveTask();
}

taskContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {  //'tagname' always return the value in uppercase that why
      e.target.classList.toggle("checked");   //if the element has the "checked" class, remove it; if not, add it. It’s how you can “tick/untick” a task.
      saveTask();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();  // removes the parent element 'LI'  when we click 'X' button
      saveTask();
    }
  },
  false
);

function saveTask() {
  localStorage.setItem("data", taskContainer.innerHTML);
}

function showTask() {
  taskContainer.innerHTML = localStorage.getItem("data");
}

showTask();
