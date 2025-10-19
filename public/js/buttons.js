/*
    This code is for the buttons to show and disappear when changes are made

    work in progress not implemented yet.

    TODO: If you want to try and figure it out you can I don't know if its entirely neccessary
*/

document.addEventListener("change", () => {

    const divName = document.getElementById("div-name");
    const chair = document.getElementById("chair");
    const dean = document.getElementById("dean");
    const loc = document.getElementById("loc");
    const pen = document.getElementById("pen");

    const save = document.getElementById("save");
    const cancel = document.getElementById("cancel");

    if(divName.value !== info[0] || chair.value !== info[1] || dean.value !== info[2] || loc.value !== info[3] || pen.value !== info[4])
    {
        save.style.display = "block";
        cancel.style.display = "block";
    }
})
