const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const container = document.getElementById("users-container");

async function loadUsers() {
    try {
        showLoading();
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }
        const users = await response.json();
        displayUsers(users);
    } catch (error) {
        showError(error.message);
    } finally {
        hideLoading();
    }
}

function showLoading() {
    loading.classList.remove("hidden");
    container.innerHTML = "";
}

function hideLoading() {
    loading.classList.add("hidden");
}

function showError(message) {
    errorDiv.textContent = `Error: ${message}`;
    errorDiv.classList.remove("hidden");
}

function displayUsers(users) {
    container.innerHTML = users.map(user => `
        <div class="user-card">
            <h2>${user.name}</h2>
            <p>📧 ${user.email}</p>
            <p>🏢 ${user.company.name}</p>
            <p>📍 ${user.address.city}</p>
        </div>
    `).join("");
}

let allUsers = [];

async function init() {
    allUsers = await fetch("https://jsonplaceholder.typicode.com/users").then(r => r.json());
    displayUsers(allUsers);

    const searchInput = document.getElementById("search");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            const query = e.target.value.toLowerCase();
            const filtered = allUsers.filter(user =>
                user.name.toLowerCase().includes(query) ||
                user.email.toLowerCase().includes(query)
            );
            displayUsers(filtered);
        });
    }

    // Sort A-Z / Z-A
    const sortBtn = document.getElementById("sort-btn");
    let sortAscending = true;
    if (sortBtn) {
        sortBtn.addEventListener("click", () => {
            const sorted = [...allUsers].sort((a, b) =>
                sortAscending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
            );
            sortAscending = !sortAscending;
            displayUsers(sorted);
        });
    }

    // Filter by city
    const citySelect = document.getElementById("city-filter");
    if (citySelect) {
        const cities = [...new Set(allUsers.map(u => u.address.city))];
        citySelect.innerHTML = `<option value="">All Cities</option>` +
            cities.map(city => `<option value="${city}">${city}</option>`).join("");

        citySelect.addEventListener("change", (e) => {
            const city = e.target.value;
            const filtered = city ? allUsers.filter(u => u.address.city === city) : allUsers;
            displayUsers(filtered);
        });
    }
}

init();
