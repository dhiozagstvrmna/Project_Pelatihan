import type { Fakultas } from "../types";

export const TAHUN_AKADEMIK = "2027/2028";

// Menu navigasi (dipakai untuk React List di Navbar)
export const MENU = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/pmb", label: "PMB" },
  { to: "/pendaftar", label: "Pendaftar" },
  { to: "/hooks", label: "Hooks" },
  { to: "/contact", label: "Contact" },
];

// Contoh data fakultas dan program studi. Sesuaikan dengan data resmi di situs kampus.
export const FAKULTAS: Fakultas[] = [
  {
    nama: "Fakultas Ilmu Komputer",
    deskripsi: "Teknologi informasi, pengembangan sistem, dan pengolahan data.",
    prodi: ["Teknik Informatika", "Sistem Informasi", "Teknologi Informasi"],
  },
  {
    nama: "Fakultas Ekonomi dan Bisnis",
    deskripsi: "Manajemen, akuntansi, dan kewirausahaan.",
    prodi: ["Manajemen", "Akuntansi"],
  },
  {
    nama: "Fakultas Keguruan dan Ilmu Pendidikan",
    deskripsi: "Pendidikan berbasis teknologi informasi dan komputer.",
    prodi: ["Pendidikan Teknik Informatika dan Komputer"],
  },
  {
    nama: "Fakultas Psikologi",
    deskripsi: "Ilmu perilaku dan kesehatan mental.",
    prodi: ["Psikologi"],
  },
];

export const JALUR_PENDAFTARAN = ["Reguler", "Prestasi", "Pindahan"];

export const KEUNGGULAN = [
  { ikon: "💻", judul: "Berbasis Teknologi", isi: "Kampus komputer dengan fokus pada TI sejak awal berdirinya." },
  { ikon: "🎓", judul: "Beragam Program Studi", isi: "Pilihan program studi di beberapa fakultas." },
  { ikon: "🤝", judul: "Kegiatan Mahasiswa", isi: "Banyak organisasi dan UKM untuk mengembangkan diri." },
];

export const KONTAK = {
  alamat: "Jl. Raya Lubuk Begalung, Padang, Sumatera Barat",
  telepon: "(0751) 776666",
  email: "info@upiyptk.ac.id",
};
