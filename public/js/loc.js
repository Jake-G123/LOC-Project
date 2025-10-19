document.addEventListener("DOMContentLoaded", () => {
    const divisionSelect = document.getElementById("division");

    const divName = document.getElementById("div-name");
    const chair = document.getElementById("chair");
    const dean = document.getElementById("dean");
    const loc = document.getElementById("loc");
    const pen = document.getElementById("pen");

    //All the arrays with the info for each class
    const divisionInfo = {
        "fine-arts": ["Music", "Paul Metevier", "Christie Gilliland", "Monica Bowen", "Liz Peterson"],
        "humanities": ["Music", "Paul Metevier", "Christie Gilliland", "Monica Bowen", "Liz Peterson"],
        "social-science": ["Music", "Paul Metevier", "Christie Gilliland", "Monica Bowen", "Liz Peterson"],
        "english": ["Music", "Paul Metevier", "Christie Gilliland", "Monica Bowen", "Liz Peterson"],
        "science": ["Music", "Paul Metevier", "Christie Gilliland", "Monica Bowen", "Liz Peterson"],
        "BL&E": ["Music", "Paul Metevier", "Christie Gilliland", "Monica Bowen", "Liz Peterson"],
        "technology": ["Music", "Paul Metevier", "Christie Gilliland", "Monica Bowen", "Liz Peterson"],
        "health-science": ["Music", "Paul Metevier", "Christie Gilliland", "Monica Bowen", "Liz Peterson"],
        "trades": ["Music", "Paul Metevier", "Christie Gilliland", "Monica Bowen", "Liz Peterson"],
        "tran-studies": ["Music", "Paul Metevier", "Christie Gilliland", "Monica Bowen", "Liz Peterson"]
    };

    divisionSelect.addEventListener("change", () => {
        const selected = divisionInfo.value;

        divName.value = "";
        chair.value = "";
        dean.value = "";
        loc.value = "";
        pen.value = "";

        if(selected === "select") {
            divName.placeholder = "";
            chair.placeholder = "";
            dean.placeholder = "";
            loc.placeholder = "";
            pen.placeholder = "";
            return;
        }

        const info = divisionInfo[selected]

        if(info) {
            divName.placeholder = info[0];
            chair.placeholder = info[1];
            dean.placeholder = info[2];
            loc.placeholder = info[3];
            pen.placeholder = info[4];
        } else {
            divName.placeholder = "?";
            chair.placeholder = "";
            dean.placeholder = "";
            loc.placeholder = "";
            pen.placeholder = "";
        }
    });
});






