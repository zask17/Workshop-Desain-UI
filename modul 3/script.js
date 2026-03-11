document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('mahasiswaForm');
    const displayArea = document.getElementById('displayArea');

    // Submit pada form
    form.addEventListener('submit', function(e) {
        // Cegah refresh halaman otomatis
        e.preventDefault();

        // Ambil nilai dari input fields
        const nama = document.getElementById('nama').value;
        const nim = document.getElementById('nim').value;

        // Menampilkan data
        document.getElementById('resNama').innerHTML = "<strong>Nama:</strong> " + nama;
        document.getElementById('resNim').innerHTML = "<strong>NIM:</strong> " + nim;

        // Menghilangkan class 'hidden' untuk menampilkan hasil
        displayArea.classList.remove('hidden');

        // Memberikan konfirmasi di konsol (Opsional)
        console.log('Data berhasil diterima!');
    });
});