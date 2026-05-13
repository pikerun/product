import { useMemo, useState } from "react";

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=80`;

type PhotoItem = { name: string; image: string };

const SWEET_ITEMS: PhotoItem[] = [
  { name: "ショートケーキ", image: unsplash("photo-1565958011703-44f9829ba187") },
  { name: "チョコレートケーキ", image: unsplash("photo-1578985545062-69928b1d9587") },
  { name: "チーズケーキ", image: unsplash("photo-1524351199678-941a58a3df50") },
  { name: "プリン", image: unsplash("photo-1505253758473-96b7015fcd40") },
  { name: "パフェ", image: unsplash("photo-1590301157890-4810ed352733") },
  { name: "ドーナツ", image: unsplash("photo-1558961363-fa8fdf82db35") },
];

const SHOP_ITEMS: PhotoItem[] = [
  { name: "カフェ ミルク", image: unsplash("photo-1556910103-1c02745aae4d") },
  { name: "スイーツ工房 ひなた", image: unsplash("photo-1554118811-1e0d58224f24") },
  { name: "洋菓子店 ルナ", image: unsplash("photo-1517248135467-4c7edcad34c4") },
  { name: "ベーカリー ふわり", image: unsplash("photo-1509440159596-0249088772ff") },
  { name: "和菓子処 さくら", image: unsplash("photo-1547592166-23ac45744acd") },
];

/** 検索とは無関係に常に同じ3枚だけ表示 */
const SWEETS_DISPLAY = SWEET_ITEMS.slice(0, 3);
const SHOPS_DISPLAY = SHOP_ITEMS.slice(0, 3);

function StaticPhoto({ src }: { src: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <div className="photo-slot photo-slot--fallback" role="presentation" />;
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

  const filteredSweets = useMemo(() => {
    if (!keyword) return SWEET_ITEMS;
    return SWEET_ITEMS.filter((item) =>
      item.name.toLowerCase().includes(keyword)
    );
  }, [keyword]);

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
        <span className="search-icon" aria-hidden="true">
          🔍
        </span>
      </div>
      <div className="photo-strip" aria-hidden="true">
        {SWEETS_DISPLAY.map((item) => (
          <StaticPhoto key={item.image} src={item.image} />
        ))}
      </div>
      <div className="photo-strip" aria-hidden="true">
        {SHOPS_DISPLAY.map((item) => (
          <StaticPhoto key={item.image} src={item.image} />
        ))}
      </div>
      {keyword && (
        <div className="search-result-info">
          <p>スイーツ候補: {filteredSweets.length}件</p>
          <p>お店候補: {filteredShops.length}件</p>
        </div>
      )}
    </section>
  );
};

export default Search;
