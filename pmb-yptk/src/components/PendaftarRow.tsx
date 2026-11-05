import { memo } from "react";
import type { Pendaftar, StatusPendaftar } from "../types";

interface Props {
  data: Pendaftar;
  onHapus: (id: string) => void;
  onStatus: (id: string, status: StatusPendaftar) => void;
}

const STATUS: StatusPendaftar[] = ["Menunggu", "Diterima", "Ditolak"];

// memo: baris hanya dirender ulang kalau props-nya berubah.
// Itu bekerja karena onHapus dan onStatus dibuat dengan useCallback di induknya.
function PendaftarRow({ data, onHapus, onStatus }: Props) {
  return (
    <tr>
      <td>{data.noPendaftaran}</td>
      <td>
        <strong>{data.namaLengkap}</strong>
        <small className="muted-block">{data.email}</small>
      </td>
      <td>
        {data.prodiPilihan1}
        <small className="muted-block">{data.fakultas}</small>
      </td>
      <td>{data.jalur}</td>
      <td>
        <select
          className={`status status--${data.status.toLowerCase()}`}
          value={data.status}
          onChange={(e) => onStatus(data.id, e.target.value as StatusPendaftar)}
          aria-label={`Status ${data.namaLengkap}`}
        >
          {STATUS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </td>
      <td>
        <button className="btn btn--small" onClick={() => onHapus(data.id)}>Hapus</button>
      </td>
    </tr>
  );
}

export default memo(PendaftarRow);
