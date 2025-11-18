/*
    This code is where the data on the field is saved and to appear on click.

    Will be updated when we make it to server side code but in the mean time it works 

    VERY CLUNKY AND EASY TO BREAK BE CAREFUL

    TODO: The division info needs the updated names and chair. If its blank just put the same name as above for the
    information given.
*/
// Names for both objects are swapped from what they actually are as to not break old code. Should be fixed
// Info for each division
const programInfo = {
    "fine-arts": ["Music"],
    "humanities": ["Communication Studies"],
    "social-science": ["Anthropology","History","Political Science","Psychology"],
    "english": ["English"],
    "science": ["Anatomy and Physiology","Biology/Environmental Science","Geology/Oceanography"],
    "BL&E": ["Accounting","Business Management", "Business Marketing/Entrepreneurship"],
    "technology": ["Aviation","CAD Design and Engineering Tech","Natural Resources"],
    "health-science": ["Practical Nursing","Physical Therapist Assistant"],
    "trades": ["Automotive Technology","Manufacturing"],
    "tran-studies": ["Health and Physical Education"]
}
//info for each program
const divisionInfo = {
    "Music":["Paul Metevier", "Christie Gilliland", "Monica Bowen", "Liz Peterson", "Name", "no", "no", "notes"],
    "Communication Studies":["Katie Cunnion", "Jamie Fitzgerald", "Lisa Luengo", "Liz Peterson", "Name", "no", "no", "notes"],
    "Anthropology":["Mark Thomason", "Christie Gilliland", "Joy Crawford", "Liz Peterson", "Name", "no", "no", "notes"],
    "History":[],
    "Political Science":[],
    "Psychology":[],
    "English":["Ian Sherman", "Jamie Fitzgerald", "Jake Frye", "Liz Peterson", "Name", "no", "no", "notes"],
    "Anatomy and Physiology":["Katy Shaw and Danny Najera", "Miebeth Bustillo-Booth", "Nicole Feider", "Heather Lambert", "Name", "no", "no", "notes"],
    "Biology/Environmental Science":[],
    "Geology/Oceanography":[],
    "Accounting":["Lea Ann Simpson", "Lea Ann Simpson", "Jane Swenson", "Mary Singer", "Name", "no", "no", "notes"],
    "Business Management":[], 
    "Business Marketing/Entrepreneurship":[],
    "Aviation":["Michael Wood", "Lea Ann Simpson", "Josh Archer", "Angie Brenner", "Name", "no", "no", "notes"],
    "CAD Design and Engineering Tech":[],
    "Natural Resources":[],
    "Practical Nursing":["Leslie Kessler", "Lionel Candido Flores", "Thom Jackson", "Liz Peterson", "Name", "no", "no", "notes"],
    "Physical Therapist Assistant":[],
    "Automotive Technology":["David Lewis", "Lea Ann Simpson", "Ben Orr", "Mary Singer", "Name", "no", "no", "notes"],
    "Manufacturing":[],
    "Health and Physical Education":["Paul Metevier", "Lionel Candido Flores", "Thom Jackson", "Liz Peterson", "Name", "no", "no", "notes"]
    /*
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
    */
};
document.addEventListener("DOMContentLoaded", () => {
    const divisionSelect = document.getElementById("division");
    const programSelect = document.getElementById("program");
    const programContainer = document.getElementById("program-container");
    const divLegend = document.getElementById("divLegend");
    const oldDivName = document.getElementById("oldDivName"); // used while changing all the names of a division
    const programLegend = document.getElementById("programLegend");
    const oldProgramName = document.getElementById("oldProgramName");
    const chair = document.getElementById("chair");
    const dean = document.getElementById("dean");
    const loc = document.getElementById("loc");
    const pen = document.getElementById("pen");
    const payee = document.getElementById("payee");
    const paid = document.getElementById("paid");
    const submitted = document.getElementById("submitted");
    const notes = document.getElementById("notes");

    const editBtn = document.getElementById("edit");
    const saveBtn = document.getElementById("save");
    const cancelBtn = document.getElementById("cancel");
    
     let currentInfo = [];
    


    divisionSelect.addEventListener("change", () => { // if division dropdown has changed
        const selected = divisionSelect.value; // division from dropdown
        if (selected === "select") { // if no selected division
            //divName.value = "";
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

            programContainer.style.display = "none";
            return;
        }
        oldDivName.value = divisionSelect.value;
        programSelect.innerHTML = '<option value="">Select</option>'; // if divsion selected, reset dropdown so fresh values can be added

            programContainer.style.display = "block";
            const programItems = programInfo[selected];
            programItems.forEach(item => {
                const newOption = document.createElement("option");
                newOption.value = item;
                newOption.textContent = item;
                programSelect.appendChild(newOption);
            });
        /*

        */
    });
    // if program dropdown has a selected program, add program info to text boxes
    programSelect.addEventListener("change", () => {
            const selected = programSelect.value;
            if (selected !== "select"){
            const info = divisionInfo[selected];
            //divName.value = info[0];
            chair.value = info[0];
            dean.value = info[1];
            loc.value = info[2];
            pen.value = info[3];
            payee.value = info[4];
            paid.value = info[5];
            submitted.value = info[6];
            notes.value = info[7];
            timestamp: new Date().toLocaleString();

            currentInfo = [...info];
            save.style.display = "none";
            cancel.style.display = "none";

            
        }
    });
    // Check for input changes compared to currentInfo
    const checkChanges = () => {
        if (
            /*divName.value !== currentInfo[0] || */chair.value !== currentInfo[0] || dean.value !== currentInfo[1] || loc.value !== currentInfo[2] || pen.value !== currentInfo[3] || payee.value !== currentInfo[4] || paid.value !== currentInfo[5] || submitted.value !== currentInfo[6]
        ) {
            save.style.display = "block";
            cancel.style.display = "block";
        } else {
            save.style.display = "none";
            cancel.style.display = "none";
        }
    };

    //calls to check current info on input
    [/*divName, */chair, dean, loc, pen, payee, paid, submitted, notes].forEach(input => {
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
    cancel.addEventListener('click', (event) => {
        const programFields = document.getElementById("program-fields");
        const divisionFields = document.getElementById("division-fields");
        programFields.style.display = "none";
        divisionFields.style.display = "none";
        save.style.display = "none";
        cancel.style.display = "none";
    });
});
function rowSelect(program) {
    
    Object.keys(programInfo).forEach(key => {
        if (programInfo[key].includes(program)) {
            divName.value = key;
            oldDivName.value = key;
            divLegend.innerHTML = key;
            oldProgramName.value = program;
            programLegend.innerHTML = program;
        }
    });
    const info = divisionInfo[program];
    // division
    chair.value = info[0];
    dean.value = info[1];
    loc.value = info[2];
    pen.value = info[3];
    // program
    programName.value = program;
    payee.value = info[4];
    paid.value = info[5];
    submitted.value = info[6];
    notes.value = info[7];

    const programFields = document.getElementById("program-fields");
    const divisionFields = document.getElementById("division-fields");
    programFields.style.display = "block";
    divisionFields.style.display = "block";
    save.style.display = "block";
    cancel.style.display = "block";
}
document.getElementById('cancel').addEventListener('click', function() {
    const programFields = document.getElementById("program-fields");
    const divisionFields = document.getElementById("division-fields");
    programFields.style.display = "none";
    divisionFields.style.display = "none";
    save.style.display = "none";
    cancel.style.display = "none";
});
