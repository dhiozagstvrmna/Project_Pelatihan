import { KONTAK } from "../data/kampus";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>
          <strong>Universitas Putra Indonesia "YPTK" Padang</strong>
        </p>
        <p>{KONTAK.alamat}</p>
        <p>© {new Date().getFullYear()} Latihan React. Proyek belajar, bukan situs resmi kampus.</p>
      </div>
    </footer>
  );
}
