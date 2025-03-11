// filepath: /c:/Users/MYAVAŞ/Desktop/ödev/js/index.js
document.addEventListener("DOMContentLoaded", function() {
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-input');
    const resultsContainer = document.getElementById('search-results');
    
    searchBtn.addEventListener('click', function() {
        const query = searchInput.value.trim();
        if(query !== ""){
            // window.find() sayfa üzerinde arama yapar ve bulunan ilk eşleşmeye odaklanır.
            if (!window.find(query)) {
                alert("Aradığınız kelime bulunamadı.");
            }
        }
    });

    // Search butonuna tıklama olayını dinliyoruz
    document.querySelector('.search-btn').addEventListener('click', function() {
        const container = document.getElementById('container');
        removeHighlights(container);
        const query = document.querySelector('.search-input').value.trim();
        if (query === "") return;
        recursiveHighlight(container, query);
    });

    // Enter tuşuyla aramayı tetikleyen ekleme
    document.querySelector('.search-input').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Form gönderimini engellerse
            document.querySelector('.search-btn').click();
        }
    });

    // Önceki <mark> etiketlerini kaldıran fonksiyon
    function removeHighlights(element) {
        const marks = element.querySelectorAll('mark');
        marks.forEach(mark => {
            const parent = mark.parentNode;
            parent.replaceChild(document.createTextNode(mark.textContent), mark);
            parent.normalize();
        });
    }

    // Metindeki arama kelimesini <mark> ile vurgulayan fonksiyon
    function highlightText(text, searchTerm) {
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    // Verilen node altında tüm metin düğümlerinde recursive olarak vurgulama yapan fonksiyon
    function recursiveHighlight(node, searchTerm) {
        if (node.nodeType === Node.TEXT_NODE) {
            const replacedHTML = highlightText(node.textContent, searchTerm);
            if (replacedHTML !== node.textContent) {
                const temp = document.createElement('span');
                temp.innerHTML = replacedHTML;
                while (temp.firstChild) {
                    node.parentNode.insertBefore(temp.firstChild, node);
                }
                node.parentNode.removeChild(node);
            }
        } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'MARK') {
            node.childNodes.forEach(child => recursiveHighlight(child, searchTerm));
        }
    }

    // Fonksiyon: Eşleşmeleri toplayıp "Bunu mu istediniz?" bölümünü oluşturur.
    function showSearchSuggestions(container) {
        // Önce varsa eski öneri kutusunu kaldıralım
        let existing = document.querySelector('.search-suggestions');
        if(existing) existing.remove();

        const marks = container.querySelectorAll('mark');
        if (marks.length === 0) return;

        const suggestionContainer = document.createElement('div');
        suggestionContainer.className = 'search-suggestions';
        suggestionContainer.innerHTML = `<p><strong>Bunu mu istediniz?</strong></p>`;

        // Her <mark> etiketinin bulunduğu metnin bir kısmını (bağlam) öneri olarak ekliyoruz.
        marks.forEach(mark => {
            // Yakın çevreden çekeceğimiz metin (örneğin, mark’ın bulunduğu elementin tamamı)
            const context = mark.parentNode.textContent.trim();
            const suggestionItem = document.createElement('div');
            suggestionItem.className = 'suggestion-item';
            suggestionItem.textContent = context;
            suggestionContainer.appendChild(suggestionItem);
        });

        // Öneri kutusunu container'ın hemen altına ekleyelim
        container.parentNode.insertBefore(suggestionContainer, container.nextSibling);
    }

    // Arama butonuna tıklama olayını dinleyelim
    document.querySelector('.search-btn').addEventListener('click', function() {
        const container = document.getElementById('container');
        removeHighlights(container); // Önce eski vurgulamaları kaldır
        const query = document.querySelector('.search-input').value.trim();
        if (query === "") return;

        // Belirtilen alanda arama yapıp tüm eşleşmeleri vurgula
        recursiveHighlight(container, query);

        // "Bunu mu istediniz?" öneri bölümünü oluştur
        showSearchSuggestions(container);
    });

    // Enter tuşuna basıldığında da aramayı tetikleyelim
    document.querySelector('.search-input').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            document.querySelector('.search-btn').click();
        }
   
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-input');

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            const title = searchInput.value;
            if (title.trim() !== '') {
                fetchMovieByTitle(title);
            }
        });
    }
});
});