import { Link } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";
import InfoCard from "../components/InfoCard";
import { FAKULTAS, KEUNGGULAN, TAHUN_AKADEMIK } from "../data/kampus";

export default function Home() {
  useDocumentTitle("Beranda");
  return (
    <>
      <section className="hero">
        <p className="badge">PMB Tahun Akademik {TAHUN_AKADEMIK}</p>
        <h1>Penerimaan Mahasiswa Baru Universitas Putra Indonesia "YPTK" Padang</h1>
        <p className="lead">
          Wujudkan masa depan di bidang teknologi, bisnis, pendidikan, dan psikologi. Daftar sekarang melalui
          formulir online.
        </p>
        <div className="actions">
          <Link to="/pmb" className="btn btn--primary">Daftar Sekarang</Link>
          <Link to="/about" className="btn">Tentang Kampus</Link>
        </div>
      </section>

      <section>
        <h2>Mengapa memilih kami</h2>
        <div className="grid">
          {/* React List + Props */}
          {KEUNGGULAN.map((k) => (
            <InfoCard key={k.judul} ikon={k.ikon} judul={k.judul}>
              {k.isi}
            </InfoCard>
          ))}
        </div>
      </section>

      <section>
        <h2>Fakultas dan program studi</h2>
        <div className="grid">
          {FAKULTAS.map((f) => (
            <InfoCard key={f.nama} judul={f.nama}>
              {f.prodi.join(", ")}
            </InfoCard>
          ))}
        </div>
      </section>
    </>
  );
}
