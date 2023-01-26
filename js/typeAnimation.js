$(async () => {
    const timer = ms => new Promise(res => setTimeout(res, ms));
    var line = $("#first-text");
    const data = "Budi izvrstan u onome što vidiš!$voliš!?ZAISKRI.";

    for (let i = 0; i < data.length; i++) {
        if (data[i] == '?') {
            line.css({ 'animation': 'none' });
            line = $("#second-text");
            line.css({ 'animation': 'blinkCursor 1s infinite' });
        } else if (data[i] == '$') {
            await timer(250);
            for (let j = 32; j >= 26; j--) {
                line.text(line.text().substring(0, j));
                await timer(100);
            }
        } else {
            line.append(data[i]);
        }
        await timer(150);
    }
});
