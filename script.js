const btnAdd = document.querySelector(".add__btn");
const inputTask = document.querySelector(".input__task");
const form = document.querySelector("#form");
const list = document.querySelector("ul");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  //Alert if input is emply
  if (inputTask.value === "") {
    alert("Input can not be emply");
    return;
  }
  //Add taaks:
  const addTask = function () {
    let html = `<li><button class="check__btn uncheck"></button><p class="text">${inputTask.value}</p>
    <button class="edit__btn">Edit</button>
    <span class="delete__btn">&times;</span></li>`;
    list.insertAdjacentHTML("beforeend", html);
    inputTask.value = "";
  };
  addTask();
});

//Handle check and delete
list.addEventListener("click", function (e) {
  //Check tasks
  if (e.target.classList.contains("check__btn")) {
    e.target.classList.toggle("checked");
    e.target.closest("li").classList.toggle("completed");
  }
  //Delete tasks
  if (e.target.classList.contains("delete__btn")) {
    e.target.closest("li").remove();
  }
  //Edit tasks
  if (e.target.classList.contains("edit__btn")) {
    let taskText = e.target.previousElementSibling;
    if (taskText.isContentEditable) {
      if (taskText.innerText.trim() === "") {
        alert("Task cannot be emply");
        taskText.focus();
      } else {
        taskText.setAttribute("contenteditable", "false");
        e.target.innerText = "Edit";
      }
    } else {
      taskText.setAttribute("contenteditable", "true");
      taskText.focus();
      e.target.innerText = "Save";
    }
  }
});
