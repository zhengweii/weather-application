console.log("Client side JS");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");

weatherForm.addEventListener("submit", (e) => {
    const location = search.value;
    messageOne.textContent = "Loading...";

    fetch(`http://localhost:3000/weather?address=${location}`)
        .then((response) => {
            response.json()
                .then((data) => {
                    if (data.err) {
                        messageOne.textContent = data.err;
                    }
                    else {
                        messageOne.textContent = data.summary + " with a temperature of " + data.temperature + " in " + data.address;
                    }
                });
        });

    e.preventDefault();
});
