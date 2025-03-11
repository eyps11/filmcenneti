document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registerForm');
    
    form.addEventListener('submit', function (event) {
        event.preventDefault();  // Formun sayfa yenilemesini engelle

        const ad = document.getElementById('ad').value;
        const soyad = document.getElementById('soyad').value;
        const kullaniciAdi = document.getElementById('kullaniciAdi').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const tc = document.getElementById('tc').value;
        const adres = document.getElementById('adres').value;

        // Şifre kontrolü
        if (password !== confirmPassword) {
            alert('Şifreler eşleşmiyor!');
            return;
        }

        // Yeni kullanıcı verisini oluştur
        const yeniKullanici = {
            ad: ad,
            soyad: soyad,
            kullaniciAdi: kullaniciAdi,
            email: email,
            password: password,
            tc: tc,
            adres: adres,
            role: 'user'  // Başlangıçta kullanıcı rolü 'user' olarak atanır
        };

        // Kullanıcıları localStorage'tan al
        let kullanicilar = JSON.parse(localStorage.getItem('kullanicilar')) || [];
        
        // Yeni kullanıcıyı ekle
        kullanicilar.push(yeniKullanici);

        // Kullanıcıları localStorage'a kaydet
        localStorage.setItem('kullanicilar', JSON.stringify(kullanicilar));

        // Kullanıcıyı bilgilendir ve formu sıfırla
        alert('Kayıt başarılı! Giriş yapabilirsiniz.');

        // Formu sıfırla
        form.reset();

        // Kullanıcıyı giriş sayfasına yönlendir
        window.location.href = 'gir.html';
    });
});