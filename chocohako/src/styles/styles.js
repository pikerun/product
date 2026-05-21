export const styles = {
  body: {
    fontFamily: "sans-serif",
    background: "#F6F2E8",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    position: "relative",
  },

  header: {
    height: "60px",
    background: "#CBA990",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    flexShrink: 0,
  },

  menuBtn: {
    position: "absolute",
    left: "16px",
    fontSize: "28px",
    cursor: "pointer",
  },

  headerTitle: {
    fontSize: "20px",
    color: "white",
  },

  sidebar: {
    position: "fixed",
    top: 0,
    width: "250px",
    height: "100%",
    background: "#6A4C3A",
    color: "white",
    transition: "0.3s",
    zIndex: 1000,
  },

  closeBtn: {
    height: "60px",
    display: "flex",
    alignItems: "center",
    paddingLeft: "20px",
    fontSize: "28px",
    cursor: "pointer",
    borderBottom:
      "1px solid rgba(255,255,255,0.2)",
  },

  sidebarList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },

  sidebarItem: {
    padding: "18px 24px",
    borderBottom:
      "1px solid rgba(255,255,255,0.2)",
    cursor: "pointer",
  },

  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    zIndex: 999,
  },

  main: {
    flex: 1,
    overflowY: "auto",
    padding: "16px",
  },

  searchBox: {
    marginBottom: "20px",
  },

  searchInput: {
    width: "100%",
    padding: "12px 16px",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    outline: "none",
  },

  searchInfo: {
    marginBottom: "20px",
  },

  searchKeyword: {
    fontSize: "22px",
    color: "#6A4C3A",
    marginBottom: "6px",
  },

  searchCount: {
    color: "#666",
  },

  shopCard: {
    background: "white",
    borderRadius: "18px",
    padding: "14px",
    marginBottom: "16px",
    display: "flex",
    gap: "14px",
    boxShadow:
      "0 2px 8px rgba(0,0,0,0.08)",
  },

  shopInfo: {
    flex: 1,
  },

  shopName: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#6A4C3A",
    marginBottom: "10px",
  },

  shopDetail: {
    fontSize: "14px",
    color: "#444",
    marginBottom: "6px",
    lineHeight: 1.4,
  },

  shopImage: {
    width: "120px",
    height: "120px",
    borderRadius: "14px",
    overflow: "hidden",
    flexShrink: 0,
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  footer: {
    height: "60px",
    display: "flex",
    flexShrink: 0,
  },

  navItem: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: "14px",
    background: "#CBA990",
  },

  activeNav: {
    background: "#6A4C3A",
  },
};