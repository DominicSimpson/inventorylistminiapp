console.log("Hello world!");

    const form = document.querySelector("form");
    let output = document.querySelector("output");

      form.addEventListener("submit", (event) => {
        // stop the form submitting and reloading the page
        event.preventDefault();

        // clear out any previous results
        output.innerHTML = "";

        // get the value of the field with name="orderBy"
        const formData = new FormData(form);
        let orderBy = formData.get("to-do-input");
        console.log(formData);

        // request that pokemon from PokeAPI
        fetch(`https://api.flaticon.com/v3/search/icons/${orderBy}`
          .then((response) => {
            if (!response.ok) throw new Error(response.status);
            return response.json();
          })
          // if we get a successful response
          .then((iconData) => {
            const heading = document.createElement("h2");
            heading.textContent = iconData.name;

            const image = document.createElement("img");
            image.src = iconData.sprites.front_default;
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
          }));
      });
