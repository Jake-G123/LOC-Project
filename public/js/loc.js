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
    //Changes the values of the placeholders when the division is selected
    divisionSelect.addEventListener("change", () => {
        const selected = divisionSelect.value;

        if(selected === "select") {
            divName.value = "";
            chair.value = "";
            dean.value = "";
            loc.value = "";
            pen.value = "";
            return;
        }

        const info = divisionInfo[selected]

        if(info) {
            divName.value = info[0];
            chair.value = info[1];
            dean.value = info[2];
            loc.value = info[3];
            pen.value = info[4];
        }
    });
});

function clearErrors(){
    let errors = document.getElementsByClassName("error");
    for(let i = 0; i < errors.length; i++)
    {
        errors[i].style.display = "none";
    }
}






