/*
    This code is for the error to appear on a empty line on any of the fields

    TODO: Nothing it works as intended
*/

document.getElementById("loc-form").onsubmit = () => {

    clearErrors();

    //validate each box
    let div = document.getElementById("div-name").value.trim();
    let chair = document.getElementById("chair").value.trim();
    let dean = document.getElementById("dean").value.trim();
    let loc = document.getElementById("loc").value.trim();
    let pen = document.getElementById("pen").value.trim();

    let isValid = true;

    if(div === "") {
        document.getElementById("err-div").style.display = "block";
        isValid = false;
    }

    if(chair === "") {
        document.getElementById("err-chair").style.display = "block";
        isValid = false;
    }

    if(dean === "") {
        document.getElementById("err-dean").style.display = "block";
        isValid = false;
    }

    if(loc === "") {
        document.getElementById("err-loc").style.display = "block";
        isValid = false;
    }

    if(pen === "") {
        document.getElementById("err-pen").style.display = "block";
        isValid = false;
    }

    return isValid;
}

function clearErrors(){
    let errors = document.getElementsByClassName("error");
    for(let i = 0; i < errors.length; i++)
    {
        errors[i].style.display = "none";
    }
}

