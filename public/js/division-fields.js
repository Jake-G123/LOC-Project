document.getElementById("division").addEventListener("change", async function () {
    const selected = this.value;

    if (selected === "Select") return;

    const res = await fetch(`/division-info?name=${encodeURIComponent(selected)}`);
    const d = await res.json();

    document.getElementById("division_id").value = d.id;
    document.getElementById("divName").value = d.DivisionName;
    document.getElementById("chair").value = d.DivisionChair;
    document.getElementById("dean").value = d.Dean;
    document.getElementById("loc").value = d.LOCRep;
    document.getElementById("pen").value = d.PENContact;
});