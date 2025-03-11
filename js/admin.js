document.addEventListener('DOMContentLoaded', function () {
    const kullanicilar = JSON.parse(localStorage.getItem('kullanicilar')) || [];
    const userTable = document.getElementById('userTable').getElementsByTagName('tbody')[0];

    kullanicilar.forEach((user, index) => {
        const row = userTable.insertRow();
        row.innerHTML = `
            <td>${user.kullaniciAdi}</td>
            <td>${user.role}</td>
            <td>
                <select onchange="changeRole(${index}, this)">
                    <option value="user" ${user.role === 'user' ? 'selected' : ''}>Normal Kullanıcı</option>
                    <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Admin</option>
                </select>
            </td>
        `;
    });
});

// Rol değişikliği yapmak için kullanılan fonksiyon
function changeRole(index, selectElement) {
    const kullanicilar = JSON.parse(localStorage.getItem('kullanicilar')) || [];
    kullanicilar[index].role = selectElement.value;  // Kullanıcının rolünü güncelle
    localStorage.setItem('kullanicilar', JSON.stringify(kullanicilar));  // Güncellenen veriyi localStorage'a kaydet
}

// Sayfa yüklendiğinde kullanıcıları al ve tabloya ekle
document.addEventListener('DOMContentLoaded', function() {
    const kullanicilar = JSON.parse(localStorage.getItem('kullanicilar')) || [];
    const userTableBody = document.getElementById('userTableBody');

    // Kullanıcıları tabloya ekleyin
    kullanicilar.forEach((kullanici, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <th scope="row">${index + 1}</th>
            <td>${kullanici.ad}</td>
            <td>${kullanici.soyad}</td>
            <td>${kullanici.kullaniciAdi}</td>
            <td>${kullanici.email}</td>
            <td>${kullanici.tc}</td>
            <td>${kullanici.adres}</td>
            <td>
                <select onchange="changeRole(${index}, this)">
                    <option value="user" ${kullanici.role === 'user' ? 'selected' : ''}>Kullanıcı</option>
                    <option value="admin" ${kullanici.role === 'admin' ? 'selected' : ''}>Admin</option>
                </select>
            </td>
        `;
        userTableBody.appendChild(tr);  // Satırı tabloya ekle
    });
});

// Verileri sıfırlama fonksiyonu
function clearData() {
    if (confirm("Tüm kullanıcı verilerini silmek istediğinizden emin misiniz?")) {
        localStorage.removeItem('kullanicilar');
        alert("Veriler sıfırlandı.");
        location.reload();  // Sayfayı yeniden yükleyerek verileri sıfırlıyoruz
    }
}
