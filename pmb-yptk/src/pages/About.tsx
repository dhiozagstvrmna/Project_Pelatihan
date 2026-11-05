import { useState } from "react";
import useDocumentTitle from "../hooks/useDocumentTitle";
import InfoCard from "../components/InfoCard";
import { FAKULTAS } from "../data/kampus";

export default function About() {
  useDocumentTitle("Tentang Kampus");
  // React Event + Conditional: tampilkan daftar prodi saat tombol diklik
  const [tampilProdi, setTampilProdi] = useState(false);
  const semuaProdi = FAKULTAS.flatMap((f) => f.prodi.map((p) => ({ prodi: p, fakultas: f.nama })));

  return (
    <>
      <section>
        <h1>Tentang Kampus</h1>
        <p className="lead">
          Universitas Putra Indonesia "YPTK" Padang adalah perguruan tinggi swasta di Kota Padang, Sumatera Barat,
          yang berada di bawah Yayasan Perguruan Tinggi Komputer (YPTK) dan berlokasi di kawasan Lubuk Begalung.
        </p>
      </section>

      <section>
        <h2>Fakultas</h2>
        <div className="grid">
          {FAKULTAS.map((f) => (
            <InfoCard key={f.nama} judul={f.nama}>
              {f.deskripsi}
            </InfoCard>
          ))}
        </div>
      </section>

      <section>
        <button className="btn" onClick={() => setTampilProdi(!tampilProdi)}>
          {tampilProdi ? "Sembunyikan program studi" : "Lihat semua program studi"}
        </button>

        {tampilProdi && (
          <ul className="list">
            {semuaProdi.map((item) => (
              <li key={item.prodi}>
                <strong>{item.prodi}</strong>
                <span> – {item.fakultas}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
