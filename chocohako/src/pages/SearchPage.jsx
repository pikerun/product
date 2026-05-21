import { useState } from "react";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ShopCard from "../components/ShopCard";
import Footer from "../components/Footer";

import { styles } from "../styles/styles";

export default function SearchPage() {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const shops = [
    {
      name: "Cafe Bloom",
      address: "北海道函館市○○町1-2-3",
      time: "10:00〜20:00",
      category: "カフェ・スイーツ",
      price: "¥1,000〜¥2,000",
      holiday: "水曜日",
      image: "https://picsum.photos/300?1",
    },

    {
      name: "珈琲館",
      address: "北海道函館市△△町4-5-6",
      time: "17:00〜23:00",
      category: "コーヒー・洋菓子",
      price: "¥3,000〜¥5,000",
      holiday: "日曜日",
      image: "https://picsum.photos/300?2",
    },

    {
      name: "和菓子総本店",
      address: "北海道函館市□□町7-8-9",
      time: "11:00〜22:00",
      category: "和菓子",
      price: "¥2,000〜¥4,000",
      holiday: "月曜日",
      image: "https://picsum.photos/300?3",
    },
  ];

  return (
    <div style={styles.body}>
      <Sidebar
        sidebarOpen={sidebarOpen}
        closeSidebar={() =>
          setSidebarOpen(false)
        }
      />

      <Header
        openSidebar={() =>
          setSidebarOpen(true)
        }
      />

      <main style={styles.main}>
        {/* 検索バー */}
        <div style={styles.searchBox}>
          <input
            type="text"
            placeholder="検索..."
            style={styles.searchInput}
          />
        </div>

        {/* 検索情報 */}
        <div style={styles.searchInfo}>
          <h2 style={styles.searchKeyword}>
            "○○ △△"
          </h2>

          <p style={styles.searchCount}>
            全 12 件
          </p>
        </div>

        {/* 店舗一覧 */}
        {shops.map((shop, index) => (
          <ShopCard
            key={index}
            shop={shop}
          />
        ))}
      </main>

      <Footer />
    </div>
  );
}