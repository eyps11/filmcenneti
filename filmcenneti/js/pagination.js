// This file manages pagination logic, allowing users to navigate through multiple pages of content.

let currentPage = 1;
const itemsPerPage = 10; // Adjust this value based on your needs
let items = []; // This will hold the items to paginate

function displayItems() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = items.slice(startIndex, endIndex);

    // Code to display paginatedItems on the page
    // For example, you might loop through paginatedItems and append them to a container
}

function setupPagination() {
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const paginationContainer = document.getElementById('pagination');

    // Clear existing pagination
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.innerText = i;
        pageButton.onclick = () => {
            currentPage = i;
            displayItems();
        };
        paginationContainer.appendChild(pageButton);
    }
}

// Call this function to initialize pagination with your items
function initializePagination(data) {
    items = data; // Assuming data is an array of items to paginate
    setupPagination();
    displayItems();
}