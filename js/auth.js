window.onload = function () {
    var nastavniPlan = $("#nastavni-plan");
    var odjaviSe = $("#odjavi-se");
    var prijaviSe = $("#prijavi-se");
    var usernameSpan = $("#username");

    if (localStorage.hasOwnProperty('token')) {
        nastavniPlan.show();
        odjaviSe.show();
        prijaviSe.hide();
        usernameSpan.html(localStorage.getItem('username'));
    } else {
        nastavniPlan.hide();
    }

    odjaviSe.click(function () {
        localStorage.clear();
        location.reload();
    });
}
