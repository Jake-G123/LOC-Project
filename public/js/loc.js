/* loc.js - Corrected script to handle Division and Program dropdowns.
    The data for programInfo is hardcoded here temporarily since app.js is a server file.

    THIS IS NO LONGER IN THE FINAL VERSION OF THE PROJECT JUST A REFERENCE. Commented out for sake of keeping the codebase clean.
*/

/*
const divisionContacts = {
   
    "select": ["", "", "", "", ""], 
    "fine-arts": ["Music", "Paul Metevier", "Christie Gilliland", "Monica Bowen", "Liz Peterson", "Name", "no", "no", "notes"],
       "humanities":  [ "Communication Studies", "Katie Cunnion", "Jamie Fitzgerald", "Lisa Luengo", "Liz Peterson", "Name", "no", "no", "notes"],
       "social-science":[ "Anthropology", "Mark Thomason", "Christie Gilliland", "Joy Crawford", "Liz Peterson", "Name", "no", "no", "notes"],
        //added names from music, communication & anthropology
       "social-science":[ "History", "Paul Metevier", "Christie Gilliland", "Monica Bowen", "Liz Peterson", "Name", "no", "no", "notes"],
      "social-science":[  "Political Science", "Katie Cunnion", "Jamie Fitzgerald", "Lisa Luengo", "Liz Peterson", "Name", "no", "no", "notes"],
       "social-science": ["Psychology", "Mark Thomason", "Christie Gilliland", "Joy Crawford", "Liz Peterson", "Name", "no", "no", "notes"],
       "english": ["English", "Ian Sherman", "Jamie Fitzgerald", "Jake Frye", "Liz Peterson", "Name", "no", "no", "notes"],
      "science":  ["Anatomy and Physiology", "Katy Shaw and Danny Najera", "Miebeth Bustillo-Booth", "Nicole Feider", "Heather Lambert", "Name", "no", "no", "notes"],
        //added names form English & Anatomy
      "science": [ "Biology/Environmental Science", "Ian Sherman", "Jamie Fitzgerald", "Jake Frye", "Liz Peterson", "Name", "no", "no", "notes"],
      "science": [ "Geology/Oceanography", "Katy Shaw and Danny Najera", "Miebeth Bustillo-Booth", "Nicole Feider", "Heather Lambert", "Name", "no", "no", "notes"],
     "BL&E":   [ "Accounting", "Lea Ann Simpson", "Lea Ann Simpson", "Jane Swenson", "Mary Singer", "Name", "no", "no", "notes"],
        //added names from Geology & Accounting 
      "BL&E":  [ "Business Management", "Katy Shaw and Danny Najera", "Miebeth Bustillo-Booth", "Nicole Feider", "Heather Lambert", "Name", "no", "no", "notes"], 
      "BL&E":   ["Business Marketing/Entrepreneurship", "Lea Ann Simpson", "Lea Ann Simpson", "Jane Swenson", "Mary Singer", "Name", "no", "no", "notes"],
         "technology": ["Aviation", "Michael Wood", "Lea Ann Simpson", "Josh Archer", "Angie Brenner", "Name", "no", "no", "notes"],
        //added names from Business Management & Business Marketing 
      "technology":  ["CAD Design and Engineering Tech", "Katy Shaw and Danny Najera", "Miebeth Bustillo-Booth", "Nicole Feider", "Heather Lambert", "Name", "no", "no", "notes"],
         "technology": ["Natural Resources", "Lea Ann Simpson", "Lea Ann Simpson", "Jane Swenson", "Mary Singer", "Name", "no", "no", "notes"],
       "health-science":[ "Practical Nursing", "Leslie Kessler", "Lionel Candido Flores", "Thom Jackson", "Liz Peterson", "Name", "no", "no", "notes"],
        //added names from CAD Design  
       "health-science": ["Physical Therapist Assistant", "Katy Shaw and Danny Najera", "Miebeth Bustillo-Booth", "Nicole Feider", "Heather Lambert", "Name", "no", "no", "notes"],
        "trades":["Automotive Technology", "David Lewis", "Lea Ann Simpson", "Ben Orr", "Mary Singer", "Name", "no", "no", "notes"],
        //added names from Physical Therapist A... & 
      "trades": [ "Manufacturing", "Katy Shaw and Danny Najera", "Miebeth Bustillo-Booth", "Nicole Feider", "Heather Lambert", "Name", "no", "no", "notes"],
       "tran-studies": [ "Health and Physical Education", "Paul Metevier", "Lionel Candido Flores", "Thom Jackson", "Liz Peterson", "Name", "no", "no", "notes"]
        
};

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
// 

document.addEventListener("DOMContentLoaded", () => {
    // Element 
    const divisionSelect = document.getElementById("division");
    const programSelect = document.getElementById("program");
    const programContainer = document.getElementById("program-container");
    const divLegend = document.getElementById("divLegend");
    
    // Division Contact Inputs
    const divNameInput = document.getElementById("divName");
    const chair = document.getElementById("chair");
    const dean = document.getElementById("dean");
    const loc = document.getElementById("loc");
    const pen = document.getElementById("pen");
    
    // Other inputs 
    const payee = document.getElementById("payee");
    const paid = document.getElementById("paid");
    const submitted = document.getElementById("submitted");
    const notes = document.getElementById("notes");

    // Buttons
    const saveBtn = document.getElementById("save");
    const cancelBtn = document.getElementById("cancel");
    
    // Hidden Fields
    const oldDivName = document.getElementById("oldDivName"); 

    let currentInfo = [];

    // --- Division Change Listener (for filling contacts and populates program dropdown) ---
    divisionSelect.addEventListener("change", () => {
        const selected = divisionSelect.value;
        const info = divisionContacts[selected]; // Retrieve contact info
        const programItems = programInfo[selected]; // Retrieve list of programs

        // 1. Reset/Clear Fields
        divNameInput.value = "";
        chair.value = "";
        dean.value = "";
        loc.value = "";
        pen.value = "";
        // Clear program-related fields on division change
        if (payee) payee.value = "";
        if (paid) paid.value = "";
        if (submitted) submitted.value = "";
        if (notes) notes.value = "";
        programSelect.innerHTML = '<option value="">Select a Program</option>';
        programContainer.style.display = "none";

        if (selected === "select" || !info) {
            // Handle 'Select' or missing division data
            saveBtn.style.display = "none";
            cancelBtn.style.display = "none";
            return;
        }

        // 2. Fill Division Contact Fields
        divNameInput.value = info[0]; // Division Name
        chair.value = info[1];        // Chair
        dean.value = info[2];         // Dean
        loc.value = info[3];          // LOC Rep
        pen.value = info[4];          // PEN Contact
        oldDivName.value = selected;  // Set hidden field

        // 3. Populate Program Dropdown
        if (programItems && programItems.length > 0) {
            programContainer.style.display = "block";
            divLegend.textContent = `Programs in ${info[0]}`; 
            
            programItems.forEach(item => {
                const newOption = document.createElement("option");
                newOption.value = item;
                newOption.textContent = item;
                programSelect.appendChild(newOption);
            });
        }
    });

    // --- Program Change Listener (Populates program-specific fields) ---
    programSelect.addEventListener("change", () => {
        const selectedProgram = programSelect.value;
        
    });
    
    // --- Input Change Check (Simplified) ---
    const checkChanges = () => {
        // Since currentInfo is not being properly set after program load, this is simplified:
        if (divisionSelect.value !== 'select') {
            saveBtn.style.display = "block";
            cancelBtn.style.display = "block";
        }
    };

    // Attach listener to all input fields
    [chair, dean, loc, pen, payee, paid, submitted, notes].forEach(input => {
        if (input) input.addEventListener("input", checkChanges);
    });

    // --- Button Handlers ---
    saveBtn.addEventListener("click", (event) => {
        event.preventDefault();
        const confirmed = confirm("Are you sure you want to save this submission?");
        if (confirmed) {
            document.getElementById("loc-form").submit();
        } else {
            alert("Submission canceled.");
        }
    });
    
    // Simplified Cancel Logic
    cancelBtn.addEventListener('click', (event) => {
        // Force the dropdown back to 'select' to clear everything
        divisionSelect.value = "select";
        divisionSelect.dispatchEvent(new Event('change')); // Trigger the change listener
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

    document.getElementById('loc-form').scrollIntoView({ behavior: 'smooth' }); // auto scrolls down to form
}
document.getElementById('cancel').addEventListener('click', function() {
    const programFields = document.getElementById("program-fields");
    const divisionFields = document.getElementById("division-fields");
    programFields.style.display = "none";
    divisionFields.style.display = "none";
    save.style.display = "none";
    cancel.style.display = "none";
});*/
