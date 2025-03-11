document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('loginForm');
    
    form.addEventListener('submit', function (event) {
        event.preventDefault();  // Formun sayfa yenilemesini engelle

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Admin kullanıcı adı ve şifresi
        const adminUsername = 'admin';
        const adminPassword = 'admin123';

        // Kullanıcıyı kontrol et
        if (username === adminUsername && password === adminPassword) {
            // Başarılı giriş
            alert('Admin giriş başarılı!');
            // Admin sayfasına yönlendirme (örn: adminPanel.html)
            window.location.href = 'admin.html';  // Yönlendirme yapılacak sayfa adı
        } else {
            // Başarısız giriş
            document.getElementById('errorMessage').innerText = 'Kullanıcı adı veya şifre yanlış!';
        }
    });
});
