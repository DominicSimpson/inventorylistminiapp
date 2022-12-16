const input= document.querySelector("input"); // grab input

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
  <span>${task.category}</span>
  <button type="button" class="remove-task-btn"><i class="fa-solid fa-trash-can"></i></button>
  <button type="button" class="back-btn" onclick ="getData('${task.category}')"><i class="fa-solid fa-arrow-left"></i>Back</i></button>
  `;

  list.appendChild(taskItem); // Add the <li> element from the storage to the DOM

  // Allows the dustbin icon to delete with the function below
  const removeTaskButton = taskItem.querySelector(".remove-task-btn");
  removeTaskButton.addEventListener("click", (e) => {
    deleteTask(e.target);
  });
}

 let existingCategories = document.getElementById("existingcategories");

function getData(category){
  console.log('category', category);

    //  existingCategories.taskItem.createElement("li");
       existingCategories.innerHTML += `<li>${category}</li>`;
}

// <========== Function allows user to create a new category item  ==========> 
const addTaskItem = () => {

  const taskItem = document.createElement("li"); // Creates a new <li> element and assigns a class and unique ID
  taskItem.classList = "listItem";
  const taskNum = new Date().getTime().toString();
  taskItem.dataset.taskNum = taskNum;
    
  if (input.value === "") return;

  // Create the content inside the <li> element
  taskItem.innerHTML = ` 
  <span>${input.value}</span>
  <button type="button" class="remove-task-btn"><i class="fa-solid fa-trash-can"></i></button>
  <button type="button" class="back-btn" onclick=="getData('${input.value}')"><i class="fa-solid fa-arrow-left"></i>Back</i></button>
  `;


  // Add the <li> element from the storage to the DOM
  list.appendChild(taskItem);

  // Create an object made up of the: 1) category's description; 2) category's ID
  const newTask = {
    category: input.value,
    id: taskNum,
  }

  userTasks.push(newTask); // Store the object inside the category array

  // Update the category array in local storage
  localStorage.setItem("userTasks", JSON.stringify(userTasks));
  
  input.value = ""; // Resets the input 

  // Allows the dustbin icon to delete with the function below
  const removeTaskButton = taskItem.querySelector(".remove-task-btn");
  removeTaskButton.addEventListener("click", (e) => {
    deleteTask(e.target);
  });
};


// <========== Function allows user to delete a new task  ==========> 
const deleteTask = (e) => {
  // uses .closest to remove 'closest li element'
  const taskToDelete = e.closest("li");

  const uniqueID = taskToDelete.dataset.taskNum; // Gets the ID of the task to delete

  // Use filter to remove (filter out) a deleted category in order to remove and update the category array
  userTasks = userTasks.filter(item => item.id !== uniqueID);

  // Update the categories array in local storage
  localStorage.setItem("userTasks", JSON.stringify(userTasks));

  taskToDelete.remove(); // Removes the category

};

// <========== Function allows user to add task to existing list  ==========> 

//   const backBtn = document.querySelector(".back-btn");
//   let existingCategories = document.getElementById("existingcategories");

//   backBtn.addEventListener("click", (e) => {
//     alert('cakked');
//     e.preventDefault();
//     existingCategories.document.createElement("li");
//     existingCategories.innerHTML += `<span>${task.category}</span>`;
//   });


// //backBtn();


function setData(searchVal){
  console.log('searchval', searchVal);
  document.getElementById('to-do').value = searchVal;
}


// <========== Event Listeners ==========>
document.addEventListener("DOMContentLoaded", () => {
  userTasks.forEach(task => {
    getTasksFromLocalStorage(task)
  })
})

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addTaskItem();
});
