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
        const login = "https://www.fulek.com/data/api/user/login";
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
                    $('#status-message').text("Korisnik nije pronađen! Pokušajte ponovo.").show().delay(3000).hide(300);
                } else {
                    localStorage.setItem('token', podaci.data.token);
                    localStorage.setItem('username', podaci.data.username);
                    $('#status-message').text("Prijava uspješna! Preusmjeravanje na početnu stranicu.").show().delay(3000).hide(300);
                    setTimeout(() => {
                        window.location.replace("pocetna.html");
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
