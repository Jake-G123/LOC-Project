divisionSelect.addEventListener('change', function() {
    const selectedDivision = this.value;
    if (!selectedDivision) {
        divNameInput.value = '';
        chairInput.value = '';
        deanInput.value = '';
        locInput.value = '';
        penInput.value = '';
        return;
    }

    // Fetch division data from Express route
    fetch(`/division/${encodeURIComponent(selectedDivision)}`)
        .then(res => {
            if (!res.ok) throw new Error('Division not found');
            return res.json();
        })
        .then(data => {
            divNameInput.value = data.division_name || '';
            chairInput.value = data.chair || '';
            deanInput.value = data.dean || '';
            locInput.value = data.loc_rep || '';
            penInput.value = data.pen || '';
        })
        .catch(err => {
            console.error('Error fetching division data:', err);
            divNameInput.value = '';
            chairInput.value = '';
            deanInput.value = '';
            locInput.value = '';
            penInput.value = '';
        });
});