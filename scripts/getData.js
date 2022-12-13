function getDataFromApi() {
    const searchVal = document.getElementById('to-do').value;
    let formdata = new FormData();
    formdata.append("apikey", "hK7QBmug4XezVHeQ7SZUD8DAAKboDNGvCQUheaOsGULFopXx");
    let requestOptions = {
        method: 'POST',
        body: formdata,
    };
    fetch("https://api.flaticon.com/v3/app/authentication", requestOptions).then(function (res) {
        return res.json();
    }).then(function (data) {
        let myHeaders = new Headers();
        const tokenBearer = "Bearer "+data.data.token;
        myHeaders.append("Authorization", tokenBearer);
        let requestOptions = {
            method: 'GET',
            headers: myHeaders
        };
        fetch(`https://api.flaticon.com/v3/search/icons/false?q=${searchVal}`, requestOptions)
            .then(response => response.json())

            .then(result =>{
                result.data.map(res => {
                    console.log('res',res);
                    list.innerHTML += `<img src="${res.images[16]}"/>`;
                });
            })
        

            .catch(error => console.log('error', error));


    }).catch((error) => {
        console.log(error);
        if (error.message === "404") {
            list.textContent = `⚠️ Couldn't find "${res.description}"`;
        } else {
            list.textContent = "⚠️ Something went wrong";
        }
    });
}
