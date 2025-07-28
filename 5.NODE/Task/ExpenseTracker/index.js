import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const expenseMap = new Map(); 

function showMenu() {
    console.log(`
=== Expense Tracker ===
1. Add Expense
2. View Expenses
3. Update Expense
4. Delete Expense
5. Exit
=======================
`);
    rl.question('Choose an option (1-5): ', handleOption);
}

function handleOption(option) {
    switch (option.trim()) {
        case '1':
            addExpense();
            break;
        case '2':
            viewExpenses();
            break;
        case '3':
            updateExpense();
            break;
        case '4':
            deleteExpense();
            break;
        case '5':
            console.log('Exiting Expense Tracker. Goodbye!');
            rl.close();
            break;
        default:
            console.log('Invalid option. Please choose 1-5.');
            showMenu();
    }
}

function addExpense() {
    rl.question('Enter expense category (e.g., Food, Rent): ', (category) => {
        if (!category.trim()) {
            console.log('Category cannot be empty.');
            return showMenu();
        }

        rl.question('Enter amount: ', (amountInput) => {
            const amount = parseFloat(amountInput);
            if (isNaN(amount) || amount <= 0) {
                console.log('Invalid amount. Must be a number greater than 0.');
            } else {
                const id = expenseMap.size + 1;
                expenseMap.set(id, {
                    category: category.trim(),
                    amount: amount,
                });
                console.log(`Expense added: [${id}] ${category.trim()} - ₹${amount}`);
            }
            showMenu();
        });
    });
}

function viewExpenses() {
    if (expenseMap.size === 0) {
        console.log('No expenses recorded.');
    } else {
        console.log('\nExpenses:');
        let total = 0;
        for (const [id, expense] of expenseMap.entries()) {
            console.log(`[${id}] ${expense.category} - ₹${expense.amount}`);
            total += expense.amount;
        }
        console.log(`Total: ₹${total}`);
    }
    showMenu();
}

function updateExpense() {
    if (expenseMap.size === 0) {
        console.log('No expenses to update.');
        return showMenu();
    }

    rl.question('Enter the ID of the expense to update: ', (idInput) => {
        const id = parseInt(idInput);
        if (!expenseMap.has(id)) {
            console.log(`No expense found with ID: ${id}`);
            return showMenu();
        }

        const current = expenseMap.get(id);
        rl.question(`Enter new category (leave blank to keep "${current.category}"): `, (newCategory) => {
            rl.question(`Enter new amount (leave blank to keep ₹${current.amount}): `, (newAmountInput) => {
                const updatedCategory = newCategory.trim() || current.category;
                const updatedAmount = newAmountInput.trim() === ''
                    ? current.amount
                    : parseFloat(newAmountInput);

                if (isNaN(updatedAmount) || updatedAmount <= 0) {
                    console.log('Invalid amount. Must be a number greater than 0.');
                } else {
                    expenseMap.set(id, {
                        category: updatedCategory,
                        amount: updatedAmount,
                    });
                    console.log(`Expense updated: [${id}] ${updatedCategory} - ₹${updatedAmount}`);
                }
                showMenu();
            });
        });
    });
}

function deleteExpense() {
    if (expenseMap.size === 0) {
        console.log('No expenses to delete.');
        return showMenu();
    }

    rl.question('Enter the ID of the expense to delete: ', (idInput) => {
        const id = parseInt(idInput);
        if (expenseMap.has(id)) {
            const deleted = expenseMap.get(id);
            expenseMap.delete(id);
            console.log(`Deleted: [${id}] ${deleted.category} - ₹${deleted.amount}`);
        } else {
            console.log(`No expense found with ID: ${id}`);
        }
        showMenu();
    });
}

showMenu();
