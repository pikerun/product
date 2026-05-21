import { styles } from "../styles/styles";

export default function Header({ openSidebar }) {
  return (
    <header style={styles.header}>
      <div
        style={styles.menuBtn}
        onClick={openSidebar}
      >
        ☰
      </div>

      <h1 style={styles.headerTitle}>
        検索結果
      </h1>
    </header>
  );
}