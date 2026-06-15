import { NavLink, Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { FiHome, FiMenu, FiSearch, FiUser } from "react-icons/fi";
import Detail from "./Detail";
import Home from "./Home";
import Search from "./Search";
import "./App.css";
import SearchResultPage from "./pages/SearchResultPage";

function getHeaderTitle(pathname: string): string | null {
  if (pathname.startsWith("/stores/")) return null;
  if (pathname.startsWith("/home")) return "ホーム";
  if (pathname.startsWith("/mypage")) return "マイページ";
  if (pathname.startsWith("/search")) return "検索";
  return null;
}

function AppShell() {
  const { pathname } = useLocation();
  const headerTitle = getHeaderTitle(pathname);

  return (
    <main className="screen-shell">
      <header className="screen-header">
        <button type="button" className="header-menu-button" aria-label="メニュー">
          <FiMenu size={22} />
        </button>
        {headerTitle ? (
          <h1 className="header-title">{headerTitle}</h1>
        ) : (
          <div className="header-title header-title--empty" aria-hidden="true" />
        )}
        <div className="header-spacer" />
      </header>

      <section className="screen-content">
        <Outlet />
      </section>

      <nav className="bottom-nav" aria-label="画面切り替え">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `bottom-link ${isActive ? "is-active" : ""}`
          }
        >
          <span className="bottom-link-icon">
            <FiHome size={18} />
          </span>
          <span className="bottom-link-label">ホーム</span>
        </NavLink>

        <NavLink
          to="/search"
          className={({ isActive }) =>
            `bottom-link ${isActive ? "is-active" : ""}`
          }
        >
          <span className="bottom-link-icon">
            <FiSearch size={18} />
          </span>
          <span className="bottom-link-label">検索</span>
        </NavLink>

        <NavLink
          to="/mypage"
          className={({ isActive }) =>
            `bottom-link ${isActive ? "is-active" : ""}`
          }
        >
          <span className="bottom-link-icon">
            <FiUser size={18} />
          </span>
          <span className="bottom-link-label">マイページ</span>
        </NavLink>
      </nav>
    </main>
  );
}

function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route
          path="/"
          element={<Navigate to="/search" replace />}
        />

        <Route
          path="/home"
          element={<Home />}
        />

        <Route
          path="/search"
          element={<Search />}
        />

        <Route
          path="/search-result"
          element={<SearchResultPage />}
        />

        <Route
          path="/stores/:storeId"
          element={<Detail />}
        />

        <Route
          path="/mypage"
          element={
            <section className="placeholder-page">
              マイページ
            </section>
          }
        />

        <Route
          path="*"
          element={<Navigate to="/search" replace />}
        />
      </Route>
    </Routes>
  );
}

export default App;