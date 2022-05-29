import { Outlet } from "react-router-dom";

import "../styles/style.scss";

export function Layout() {
  return (
    <div className="body-container">
      <header className="header">
        <h2>kramdyh.ltd</h2>
      </header>
      <main className="main">
        <Outlet></Outlet>
      </main>
      <footer className="footer">
        <p>© Tove Hydmark 2021</p>
      </footer>
    </div>
  );
}
