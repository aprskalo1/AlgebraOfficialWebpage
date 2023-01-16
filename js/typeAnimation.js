$(async () => {
    const timer = ms => new Promise(res => setTimeout(res, ms));
    var line = $("#first-text");
    const data = "Budi izvrstan u onome što vidiš!$voliš!?ZAISKRI.";

    for (let index = 0; index < data.length; index++) {
        if (data[index] == '?') {
            line.css({ 'animation': 'none' });
            line = $("#second-text");
            line.css({ 'animation': 'blinkCursor 0.5s infinite' });
        } else if (data[index] == '$') {
            await timer(250);
            line.text("Budi izvrstan u onom što ");
        } else {
            line.append(data[index]);
        }
        await timer(150);
    }
});