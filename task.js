//Setting all our variables
const addBox = document.querySelector(".add-box"),
  popupBox = document.querySelector(".popup-box"),
  popupTitle = popupBox.querySelector("header p"),
  closeIcon = document.querySelector("header i"),
  titleEl = document.querySelector("input"),
  descEl = document.querySelector("textarea"),
  addBtn = document.querySelector("button ");

const months = [
  {"January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July"},
  "August",
  "September",
  "October",
  "November",
  "December",
];
//Turns Tasks in to and object to from a string
const Tasks = JSON.parse(localStorage.getItem("Tasks") || "[]");
let isUpdate = false,
  updateId;

//Function to set the stucture of additonal task cards that will be addded and will show the card.
function showTasks() {
  document.querySelectorAll(".task").forEach((task) => task.remove());
  Tasks.forEach((task, index) => {
    let liEl = `<li class="task">
                        <div class="details">
                        <input type="checkbox" id="done" />
                            <p>${task.title}</p>
                            <span>${task.description}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${task.date}</span>
                            <div class="settings">
                                <i onClick="updatetask(${index}, '${task.title}', '${task.description}')"  class="uil uil-edit"></i>
                                <i onClick="deletetask(${index})" class="uil uil-trash"></i>
                            </div>
                        </div>
                    </li>`;
    addBox.insertAdjacentHTML("afterend", liEl);
  });
}

showTasks();
//Deletes the selected tasks
function deletetask(taskId) {
  let confirmDelete = confirm("Are you sure you want to delete this task?");
  if (!confirmDelete) return;
  Tasks.splice(taskId, 1); //Returning into a new array
  localStorage.setItem("Tasks", JSON.stringify(Tasks)); //Converts a JavaScript value to a JSON string
  showTasks();
}
//Pops up the edit pop up for the selected task
function updatetask(taskId, title, desc) {
  isUpdate = true;
  updateId = taskId;
  addBox.click();
  titleEl.value = title;
  descEl.value = desc;
  addBtn.innerText = "Edit Task";
  popupTitle.innerText = "Editing a Task";
}
//Shows the pop up box to add tasks
addBox.addEventListener("click", () => {
  titleEl.focus();
  popupBox.classList.add("show");
});
//Closes the pop up to add tasks
closeIcon.addEventListener("click", () => {
  isUpdate = false;
  titleEl.value = "";
  descEl.value = "";
  addBtn.innerText = "Add Task";
  popupTitle.innerText = "Add a new Task";
  popupBox.classList.remove("show");
});
//Actually add the tasks to the local storage and gets the date
addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let taskTitle = titleEl.value,
    taskDesc = descEl.value;
  if (taskTitle || taskDesc) {
    let dateEl = new Date(),
      month = months[dateEl.getMonth()],
      day = dateEl.getDate(),
      year = dateEl.getFullYear();

    //setting some properties
    let taskInfo = {
      title: taskTitle,
      description: taskDesc,
      date: `${month} ${day} ${year}`,
    };

    //Updates the task card to what was edited
    if (!isUpdate) {
      Tasks.push(taskInfo);
    } else {
      isUpdate = false;
      Tasks[updateId] = taskInfo;
    }
    //This adds the function to the "Edit Task button and adds edits to Local Storage"
    localStorage.setItem("Tasks", JSON.stringify(Tasks)); //Turns updated Task object back into a string
    closeIcon.click();
    showTasks();
  }
});
