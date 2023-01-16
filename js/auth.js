const form = {
    email: document.querySelector("#prijavi-se-textbox-email"),
    password: document.querySelector("#prijavi-se-textbox-password"),
    submit: document.querySelector("#sign-in-button"),
};
let button = form.submit.addEventListener("click", (e) => {
    e.preventDefault();
    const login = "https://www.fulek.com/data/api/user/login";

    fetch(login, {
        method: "POST",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: form.email.value,
            password: form.password.value,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            // code here //
            if (data.error) {
                alert("Error Password or Username"); /*displays error message*/
            } else {
                window.open(
                    "pocetna.html"
                ); /*opens the target page while Id & password matches*/
            }
        })
        .catch((err) => {
            console.log(err);
        });
});