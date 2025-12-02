let selectedYear = document.getElementById('year').value; // initialize to current dropdown value

  const yearDropdown = document.getElementById('year');

  // Update global variable whenever the dropdown changes
  yearDropdown.addEventListener('change', async () => {
    selectedYear = yearDropdown.value;  // update global

    // Now you can use selectedYear in this function or in rowSelect()
    const response = await fetch(`/summary-data?year=${selectedYear}`);
    const data = await response.json();

    const tableBody = document.querySelector('#loc-table tbody');
    tableBody.innerHTML = '';

    data.fields.forEach(field => {
      const row = document.createElement('tr');
      row.dataset.programid = field.ProgramID;
      row.innerHTML = `
        <td>${field.DivisionName}</td>
        <td>${field.ProgramName}</td>
        <td>${field.DivisionChair}</td>
        <td>${field.Dean}</td>
        <td>${field.LOCRep}</td>
        <td>${field.PENContact}</td>
        <td>${field.Payees}</td>
        <td>${field.HasBeenPaid}</td>
        <td>${field.ReportSubmitted}</td>
        <td>${field.Notes}</td>
        <td>${field.timestamp ? new Date(field.timestamp).toLocaleString() : ''}</td>
        <td><button type="button" onclick="rowSelect(${field.ProgramID})">Edit</button></td>
      `;
      tableBody.appendChild(row);
    });
  });

function rowSelect(programID) {
    const row = document.querySelector(`tr[data-programid='${programID}']`);
    if (!row) return;

    document.getElementById('editProgramID').value = programID;
    
    // Make sure selectedYear exists globally (from your year dropdown)
    document.getElementById('editAcademicYear').value = selectedYear;

    document.getElementById('editDivisionName').value = row.cells[0].innerText;
    document.getElementById('editProgramName').value = row.cells[1].innerText;
    document.getElementById('editChair').value = row.cells[2].innerText;
    document.getElementById('editDean').value = row.cells[3].innerText;
    document.getElementById('editLOC').value = row.cells[4].innerText;
    document.getElementById('editPEN').value = row.cells[5].innerText;
    document.getElementById('editPayees').value = row.cells[6].innerText;
    document.getElementById('editPaid').value = row.cells[7].innerText.toLowerCase();
    document.getElementById('editSubmitted').value = row.cells[8].innerText.toLowerCase();
    document.getElementById('editNotes').value = row.cells[9].innerText;

    const editContainer = document.getElementById('edit-form-container');
    editContainer.classList.remove('hidden');

    setTimeout(() => {
        editContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
}

function closeEditForm() {
    document.getElementById('edit-form-container').classList.add('hidden');
}