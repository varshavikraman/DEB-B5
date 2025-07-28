import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const toDoMap = new Map();

function showMenu() {
    console.log(`
    === ToDo Lists ===
    1. Add Task
    2. List Task
    3. Update Status
    4. Delete Task
    5. Exit
    ==================
    `);
    rl.question('Select an option (1,2,3,4, or 5): ', handleOption);
}

function handleOption(option) {
    switch (option.trim()) {
        case '1': // Add Task
            rl.question('Enter the task: ', (toDo) => {
                if (toDo.trim() !== '') {
                    rl.question('Enter the Status (completed / not completed): ', (toDoStatus) => {
                        const status = toDoStatus.trim();
                        if (status === 'completed' || status === 'not completed') {
                            const toDoId = toDoMap.size + 1;
                            toDoMap.set(toDoId, {
                                task: toDo.trim(),
                                taskStatus: status,
                            });
                            console.log(`ToDo Task added: [${toDoId}] ${toDo.trim()} (Status: ${status})`);
                        } else {
                            console.log('Invalid Status. Please enter "completed" or "not completed".');
                        }
                        showMenu();
                    });
                } else {
                    console.log('Please specify a valid task.');
                    showMenu();
                }
            });
            break;

        case '2': // List Tasks
            if (toDoMap.size > 0) {
                console.log('\nTo-Do List with Status:');
                for (const [id, toDo] of toDoMap.entries()) {
                    console.log(`[${id}] ${toDo.task} (Status: ${toDo.taskStatus})`);
                }
            } else {
                console.log('No To-Do List available.');
            }
            showMenu();
            break;

        case '3': // Update Task
            if (toDoMap.size === 0) {
                console.log('No To-Do List available to update.');
                return showMenu();
            }

            rl.question('Enter the ID of the task to update: ', (idInput) => {
                const toDoId = parseInt(idInput);
                if (!toDoMap.has(toDoId)) {
                    console.log(`No task found with ID: ${toDoId}`);
                    return showMenu();
                }

                const currentTask = toDoMap.get(toDoId);

                rl.question(`Enter new task (leave blank to keep current): `, (newTask) => {
                    rl.question(`Enter new status (completed / not completed, current is ${currentTask.taskStatus}): `, (newStatusInput) => {
                        const updatedTask = newTask.trim() || currentTask.task;
                        const updatedStatus = newStatusInput.trim() || currentTask.taskStatus;

                        if (updatedStatus !== 'completed' && updatedStatus !== 'not completed') {
                            console.log('Invalid Status. Please enter "completed" or "not completed".');
                        } else {
                            toDoMap.set(toDoId, {
                                task: updatedTask,
                                taskStatus: updatedStatus
                            });
                            console.log(`Task updated: [${toDoId}] ${updatedTask} (Status: ${updatedStatus})`);
                        }

                        showMenu();
                    });
                });
            });
            break;

        case '4': // Delete Task
            if (toDoMap.size === 0) {
                console.log('No task available to delete.');
                return showMenu();
            }

            rl.question('Enter the ID of the task to delete: ', (idInput) => {
                const toDoId = parseInt(idInput);

                if (toDoMap.has(toDoId)) {
                    const deletedTask = toDoMap.get(toDoId);
                    toDoMap.delete(toDoId);
                    console.log(`Task deleted: [${toDoId}] ${deletedTask.task}`);
                } else {
                    console.log(`No task found with ID: ${toDoId}`);
                }

                showMenu();
            });
            break;

        case '5': // Exit
            console.log('Exiting To-Do Lists. Goodbye!');
            rl.close();
            break;

        default:
            console.log('Invalid option. Please choose 1-5.');
            showMenu();
            break;
    }
}

// Start the app
showMenu();
