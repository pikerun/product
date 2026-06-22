import { useCallback, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiChevronLeft,
  FiChevronRight,
  FiClock,
  FiMapPin,
  FiX,
  FiPhone,
} from "react-icons/fi";
import { LuCake } from "react-icons/lu";

import { getStoreDetails } from "../../backend/src/mocks/stores/storesMock";

const FONT =
  '"Hiragino Kaku Gothic ProN", "Hiragino Sans", "Yu Gothic UI", "Yu Gothic", "Meiryo", "Segoe UI", sans-serif';

// 擬似的にAPI通信（非同期）で店舗詳細を1件取得する関数
const fetchStoreById = async (id: string | undefined) => {

  // 配列の中から storeId が一致するものを探す
  const store = getStoreDetails.find((s) => s.storeId === id);
  return store || null;
};

// 店舗写真（バックエンドに写真データがない場合のフォールバック用、または共通利用）
const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`;


// 店舗写真(モックにないので直置き)
const STORE_PHOTOS = [
  { id: "exterior", src: unsplash("photo-1554118811-1e0d58224f24"), alt: "お店の外観" },
  { id: "interior", src: unsplash("photo-1556910103-1c02745aae4d"), alt: "店内" },
];

type StorePhoto = (typeof STORE_PHOTOS)[number];

const HERO_HEIGHT = 176;
//店舗詳細欄の上余白と揃える
const SECTION_GAP = 8;

function HeroCarousel({ photos }: { photos: StorePhoto[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const count = photos.length;

  const goTo = useCallback(
    (index: number) => {
      if (count === 0) return;
      setActiveIndex(((index % count) + count) % count);
    },
    [count]
  );

  const goPrev = () => goTo(activeIndex - 1);
  const goNext = () => goTo(activeIndex + 1);

  if (count === 0) {
    return (
      <section style={styles.hero}>
        <div style={styles.heroViewport}>
          <div style={styles.heroPlaceholder}>写真がありません</div>
        </div>
      </section>
    );
  }

  const slideOffsetPercent = (activeIndex * 100) / count;

  return (
    <section
      style={styles.hero}
      aria-roledescription="carousel"
      aria-label="店舗写真"
    >
      <button
        type="button"
        style={styles.heroArrow}
        aria-label="前の写真"
        onClick={goPrev}
      >
        <FiChevronLeft size={18} />
      </button>

      <div style={styles.heroViewport}>
        <div
          style={{
            ...styles.heroTrack,
            width: `${count * 100}%`,
            transform: `translateX(-${slideOffsetPercent}%)`,
          }}
        >
          {photos.map((photo) => (
            <HeroSlide key={photo.id} photo={photo} count={count} />
          ))}
        </div>

        <div style={styles.heroDots}>
          {photos.map((photo, index) => (
            <button
              key={photo.id}
              type="button"
              aria-label={`${index + 1}枚目の写真`}
              aria-current={index === activeIndex ? "true" : undefined}
              style={{
                ...styles.dot,
                ...(index === activeIndex ? styles.dotActive : {}),
              }}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        style={styles.heroArrow}
        aria-label="次の写真"
        onClick={goNext}
      >
        <FiChevronRight size={18} />
      </button>
    </section>
  );
}

function HeroSlide({ photo, count }: { photo: StorePhoto; count: number }) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      style={{
        ...styles.heroSlide,
        width: `${100 / count}%`,
      }}
    >
      {failed ? (
        <div style={styles.heroPlaceholder}>{photo.alt}</div>
      ) : (
        <img
          src={photo.src}
          alt={photo.alt}
          style={styles.heroImage}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

const Detail = () => {
  const navigate = useNavigate();
  const { storeId } = useParams<{ storeId: string }>(); 
  // URL から :storeId を取得（例: /detail/1）

  // 状態管理
  const [store, setStore] = useState<typeof getStoreDetails[number] | null>(null);
  const [loading, setLoading] = useState(true);

  // コンポーネント読み込み時にデータを引っ張ってくる
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        setLoading(true);
        // URLのstoreId（なければとりあえず "1" をデフォルトにする等）を渡して検索
        const data = await fetchStoreById(storeId || "1");
        if (isMounted) {
          setStore(data);
        }
      } catch (error) {
        console.error("データ取得に失敗しました", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();
    return () => { isMounted = false; };
  }, [storeId]);

  if (loading) {
    return <div style={{ padding: 20, textAlign: "center", fontFamily: FONT }}>読み込み中...</div>;
  }

  if (!store) {
    return <div style={{ padding: 20, textAlign: "center", fontFamily: FONT }}>店舗情報が見つかりませんでした。</div>;
  }

  // バックエンドのフラットなデータを、コンポーネントの表示用ループにマッピングする配列を作成
  const formattedShopInfo = [
    { icon: <FiMapPin size={16} />, label: "住所", value: store.address },
    { icon: <FiPhone size={16} />, label: "電話番号", value: store.phoneNumber },
    { icon: <FiClock size={16} />, label: "営業時間", value: store.openingHours },
    { 
      icon: <LuCake size={16} />, 
      label: "利用形態", 
      value: `${store.eatIn ? "イートイン可" : ""} ${store.takeOut ? "テイクアウト可" : ""}`.trim() || "情報なし"
    },
  ];

  return (
    <div className="detail-page">
      <header className="detail-store-header">
        <button
          type="button"
          className="detail-store-header-button"
          aria-label="閉じる"
          onClick={() => navigate(-1)}
        >
          <FiX size={22} />
        </button>
        <h1 className="detail-store-header-title">{store.storeName}</h1>
        <div className="detail-store-header-spacer" />
      </header>
      
      <HeroCarousel photos={STORE_PHOTOS} />
      {/* バックエンドから画像を持ってくるには↓ */}
      {/* <HeroCarousel photos={store.(配列名) || []} /> */}


      <main style={styles.content}>
        <section style={styles.card}>
          {formattedShopInfo.map((item) => (
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
          <h2 style={styles.sectionTitle}>メニュー</h2>
          <div style={styles.menuGrid}>
            {store.sweets.map((sweet) => (
              <article key={sweet.sweetId} style={styles.menuItem}>
                <div style={styles.menuImage}>{sweet.type}</div>
                <h3 style={styles.menuName}>{sweet.sweetName}</h3>
                <p style={styles.menuPrice}>¥{sweet.price.toLocaleString()}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

const styles = {
  hero: {
    height: HERO_HEIGHT,
    marginTop: 0,
    backgroundColor: "#f2eee6",
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "0 10px",
    position: "relative" as const,
    boxSizing: "border-box" as const,
  },
  heroViewport: {
    flex: 1,
    height: "100%",
    overflow: "hidden",
    position: "relative" as const,
    backgroundColor: "#f2eee6",
  },
  heroTrack: {
    display: "flex",
    height: "100%",
    transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    willChange: "transform",
  },
  heroSlide: {
    flexShrink: 0,
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f2eee6",
  },
  heroImage: {
    maxWidth: "100%",
    maxHeight: "100%",
    width: "auto",
    height: "auto",
    objectFit: "contain" as const,
    display: "block",
  },
  heroPlaceholder: {
    width: "100%",
    height: "100%",
    display: "grid",
    placeItems: "center",
    backgroundColor: "#f2eee6",
    color: "#a89585",
    fontSize: 13,
    fontFamily: FONT,
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
    flexShrink: 0,
    zIndex: 2,
    boxShadow: "0 1px 4px rgba(0, 0, 0, 0.12)",
  },
  heroDots: {
    position: "absolute" as const,
    left: 0,
    right: 0,
    bottom: 10,
    display: "flex",
    justifyContent: "center",
    gap: 6,
    zIndex: 2,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.65)",
    border: "none",
    padding: 0,
    cursor: "pointer",
  },
  dotActive: {
    backgroundColor: "#c7a58b",
    transform: "scale(1.15)",
  },
  content: {
    display: "flex",
    flexDirection: "column" as const,
    gap: SECTION_GAP,
    padding: `0 0 12px`,
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
};

export default Detail;
