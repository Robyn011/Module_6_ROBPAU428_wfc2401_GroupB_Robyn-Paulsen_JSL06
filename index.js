// Sample menu data (Consider fetching this data from a server in a real-world scenario)
const menu = {
    Starters: ["Garlic Bread", "Bruschetta"],
    MainCourses: ["Margherita Pizza", "Spaghetti Carbonara"],
    Desserts: ["Tiramisu", "Cheesecake"]
};

// Function to display menu items by category
function displayMenuItems(menu) {
    // Get the container where menu items will be displayed
    const menuContainer = document.getElementById('menu');

    // Loop through each category in the menu
    for (const [category, items] of Object.entries(menu)) {
        // Create a heading for the category
        const categoryElement = document.createElement('h3');
        categoryElement.textContent = category;
        menuContainer.appendChild(categoryElement);

        // Create a list for the items in the category
        const itemList = document.createElement('ul');
        // Loop through each item in the category
        items.forEach(item => {
            // Create a list item for the item
            const listItem = document.createElement('li');
            listItem.textContent = item;
            // Add an event listener to the item to add it to the order when clicked
            listItem.addEventListener('click', () => addToOrder(item));
            itemList.appendChild(listItem);
        });
        menuContainer.appendChild(itemList);
    }
}

// Function to initialize the menu system
function initMenuSystem(menu) {
    // Display the menu items
    displayMenuItems(menu);
}

// Callback function for adding an item to the order
function addToOrder(itemName) {
    // Get the list where order items will be displayed
    const orderItemsList = document.getElementById('order-items');

    // Create a list item for the item
    const listItem = document.createElement('li');
    listItem.textContent = itemName;
    // Add an event listener to the item to remove it from the order when clicked
    listItem.addEventListener('click', () => removeFromOrder(itemName));
    orderItemsList.appendChild(listItem);

    // Update the total price by adding the price of the added item
    updateTotal(getItemPrice(itemName));
}

// Function to remove an item from the order
function removeFromOrder(itemName) {
    // Get the list where order items are displayed
    const orderItemsList = document.getElementById('order-items');
    // Get all order items
    const orderItems = orderItemsList.getElementsByTagName('li');

    // Loop through each order item
    for (let i = 0; i < orderItems.length; i++) {
        // Check if the item matches the one to be removed
        if (orderItems[i].textContent === itemName) {
            // Remove the matched item from the order
            orderItemsList.removeChild(orderItems[i]);
            // Update the total price by subtracting the price of the removed item
            updateTotal(-getItemPrice(itemName));
            break;
        }
    }
}

// Function to update the total price
function updateTotal(itemPrice) {
    // Get the element where the total price is displayed
    const orderTotalElement = document.getElementById('order-total');

    // Parse the current total price
    let currentTotal = parseFloat(orderTotalElement.textContent);
    // Update the total price by adding the price change
    currentTotal += itemPrice;
    // Set the updated total price
    orderTotalElement.textContent = currentTotal.toFixed(2);
}

// Helper function to get the price of an item (considering a static price for each item)
function getItemPrice(itemName) {
    // Define prices for menu items
    const menuPrices = {
        "Garlic Bread": 5.99,
        "Bruschetta": 12.99,
        "Margherita Pizza": 30.99,
        "Spaghetti Carbonara": 20.99,
        "Tiramisu": 10.99,
        "Cheesecake": 12.99
    };
    // Return the price of the specified item, or 0 if not found
    return menuPrices[itemName] || 0;
}

// Call the function to initialize the menu system
initMenuSystem(menu);
