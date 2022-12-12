
const form = document.querySelector("form");
const output = document.querySelector("output");

form.addEventListener("submit", (event) => {
event.preventDefault();

// clear out any previous results
output.innerHTML = "";

// get the value of the field with icon name
const formData = new FormData(form);
const orderBy = formData.get("data");
console.log(formData);

// request icon data from Flaticon
fetch(`https://api.flaticon.com/v3/search/icons/${orderBy}`
.then((response) => {
if (!response.ok) throw new Error(response.status);
return response.json();
})
// if a successful response
.then((iconData) => {
const heading = document.createElement("h2");
heading.textContent = iconData.orderBy;

const image = document.createElement("img");
image.src = iconData.icons.font_default;
image.alt = "";

            // const stats = document.createElement("h3");
            // heading.textContent = pokemonData.stats;

            // const type = document.createElement("h4");
            // heading.textContent = pokemonData.type;

            // output.append(heading, image, stats, type);
output.append(heading, image);

})
// if the request is unsuccessful
.catch((error) => {
console.log(error);
if (error.message === "404") {
  output.textContent = `⚠️ Couldn't find "${orderBy}"`;
} else {
  output.textContent = "⚠️ Something went wrong";
  }
  }))
});

