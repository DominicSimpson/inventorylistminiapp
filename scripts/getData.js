
const form = document.querySelector("form");
const list = document.querySelector("list");

form.addEventListener("submit", (event) => {
event.preventDefault();

// clear out any previous results
list.innerHTML = "";

// get the value of the field with icon name
const formData = new FormData(form);
const data = Object.fromEntries(formData);
const orderBy = data.get(data);
console.log(orderBy);

// request icon data from Flaticon
fetch(`https://api.flaticon.com/v3/search/icons/${orderBy}`)
.then((response) => {
if (!response.ok) throw new Error(response.status);
return response.json();
})
// if a successful response
.then((json) => {
const heading = document.createElement("h2");
heading.textContent = json.orderBy;

const image = document.createElement("img");
image.src = json.icons.font_default;
image.alt = "";

            // const stats = document.createElement("h3");
            // heading.textContent = pokemonData.stats;

            // const type = document.createElement("h4");
            // heading.textContent = pokemonData.type;

            // output.append(heading, image, stats, type);
list.append(heading, image);

})
// if the request is unsuccessful
.catch((error) => {
console.log(error);
if (error.message === "404") {
  list.textContent = `⚠️ Couldn't find "${orderBy}"`;
} else {
  list.textContent = "⚠️ Something went wrong";
  }
  });
});