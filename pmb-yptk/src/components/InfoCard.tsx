import type { ReactNode } from "react";

// React Props: data dikirim dari komponen induk lewat atribut
interface InfoCardProps {
  ikon?: string;
  judul: string;
  children: ReactNode;
}

export default function InfoCard({ ikon, judul, children }: InfoCardProps) {
  return (
    <article className="card">
      {/* React Conditional: ikon hanya tampil jika dikirim */}
      {ikon && <div className="card__icon">{ikon}</div>}
      <h3>{judul}</h3>
      <p>{children}</p>
    </article>
  );
}
