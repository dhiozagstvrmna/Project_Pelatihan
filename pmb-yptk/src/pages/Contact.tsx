import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import FormField from "../components/FormField";
import useDocumentTitle from "../hooks/useDocumentTitle";
import InfoCard from "../components/InfoCard";
import { KONTAK } from "../data/kampus";
import type { FormErrors } from "../types";

interface PesanForm {
  nama: string;
  email: string;
  pesan: string;
}

const AWAL: PesanForm = { nama: "", email: "", pesan: "" };

export default function Contact() {
  useDocumentTitle("Kontak");
  const [form, setForm] = useState<PesanForm>(AWAL);
  const [errors, setErrors] = useState<FormErrors<PesanForm>>({});
  const [terkirim, setTerkirim] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setTerkirim(false);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // cegah halaman reload

    const baru: FormErrors<PesanForm> = {};
    if (!form.nama.trim()) baru.nama = "Nama wajib diisi.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) baru.email = "Format email tidak valid.";
    if (form.pesan.trim().length < 10) baru.pesan = "Pesan minimal 10 karakter.";
    setErrors(baru);
    if (Object.keys(baru).length > 0) return;

    console.log("Pesan kontak:", form);
    setTerkirim(true);
    setForm(AWAL);
  }

  return (
    <>
      <h1>Hubungi Kami</h1>
      <div className="grid grid--2">
        <div>
          <InfoCard ikon="📍" judul="Alamat">{KONTAK.alamat}</InfoCard>
          <InfoCard ikon="📞" judul="Telepon">{KONTAK.telepon}</InfoCard>
          <InfoCard ikon="✉️" judul="Email">{KONTAK.email}</InfoCard>
        </div>

        <form className="form" onSubmit={handleSubmit} noValidate>
          {terkirim && <div className="alert alert--success">Pesan terkirim. Hasilnya ada di console.</div>}

          <FormField label="Nama" name="nama" error={errors.nama}>
            <input id="nama" name="nama" value={form.nama} onChange={handleChange} />
          </FormField>
          <FormField label="Email" name="email" error={errors.email}>
            <input id="email" name="email" type="email" value={form.email} onChange={handleChange} />
          </FormField>
          <FormField label="Pesan" name="pesan" error={errors.pesan}>
            <textarea id="pesan" name="pesan" rows={5} value={form.pesan} onChange={handleChange} />
          </FormField>

          <button type="submit" className="btn btn--primary">Kirim pesan</button>
        </form>
      </div>
    </>
  );
}
