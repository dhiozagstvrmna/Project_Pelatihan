# PMB Universitas Putra Indonesia "YPTK" Padang (latihan React + TypeScript)

Halaman: Home, About, PMB (formulir pendaftaran), Contact.

## Menjalankan
```bash
npm install
npm run dev
```
Buka alamat yang tampil di terminal, buka halaman **PMB**, isi formulir, kirim, lalu buka console browser (F12) untuk melihat hasil `console.log`.

## Pemetaan materi
| Materi | Contoh di kode |
|---|---|
| Component | `Navbar`, `Footer`, `Layout`, `InfoCard`, `FormField`, halaman di `pages/` |
| Props | `InfoCard` (`ikon`, `judul`, `children`), `FormField` (`label`, `name`, `error`) |
| Event | `onClick` di Navbar dan About, `onChange` di semua input |
| Conditional | ringkasan sukses, pesan error, ikon kartu, prodi muncul setelah fakultas dipilih |
| List | `MENU.map`, `FAKULTAS.map`, `<option>` dari array dengan `key` |
| Form | state tunggal `PmbFormData`, satu `handleChange` untuk semua input |
| Form Submit | `handleSubmit` dengan `preventDefault`, validasi, lalu `console.log` |

Data fakultas dan program studi adalah contoh; sesuaikan di `src/data/kampus.ts`.

## Materi React Hooks (lanjutan)
| Hook | Dipakai di |
|---|---|
| `useState` | semua form, filter di `Pendaftar.tsx`, contoh di `Hooks.tsx` |
| `useEffect` | `ThemeContext` (ubah tema dan simpan), `PendaftarContext` (simpan ke localStorage), `useDocumentTitle`, fokus form di `PMB.tsx`, timer dan event listener di `Hooks.tsx` |
| `useContext` | `ThemeContext` (tema terang/gelap) dan `PendaftarContext` (data pendaftar dipakai di halaman PMB dan Pendaftar) |
| `useRef` | fokus kolom pertama dan kolom yang error di `PMB.tsx`, contoh di `Hooks.tsx` |
| `useReducer` | `PendaftarContext` (aksi TAMBAH, HAPUS, UBAH_STATUS, KOSONGKAN) |
| `useCallback` | handler stabil di `Pendaftar.tsx` dan context, contoh perbandingan di `Hooks.tsx` |
| `useMemo` | filter dan statistik di `Pendaftar.tsx`, nilai context, `hitungBerat` di `Hooks.tsx` |

Alurnya: isi form di **PMB**, data masuk ke `PendaftarContext`, lalu tampil di halaman **Pendaftar**.
