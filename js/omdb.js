document.addEventListener('DOMContentLoaded', function() {
    // URL parametrelerinden film adını alalım:
    const urlParams = new URLSearchParams(window.location.search);
    const movieTitle = urlParams.get('title');

    if (movieTitle) {
        fetchMovieDetailByTitle(movieTitle);
    }

    function fetchMovieDetailByTitle(title) {
        const apiKey = 'afa11120';
        const formattedTitle = encodeURIComponent(title);
        const url = `http://www.omdbapi.com/?apikey=${apiKey}&t=${formattedTitle}&plot=full&r=json`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.Response === "True") {
                    console.log("Detail fetched:", data);
                    const detailSection = document.getElementById('film-detail');
                    if (detailSection) {
                        detailSection.innerHTML = `
                            <div class="film-bilgileri container my-4">
                              <div class="row">
                                <div class="col-md-4">
                                  <img src="${data.Poster}" alt="${data.Title} Poster" class="img-fluid film-afisi">
                                </div>
                                <div class="col-md-8">
                                  <h1>${data.Title}</h1>
                                  <p><strong>IMDB:</strong> ${data.imdbRating}</p>
                                  <p><strong>Yıl:</strong> ${data.Year}</p>
                                  <p><strong>Rated:</strong> ${data.Rated}</p>
                                  <p><strong>Released:</strong> ${data.Released}</p>
                                  <p><strong>Runtime:</strong> ${data.Runtime}</p>
                                  <p><strong>Genre:</strong> ${data.Genre}</p>
                                  <p><strong>Director:</strong> ${data.Director}</p>
                                  <p><strong>Writer:</strong> ${data.Writer}</p>
                                  <p><strong>Actors:</strong> ${data.Actors}</p>
                                  <p><strong>Plot:</strong> ${data.Plot}</p>
                                  <p><strong>Language:</strong> ${data.Language}</p>
                                  <p><strong>Country:</strong> ${data.Country}</p>
                                  <p><strong>Awards:</strong> ${data.Awards}</p>
                                  <p><strong>Box Office:</strong> ${data.BoxOffice || 'N/A'}</p>
                                  <p><strong>Metascore:</strong> ${data.Metascore}</p>
                                  <p><strong>IMDB Votes:</strong> ${data.imdbVotes}</p>
                                </div>
                              </div>
                            </div>
                        `;
                    }
                } else {
                    const detailSection = document.getElementById('film-detail');
                    if (detailSection) {
                        detailSection.innerHTML = `<p>Film bilgileri bulunamadı: ${data.Error}</p>`;
                    }
                }
            })
            .catch(error => {
                console.error("Error fetching movie details:", error);
            });
    }

    // Yorum gönderim işlemi (örnek - veritabanı veya kalıcı depolama yok)
    const submitBtn = document.getElementById('submit-yorum');
    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            const adSoyad = document.getElementById('adSoyad').value.trim();
            const yorumMetni = document.getElementById('yorumMetni').value.trim();
            if (adSoyad && yorumMetni) {
                // Yorumları gösterecek alanı al veya oluştur:
                let commentsSection = document.getElementById('comments');
                if (!commentsSection) {
                    commentsSection = document.createElement('div');
                    commentsSection.id = 'comments';
                    document.body.appendChild(commentsSection);
                }
                commentsSection.innerHTML += `
                    <div class="comment border p-2 my-2">
                        <h5>${adSoyad}</h5>
                        <p>${yorumMetni}</p>
                    </div>
                `;
                // Girişleri temizle:
                document.getElementById('adSoyad').value = '';
                document.getElementById('yorumMetni').value = '';
            } else {
                alert("Lütfen adınızı ve yorumunuzu giriniz.");
            }
        });
    }
});