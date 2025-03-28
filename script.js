const btnAdd = document.querySelector(".add__btn");
const inputTask = document.querySelector(".input__task");
const form = document.querySelector("#form");
const list = document.querySelector("ul");
const btnDelete = document.querySelector(".delete__btn");
form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (inputTask.value === "") {
    alert("Input can not be emply");
    return;
  }

  const addTask = function () {
    let html = `<li>${inputTask.value}<span class="delete__btn">&times;</span></li>`;
    list.insertAdjacentHTML("beforeend", html);
    inputTask.value = "";
  };
  addTask();
});
