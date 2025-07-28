import readline from 'readline';

// Create readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const movieMap = new Map(); 

function showMenu() {
    console.log(`
=== Movie Manager ===
1.Add Movie
2.List Movie
3.Update Movie
4.Delete Movie
5.Exit
====================
`);
    rl.question('Choose an option (1-5): ', handleOption);
}


function handleOption(option) {
    switch (option.trim()) {
        case '1': // Add Movie
            rl.question('Enter a Movie Name: ', (movie) => {
                if (movie.trim() !== '') {
                   rl.question('Enter a Rating (0 to 5): ', (rating) => {
                        const ratingNo = parseFloat(rating);
                        if (isNaN(ratingNo) || ratingNo < 0 || ratingNo > 5) {
                            console.log('Invalid rating. Please enter a number between 0 and 5.');
                        } else {
                            const movieId = movieMap.size + 1;
                            movieMap.set(movieId, {
                                name: movie.trim(),
                                rating: ratingNo,
                            });
                            console.log(`Movie added: [${movieId}] ${movie.trim()} (Rating: ${ratingNo})`);
                        }
                        showMenu();
                    });
                } else {
                    console.log('Please specify a valid movie.');
                }
                showMenu(); // Return to menu
            });
            break;

        case '2': // List Movie
            if (movieMap.size > 0) {
                console.log('\nMovies with Ratings:');
                for (const [id, movie] of movieMap.entries()) {
                    console.log(`[${id}] ${movie.name} (Rating: ${movie.rating})`);
                }
            } else {
                console.log('No movies available.');
            }
            showMenu();
            break;

        case '3': // Update Movie
            if (movieMap.size === 0) {
                console.log('No movies available to update.');
                return showMenu();
            }

            rl.question('Enter the ID of the movie to update: ', (idInput) => {
                const movieId = parseInt(idInput);
                if (!movieMap.has(movieId)) {
                    console.log(`No movie found with ID: ${movieId}`);
                    return showMenu();
                }

                const currentMovie = movieMap.get(movieId);

                rl.question(`Enter new name: `, (newName) => {
                    rl.question(`Enter new rating (current is ${currentMovie.rating}): `, (newRatingInput) => {
                        const updatedName = newName.trim() === '' ? currentMovie.name : newName.trim();
                        const updatedRating = newRatingInput.trim() === '' ? currentMovie.rating : parseFloat(newRatingInput);

                        if (isNaN(updatedRating) || updatedRating < 0 || updatedRating > 5) {
                            console.log('Invalid rating. Please enter a number between 0 and 5.');
                        } else {
                            movieMap.set(movieId, {
                                name: updatedName,
                                rating: updatedRating
                            });
                            console.log(`Movie updated: [${movieId}] ${updatedName} (Rating: ${updatedRating})`);
                        }

                        showMenu();
                    });
                });
            });
            break;
            
        case '4': // Delete Movie
            if (movieMap.size === 0) {
                console.log('No movies available to delete.');
                return showMenu();
            }

            rl.question('Enter the ID of the movie to delete: ', (idInput) => {
                const movieId = parseInt(idInput);

                if (movieMap.has(movieId)) {
                    const deletedMovie = movieMap.get(movieId);
                    movieMap.delete(movieId);
                    console.log(`Movie deleted: [${movieId}] ${deletedMovie.name}`);
                } else {
                    console.log(`No movie found with ID: ${movieId}`);
                }

                showMenu();
            });
            break;


        case '5': // Exit
            console.log('Exiting Movie Manager. Goodbye!');
            rl.close(); 
            break;


        default: // Invalid option
            console.log('Invalid option. Please choose 1-5.');
            showMenu(); // Return to menu
            break;
    }
}

// Start the program by showing the menu
showMenu();