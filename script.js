const btnAdd = document.querySelector(".add__btn");
const inputTask = document.querySelector(".input__task");
const form = document.querySelector("#form");
const list = document.querySelector("ul");

//Set local storage
let tasksData = JSON.parse(localStorage.getItem("todo")) || [];
const setLocalStorage = function () {
  localStorage.setItem("todo", JSON.stringify(tasksData));
};

//Handle submit
form.addEventListener("submit", function (e) {
  e.preventDefault();
  //Alert if input is emply
  if (inputTask.value === "") {
    alert("Input can not be emply");
    return;
  }
  const taskObj = {
    text: inputTask.value,
    completed: false,
  };

  //Add tasks:
  const addTask = function () {
    let html = `<li><button class="check__btn uncheck"></button><p class="text">${inputTask.value}</p>
    <button class="edit__btn">Edit</button>
    <span class="delete__btn">&times;</span></li>`;
    list.insertAdjacentHTML("beforeend", html);
    inputTask.value = "";
  };
  tasksData.push(taskObj);
  addTask();
  setLocalStorage();
});
//Render local storage tasks
const renderTasks = function () {
  list.innerHTML = "";
  tasksData.forEach((task, index) => {
    let html = `<li data-index="${index}"  ${
      task.completed ? 'class="completed"' : ""
    }>
  <button class="check__btn ${task.completed ? "checked" : "uncheck"}"></button>
  <p class="text">${task.text}</p>
  <button class="edit__btn">Edit</button>
  <span class="delete__btn">&times;</span>
</li>`;
    list.insertAdjacentHTML("beforeend", html);
  });
};
renderTasks();

//Handle check and delete
list.addEventListener("click", function (e) {
  const taskItem = e.target.closest("li");
  const taskIndex = Number(taskItem.dataset.index);
  //Check tasks
  if (e.target.classList.contains("check__btn")) {
    tasksData[taskIndex].completed = !tasksData[taskIndex].completed;
    console.log(taskItem);
    e.target.classList.toggle("checked");
    taskItem.classList.toggle("completed");
    setLocalStorage();
  }
  //Delete tasks
  if (e.target.classList.contains("delete__btn")) {
    // console.log(tasksData, taskIndex);
    tasksData.splice(taskIndex, 1);
    setLocalStorage();
    renderTasks();
  }
  //Edit tasks
  if (e.target.classList.contains("edit__btn")) {
    let taskText = taskItem.querySelector(".text");
    // console.log(taskText);
    if (taskText.isContentEditable) {
      if (taskText.innerText.trim() === "") {
        alert("Task cannot be emply");
        taskText.focus();
      } else {
        taskText.setAttribute("contenteditable", "false");
        e.target.innerText = "Edit";
        tasksData[taskIndex].text = taskText.innerText;
        setLocalStorage();
      }
    } else {
      taskText.setAttribute("contenteditable", "true");
      taskText.focus();
      e.target.innerText = "Save";
    }
  }
});
