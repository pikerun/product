import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

type ShopItem = {
  storeId: string;
  name: string;
  image: string;
};

/**
 * public/images/sweets に配置した画像
 */
const sweetImages = [
  "http://localhost:3000/images/sweets/いちご大福.jpg",
  "http://localhost:3000/images/sweets/どら焼き.jpg",
  "http://localhost:3000/images/sweets/どら焼きカスタード.jpg",
  "http://localhost:3000/images/sweets/アップルパイ.jpg",
  "http://localhost:3000/images/sweets/クッキー.jpg",
  "http://localhost:3000/images/sweets/シュークリーム.jpg",
  "http://localhost:3000/images/sweets/ショートケーキ.jpg",
  "http://localhost:3000/images/sweets/チョコクッキーシュー.jpg",
  "http://localhost:3000/images/sweets/チョコレートケーキ.jpg",
  "http://localhost:3000/images/sweets/チーズケーキ.jpg",
  "http://localhost:3000/images/sweets/ティラミス.jpg",
  "http://localhost:3000/images/sweets/バニラアイス.jpg",
  "http://localhost:3000/images/sweets/パンケーキ.jpg",
  "http://localhost:3000/images/sweets/プリン.jpg",
  "http://localhost:3000/images/sweets/モンブラン.jpg",
  "http://localhost:3000/images/sweets/ロールケーキ.jpg",
  "http://localhost:3000/images/sweets/大福.jpg",
  "http://localhost:3000/images/sweets/抹茶アイス.jpg",
];

/**
 * 店舗画像
 * （下段のみ）
 */
const SHOP_ITEMS: ShopItem[] = [
  {
    storeId: "1",
    name: "カフェ ミルク",
    image: "/images/shops/shop1.jpg",
  },
  {
    storeId: "2",
    name: "スイーツ工房 ひなた",
    image: "/images/shops/shop2.jpg",
  },
  {
    storeId: "3",
    name: "洋菓子店 ルナ",
    image: "/images/shops/shop3.jpg",
  },
];

/** ランダム画像取得 */
const getRandomImages = (
  images: string[],
  count: number
) => {
  return [...images]
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
};

function StaticPhoto({ src }: { src: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className="photo-slot photo-slot--fallback"
        role="presentation"
      />
    );
  }

  return (
    <div className="photo-slot">
      <img
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
        className="photo-slot-image"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

const Search = () => {
  const [query, setQuery] = useState("");

  const keyword = query.trim().toLowerCase();

  /**
   * 上段スイーツ画像だけランダム表示
   */
  const randomSweetImages = useMemo(() => {
    return getRandomImages(sweetImages, 3);
  }, []);

  const filteredShops = useMemo(() => {
    if (!keyword) return SHOP_ITEMS;

    return SHOP_ITEMS.filter((item) =>
      item.name.toLowerCase().includes(keyword)
    );
  }, [keyword]);

  return (
    <section className="search-layout">
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="スイーツ名・お店名で検索"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        <span
          className="search-icon"
          aria-hidden="true"
        >
          🔍
        </span>
      </div>

      {/* 上段：スイーツ画像 */}
      <div className="photo-strip">
        {randomSweetImages.map((image, index) => (
          <Link
            key={index}
            to="/stores/1"
          >
            <StaticPhoto src={image} />
          </Link>
        ))}
      </div>

      {/* 下段：店舗画像 */}
      <div className="photo-strip">
        {filteredShops.map((item) => (
          <Link
            key={item.storeId}
            to={`/stores/${item.storeId}`}
          >
            <StaticPhoto src={item.image} />
          </Link>
        ))}
      </div>

      {keyword && (
        <div className="search-result-info">
          <p>
            お店候補: {filteredShops.length}件
          </p>
        </div>
      )}
    </section>
  );
};

export default Search;