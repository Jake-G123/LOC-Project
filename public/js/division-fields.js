document.getElementById("division").addEventListener("change", async function () {
    const selected = this.value;

    if (selected === "Select") return;

    const res = await fetch(`/division-info?name=${encodeURIComponent(selected)}`);
    const d = await res.json();

    document.getElementById("division_id").value = d.id;
    document.getElementById("divName").value = d.division_name;
    document.getElementById("chair").value = d.chair;
    document.getElementById("dean").value = d.dean;
    document.getElementById("loc").value = d.loc_rep;
    document.getElementById("pen").value = d.pen;
});