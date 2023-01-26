window.onload = function () {
    const form = {
        username: document.querySelector("#prijavi-se-textbox-email"),
        password: document.querySelector("#prijavi-se-textbox-password"),
        submit: document.querySelector("#sign-in-button"),
    };

    form.submit.addEventListener("click", (e) => {
        e.preventDefault();
        if (!formIsValid()) {
            return;
        }
        const login = "https://www.fulek.com/data/api/user/register";
        const xhr = new XMLHttpRequest();
        xhr.open("POST", login, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const podaci = JSON.parse(xhr.responseText);
                console.log(podaci);
                if (!podaci.isSuccess) {
                    $('#status-message').text("Korisničko ime već postoji!").show().delay(3000).hide(300);
                } else {
                    $('#status-message').text("Registracija uspješna! Preusmjeravanje na stranicu prijave.").show().delay(3000).hide(300);
                    setTimeout(() => {
                        window.location.replace("prijavi-se.html");
                    }, 3000);
                }
            }
        };
        xhr.send(JSON.stringify({
            username: form.username.value,
            password: form.password.value,
        }));
    });

    function formIsValid() {
        if (form.username.value === "" || form.password.value === "") {
            $('#status-message').text("Sva polja moraju biti ispravno ispunjena!").show().delay(3000).hide(300);
            return false;
        }
        return true;
    }
}
