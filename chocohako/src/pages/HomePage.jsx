import { useState } from "react";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

import { styles } from "../styles/styles";

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <div style={styles.body}>
      <Sidebar
        sidebarOpen={sidebarOpen}
        closeSidebar={() =>
          setSidebarOpen(false)
        }
      />

      <Header
        title="ちょこはこ"
        openSidebar={() =>
          setSidebarOpen(true)
        }
        />

      <main style={styles.main}>
        <h2>ホーム画面</h2>

        <p>
          ここに今後コンテンツを追加していく
        </p>
      </main>

      <Footer />
    </div>
  );
}