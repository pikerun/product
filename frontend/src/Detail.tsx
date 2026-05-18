import type { ReactNode } from "react";
import {
  FiCamera,
  FiChevronLeft,
  FiChevronRight,
  FiClock,
  FiHome,
  FiInfo,
  FiMap,
  FiMapPin,
  FiSearch,
  FiUser,
  FiX,
} from "react-icons/fi";
import { LuCake } from "react-icons/lu";
import { TbCurrencyYen } from "react-icons/tb";

/** 画像どおりのクリーンなサンセリフ（日本語UI向け） */
const FONT =
  '"Hiragino Kaku Gothic ProN", "Hiragino Sans", "Yu Gothic UI", "Yu Gothic", "Meiryo", "Segoe UI", sans-serif';

const shopInfo = [
  {
    icon: <FiMapPin size={16} />,
    label: "住所",
    value: "北海道函館市○○町1-2-3",
  },
  {
    icon: <FiClock size={16} />,
    label: "営業時間",
    value: "10:00 ～ 20:00",
  },
  {
    icon: <LuCake size={16} />,
    label: "ジャンル",
    value: "カフェ・スイーツ",
  },
  {
    icon: <TbCurrencyYen size={16} />,
    label: "価格帯",
    value: "¥1,000〜¥2,000",
  },
  {
    icon: <FiInfo size={16} />,
    label: "お店情報",
    value:
      "函館の新鮮な素材を活かしたこだわりのスイーツを提供しています。落ち着いた店内でゆっくりとお過ごしください。",
  },
];

const menuItems = [
  { name: "チョコケーキ", price: "¥450" },
  { name: "抹茶パフェ", price: "¥600" },
  { name: "函館プリン", price: "¥350" },
];

const Detail = () => {
  return (
    <div style={styles.page}>
      <div style={styles.shell}>
        <header style={styles.header}>
          <button type="button" style={styles.headerButton} aria-label="close">
            <FiX size={22} />
          </button>
          <h1 style={styles.headerTitle}>Cafe Bloom</h1>
          <div style={styles.headerSpacer} />
        </header>

        <section style={styles.hero}>
          <button type="button" style={styles.heroArrow} aria-label="previous image">
            <FiChevronLeft size={18} />
          </button>
          <div style={styles.heroCenter}>
            <FiCamera size={38} color="#bdbdbd" />
            <p style={styles.heroText}>お店の外観・内装、スイーツ写真</p>
            <div style={styles.dotRow}>
              <span style={{ ...styles.dot, ...styles.dotActive }} />
              <span style={styles.dot} />
              <span style={styles.dot} />
            </div>
          </div>
          <button type="button" style={styles.heroArrow} aria-label="next image">
            <FiChevronRight size={18} />
          </button>
        </section>

        <main style={styles.content}>
          <section style={styles.card}>
            {shopInfo.map((item) => (
              <div key={item.label} style={styles.infoRow}>
                <div style={styles.infoIcon}>{item.icon}</div>
                <div style={styles.infoBody}>
                  <div style={styles.infoLabel}>{item.label}</div>
                  <div style={styles.infoValue}>{item.value}</div>
                </div>
              </div>
            ))}
          </section>

          <section style={styles.card}>
            <h2 style={styles.sectionTitle}>マップ</h2>
            <div style={styles.mapArea}>
              <FiMap size={28} color="#bcbcbc" />
              <p style={styles.mapText}>地図エリア（函館市本町1-2-3）</p>
            </div>
          </section>

          <section style={styles.card}>
            <h2 style={styles.sectionTitle}>メニュー</h2>
            <div style={styles.menuGrid}>
              {menuItems.map((item) => (
                <article key={item.name} style={styles.menuItem}>
                  <div style={styles.menuImage}>画像</div>
                  <h3 style={styles.menuName}>{item.name}</h3>
                  <p style={styles.menuPrice}>{item.price}</p>
                </article>
              ))}
            </div>
          </section>
        </main>

        <footer style={styles.footer}>
          <NavItem icon={<FiHome size={18} />} label="ホーム" />
          <NavItem icon={<FiSearch size={18} />} label="検索" isActive />
          <NavItem icon={<FiUser size={18} />} label="マイページ" />
        </footer>
      </div>
    </div>
  );
};

type NavItemProps = {
  icon: ReactNode;
  label: string;
  isActive?: boolean;
};

function NavItem({ icon, label, isActive = false }: NavItemProps) {
  return (
    <button
      type="button"
      style={{ ...styles.navItem, ...(isActive ? styles.navItemActive : {}) }}
    >
      <span style={styles.navIcon}>{icon}</span>
      <span style={styles.navLabel}>{label}</span>
    </button>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    backgroundColor: "#f2eee6",
    fontFamily: FONT,
    color: "#3d2d25",
    WebkitFontSmoothing: "antialiased",
    textAlign: "start" as const,
  },
  shell: {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#f2eee6",
    display: "flex",
    flexDirection: "column" as const,
    fontFamily: FONT,
  },
  header: {
    height: 50,
    backgroundColor: "#c5a58b",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 12px",
  },
  headerButton: {
    border: "none",
    background: "transparent",
    color: "#fff",
    width: 30,
    height: 30,
    cursor: "pointer",
    display: "grid",
    placeItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 700,
    margin: 0,
    lineHeight: 1.2,
    fontFamily: FONT,
    letterSpacing: 0.02,
  },
  headerSpacer: { width: 30 },
  hero: {
    height: 176,
    backgroundColor: "#e8e8e8",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 10px",
  },
  heroArrow: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    border: "none",
    backgroundColor: "#f8f8f8",
    color: "#c5a58b",
    display: "grid",
    placeItems: "center",
    cursor: "pointer",
  },
  heroCenter: {
    textAlign: "center" as const,
    color: "#bcbcbc",
  },
  heroText: {
    margin: "8px 0 10px",
    fontSize: 13,
    fontWeight: 400,
    fontFamily: FONT,
    color: "#b8b8b8",
  },
  dotRow: {
    display: "flex",
    justifyContent: "center",
    gap: 6,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    backgroundColor: "#cfcfcf",
  },
  dotActive: {
    backgroundColor: "#c7a58b",
  },
  content: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 12,
    padding: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
  },
  infoRow: {
    display: "flex",
    gap: 10,
    padding: "7px 0",
    borderBottom: "1px solid #f2f2f2",
  },
  infoIcon: {
    width: 20,
    display: "grid",
    placeItems: "center",
    color: "#c7a58b",
    marginTop: 2,
  },
  infoBody: { flex: 1 },
  infoLabel: {
    fontSize: 12,
    fontWeight: 400,
    fontFamily: FONT,
    color: "#b6b2ad",
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: 500,
    fontFamily: FONT,
    color: "#332725",
    lineHeight: 1.45,
  },
  sectionTitle: {
    margin: "0 0 10px",
    fontSize: 17,
    fontWeight: 700,
    lineHeight: 1.2,
    color: "#3c2d24",
    borderLeft: "4px solid #d1b298",
    paddingLeft: 8,
    fontFamily: FONT,
  },
  mapArea: {
    height: 132,
    borderRadius: 10,
    backgroundColor: "#efefef",
    display: "grid",
    placeItems: "center",
    textAlign: "center" as const,
    color: "#b8b8b8",
  },
  mapText: {
    margin: "8px 0 0",
    fontSize: 14,
    fontFamily: FONT,
    fontWeight: 400,
  },
  menuGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 10,
  },
  menuItem: { margin: 0 },
  menuImage: {
    height: 86,
    borderRadius: 10,
    backgroundColor: "#efefef",
    display: "grid",
    placeItems: "center",
    color: "#c5c5c5",
    fontSize: 12,
    marginBottom: 8,
  },
  menuName: {
    margin: "0 0 2px",
    fontSize: 15,
    fontWeight: 600,
    fontFamily: FONT,
    color: "#362822",
  },
  menuPrice: {
    margin: 0,
    fontSize: 13,
    fontWeight: 500,
    fontFamily: FONT,
    color: "#c49f83",
  },
  footer: {
    marginTop: "auto",
    height: 56,
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    backgroundColor: "#7b5b47",
  },
  navItem: {
    border: "none",
    background: "transparent",
    color: "#dbc9b8",
    display: "grid",
    placeItems: "center",
    cursor: "pointer",
  },
  navItemActive: {
    backgroundColor: "#6d4e3d",
    color: "#fff",
  },
  navIcon: { lineHeight: 1 },
  navLabel: {
    fontSize: 11,
    fontWeight: 500,
    fontFamily: FONT,
    marginTop: 2,
  },
};

export default Detail;
