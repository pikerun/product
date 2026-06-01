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

type Props = {
  shop: Shop;
};

export default function ShopCard({
  shop,
}: Props) {
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