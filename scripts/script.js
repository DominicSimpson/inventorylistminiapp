const input = document.querySelector("input"); // grab input

const list = document.querySelector(".list"); // grab list containing inputted categories

const submitBtn = document.getElementById("submit-btn"); // grabs submit button

let userTasks = JSON.parse(localStorage.getItem("userTasks")) || []; // Array to store inputted categories


// <========== Function that retrieves categories from local storage to update DOM  ==========> 
const getTasksFromLocalStorage = (task) => {
  // Creates a new <li> element and assigns it a class and unique ID
  const taskItem = document.createElement("li");
  taskItem.classList = "listItem";
  taskItem.dataset.taskNum = task.id;

  // Create the content inside the <li> element
  taskItem.innerHTML = `
  <span>${task.description}</span>
  <button type="button" class="remove-task-btn"><i class="fa-solid fa-trash-can"></i></button>
  `;

  // Add the <li> element from the storage to the DOM
  list.appendChild(taskItem);

  // Allows the dustbin icon to delete with the function below
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

// <========== Event Listeners ==========>
document.addEventListener("DOMContentLoaded", () => {
  userTasks.forEach(task => {getTasksFromLocalStorage(task)})
})
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addTaskItem();
});

let existingCategoryOne = document.getElementById('existingcategory-one');

existingCategoryOne.addEventListener("click", (e) => {
  addTaskItem(e.target);
})
