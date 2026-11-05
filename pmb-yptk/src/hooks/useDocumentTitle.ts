import { useEffect } from "react";

// Custom hook: membungkus useEffect agar judul tab browser berubah tiap halaman
export default function useDocumentTitle(judul: string) {
  useEffect(() => {
    document.title = `${judul} | PMB UPI YPTK`;
  }, [judul]);
}
