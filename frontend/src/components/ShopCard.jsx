import { styles } from "../styles/styles";

export default function ShopCard({ shop }) {
  return (
    <div style={styles.shopCard}>
      {/* 左 */}
      <div style={styles.shopInfo}>
        <div style={styles.shopName}>
          {shop.name}
        </div>

        <div style={styles.shopDetail}>
          📍 {shop.address}
        </div>

        <div style={styles.shopDetail}>
          🕒 {shop.time}
        </div>

        <div style={styles.shopDetail}>
          🍽 {shop.category}
        </div>

        <div style={styles.shopDetail}>
          💰 {shop.price}
        </div>

        <div style={styles.shopDetail}>
          ❌ {shop.holiday}
        </div>
      </div>

      {/* 右画像 */}
      <div style={styles.shopImage}>
        <img
          src={shop.image}
          alt={shop.name}
          style={styles.image}
        />
      </div>
    </div>
  );
}