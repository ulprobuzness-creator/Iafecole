document.querySelectorAll(".toggle-btn").forEach(button => {

    button.addEventListener("click", function () {

        const target =
        document.getElementById(
            this.dataset.subject
        );

        if (target.style.display === "none") {
            target.style.display = "block";
            this.innerHTML = "▲";
        } else {
            target.style.display = "none";
            this.innerHTML = "▼";
        }

    });

});
