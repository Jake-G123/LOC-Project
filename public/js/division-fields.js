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