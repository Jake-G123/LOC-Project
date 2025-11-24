document.addEventListener("DOMContentLoaded", () => {

    const toggleButtons = document.querySelectorAll(".toggle-button");

    toggleButtons.forEach(button => {
        button.addEventListener("click", () => {
            const details = button.parentElement.nextElementSibling;

            details.classList.toggle("hidden");
            button.classList.toggle("rotate");
        });
    });

});

document.addEventListener("DOMContentLoaded", () => {

    const toggleButtons = document.querySelectorAll(".toggle-button-edit");

    toggleButtons.forEach(button => {
        button.addEventListener("click", () => {
            const details = button.parentElement.nextElementSibling;

            details.classList.toggle("hidden");
        });
    });

});
