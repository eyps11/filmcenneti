
document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const movieTitle = urlParams.get('title');

    if (!movieTitle) {
        showError('Film bulunamadı');
        return;
    }

    try {
        const movieData = await fetchMovieData(movieTitle);
        renderMovieData(movieData);
        setupTrailer(movieData.Title);
    } catch (error) {
        showError('Film verileri alınamadı');
    }
});

async function fetchMovieData(title) {
    const response = await fetch(
        `https://www.omdbapi.com/?apikey=afa11120&t=${encodeURIComponent(title)}&plot=full`
    );
    const data = await response.json();

    if (data.Response === 'False') throw new Error(data.Error);
    return data;
}

function renderMovieData(movie) {
    // Temel Bilgiler
    document.getElementById('film-title').textContent = `${movie.Title} (${movie.Year})`;
    document.getElementById('film-poster').src = movie.Poster;
    document.getElementById('film-plot').textContent = movie.Plot;

    // Badge'ler
    document.getElementById('imdb-rating').textContent = `IMDB ${movie.imdbRating}`;
    document.getElementById('film-runtime').textContent = movie.Runtime;
    document.getElementById('film-year').textContent = movie.Year;

    // Detaylar
    document.getElementById('director').textContent = movie.Director;
    document.getElementById('actors').textContent = movie.Actors;
    document.getElementById('genre').textContent = movie.Genre;
    document.getElementById('language').textContent = movie.Language;
    document.getElementById('country').textContent = movie.Country;
    document.getElementById('released').textContent = movie.Released;

    // Teknik Detaylar
    document.getElementById('imdbRating').textContent = movie.imdbRating;
    document.getElementById('imdbVotes').textContent = movie.imdbVotes;
    document.getElementById('boxOffice').textContent = movie.BoxOffice || 'Bilinmiyor';
    document.getElementById('awards').textContent = movie.Awards || 'Yok';
    document.getElementById('production').textContent = movie.Production || 'Bilinmiyor';

    // Değerlendirmeler
    const ratingsContainer = document.getElementById('ratings');
    if (movie.Ratings?.length > 0) {
        ratingsContainer.innerHTML = movie.Ratings.map(rating => `
                    <div class="p-3 bg-light rounded">
                        <div class="d-flex justify-content-between">
                            <span class="fw-bold">${rating.Source}</span>
                            <span class="text-primary">${rating.Value}</span>
                        </div>
                    </div>
                `).join('');
    } else {
        ratingsContainer.innerHTML = '<div class="text-muted">Değerlendirme bulunamadı</div>';
    }
}

function setupTrailer(title) {
    // YouTube API entegrasyonu için placeholder
    const trailerFrame = document.getElementById('trailer');
    trailerFrame.src = `https://www.youtube.com/embed/D5fNKMmgTCc?si=RqZ9rdq8w8_v8SuI`;
}

function showError(message) {
    const container = document.querySelector('.container');
    container.innerHTML = `
                <div class="alert alert-danger mt-5">
                    <h4 class="alert-heading">Hata!</h4>
                    <p>${message}</p>
                    <a href="index.html" class="btn btn-outline-danger">Ana Sayfaya Dön</a>
                </div>
            `;
}