/*
    This code is where the data on the field is saved and to appear on click.

    Will be updated when we make it to server side code but in the mean time it works 

    VERY CLUNKY AND EASY TO BREAK BE CAREFUL

    TODO: The division info needs the updated names and chair. If its blank just put the same name as above for the
    information given.
*/

document.addEventListener("DOMContentLoaded", () => {
    const divisionSelect = document.getElementById("division");

    const divName = document.getElementById("div-name");
    const chair = document.getElementById("chair");
    const dean = document.getElementById("dean");
    const loc = document.getElementById("loc");
    const pen = document.getElementById("pen");
    const payee = document.getElementById("payee");
    const paid = document.getElementById("paid");
    const submitted = document.getElementById("submitted");
    const notes = document.getElementById("notes");

    const save = document.getElementById("save");
    const cancel = document.getElementById("cancel");

    // Info for each division
    const divisionInfo = {
        "fine-arts": ["Music", "Paul Metevier", "Christie Gilliland", "Monica Bowen", "Liz Peterson", "Name", "no", "no", "notes"],
        "humanities": ["Communication Studies", "Katie Cunnion", "Jamie Fitzgerald", "Lisa Luengo", "Liz Peterson", "Name", "no", "no", "notes"],
        "social-science": ["Anthropology", "Mark Thomason", "Christie Gilliland", "Joy Crawford", "Liz Peterson", "Name", "no", "no", "notes"],
        "english": ["English", "Ian Sherman", "Jamie Fitzgerald", "Jake Frye", "Liz Peterson", "Name", "no", "no", "notes"],
        "science": ["Anatomy and Physiology", "Katy Shaw and Danny Najera", "Miebeth Bustillo-Booth", "Nicole Feider", "Heather Lambert", "Name", "no", "no", "notes"],
        "BL&E": ["Accounting", "Lea Ann Simpson", "Lea Ann Simpson", "Jane Swenson", "Mary Singer", "Name", "no", "no", "notes"],
        "technology": ["Aviation", "Michael Wood", "Lea Ann Simpson", "Josh Archer", "Angie Brenner", "Name", "no", "no", "notes"],
        "health-science": ["Practical Nursing", "Leslie Kessler", "Lionel Candido Flores", "Thom Jackson", "Liz Peterson", "Name", "no", "no", "notes"],
        "trades": ["Automotive Technology", "David Lewis", "Lea Ann Simpson", "Ben Orr", "Mary Singer", "Name", "no", "no", "notes"],
        "tran-studies": ["Health and Physical Education", "Paul Metevier", "Lionel Candido Flores", "Thom Jackson", "Liz Peterson", "Name", "no", "no", "notes"]
    };

    let currentInfo = [];

    divisionSelect.addEventListener("change", () => {
        const selected = divisionSelect.value;

        if (selected === "select") {
            divName.value = "";
            chair.value = "";
            dean.value = "";
            loc.value = "";
            pen.value = "";
            payee.value = "";
            paid.value = "";
            submitted.value = "";
            notes.value = "";
            currentInfo = [];
            save.style.display = "none";
            cancel.style.display = "none";
            return;
        }
        
        const info = divisionInfo[selected];
        if (info) {
            divName.value = info[0];
            chair.value = info[1];
            dean.value = info[2];
            loc.value = info[3];
            pen.value = info[4];
            payee.value = info[5];
            paid.value = info[6];
            submitted.value = info[7];
            notes.value = info[8];
            timestamp: new Date().toLocaleString();

            currentInfo = [...info];
            save.style.display = "none";
            cancel.style.display = "none";
        }
    });

    // Check for input changes compared to currentInfo
    const checkChanges = () => {
        if (
            divName.value !== currentInfo[0] || chair.value !== currentInfo[1] || dean.value !== currentInfo[2] || loc.value !== currentInfo[3] || pen.value !== currentInfo[4] || payee.value !== currentInfo[5] || paid.value !== currentInfo[6] || submitted.value !== currentInfo[7]
        ) {
            save.style.display = "block";
            cancel.style.display = "block";
        } else {
            save.style.display = "none";
            cancel.style.display = "none";
        }
    };

    //calls to check current info on input
    [divName, chair, dean, loc, pen, payee, paid, submitted, notes].forEach(input => {
        input.addEventListener("input", checkChanges);
    });

    save.addEventListener("click", (event) => {

        event.preventDefault();

        const confirmed = confirm("Are you sure you want to save this submission?");

        if (confirmed) {
            document.getElementById("loc-form").submit();
        } else {
            alert("Submission canceled.");
        }
    });
});



