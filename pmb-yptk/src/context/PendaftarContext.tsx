import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react";
import type { ReactNode } from "react";
import type { Pendaftar, StatusPendaftar } from "../types";

const KEY = "pmb-pendaftar";

// useReducer: semua perubahan data pendaftar lewat satu fungsi reducer
type Action =
  | { type: "TAMBAH"; payload: Pendaftar }
  | { type: "HAPUS"; id: string }
  | { type: "UBAH_STATUS"; id: string; status: StatusPendaftar }
  | { type: "KOSONGKAN" };

function reducer(state: Pendaftar[], action: Action): Pendaftar[] {
  switch (action.type) {
    case "TAMBAH":
      return [action.payload, ...state];
    case "HAPUS":
      return state.filter((p) => p.id !== action.id);
    case "UBAH_STATUS":
      return state.map((p) => (p.id === action.id ? { ...p, status: action.status } : p));
    case "KOSONGKAN":
      return [];
    default:
      return state;
  }
}

function muatAwal(): Pendaftar[] {
  try {
    const mentah = localStorage.getItem(KEY);
    return mentah ? (JSON.parse(mentah) as Pendaftar[]) : [];
  } catch {
    return [];
  }
}

interface PendaftarContextValue {
  pendaftar: Pendaftar[];
  tambah: (p: Pendaftar) => void;
  hapus: (id: string) => void;
  ubahStatus: (id: string, status: StatusPendaftar) => void;
  kosongkan: () => void;
}

const PendaftarContext = createContext<PendaftarContextValue | undefined>(undefined);

export function PendaftarProvider({ children }: { children: ReactNode }) {
  const [pendaftar, dispatch] = useReducer(reducer, [], muatAwal);

  // useEffect: simpan ke localStorage setiap data berubah
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(pendaftar));
    } catch {
      /* abaikan */
    }
  }, [pendaftar]);

  // useCallback: pembungkus dispatch yang stabil
  const tambah = useCallback((p: Pendaftar) => dispatch({ type: "TAMBAH", payload: p }), []);
  const hapus = useCallback((id: string) => dispatch({ type: "HAPUS", id }), []);
  const ubahStatus = useCallback(
    (id: string, status: StatusPendaftar) => dispatch({ type: "UBAH_STATUS", id, status }),
    []
  );
  const kosongkan = useCallback(() => dispatch({ type: "KOSONGKAN" }), []);

  const value = useMemo(
    () => ({ pendaftar, tambah, hapus, ubahStatus, kosongkan }),
    [pendaftar, tambah, hapus, ubahStatus, kosongkan]
  );

  return <PendaftarContext.Provider value={value}>{children}</PendaftarContext.Provider>;
}

export function usePendaftar(): PendaftarContextValue {
  const ctx = useContext(PendaftarContext);
  if (!ctx) throw new Error("usePendaftar harus dipakai di dalam <PendaftarProvider>");
  return ctx;
}
