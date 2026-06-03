import { useState } from "react";

import Sidebar from "../components/Sidebar";
import ShopCard from "../components/ShopCard";

import { styles } from "../styles/styles";

type Shop = {
  name: string;
  address: string;
  time: string;
  category: string;
  price: string;
  holiday: string;
  image: string;
};

export default function SearchResultPage() {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const shops: Shop[] = [
    {
      name: "Cafe Bloom",
      address: "北海道函館市○○町1-2-3",
      time: "10:00〜20:00",
      category: "カフェ・スイーツ",
      price: "¥1,000〜¥2,000",
      holiday: "水曜日",
      image: "https://picsum.photos/300?1",
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

      <main style={styles.main}>
        <div style={styles.searchBox}>
          <input
            type="text"
            placeholder="検索..."
            style={styles.searchInput}
          />
        </div>

        {shops.map((shop, index) => (
          <ShopCard
            key={index}
            shop={shop}
          />
        ))}
      </main>
    </div>
  );
}