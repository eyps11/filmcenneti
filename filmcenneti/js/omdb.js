// This file contains functions for interacting with the OMDB API to fetch movie data.

const API_KEY = 'your_api_key_here'; // Replace with your actual OMDB API key
const OMDB_URL = 'http://www.omdbapi.com/';

// Function to fetch movie data from OMDB API
async function fetchMovieData(title) {
    try {
        const response = await fetch(`${OMDB_URL}?t=${encodeURIComponent(title)}&apikey=${API_KEY}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching movie data:', error);
    }
}

// Function to display movie details
function displayMovieDetails(movie) {
    if (movie && movie.Response === "True") {
        // Display movie details (this can be customized as needed)
        console.log(`Title: ${movie.Title}`);
        console.log(`Year: ${movie.Year}`);
        console.log(`Director: ${movie.Director}`);
        console.log(`Plot: ${movie.Plot}`);
    } else {
        console.log('Movie not found');
    }
}

// Example usage
// fetchMovieData('Inception').then(displayMovieDetails);