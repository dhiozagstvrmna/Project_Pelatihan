export type JenisKelamin = "Laki-laki" | "Perempuan" | "";

export interface PmbFormData {
  namaLengkap: string;
  email: string;
  noHp: string;
  tanggalLahir: string;
  jenisKelamin: JenisKelamin;
  asalSekolah: string;
  tahunLulus: string;
  alamat: string;
  jalur: string;
  fakultas: string;
  prodiPilihan1: string;
  prodiPilihan2: string;
  setuju: boolean;
}

export type StatusPendaftar = "Menunggu" | "Diterima" | "Ditolak";

export interface Pendaftar extends PmbFormData {
  id: string;
  noPendaftaran: string;
  status: StatusPendaftar;
  tanggalDaftar: string;
}

export type FormErrors<T> = Partial<Record<keyof T, string>>;

export interface Fakultas {
  nama: string;
  deskripsi: string;
  prodi: string[];
}
