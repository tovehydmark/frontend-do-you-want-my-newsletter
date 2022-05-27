import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div>
      <header>
        <p>Header</p>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
      <footer>
        <p>Footer</p>
      </footer>
    </div>
  );
}
