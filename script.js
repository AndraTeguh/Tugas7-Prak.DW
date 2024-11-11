class Buku {
  constructor(judul, penulis, tahun) {
    this.judul = judul;
    this.penulis = penulis;
    this.tahun = tahun;
  }

  tampilkanInfo() {
    return `${this.judul} oleh ${this.penulis} (${this.tahun})`;
  }
}

let daftarBuku = [];
let bukuFavorit = [];

const formTambahBuku = document.getElementById("form-tambah-buku");
const divDaftarBuku = document.getElementById("daftar-buku");
const divBukuFavorit = document.getElementById("buku-favorit");

formTambahBuku.addEventListener("submit", function (e) {
  e.preventDefault();
  tambahBuku();
});

function tambahBuku() {
  const judul = document.getElementById("judul").value;
  const penulis = document.getElementById("penulis").value;
  const tahun = document.getElementById("tahun").value;

  if (judul === "" || penulis === "" || tahun === "") {
    alert("Semua kolom harus diisi!");
    return;
  }

  const bukuBaru = new Buku(judul, penulis, tahun);
  daftarBuku.push(bukuBaru);
  simpanDaftarBuku();
  tampilkanDaftarBuku();
  formTambahBuku.reset();
}

function simpanDaftarBuku() {
  localStorage.setItem("daftarBuku", JSON.stringify(daftarBuku));
}

function tampilkanDaftarBuku() {
  divDaftarBuku.innerHTML = "";

  daftarBuku.forEach((buku, index) => {
    const divBuku = document.createElement("div");
    divBuku.classList.add("buku", "p-4", "border", "border-gray-600", "rounded-lg", "flex", "justify-between", "items-center", "hover:border-gray-400");
    divBuku.innerHTML = `
      <p class="text-gray-200">${buku.tampilkanInfo()}</p>
      <div>
        <button onclick="tambahKeFavorit(${index})" class="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-500">Tambah ke Favorit</button>
        <button onclick="hapusBuku(${index})" class="bg-red-600 text-white rounded px-4 py-2 hover:bg-red-500">Hapus</button>
      </div>
    `;
    divDaftarBuku.appendChild(divBuku);
  });
}

function tambahKeFavorit(index) {
  const buku = daftarBuku[index];

  const sudahAda = bukuFavorit.some((favBuku) => {
    return favBuku.judul === buku.judul && favBuku.penulis === buku.penulis && favBuku.tahun === buku.tahun;
  });

  if (sudahAda) {
    alert("Buku ini sudah ada di daftar favorit!");
    return;
  }

  bukuFavorit.push(buku);
  simpanBukuFavorit();
  tampilkanBukuFavorit();
}

function simpanBukuFavorit() {
  localStorage.setItem("bukuFavorit", JSON.stringify(bukuFavorit));
}

function tampilkanBukuFavorit() {
  divBukuFavorit.innerHTML = "";

  bukuFavorit.forEach((buku, index) => {
    const divBuku = document.createElement("div");
    divBuku.classList.add("buku", "p-4", "border", "border-gray-600", "rounded-lg", "flex", "justify-between", "items-center", "hover:border-gray-400");
    divBuku.innerHTML = `
      <p class="text-gray-200">${buku.tampilkanInfo()}</p>
            <button onclick="hapusDariFavorit(${index})" class="bg-red-600 text-white rounded px-4 py-2 hover:bg-red-500">Hapus</button>
    `;
    divBukuFavorit.appendChild(divBuku);
  });
}

function hapusDariFavorit(index) {
  bukuFavorit.splice(index, 1);
  simpanBukuFavorit();
  tampilkanBukuFavorit();
}

function hapusBuku(index) {
  daftarBuku.splice(index, 1);
  simpanDaftarBuku();
  tampilkanDaftarBuku();
}

window.onload = function () {
  if (localStorage.getItem("daftarBuku")) {
    const storedBooks = JSON.parse(localStorage.getItem("daftarBuku"));
    daftarBuku = storedBooks.map((book) => {
      return new Buku(book.judul, book.penulis, book.tahun);
    });
    tampilkanDaftarBuku();
  }

  if (localStorage.getItem("bukuFavorit")) {
    const storedFavorites = JSON.parse(localStorage.getItem("bukuFavorit"));
    bukuFavorit = storedFavorites.map((book) => {
      return new Buku(book.judul, book.penulis, book.tahun);
    });
    tampilkanBukuFavorit();
  }
};

const btnSimpanNama = document.getElementById("btnSimpanNama");
const inputNamaPengguna = document.getElementById("namaPengguna");
const salamPengguna = document.getElementById("salamPengguna");

// Event Listener untuk tombol Simpan Nama
btnSimpanNama.addEventListener("click", function () {
  const nama = inputNamaPengguna.value;

  // Validasi input
  if (nama.trim() === "") {
    alert("Silakan masukkan nama Anda!");
    return;
  }

  // Menampilkan salam pengguna
  salamPengguna.innerText = `Selamat datang, ${nama}!`;
  inputNamaPengguna.value = ""; // Mengosongkan input setelah disimpan
});
