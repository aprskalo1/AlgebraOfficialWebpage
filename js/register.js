window.onload = function () {
    $('#message_login').hide();

    const form = {
        username: document.querySelector("#prijavi-se-textbox-email"),
        password: document.querySelector("#prijavi-se-textbox-password"),
        submit: document.querySelector("#sign-in-button"),
    };

    let button = form.submit.addEventListener("click", (e) => {
        e.preventDefault();
        if (!formIsValid()) {
            return;
        }
        const login = "https://www.fulek.com/data/api/user/register";
        fetch(login, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: form.username.value,
                password: form.password.value,
            }),
        })
            .then((response) => response.json())
            .then((podaci) => {
                console.log(podaci);
                if (!podaci.isSuccess) {
                    $('#status-message').text("Korisničko ime već postoji!").show().delay(3000).hide(300);
                } else {
                    localStorage.setItem('token', podaci['token']);
                    localStorage.setItem('username', podaci['username']);
                    $('#status-message').text("Registracija uspješna! Preusmjeravanje na stranicu prijave.").show().delay(3000).hide(300);
                    setTimeout(() => {
                        window.location.replace("prijavi-se.html");
                    }, 3000);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    });

    function formIsValid() {
        if (form.username.value === "" || form.password.value === "") {
            $('#status-message').text("Sva polja moraju biti ispravno ispunjena!").show().delay(3000).hide(300);
            return false;
        }
        return true;
    }
}
