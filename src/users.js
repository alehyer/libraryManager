document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("add-btn").addEventListener("click", function () {
        window.location.href = `../pages/add-users.html`;
    });

    const data = JSON.parse(localStorage.getItem("newUserData"));
    if (data) {
        const cardsContainer = document.querySelector(".cards");

        // Create a new card element
        const newCard = document.createElement("div");
        newCard.classList.add("card"); // Add the "card" class

        // Add the content for the new card
        newCard.innerHTML = `
            <img src="${data.uploadedUserImage}" alt="Uploaded Image" />
            <div>
                <h3>${data.name}</h3>
                <p>User ID: ${data.userID}</p>
                <p>Phone: ${data.phone} </p>
                <p>Email: ${data.email}</p>
                <div style="display: none">
                    <p>Street Address: ${data.streetAddress}</p>
                    <p>City: ${data.city}</p>
                    <p>Zipcode: ${data.zipcode}</p>
                    <p>State: ${data.state}</p>
                    <p>Member Since: ${data.memberDate}</p>
                    <p>Renewal Date: ${data.renewalDate}</p>
                </div>
            </div>
            <button
                class="delete"
                data-delete="zoom"
                onclick="event.stopPropagation();"
            >
                remove
            </button>
            <div class="animation-assets"></div>
        `;

        // Append the new card to the "cards" container
        cardsContainer.appendChild(newCard);

        // Delete data after use
        localStorage.removeItem("newUserData");
    }

    const parent = function (el, match, last) {
        var result = [];
        for (var p = el && el.parentElement; p; p = p.parentElement) {
            result.push(p);
            if (p.matches(match)) {
                break;
            }
        }
        if (last == 1) {
            return result[result.length - 1];
        } else {
            return result;
        }
    };

    document.querySelectorAll(".delete").forEach(function (button) {
        button.addEventListener("click", function () {
            const card = parent(this, ".card", 1); // Find the card element

            // Add the zoom class for animation
            card.classList.add("zoom");

            card.addEventListener("animationend", function () {
                card.remove();
            });
        });
    });

    document.querySelectorAll(".card").forEach(function (card) {
        card.addEventListener("click", function () {
            const imgSrc = this.querySelector("img").src;
            const name = this.querySelector("h3").textContent;

            let userDetail = {
                Image: imgSrc,
                Name: name,
            };

            this.querySelectorAll("p").forEach(function (p) {
                const key = p.textContent.split(":")[0].trim();
                const value = p.textContent.split(":").pop().trim();
                userDetail[key] = value;
            });

            console.log(userDetail);
            localStorage.setItem("userData", JSON.stringify(userDetail));
            window.location.href = "../pages/profile.html";
        });
    });
});
