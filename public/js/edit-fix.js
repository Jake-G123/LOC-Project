/*
*
* edit-fix.js
* This is the bunk edit to how to make the edit buttons work properly
*
* The previous implementation used ProgramID to identify rows, which caused issues when multiple programs had the same ID across different years.
* This revised version uses ProgramName as the unique identifier for selecting and editing rows.
*
*
*/

window.rowSelect = function (programName) {
    const rows = document.querySelectorAll('#loc-table tbody tr');

    rows.forEach(row => {
        // Column order:
        // 0=Division, 1=Chair, 2=Dean, 3=LOC Rep, 4=Contact,
        // 5=Program, 6=Payee, 7=Paid, 8=Submitted, 9=Notes

        if (row.children[5].textContent === programName) {

            document.getElementById('divName').value = row.children[0].textContent;
            document.getElementById('oldDivName').value = row.children[0].textContent;

            document.getElementById('chair').value = row.children[1].textContent;
            document.getElementById('dean').value = row.children[2].textContent;
            document.getElementById('loc').value = row.children[3].textContent;
            document.getElementById('pen').value = row.children[4].textContent;

            document.getElementById('programName').value = row.children[5].textContent;
            document.getElementById('oldProgramName').value = row.children[5].textContent;

            document.getElementById('payee').value = row.children[6].textContent;
            document.getElementById('paid').value = row.children[7].textContent;
            document.getElementById('submitted').value = row.children[8].textContent;
            document.getElementById('notes').value = row.children[9].textContent;

            document.getElementById('division-fields').style.display = "block";
            document.getElementById('program-fields').style.display = "block";

            document.getElementById('save').style.display = "block";
            document.getElementById('cancel').style.display = "block";

            document.getElementById('loc-form').scrollIntoView({ behavior: "smooth" });
        }
    });
};
