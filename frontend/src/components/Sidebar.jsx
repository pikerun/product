import { styles } from "../styles/styles";

export default function Sidebar({
  sidebarOpen,
  closeSidebar,
}) {
  return (
    <>
      {/* サイドバー */}
      <div
        style={{
          ...styles.sidebar,
          left: sidebarOpen ? "0" : "-250px",
        }}
      >
        <div
          style={styles.closeBtn}
          onClick={closeSidebar}
        >
          ←
        </div>

        <ul style={styles.sidebarList}>
          <li style={styles.sidebarItem}>
            ホーム
          </li>

          <li style={styles.sidebarItem}>
            カテゴリ
          </li>

          <li style={styles.sidebarItem}>
            お気に入り
          </li>

          <li style={styles.sidebarItem}>
            設定
          </li>
        </ul>
      </div>

      {/* 背景 */}
      {sidebarOpen && (
        <div
          style={styles.overlay}
          onClick={closeSidebar}
        ></div>
      )}
    </>
  );
}