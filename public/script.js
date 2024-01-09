document.addEventListener("DOMContentLoaded", function () {
    const categoryInput = document.getElementById("category-input");
    const amountInput = document.getElementById("amount-input");
    const dateInput = document.getElementById("date-input");
    const addBtn = document.getElementById("add-btn");
    const expenseTableBody = document.getElementById("expense-table-body");
    const totalAmount = document.getElementById("total-amount");

    addBtn.addEventListener("click", function () {
        const category = categoryInput.value.trim();
        const amount = parseFloat(amountInput.value);
        const date = dateInput.value;

        if (category !== "" && !isNaN(amount) && date !== "") {
            // Create a new row for the table
            const newRow = document.createElement("tr");

            // Create cells for each column
            const categoryCell = document.createElement("td");
            categoryCell.textContent = category;

            const amountCell = document.createElement("td");
            amountCell.textContent = `$${amount.toFixed(2)}`;

            const dateCell = document.createElement("td");
            dateCell.textContent = date;

            const deleteCell = document.createElement("td");
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.classList.add("delete-btn");
            deleteBtn.addEventListener("click", function () {
                
                // Remove the row when the delete button is clicked
                expenseTableBody.removeChild(newRow);
                updateTotalAmount();
            });
            deleteCell.appendChild(deleteBtn);

            // Append cells to the row
            newRow.appendChild(categoryCell);
            newRow.appendChild(amountCell);
            newRow.appendChild(dateCell);
            newRow.appendChild(deleteCell);

            // Set a data-id attribute with a unique identifier (you might use MongoDB ObjectId)
            newRow.setAttribute("data-id", Date.now().toString());

            // Append the row to the table body
            expenseTableBody.appendChild(newRow);

            // Update the total amount
            updateTotalAmount();

            // Clear input fields
            categoryInput.value = "";
            amountInput.value = "";
            dateInput.value = "";
        } else {
            alert("Please fill in all fields with valid data.");
        }
    });

    function updateTotalAmount() {
        let total = 0;
        // Loop through each row in the table and sum the amounts
        expenseTableBody.querySelectorAll("tr").forEach((row) => {
            const amountCell = row.querySelector("td:nth-child(2)");
            if (amountCell) {
                const amount = parseFloat(amountCell.textContent.replace("$", ""));
                if (!isNaN(amount)) {
                    total += amount;
                }
            }
        });

        // Display the total amount
        totalAmount.textContent = `$${total.toFixed(2)}`;
    }
});
