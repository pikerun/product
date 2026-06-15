import { useState } from "react";
import { Link } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import ShopCard from "../components/ShopCard";

import { styles } from "../styles/styles";

type Shop = {
  storeId: string;
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
      storeId: "1",
      name: "Cafe Bloom",
      address: "北海道函館市○○町1-2-3",
      time: "10:00〜20:00",
      category: "カフェ・スイーツ",
      price: "¥1,000〜¥2,000",
      holiday: "水曜日",
      image: "https://picsum.photos/300?1",
    },
    {
      storeId: "2",
      name: "珈琲館",
      address: "北海道函館市△△町4-5-6",
      time: "17:00〜23:00",
      category: "コーヒー・洋菓子",
      price: "¥3,000〜¥5,000",
      holiday: "日曜日",
      image: "https://picsum.photos/300?2",
    },
    {
      storeId: "3",
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

      <main style={styles.main}>
        <div style={styles.searchBox}>
          <input
            type="text"
            placeholder="検索..."
            style={styles.searchInput}
          />
        </div>

        {shops.map((shop) => (
          <Link
            key={shop.storeId}
            to={`/stores/${shop.storeId}`}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <ShopCard shop={shop} />
          </Link>
        ))}
      </main>
    </div>
  );
}