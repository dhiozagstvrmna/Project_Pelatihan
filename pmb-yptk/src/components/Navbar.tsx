import { useState } from "react";
import { NavLink } from "react-router-dom";
import { MENU } from "../data/kampus";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  // React Event + state: membuka/menutup menu di layar kecil
  const [terbuka, setTerbuka] = useState(false);

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <NavLink to="/" className="brand" onClick={() => setTerbuka(false)}>
          <span className="brand__logo">UPI</span>
          <span>
            <strong>UPI "YPTK" Padang</strong>
            <small>Penerimaan Mahasiswa Baru</small>
          </span>
        </NavLink>

        <button
          className="navbar__toggle"
          aria-label="Buka menu"
          aria-expanded={terbuka}
          onClick={() => setTerbuka((t) => !t)}
        >
          {terbuka ? "✕" : "☰"}
        </button>

        {/* React List: menu dibuat dari array dengan map() dan key */}
        <nav className={terbuka ? "menu menu--open" : "menu"}>
          {MENU.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) => (isActive ? "menu__link active" : "menu__link")}
              onClick={() => setTerbuka(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
