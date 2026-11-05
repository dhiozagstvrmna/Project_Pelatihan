import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PendaftarRow from "../components/PendaftarRow";
import { FAKULTAS } from "../data/kampus";
import { usePendaftar } from "../context/PendaftarContext";
import useDocumentTitle from "../hooks/useDocumentTitle";
import type { StatusPendaftar } from "../types";

export default function PendaftarPage() {
  useDocumentTitle("Data Pendaftar");

  const { pendaftar, hapus, ubahStatus, kosongkan } = usePendaftar(); // useContext
  const [cari, setCari] = useState(""); // useState
  const [fakultas, setFakultas] = useState("");

  // useMemo: daftar tersaring hanya dihitung ulang kalau data, kata kunci, atau fakultas berubah
  const tersaring = useMemo(() => {
    const q = cari.trim().toLowerCase();
    return pendaftar.filter(
      (p) =>
        (!fakultas || p.fakultas === fakultas) &&
        (!q || p.namaLengkap.toLowerCase().includes(q) || p.noPendaftaran.toLowerCase().includes(q))
    );
  }, [pendaftar, cari, fakultas]);

  // useMemo: statistik ringkas
  const statistik = useMemo(() => {
    const hitung = (s: StatusPendaftar) => pendaftar.filter((p) => p.status === s).length;
    return { total: pendaftar.length, menunggu: hitung("Menunggu"), diterima: hitung("Diterima"), ditolak: hitung("Ditolak") };
  }, [pendaftar]);

  // useCallback: handler stabil agar PendaftarRow (memo) tidak dirender ulang tanpa perlu
  const handleHapus = useCallback(
    (id: string) => {
      if (window.confirm("Hapus data pendaftar ini?")) hapus(id);
    },
    [hapus]
  );
  const handleStatus = useCallback(
    (id: string, status: StatusPendaftar) => ubahStatus(id, status),
    [ubahStatus]
  );

  return (
    <>
      <h1>Data Pendaftar</h1>
      <p className="lead">Data dari formulir PMB tersimpan di browser (localStorage) dan dikelola dengan useReducer.</p>

      <div className="stats">
        <div className="stat"><b>{statistik.total}</b><span>Total</span></div>
        <div className="stat"><b>{statistik.menunggu}</b><span>Menunggu</span></div>
        <div className="stat"><b>{statistik.diterima}</b><span>Diterima</span></div>
        <div className="stat"><b>{statistik.ditolak}</b><span>Ditolak</span></div>
      </div>

      {pendaftar.length === 0 ? (
        <div className="card">
          <h3>Belum ada pendaftar</h3>
          <p>Isi formulir di halaman <Link to="/pmb"><u>PMB</u></Link> untuk menambahkan data.</p>
        </div>
      ) : (
        <>
          <div className="toolbar">
            <input
              placeholder="Cari nama atau nomor pendaftaran"
              value={cari}
              onChange={(e) => setCari(e.target.value)}
              aria-label="Cari pendaftar"
            />
            <select value={fakultas} onChange={(e) => setFakultas(e.target.value)} aria-label="Filter fakultas">
              <option value="">Semua fakultas</option>
              {FAKULTAS.map((f) => (
                <option key={f.nama} value={f.nama}>{f.nama}</option>
              ))}
            </select>
            <button className="btn" onClick={() => window.confirm("Hapus SEMUA data pendaftar?") && kosongkan()}>
              Kosongkan
            </button>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>No. Pendaftaran</th><th>Nama</th><th>Program studi</th><th>Jalur</th><th>Status</th><th></th></tr>
              </thead>
              <tbody>
                {tersaring.map((p) => (
                  <PendaftarRow key={p.id} data={p} onHapus={handleHapus} onStatus={handleStatus} />
                ))}
                {tersaring.length === 0 && (
                  <tr><td colSpan={6} className="empty">Tidak ada data yang cocok.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}
