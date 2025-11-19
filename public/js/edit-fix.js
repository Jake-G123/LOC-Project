document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('loc-form');

    // Function to populate the form when Edit is clicked
    window.rowSelect = function(programName) {
        const rows = document.querySelectorAll('#loc-table tbody tr');
        rows.forEach(row => {
            if (row.children[1].textContent === programName) {
                document.getElementById('divName').value = row.children[0].textContent;
                document.getElementById('oldDivName').value = row.children[0].textContent;
                document.getElementById('chair').value = row.children[2].textContent;
                document.getElementById('dean').value = row.children[3].textContent;
                document.getElementById('loc').value = row.children[4].textContent;
                document.getElementById('pen').value = row.children[5].textContent;
                document.getElementById('programName').value = row.children[1].textContent;
                document.getElementById('oldProgramName').value = row.children[1].textContent;
                document.getElementById('payee').value = row.children[6].textContent;
                document.getElementById('paid').value = row.children[7].textContent;
                document.getElementById('submitted').value = row.children[8].textContent;
                document.getElementById('notes').value = row.children[9].textContent;
                // Scroll to form if needed
                form.scrollIntoView({ behavior: "smooth" });
            }
        });
    };

    // Existing submit logic
    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = {
            oldProgramName: document.getElementById('oldProgramName').value,
            programName: document.getElementById('programName').value,
            oldDivName: document.getElementById('oldDivName').value,
            divName: document.getElementById('divName').value,
            chair: document.getElementById('chair').value,
            dean: document.getElementById('dean').value,
            loc: document.getElementById('loc').value,
            pen: document.getElementById('pen').value,
            payee: document.getElementById('payee').value,
            paid: document.getElementById('paid').value,
            submitted: document.getElementById('submitted').value,
            notes: document.getElementById('notes').value
        };

        try {
            const response = await fetch('/update-program', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (result.success) {
                // Update the table row in-place
                const rows = document.querySelectorAll('#loc-table tbody tr');
                rows.forEach(row => {
                    if (row.children[1].textContent === formData.oldProgramName) {
                        row.children[0].textContent = formData.divName;
                        row.children[1].textContent = formData.programName;
                        row.children[2].textContent = formData.chair;
                        row.children[3].textContent = formData.dean;
                        row.children[4].textContent = formData.loc;
                        row.children[5].textContent = formData.pen;
                        row.children[6].textContent = formData.payee;
                        row.children[7].textContent = formData.paid;
                        row.children[8].textContent = formData.submitted;
                        row.children[9].textContent = formData.notes;
                        row.children[10].textContent = new Date().toLocaleString();
                    }
                });
                alert('Program updated successfully!');
            } else {
                alert('Error updating program');
            }
        } catch (err) {
            console.error(err);
            alert('Server error');
        }
    });
});
