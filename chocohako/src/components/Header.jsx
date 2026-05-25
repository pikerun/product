import { styles } from "../styles/styles";

export default function Header({ openSidebar,title, }) {
  return (
    <header style={styles.header}>
      <div
        style={styles.menuBtn}
        onClick={openSidebar}
      >
        ☰
      </div>

      <h1 style={styles.headerTitle}>
        {title}
      </h1>
    </header>
  );
}