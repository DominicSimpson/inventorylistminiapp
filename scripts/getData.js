console.log("Hello world!");

    const form = document.querySelector("form");
    const output = document.querySelector("output");

      form.addEventListener("submit", (event) => {
        // stop the form submitting and reloading the page
        event.preventDefault();

        // clear out any previous results
        output.innerHTML = "";

        // get the value of the field with name="pokemon"
        const formData = new FormData(form);
        const name = formData.get("to-do");
        console.log(formData);

        // request that pokemon from PokeAPI
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
          .then((response) => {
            if (!response.ok) throw new Error(response.status);
            return response.json();
          })
          // if we get a successful response
          .then((pokemonData) => {
            const heading = document.createElement("h2");
            heading.textContent = pokemonData.name;

            const image = document.createElement("img");
            image.src = pokemonData.sprites.front_default;
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
              output.textContent = `⚠️ Couldn't find "${name}"`;
            } else {
              output.textContent = "⚠️ Something went wrong";
            }
          });
      });
