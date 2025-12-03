
// Checks the year value and redirects to that year's data
const yearDropdown = document.getElementById('year');

if (yearDropdown) {
    yearDropdown.addEventListener('change', () => {
        const selectedYear = yearDropdown.value;
        
        window.location.href = `/?year=${selectedYear}`;
    });
}

// Highlights upcoming deadlines based on checkbox status
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

// Confirmation prompt for cloning divisions to the next year
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

// Initialize DataTable for better table management
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