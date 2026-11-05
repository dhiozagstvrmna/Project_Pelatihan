import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import FormField from "../components/FormField";
import { FAKULTAS, JALUR_PENDAFTARAN, TAHUN_AKADEMIK } from "../data/kampus";
import { usePendaftar } from "../context/PendaftarContext";
import useDocumentTitle from "../hooks/useDocumentTitle";
import type { FormErrors, PmbFormData } from "../types";

const DATA_AWAL: PmbFormData = {
  namaLengkap: "",
  email: "",
  noHp: "",
  tanggalLahir: "",
  jenisKelamin: "",
  asalSekolah: "",
  tahunLulus: "",
  alamat: "",
  jalur: "",
  fakultas: "",
  prodiPilihan1: "",
  prodiPilihan2: "",
  setuju: false,
};

type Errors = FormErrors<PmbFormData>;

function validasi(d: PmbFormData): Errors {
  const e: Errors = {};
  const tahunIni = new Date().getFullYear();

  if (d.namaLengkap.trim().length < 3) e.namaLengkap = "Nama lengkap minimal 3 karakter.";
  if (!/^\S+@\S+\.\S+$/.test(d.email)) e.email = "Format email tidak valid.";
  if (!/^(\+62|62|0)8[0-9]{8,12}$/.test(d.noHp)) e.noHp = "Nomor HP tidak valid (contoh: 0821xxxxxxxx).";
  if (!d.tanggalLahir) e.tanggalLahir = "Tanggal lahir wajib diisi.";
  if (!d.jenisKelamin) e.jenisKelamin = "Pilih jenis kelamin.";
  if (d.asalSekolah.trim().length < 3) e.asalSekolah = "Asal sekolah wajib diisi.";
  const th = Number(d.tahunLulus);
  if (!th || th < 2000 || th > tahunIni + 1) e.tahunLulus = "Tahun lulus tidak valid.";
  if (d.alamat.trim().length < 10) e.alamat = "Alamat minimal 10 karakter.";
  if (!d.jalur) e.jalur = "Pilih jalur pendaftaran.";
  if (!d.fakultas) e.fakultas = "Pilih fakultas.";
  if (!d.prodiPilihan1) e.prodiPilihan1 = "Pilih program studi pilihan 1.";
  if (d.prodiPilihan2 && d.prodiPilihan2 === d.prodiPilihan1) e.prodiPilihan2 = "Pilihan 2 tidak boleh sama dengan pilihan 1.";
  if (!d.setuju) e.setuju = "Anda harus menyetujui pernyataan.";
  return e;
}

export default function PMB() {
  useDocumentTitle("Pendaftaran PMB");
  const { tambah } = usePendaftar(); // useContext: simpan hasil submit ke data pendaftar
  const formRef = useRef<HTMLFormElement>(null); // useRef: akses elemen form

  // useEffect: fokus ke kolom pertama saat halaman dibuka
  useEffect(() => {
    formRef.current?.querySelector<HTMLInputElement>("input")?.focus();
  }, []);

  const [form, setForm] = useState<PmbFormData>(DATA_AWAL);
  const [errors, setErrors] = useState<Errors>({});
  const [hasil, setHasil] = useState<(PmbFormData & { noPendaftaran: string }) | null>(null);

  // Daftar prodi mengikuti fakultas yang dipilih (React Conditional + List)
  const prodiTersedia = FAKULTAS.find((f) => f.nama === form.fakultas)?.prodi ?? [];

  // Satu handler untuk semua input (React Form + Event)
  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target;
    const nilai = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setForm((prev) => {
      const berikutnya = { ...prev, [name]: nilai } as PmbFormData;
      // Ganti fakultas -> pilihan prodi direset
      if (name === "fakultas") {
        berikutnya.prodiPilihan1 = "";
        berikutnya.prodiPilihan2 = "";
      }
      return berikutnya;
    });
    // Hapus pesan error field yang sedang diubah
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  // React Form Submit
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const hasilValidasi = validasi(form);
    setErrors(hasilValidasi);
    if (Object.keys(hasilValidasi).length > 0) {
      console.warn("Form belum valid:", hasilValidasi);
      // useRef: fokuskan kolom pertama yang bermasalah
      const pertama = Object.keys(hasilValidasi)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${pertama}"]`)?.focus();
      return;
    }

    const payload = {
      noPendaftaran: `PMB-${TAHUN_AKADEMIK.slice(0, 4)}-${Math.floor(1000 + Math.random() * 9000)}`,
      ...form,
    };

    // Hasil submit ditampilkan di console
    console.log("Data pendaftaran PMB:", payload);
    console.table(payload);

    tambah({
      ...payload,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      status: "Menunggu",
      tanggalDaftar: new Date().toISOString(),
    });
    setHasil(payload);
    setForm(DATA_AWAL);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleReset() {
    setForm(DATA_AWAL);
    setErrors({});
  }

  return (
    <>
      <h1>Formulir Pendaftaran Mahasiswa Baru</h1>
      <p className="lead">
        Tahun akademik {TAHUN_AKADEMIK}. Isi data dengan benar, lalu buka console browser (F12) untuk melihat hasil submit.
      </p>

      {/* React Conditional: ringkasan hanya tampil setelah submit berhasil */}
      {hasil && (
        <div className="alert alert--success">
          <strong>Pendaftaran berhasil dikirim.</strong>
          <p>
            Nomor pendaftaran: <b>{hasil.noPendaftaran}</b> atas nama {hasil.namaLengkap}, pilihan 1: {hasil.prodiPilihan1}.
          </p>
          <button className="btn" onClick={() => setHasil(null)}>Tutup</button>
        </div>
      )}

      <form ref={formRef} className="form" onSubmit={handleSubmit} noValidate>
        <fieldset>
          <legend>Data pribadi</legend>

          <FormField label="Nama lengkap" name="namaLengkap" error={errors.namaLengkap}>
            <input id="namaLengkap" name="namaLengkap" value={form.namaLengkap} onChange={handleChange} />
          </FormField>

          <div className="row">
            <FormField label="Email" name="email" error={errors.email}>
              <input id="email" name="email" type="email" value={form.email} onChange={handleChange} />
            </FormField>
            <FormField label="Nomor HP" name="noHp" error={errors.noHp}>
              <input id="noHp" name="noHp" inputMode="tel" value={form.noHp} onChange={handleChange} />
            </FormField>
          </div>

          <div className="row">
            <FormField label="Tanggal lahir" name="tanggalLahir" error={errors.tanggalLahir}>
              <input id="tanggalLahir" name="tanggalLahir" type="date" value={form.tanggalLahir} onChange={handleChange} />
            </FormField>
            <FormField label="Jenis kelamin" name="jenisKelamin" error={errors.jenisKelamin}>
              <div className="radios">
                {(["Laki-laki", "Perempuan"] as const).map((jk) => (
                  <label key={jk} className="radio">
                    <input type="radio" name="jenisKelamin" value={jk} checked={form.jenisKelamin === jk} onChange={handleChange} />
                    {jk}
                  </label>
                ))}
              </div>
            </FormField>
          </div>

          <FormField label="Alamat" name="alamat" error={errors.alamat}>
            <textarea id="alamat" name="alamat" rows={3} value={form.alamat} onChange={handleChange} />
          </FormField>
        </fieldset>

        <fieldset>
          <legend>Pendidikan sebelumnya</legend>
          <div className="row">
            <FormField label="Asal sekolah" name="asalSekolah" error={errors.asalSekolah}>
              <input id="asalSekolah" name="asalSekolah" value={form.asalSekolah} onChange={handleChange} />
            </FormField>
            <FormField label="Tahun lulus" name="tahunLulus" error={errors.tahunLulus}>
              <input id="tahunLulus" name="tahunLulus" type="number" value={form.tahunLulus} onChange={handleChange} />
            </FormField>
          </div>
        </fieldset>

        <fieldset>
          <legend>Pilihan program studi</legend>

          <FormField label="Jalur pendaftaran" name="jalur" error={errors.jalur}>
            <select id="jalur" name="jalur" value={form.jalur} onChange={handleChange}>
              <option value="">-- Pilih jalur --</option>
              {JALUR_PENDAFTARAN.map((j) => (
                <option key={j} value={j}>{j}</option>
              ))}
            </select>
          </FormField>

          <FormField label="Fakultas" name="fakultas" error={errors.fakultas}>
            <select id="fakultas" name="fakultas" value={form.fakultas} onChange={handleChange}>
              <option value="">-- Pilih fakultas --</option>
              {FAKULTAS.map((f) => (
                <option key={f.nama} value={f.nama}>{f.nama}</option>
              ))}
            </select>
          </FormField>

          {/* Muncul setelah fakultas dipilih */}
          {form.fakultas && (
            <div className="row">
              <FormField label="Program studi pilihan 1" name="prodiPilihan1" error={errors.prodiPilihan1}>
                <select id="prodiPilihan1" name="prodiPilihan1" value={form.prodiPilihan1} onChange={handleChange}>
                  <option value="">-- Pilih program studi --</option>
                  {prodiTersedia.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </FormField>

              {prodiTersedia.length > 1 && (
                <FormField label="Program studi pilihan 2 (opsional)" name="prodiPilihan2" error={errors.prodiPilihan2}>
                  <select id="prodiPilihan2" name="prodiPilihan2" value={form.prodiPilihan2} onChange={handleChange}>
                    <option value="">-- Tidak ada --</option>
                    {prodiTersedia.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </FormField>
              )}
            </div>
          )}
        </fieldset>

        <div className={errors.setuju ? "field field--error" : "field"}>
          <label className="checkbox">
            <input type="checkbox" name="setuju" checked={form.setuju} onChange={handleChange} />
            Saya menyatakan data yang diisi sudah benar.
          </label>
          {errors.setuju && <small className="error">{errors.setuju}</small>}
        </div>

        <div className="actions">
          <button type="submit" className="btn btn--primary">Kirim pendaftaran</button>
          <button type="button" className="btn" onClick={handleReset}>Reset</button>
        </div>
      </form>
    </>
  );
}
