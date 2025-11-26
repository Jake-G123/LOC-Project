/*
    This code is for the error to appear on a empty line on any of the fields

    TODO: Nothing it works as intended
*/
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("edit-form");
    if (!form) return console.error("edit-form not found!");

    form.addEventListener("submit", (event) => {
        console.log("submit fired");
        clearErrors();

        //validate each box
        let div = document.getElementById("editDivisionName").value.trim();
        let program = document.getElementById("editProgramName").value.trim();
        let chair = document.getElementById("editChair").value.trim();
        let dean = document.getElementById("editDean").value.trim();
        let loc = document.getElementById("editLOC").value.trim();
        let pen = document.getElementById("editPEN").value.trim();

        let isValid = true;

        if(div === "") {
            document.getElementById("err-div").style.display = "block";
            isValid = false;
        }
        if(program === "") {
            document.getElementById("err-program").style.display = "block";
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

        if (!isValid) {
            event.preventDefault();
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

