import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import PMB from "./pages/PMB";
import Contact from "./pages/Contact";
import PendaftarPage from "./pages/Pendaftar";
import Hooks from "./pages/Hooks";

export default function App() {
  return (
    <Routes>
      {/* Layout membungkus semua halaman; isi halaman tampil di <Outlet /> */}
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="pmb" element={<PMB />} />
        <Route path="pendaftar" element={<PendaftarPage />} />
        <Route path="hooks" element={<Hooks />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
