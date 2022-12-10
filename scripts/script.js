const input = document.querySelector('input'); // Grabs input

const list = document.querySelector('list'); // Grabs list of inputted categories

const submitBtn = document.getElementById('submit-btn'); // Grabs submit button

let categoriesList = JSON.parse(localStorage.getItem('categoriesList')) || []; // Array to store the 
                                                                         // user's inputted categories

// <========== Function that retrieves list of categories from local storage to update DOM  ==========> 
const getCategoriesFromLocalStorage = (category) => {
    // Create a new <li> element and give it both a class property and unique ID
    const categoryListItem = document.createElement("li");
    categoryListItem.classList = "listItem";
    categoryListItem.dataset.categoryItemNum = category.id;

    // Creates the content inside the <li> element
    categoryListItem.innerHTML = `
    <input aria-label="Mark category as complete" type="checkbox"/>
    <span>${category.description}</span>
    <button type="button" class="remove-category-btn"><i class="fa-solid fa-x"></i></button>
    `;

   // Adds the <li> element from the storage to the DOM
    list.appendChild(categoryListItem);

    // Attach event listener to checkbox so that user can toggle completed state
    const checkbox = categoryListItem.querySelector("input[type='checkbox']");
    checkbox.addEventListener('click', (e) => {
        markCategoryAsComplete(e.target);
    })

    if (category.completed === true){ // if the category's completed status is true, check the box so user doesn't have to retick it
        checkbox.checked = true;
    }

    // Allows the X button to delete with the function below
  const removeCategoryButton = categoryListItem.querySelector(".remove-category-btn");
  removeCategoryButton.addEventListener("click", (e) => {
    deleteCategory(e.target);
  });
}


// <========== Function that allows user to create a new category  ==========> 
const addCategoryItem = () => {
    const categoryListItem = document.createElement("li"); // creates a new <li> element in the DOM
    categoryListItem.classList = "listItem"; // accesses CSS
    const categoryItemNum = new Date().getTime().toString(); // assigns each category entry a unique ID
    console.log(categoryItemNum);
    categoryListItem.dataset.categoryItemNum = categoryItemNum;

    if (input.value === "") return;

    // Create the content inside the <li> element
    categoryListItem.innerHTML = `
    <input aria-label="Mark category as complete" type="checkbox"/>
    <span>${input.value}</span>
    <button type="button" class="remove-category-btn"><i class="fa-solid fa-x"></i></button>
    `;

    // Add the <li> element from the storage to the DOM
    list.appendChild(categoryListItem);

    // Create an object made up of the: 1) category's description; 2) category's status; 3) category's unique ID
    const newCategory = {
      description: input.value,
      completed: false,
      id: categoryItemNum,
    }

    categoriesList.push(newCategory); // store the object inside the categoriesList array

    localStorage.setItem("categoriesList", JSON.stringify(categoriesList)); // update the categoriesList array in Local Storage

    input.value = ""; // Reset the value

    // Allows the X button to delete with the function below
    const removeCategoryButton = categoryListItem.querySelector(".remove-category-btn");
    removeCategoryButton.addEventListener("click", (e) => {
      deleteCategory(e.target);
    });

    // Attach event listener to checkbox so that user can toggle completed state
    const checkbox = categoryListItem.querySelector("input[type='checkbox']");
    checkbox.addEventListener("click", (e) => {
    markCategoryAsComplete(e.target);

    })
};

// <========== Function allows user to delete a new task  ==========> 
const deleteCategory = (e) => {
    const categoryToDelete = e.closest('li');   // uses .closest method to remove 'closest li element'

    const uniqueID = categoryToDelete.dataset.categoryItemNum; // Gets the ID of the task to delete

    categoriesList = categoriesList.filter(item => item.id !== uniqueID);

    localStorage.setItem("categoriesList", JSON.stringify(categoriesList)); // update the categoriesList array in Local Storage

    categoryToDelete.remove();

}