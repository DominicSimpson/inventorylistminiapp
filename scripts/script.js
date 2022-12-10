// grabs input
const input = document.querySelector("input");
// grabs list
const list = document.querySelector(".list");
// grabs submit button
const submitBtn = document.getElementById("submit-btn");
// Array to store user's tasks
let userTasks = JSON.parse(localStorage.getItem("userTasks")) || [];

// <========== Function that retrieves tasks from local storage to update DOM  ==========> 
const getTasksFromLocalStorage = (task) => {
  // Create a new <li> element and give it a class and unique ID
  const taskItem = document.createElement("li");
  taskItem.classList = "listItem";
  taskItem.dataset.taskNum = task.id;

  // Create the content inside the <li> element
  taskItem.innerHTML = `
  <input aria-label="Mark task as complete" type="checkbox"/>
  <span>${task.description}</span>
  <button type="button" class="remove-task-btn"><i class="fa-solid fa-trash-can"></i></button>
  `;

  // Add the <li> element from the storage to the DOM
  list.appendChild(taskItem);

  // Attach event listener to checkbox so that user can toggle completed state
  const checkbox = taskItem.querySelector("input[type='checkbox']");
  checkbox.addEventListener("click", (e) => {
    markTaskAsComplete(e.target);
  })
  if (task.completed === true){ // if the task's completed status is true, check the box so user doesn't have to retick it
    checkbox.checked = true;
  }
  // allows the X button to delete with the function below
  const removeTaskButton = taskItem.querySelector(".remove-task-btn");
  removeTaskButton.addEventListener("click", (e) => {
    deleteTask(e.target);
  });
}


// <========== Function allows user to create a new task  ==========> 
const addTaskItem = () => {
  // Create a new <li> element and give it a class and unique ID
  const taskItem = document.createElement("li");
  taskItem.classList = "listItem";
  const taskNum = new Date().getTime().toString();
  taskItem.dataset.taskNum = taskNum;
    


  if (input.value === "") return;

  // Create the content inside the <li> element
  taskItem.innerHTML = `
  <input aria-label="Mark task as complete" type="checkbox"/>
  <span>${input.value}</span>
  <button type="button" class="remove-task-btn"><i class="fa-solid fa-trash-can"></i></button>
  `;

  // Add the <li> element from the storage to the DOM
  list.appendChild(taskItem);

  // Create an object made up of the: 1) task's description; 2) task's status; 3) task's ID
  const newTask = {
    description: input.value,
    completed: false,
    id: taskNum,
  }

  // Store the object inside the tasks array
  userTasks.push(newTask);

  // Update the tasks array in local storage
  localStorage.setItem("userTasks", JSON.stringify(userTasks));
  
  // Reset the input 
  input.value = "";

  // allows the X button to delete with the function below
  const removeTaskButton = taskItem.querySelector(".remove-task-btn");
  removeTaskButton.addEventListener("click", (e) => {
    deleteTask(e.target);
  });

  // Attach event listener to checkbox so that user can toggle completed state
  const checkbox = taskItem.querySelector("input[type='checkbox']");
  checkbox.addEventListener("click", (e) => {
    markTaskAsComplete(e.target);
  })

};

// <========== Function allows user to delete a new task  ==========> 
const deleteTask = (e) => {
  // uses .closest to remove 'closest li element'
  const taskToDelete = e.closest("li");

  // Gets the ID of the task to delete
  const uniqueID = taskToDelete.dataset.taskNum;

  // Use filter to remove (filter out) the task to remove and update the tasks array
  userTasks = userTasks.filter(item => item.id !== uniqueID);

  // Update the tasks array in local storage
  localStorage.setItem("userTasks", JSON.stringify(userTasks));

  // remove the task
  taskToDelete.remove();
};

// <========== Function allows user to mark a task as complete  ==========> 
const markTaskAsComplete = (e) => {
  // uses .closest to find the 'closest li element'
  const selectedTask = e.closest("li");

  // Gets the ID of the task to delete
  const uniqueID = selectedTask.dataset.taskNum;

  // Find the item (which is an object) in the tasks array which has the same ID as the one clicked by user
  const index = userTasks.findIndex(item => item.id === uniqueID);

  // Update the object's completed status
  if (userTasks[index].completed === true){
    userTasks[index].completed = false;
  }
  else {
    userTasks[index].completed = true;
  }

  // Update the tasks array in local storage
  localStorage.setItem("userTasks", JSON.stringify(userTasks));
}

// <========== Event Listeners ==========>
document.addEventListener("DOMContentLoaded", () => {
  userTasks.forEach(task => {getTasksFromLocalStorage(task)})
})
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addTaskItem();
});

// let existingCategoryOne = document.getElementById('existingcategory-one');

// existingCategoryOne.addEventListener("click", (e) => {
//   e.preventDefault();
//   addTaskItem();
// })
