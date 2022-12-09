const input = document.querySelector('input'); // Grabs input

const list = document.querySelector('list'); // Grabs list of inputted categories

const submitBtn = document.getElementById('submit-btn'); // Grabs submit button

let categoriesList = JSON.parse(localStorage.getItem('userTasks')) || []; // Array to store the 
                                                                         // user's inputted categories

// <========== Function that retrieves list of categories from local storage to update DOM  ==========> 
const getCategoriesFromLocalStorage = (category) => {
    // Create a new <li> element and give it both a class property and unique ID
    const categoryList = document.createElement("li");
    categoryList.classList = "listItem";
    categoryList.dataset.taskNum = category.id;

    // Creates the content inside the <li> element
    categoryList.innerHTML = `
    <input aria-label="Mark category as complete" type="checkbox"/>
    <span>${category.description}</span>
    <button type="button" class="remove-task-btn"><i class="fa-solid fa-x"></i></button>
    `;

   // Adds the <li> element from the storage to the DOM
    list.appendChild(categoryList);

    const checkbox = categoryList.querySelector("input[type='checkbox']");

}
