import { styles } from "../styles/styles";

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.navItem}>
        ホーム
      </div>

      <div
        style={{
          ...styles.navItem,
          ...styles.activeNav,
        }}
      >
        検索
      </div>

      <div style={styles.navItem}>
        マイページ
      </div>
    </footer>
  );
}