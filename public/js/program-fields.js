function rowSelect(programID) {
    const row = document.querySelector(`tr[data-programid='${programID}']`);
    if (!row) return;

    const cells = row.querySelectorAll('td');

    document.getElementById('editProgramID').value = programID;
    document.getElementById('editDivisionName').value = cells[0].textContent;
    document.getElementById('editProgramName').value = cells[1].textContent;
    document.getElementById('editChair').value = cells[2].textContent;
    document.getElementById('editDean').value = cells[3].textContent;
    document.getElementById('editLOC').value = cells[4].textContent;
    document.getElementById('editPEN').value = cells[5].textContent;
    document.getElementById('editPayees').value = cells[6].textContent;
    document.getElementById('editPaid').value = cells[7].textContent.toLowerCase();
    document.getElementById('editSubmitted').value = cells[8].textContent.toLowerCase();
    document.getElementById('editNotes').value = cells[9].textContent;

    const container = document.getElementById('edit-form-container');
    container.classList.remove('hidden');
    container.scrollIntoView({ behavior: 'smooth' });
}

function closeEditForm() {
    document.getElementById('edit-form-container').classList.add('hidden');
}