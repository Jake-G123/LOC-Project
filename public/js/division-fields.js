const yearDropdown = document.getElementById('year');

  if (yearDropdown) {
    yearDropdown.addEventListener('change', () => {
      const selectedYear = yearDropdown.value;
      
      window.location.href = `/?year=${selectedYear}`;
    });
  }

document.querySelectorAll('.deadline-upcoming input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const fieldset = this.closest('fieldset');
        if (this.checked) {
            fieldset.classList.add('deadline-upcoming-yes');
        } else {
            fieldset.classList.remove('deadline-upcoming-yes');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const cloneForm = document.getElementById('clone-year-form');

    if (cloneForm) {
        cloneForm.addEventListener('submit', (e) => {
            const confirmed = confirm(
                "Are you sure you want to clone all divisions from this year to the next year? This action cannot be undone."
            );
            if (!confirmed) {
                e.preventDefault();
            }
        });
    }
});

let table = new DataTable('#loc-table', {
    "order": [],
    "columnDefs": [{ "orderable": false, "targets": 11 }],
    "scrollX": true,
    "scrollCollapse": true,
    "autoWidth": false,
    "pageLength": 10,
    "lengthChange": false,
    "language": {
        "emptyTable": "No programs available for this year."
    }
});