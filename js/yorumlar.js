document.addEventListener('DOMContentLoaded', function () {
    const adSoyad = document.getElementById('adSoyad');
    const yorumMetni = document.getElementById('yorumMetni');
    const spoilerCheck = document.getElementById('spoilerCheck');
    const yorumGonder = document.getElementById('yorumGonder');
    const yorumTablosu = document.getElementById('yorumTablosu');
    const yorumKod = document.getElementById('yorumKod');
    const yorumSilHepsi = document.getElementById('yorumSilHepsi');
    const yonetimPaneli = document.getElementById('yonetimPaneli');
    const adminKullaniciAdi = document.getElementById('adminKullaniciAdi');
    const adminSifre = document.getElementById('adminSifre');
    const kodGir = document.getElementById('kodGir');

    let adminYetkili = false;

    // Load saved comments from localStorage on page load
    loadComments();

    // Yorumları localStorage'dan al ve yükle
    function loadComments() {
        const stored = localStorage.getItem("comments");
        if (stored) {
            const comments = JSON.parse(stored);
            comments.forEach(comment => appendCommentToTable(comment));
        }
    }

    function saveComment(comment) {
        let comments = JSON.parse(localStorage.getItem("comments")) || [];
        comments.push(comment);
        localStorage.setItem("comments", JSON.stringify(comments));
    }

    function appendCommentToTable(comment) {
        // Remove placeholder if it contains "henüz yorum yok"
        const placeholder = document.getElementById("yorumListesi");
        if (placeholder && placeholder.textContent.includes("henüz yorum yok")) {
            placeholder.remove();
        }
        const tbody = document.querySelector("#yorumTablosu tbody");
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${comment.adSoyad}</td>
            <td>${comment.isSpoiler ? `<span class="spoiler">${comment.yorumMetni}</span>` : comment.yorumMetni}</td>
            <td>${comment.isSpoiler ? "EVET" : "HAYIR"}</td>
            <td class="yonetim" style="display:none;">Sil</td>
        `;
        tbody.appendChild(newRow);
    }

    // Yorum gönderme fonksiyonu
    document.getElementById('yorumGonder').addEventListener('click', function(e) {
        e.preventDefault();
        
        const adSoyad = document.getElementById('adSoyad').value.trim();
        const yorumMetni = document.getElementById('yorumMetni').value.trim();
        const isSpoiler = document.getElementById('spoilerCheck').checked;
        
        if (!adSoyad || !yorumMetni) {
          alert("Lütfen tüm alanları doldurun");
          return;
        }
        
        const comment = { adSoyad, yorumMetni, isSpoiler };
        appendCommentToTable(comment);
        saveComment(comment);
        
        // Optionally, reset form fields
        document.getElementById('adSoyad').value = "";
        document.getElementById('yorumMetni').value = "";
        document.getElementById('spoilerCheck').checked = false;
    });

    // Yönetici Giriş Yapma
    kodGir.addEventListener('click', function () {
        const kullaniciAdi = adminKullaniciAdi.value.trim();
        const sifre = adminSifre.value.trim();

        // Yönetici bilgileri
        if (kullaniciAdi === 'admin' && sifre === 'admin123') {
            adminYetkili = true;
            yonetimPaneli.style.display = 'block';  // Yönetim panelini göster
            loadComments();  // Yorumları yükle
        } else {
            alert('Yanlış kullanıcı adı veya şifre!');
        }
    });

    // Hepsini silme
    yorumSilHepsi.addEventListener('click', function () {
        if (confirm('Tüm yorumları silmek istediğinizden emin misiniz?')) {
            localStorage.removeItem('comments');  // Yorumları kaldır
            loadComments();  // Yorumları tekrar yükle
        }
    });

    // İlk olarak yorumları yükle
    loadComments();
});

// Toggle spoiler blur on click
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('spoiler')) {
        e.target.classList.toggle('unblur');
    }
});
