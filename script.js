const btnAdd = document.querySelector(".add__btn");
const inputTask = document.querySelector(".input__task");
const form = document.querySelector("#form");
const list = document.querySelector("ul");

//Set local storage
let tasksData = JSON.parse(localStorage.getItem("todo")) || [];

const setLocalStorage = function () {
  localStorage.setItem("todo", JSON.stringify(tasksData));
};

const generateTaskHTML = function (task, index) {
  return `
     <li data-index="${index}" ${task.completed ? 'class="completed"' : ""}>
        <button class="check__btn ${
          task.completed ? "checked" : "uncheck"
        }"></button>
        <p class="text">${task.text}</p>
        <button class="edit__btn">Edit</button>
        <span class="delete__btn">&times;</span>
     </li>
 `;
};

//Render local storage tasks
const renderTasks = function () {
  list.innerHTML = tasksData.map(generateTaskHTML).join("");
};
renderTasks();

const addTask = function (text) {
  const taskObj = {
    text,
    completed: false,
  };
  tasksData.push(taskObj);
  setLocalStorage();
  renderTasks();
};

//Handle submit
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let taskText = inputTask.value.trim();
  //Alert if input is emply
  if (!taskText) {
    alert("Input can not be emply");
    return;
  }
  //Else add tasks
  addTask(taskText);
  inputTask.value = "";
});

//Handle check and delete
list.addEventListener("click", function (e) {
  const taskItem = e.target.closest("li");
  if (!taskItem) return;

  const taskIndex = Number(taskItem.dataset.index);

  //Check tasks
  if (e.target.classList.contains("check__btn")) {
    tasksData[taskIndex].completed = !tasksData[taskIndex].completed;
    console.log(tasksData);

    setLocalStorage();
    renderTasks();
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
    const taskEl = taskItem.querySelector(".text");
    const isEditing = taskEl.isContentEditable;
    const newText = taskEl.innerText.trim();
    // console.log(taskEl);
    if (isEditing) {
      if (!newText) {
        alert("Task cannot be emply");
        taskEl.focus();
        return;
      }
      taskEl.setAttribute("contenteditable", "false");
      e.target.innerText = "Edit";
      tasksData[taskIndex].text = newText;
      setLocalStorage();
    } else {
      taskEl.setAttribute("contenteditable", "true");
      taskEl.focus();
      e.target.innerText = "Save";
    }
  }
});
