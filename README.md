# Inventory List Mini-App

### For my submission to Citizen Ticket, I have attempted to design a mini-app that adds categories to an inventory. I have incorporated an icon API, which adds an icon image to the input. 

###### For my icon API, I used [Flaticon](https://api.flaticon.com/?_gl=1*gm9831*test_ga*NzYzNzY5MjUwLjE2NzA0Mjk1NjU.*test_ga_523JXC6VL7*MTY3MDQyOTU2NS4xLjAuMTY3MDQyOTU2NS42MC4wLjA.*fp_ga*NzYzNzY5MjUwLjE2NzA0Mjk1NjU.*fp_ga_1ZY8468CQB*MTY3MDQyOTU2NS4xLjAuMTY3MDQyOTU2NS42MC4wLjA.&_ga=2.17695921.908716984.1670429565-763769250.1670429565). This is the first time that I have used an API with a key, which I put in a file called getData.js. The API key was appended from a variable called formdata, which took the form of an object prototype constructor called FormData. 
###### I then utilised the fetch request method twice - first to request authentification of the API Key, and secondly to search for icons. The API icons are tied to the input bar in the HTML via a variable called `searchVal`:

```js
const searchVal = document.getElementById('to-do').value;
```

###### The second fetch request then featured this as a search parameter within the API URL for icons:

```js
fetch(`https://api.flaticon.com/v3/search/icons/false?q=${searchVal}`, requestOptions)
```

###### The second fetch then takes the resulting data and uses a map method to iterate through every icon that the API has that corresponds to the input. This is then appended onto the DOM via `list.innerHTML +=, followed by displaying the appropriate icon with `<img src="${res.images[the number sixteen]}"/>`. The 16 refers to the code for images.

###### For the trash can/dustbin and back icons, I used FontAwesome, while I utilised Montserrat for the font, to approximate the original mock-up.

###### The `scripts.js` file, meanwhile, includes modular functions, each of which fulfill a specific task: 
- `getTasksFromLocalStorage()`
- `addTaskItem()`
- `deleteTask()`
    
