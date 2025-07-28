import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const library = new Map(); 

function showMenu() {
    console.log(`
=== Library Manager ===
1. Add Book
2. List Books
3. Update Book
4. Delete Book
5. Exit
=======================
`);
    rl.question('Choose an option (1-5): ', handleOption);
}

function handleOption(option) {
    switch (option.trim()) {
        case '1':
            addBook();
            break;
        case '2':
            listBooks();
            break;
        case '3':
            updateBook();
            break;
        case '4':
            deleteBook();
            break;
        case '5':
            console.log('Exiting Library Manager. Goodbye!');
            rl.close();
            break;
        default:
            console.log('Invalid option. Please choose 1-5.');
            showMenu();
    }
}

function addBook() {
    rl.question('Enter book title: ', (title) => {
        if (!title.trim()) {
            console.log('Book title cannot be empty.');
            return showMenu();
        }

        rl.question('Enter author name: ', (author) => {
            if (!author.trim()) {
                console.log('Author name cannot be empty.');
                return showMenu();
            }

            const bookId = library.size + 1;
            library.set(bookId, {
                title: title.trim(),
                author: author.trim(),
            });

            console.log(`Book added: [${bookId}] "${title.trim()}" by ${author.trim()}`);
            showMenu();
        });
    });
}

function listBooks() {
    if (library.size === 0) {
        console.log('No books available in the library.');
    } else {
        console.log('\nBooks in Library:');
        for (const [id, book] of library.entries()) {
            console.log(`[${id}] "${book.title}" by ${book.author}`);
        }
    }
    showMenu();
}

function updateBook() {
    if (library.size === 0) {
        console.log('No books available to update.');
        return showMenu();
    }

    rl.question('Enter the ID of the book to update: ', (idInput) => {
        const id = parseInt(idInput);
        if (!library.has(id)) {
            console.log(`No book found with ID: ${id}`);
            return showMenu();
        }

        const current = library.get(id);

        rl.question(`Enter new title (leave blank to keep "${current.title}"): `, (newTitle) => {
            rl.question(`Enter new author (leave blank to keep "${current.author}"): `, (newAuthor) => {
                const updatedTitle = newTitle.trim() || current.title;
                const updatedAuthor = newAuthor.trim() || current.author;

                library.set(id, {
                    title: updatedTitle,
                    author: updatedAuthor,
                });

                console.log(`Book updated: [${id}] "${updatedTitle}" by ${updatedAuthor}`);
                showMenu();
            });
        });
    });
}

function deleteBook() {
    if (library.size === 0) {
        console.log('No books to delete.');
        return showMenu();
    }

    rl.question('Enter the ID of the book to delete: ', (idInput) => {
        const id = parseInt(idInput);
        if (library.has(id)) {
            const deleted = library.get(id);
            library.delete(id);
            console.log(`Book deleted: [${id}] "${deleted.title}" by ${deleted.author}`);
        } else {
            console.log(`No book found with ID: ${id}`);
        }
        showMenu();
    });
}

showMenu();
