function scrollToDiv(divId) {
    $('html, body').animate({
        scrollTop: $('#' + divId).offset().top - 75
    }, 1000);
}
