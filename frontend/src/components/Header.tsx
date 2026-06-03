import { styles } from "../styles/styles";

type Props = {
  openSidebar: () => void;
  title: string;
};

export default function Header({
  openSidebar,
  title,
}: Props) {
  return (
    <header style={styles.header}>
      <button
        style={styles.menuBtn}
        onClick={openSidebar}
      >
        ☰
      </button>

      <h1 style={styles.headerTitle}>
        {title}
      </h1>
    </header>
  );
}