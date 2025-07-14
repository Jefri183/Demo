// Variabel global untuk menyimpan data gambar sementara
let temporaryProfileImage = null;

//Set Value Awal localStorage

if (!localStorage.getItem('inputNewName')) {
  localStorage.setItem('inputNewName', 'Mohammmad Jefri Yusuf');
}

if (!localStorage.getItem('inputNewEmail')) {
  localStorage.setItem('inputNewEmail', 'jefri123@gmail.com');
}

if (!localStorage.getItem('inputNewPhone')) {
  localStorage.setItem('inputNewPhone', '123123123123');
}

if (!localStorage.getItem('profileImage')) {
  localStorage.setItem('profileImage', '../img/foto_profil.jpg');
}

// Function Ganti Foto Profil (preview saja)
function previewImage(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    temporaryProfileImage = e.target.result; // simpan sementara
    // Tampilkan pratinjau
    document.querySelectorAll('.prev-img-profil').forEach(img => {
      img.src = temporaryProfileImage;
    });
  };
  reader.readAsDataURL(file);
}

// Function Edit Profile (simpan semua perubahan)
function updateProfile(){
  const inputNewName = document.getElementById('new_name').value;
  const inputNewEmail = document.getElementById('new_email').value;
  const inputNewPhone = document.getElementById('new_phone').value;

  if (inputNewName) {
    localStorage.setItem('inputNewName', inputNewName);
    document.getElementById('name').innerHTML = `<b>${inputNewName}</b>`;
  }

  if (inputNewEmail) {
    localStorage.setItem('inputNewEmail', inputNewEmail);
    document.getElementById('email').innerHTML = `<b>${inputNewEmail}</b>`;
  }

  if (inputNewPhone) {
    localStorage.setItem('inputNewPhone', inputNewPhone);
    document.getElementById('phone').innerHTML = `<b>${inputNewPhone}</b>`;
  }

  if (temporaryProfileImage) {
    localStorage.setItem('profileImage', temporaryProfileImage);
    document.querySelectorAll('.img-profil').forEach(img => {
      img.src = temporaryProfileImage;
    });
  }

  toggleEditPopup();
}

// Saat halaman dimuat, ambil data dari localStorage dan tampilkan
window.addEventListener('DOMContentLoaded', function () {
  const savedName = localStorage.getItem('inputNewName');
  const savedEmail = localStorage.getItem('inputNewEmail');
  const savedPhone = localStorage.getItem('inputNewPhone');
  const savedImage = localStorage.getItem('profileImage');

  if (savedName) {
    document.getElementById('name').innerHTML = `<b>${savedName}</b>`;
    document.getElementById('new_name').value = savedName;
  }

  if (savedEmail) {
    document.getElementById('email').innerHTML = `<b>${savedEmail}</b>`;
    document.getElementById('new_email').value = savedEmail;
  }

  if (savedPhone) {
    document.getElementById('phone').innerHTML = `<b>${savedPhone}</b>`;
    document.getElementById('new_phone').value = savedPhone;
  }

  if (savedImage) {
    document.querySelectorAll('.img-profil').forEach(img => {
      img.src = savedImage;
    });
  }
});

// Function Pop up (Edit Profil)
function toggleEditPopup() {
  const popup = document.getElementById('editPopup');
  popup.classList.toggle('show');
  }

  //Cancel edit gambar
function cancelEdit() {
  const savedImage = localStorage.getItem('profileImage');
  if (savedImage) {
    document.querySelectorAll('.prev-img-profil').forEach(img => {
      img.src = savedImage;
    });
  }
  temporaryProfileImage = null; // Reset gambar sementara
  toggleEditPopup(); // Tutup popup
}

//Menampilkan Gambar dari LocalStorage
window.addEventListener('DOMContentLoaded', function () {
  const savedImage = localStorage.getItem('profileImage');
  if (savedImage) {
    document.querySelectorAll('.prev-img-profil').forEach(img => {
      img.src = savedImage;
    });
    document.querySelectorAll('.img-profil').forEach(img => {
      img.src = savedImage;
    });
    
  }
});

// Update Riwayat Tes

function loadRiwayatFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem("toefl_history")) || [];

    if (data.length === 0) return;

    const tableBody = document.querySelector(".riwayat-table tbody");
    tableBody.innerHTML = ""; // Kosongkan riwayat lama (opsional)

    // Tampilkan data dari yang terbaru ke lama
    data.slice().reverse().forEach(item => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${formatTanggal(item.completion_date)}</td>
            <td>${item.listening_converted}</td>
            <td>${item.structure_converted}</td>
            <td>${item.reading_converted}</td>
            <td>${item.total_toefl_score}</td>
        `;

        tableBody.appendChild(row);
    });

    // Update skor terakhir (data terbaru)
    document.querySelector(".last-skor").textContent = data[data.length - 1].total_toefl_score;
    document.querySelector(".highest-skor").textContent = Math.max(...data.map(item => item.total_toefl_score));

}

// Fungsi bantu format tanggal (contoh: 2025-06-14 jadi 14 Juni 2025)
function formatTanggal(dateStr) {
    const tanggal = new Date(dateStr);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return tanggal.toLocaleDateString('id-ID', options);
}

// Jalankan saat halaman selesai dimuat
document.addEventListener("DOMContentLoaded", loadRiwayatFromLocalStorage);