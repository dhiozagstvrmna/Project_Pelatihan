import { memo, useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useTheme } from "../context/ThemeContext";
import useDocumentTitle from "../hooks/useDocumentTitle";

function Kartu({ hook, judul, children }: { hook: string; judul: string; children: ReactNode }) {
  return (
    <section className="card demo">
      <span className="badge badge--small">{hook}</span>
      <h3>{judul}</h3>
      {children}
    </section>
  );
}

/* 1. useState: menyimpan data yang mengubah tampilan saat berubah */
function DemoState() {
  const [angka, setAngka] = useState(0);
  const [nama, setNama] = useState("");
  return (
    <Kartu hook="useState" judul="Counter dan input">
      <p className="big">{angka}</p>
      <div className="actions">
        <button className="btn" onClick={() => setAngka((a) => a - 1)}>-1</button>
        <button className="btn" onClick={() => setAngka((a) => a + 1)}>+1</button>
        <button className="btn" onClick={() => setAngka(0)}>Reset</button>
      </div>
      <input placeholder="Ketik namamu" value={nama} onChange={(e) => setNama(e.target.value)} />
      {nama && <p>Halo, {nama}!</p>}
    </Kartu>
  );
}

/* 2. useEffect: efek samping + cleanup (timer dan event listener) */
function DemoEffect() {
  const [detik, setDetik] = useState(0);
  const [jalan, setJalan] = useState(false);
  const [lebar, setLebar] = useState(window.innerWidth);

  useEffect(() => {
    if (!jalan) return;
    const id = setInterval(() => setDetik((d) => d + 1), 1000);
    return () => clearInterval(id); // cleanup: dijalankan saat jalan berubah atau komponen hilang
  }, [jalan]);

  useEffect(() => {
    const onResize = () => setLebar(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []); // [] = hanya sekali saat komponen muncul

  return (
    <Kartu hook="useEffect" judul="Timer dan lebar layar">
      <p className="big">{detik} detik</p>
      <div className="actions">
        <button className="btn" onClick={() => setJalan((j) => !j)}>{jalan ? "Jeda" : "Mulai"}</button>
        <button className="btn" onClick={() => setDetik(0)}>Reset</button>
      </div>
      <p>Lebar jendela: <b>{lebar}px</b> (ubah ukuran jendela untuk mencoba)</p>
    </Kartu>
  );
}

/* 3. useContext: membaca data global tanpa props */
function DemoContext() {
  const { theme, toggleTheme } = useTheme();
  return (
    <Kartu hook="useContext" judul="Tema dari ThemeContext">
      <p>Tema saat ini: <b>{theme}</b></p>
      <button className="btn" onClick={toggleTheme}>Ganti tema</button>
      <p className="hint">Komponen ini tidak menerima props, datanya langsung dari context.</p>
    </Kartu>
  );
}

/* 4. useRef: akses elemen DOM dan menyimpan nilai tanpa memicu render ulang */
function DemoRef() {
  const inputRef = useRef<HTMLInputElement>(null);
  const klikRef = useRef(0);
  const [tampil, setTampil] = useState(0);

  return (
    <Kartu hook="useRef" judul="Fokus input dan penghitung">
      <input ref={inputRef} placeholder="Klik tombol untuk memfokuskan saya" />
      <div className="actions">
        <button className="btn" onClick={() => inputRef.current?.focus()}>Fokuskan input</button>
        <button
          className="btn"
          onClick={() => {
            klikRef.current += 1; // berubah, tapi tidak ada render ulang
            console.log("klikRef =", klikRef.current);
          }}
        >
          Tambah ref
        </button>
        <button className="btn" onClick={() => setTampil(klikRef.current)}>Tampilkan</button>
      </div>
      <p>Nilai ref yang ditampilkan: <b>{tampil}</b> (cek console saat menekan "Tambah ref")</p>
    </Kartu>
  );
}

/* 5. useReducer: state dengan banyak aksi */
interface CounterState { nilai: number; langkah: number }
type CounterAction = { type: "tambah" } | { type: "kurang" } | { type: "reset" } | { type: "langkah"; nilai: number };

function counterReducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case "tambah": return { ...state, nilai: state.nilai + state.langkah };
    case "kurang": return { ...state, nilai: state.nilai - state.langkah };
    case "langkah": return { ...state, langkah: action.nilai };
    case "reset": return { nilai: 0, langkah: 1 };
  }
}

function DemoReducer() {
  const [state, dispatch] = useReducer(counterReducer, { nilai: 0, langkah: 1 });
  return (
    <Kartu hook="useReducer" judul="Counter dengan langkah">
      <p className="big">{state.nilai}</p>
      <div className="actions">
        <button className="btn" onClick={() => dispatch({ type: "kurang" })}>-{state.langkah}</button>
        <button className="btn" onClick={() => dispatch({ type: "tambah" })}>+{state.langkah}</button>
        <button className="btn" onClick={() => dispatch({ type: "reset" })}>Reset</button>
      </div>
      <label>
        Langkah:{" "}
        <select value={state.langkah} onChange={(e) => dispatch({ type: "langkah", nilai: Number(e.target.value) })}>
          {[1, 5, 10].map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
      </label>
    </Kartu>
  );
}

/* 6 dan 7. useCallback + useMemo (bersama React.memo) */
const Anak = memo(function Anak({ onKlik, label }: { onKlik: () => void; label: string }) {
  console.log("Komponen Anak dirender:", label);
  return <button className="btn" onClick={onKlik}>{label}</button>;
});

function hitungBerat(n: number) {
  console.log("hitungBerat dijalankan untuk n =", n);
  let total = 0;
  for (let i = 0; i < n * 300000; i++) total += i % 7;
  return total;
}

function DemoCallbackMemo() {
  const [n, setN] = useState(10);
  const [teks, setTeks] = useState("");
  const [stabil, setStabil] = useState(true);

  // useMemo: hanya dihitung ulang kalau n berubah (mengetik di input tidak memicunya)
  const hasil = useMemo(() => hitungBerat(n), [n]);

  // useCallback: fungsi yang sama antar render selama n tidak berubah
  const handleStabil = useCallback(() => console.log("Klik (stabil), n =", n), [n]);
  const handleBiasa = () => console.log("Klik (fungsi baru tiap render), n =", n);

  return (
    <Kartu hook="useCallback dan useMemo" judul="Hindari kerja yang tidak perlu">
      <label className="checkbox">
        <input type="checkbox" checked={stabil} onChange={(e) => setStabil(e.target.checked)} />
        Pakai useCallback untuk tombol anak
      </label>
      <div className="actions">
        <button className="btn" onClick={() => setN((x) => x + 5)}>n = {n} (klik: +5)</button>
        <Anak onKlik={stabil ? handleStabil : handleBiasa} label="Tombol anak (memo)" />
      </div>
      <input placeholder="Ketik di sini lalu lihat console" value={teks} onChange={(e) => setTeks(e.target.value)} />
      <p>Hasil perhitungan berat: <b>{hasil}</b></p>
      <p className="hint">
        Dengan useCallback aktif, mengetik tidak merender ulang Anak. Tanpa itu, Anak dirender ulang di setiap ketikan.
        hitungBerat hanya muncul di console saat n berubah.
      </p>
    </Kartu>
  );
}

export default function Hooks() {
  useDocumentTitle("Latihan Hooks");
  return (
    <>
      <h1>Latihan React Hooks</h1>
      <p className="lead">Tujuh hook dengan contoh kecil. Buka console (F12) untuk melihat log pada beberapa contoh.</p>
      <div className="grid grid--2">
        <DemoState />
        <DemoEffect />
        <DemoContext />
        <DemoRef />
        <DemoReducer />
        <DemoCallbackMemo />
      </div>
    </>
  );
}
