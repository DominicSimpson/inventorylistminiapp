const input = document.querySelector('input'); // Grabs input

const list = document.querySelector('list'); // Grabs list of inputted categories

const submitBtn = document.getElementById('submit-btn'); // Grabs submit button

let categoriesList = JSON.parse(localStorage.getItem('userTasks')) || []; // Array to store the 
                                                                         // user's inputted categories

// <========== Function that retrieves list of categories from local storage to update DOM  ==========> 
const getCategoriesFromLocalStorage = (categories) => {
    // Create a new <li> element and give it a class and unique ID
    const categoryList = document.createElement("li");
    categoryList.classList = "listItem";
    taskItem.dataset.
}