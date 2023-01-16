var modal = $("#form-container");
var contact = $("#contact-popup");
var outsideForm = $("#form-background");

if (!contact) {
    console.error("contact was not found");
} else {
    contact.on("click", function () {
        modal.fadeIn("slow");
        outsideForm.fadeIn("slow");
    });
}

var closeBtn = $("#button-exit");
if (!closeBtn) {
    console.error("button-exit was not found");
} else {
    closeBtn.on("click", function () {
        modal.fadeOut("slow");
        outsideForm.fadeOut("slow");
    });
}

$(window).on("click", function (event) {
    if ($(event.target).is(outsideForm)) {
        modal.fadeOut("slow");
        outsideForm.fadeOut("slow");
    }
});


