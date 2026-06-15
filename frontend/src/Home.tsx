import { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface FeatureArticle {
  id: string;
  title: string;
  image_url: string;
  link_url: string;
}

interface SweetProduct {
  id: string;
  shopId: string;
  sweetName: string;
  shopName: string;
  category: string;
  price: number;
  description: string;
  tags: string[];
  image_url: string;
  coordinates: { lat: number; lng: number };
}

interface LimitedStore {
  hasStore: boolean;
  shopId: string;
  shopName: string;
  description: string;
  date: string;
  location: string;
  image_url: string;
}

interface HomeData {
  features: FeatureArticle[];
  newSweets: SweetProduct[];
  limitedStore: LimitedStore;
}

const VISIBLE_COUNT = 2;

function NewSweetsCarousel({ sweets }: { sweets: SweetProduct[] }) {
  const count = sweets.length;
  const maxIndex = Math.max(0, count - VISIBLE_COUNT);
  const [activeIndex, setActiveIndex] = useState(0);

  const goPrev = () => setActiveIndex((i) => Math.max(i - 1, 0));
  const goNext = () => setActiveIndex((i) => Math.min(i + 1, maxIndex));

  if (count === 0) {
    return <p className="limited-store-empty">新商品はありません。</p>;
  }

  const slideOffsetPercent = count > 0 ? (activeIndex * 100) / count : 0;

  return (
    <div aria-roledescription="carousel" aria-label="新商品">
      <div className="new-sweets-carousel-wrap">
        <button
          type="button"
          className="carousel-arrow"
          aria-label="前の商品"
          onClick={goPrev}
          disabled={activeIndex === 0}
        >
          <FiChevronLeft size={18} />
        </button>

        <div className="new-sweets-viewport">
          <div
            className="new-sweets-track"
            style={{
              width: `${(count / VISIBLE_COUNT) * 100}%`,
              transform: `translateX(-${slideOffsetPercent}%)`,
            }}
          >
            {sweets.map((sweet) => (
              <a
                href={`/sweet/${sweet.shopId}`}
                key={sweet.id}
                className="sweet-carousel-item"
                style={{ width: `${100 / count}%` }}
              >
                <div className="sweet-carousel-item-inner">
                  <img
                    src={sweet.image_url}
                    alt={sweet.sweetName}
                    className="sweet-carousel-image"
                    loading="lazy"
                  />
                  <div className="sweet-carousel-body">
                    <h4 className="sweet-carousel-name">{sweet.sweetName}</h4>
                    <p className="sweet-carousel-shop">{sweet.shopName}</p>
                    <p className="sweet-carousel-price">{sweet.price}円</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="carousel-arrow"
          aria-label="次の商品"
          onClick={goNext}
          disabled={activeIndex >= maxIndex}
        >
          <FiChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

const Home = () => {
  //backendからのデータを格納するstate
  const [homeData, setHomeData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  //画面が開いたときにデータを取得する
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        //APIエンドポイントにリクエストを送る
        const response = await fetch('http://localhost:3000/api/home');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setHomeData(data);
      } catch (error) {
        console.error('HomeDataの取得に失敗しました:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) return <div className="home-loading">Loading...</div>;
  if (!homeData) return <div className="home-error">データの取得に失敗しました。</div>;

  return (
    <div className="home-page">
      <section className="home-card">
        <h3 className="home-section-title">期間・季節限定特集</h3>
        <div className="feature-grid">
          {homeData.features.map((article) => (
            <a href={article.link_url} key={article.id} className="feature-card">
              <div className="feature-card-inner">
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="feature-card-image"
                  loading="lazy"
                />
                <div className="feature-card-body">
                  <h4 className="feature-card-title">{article.title}</h4>
                  <span className="feature-card-link">続きを読む →</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="home-card">
        <h3 className="home-section-title">新商品まとめ</h3>
        <NewSweetsCarousel sweets={homeData.newSweets} />
      </section>

      <section className="home-card">
        <h3 className="home-section-title">期間限定出店情報</h3>
        {!homeData.limitedStore.hasStore ? (
          <p className="limited-store-empty">現在期間限定出店はありません。</p>
        ) : (
          <a
            href={`/stores/${homeData.limitedStore.shopId}`}
            className="limited-store-link"
          >
            <div className="limited-store-card">
              <img
                src={homeData.limitedStore.image_url}
                alt={homeData.limitedStore.shopName}
                className="limited-store-image"
                loading="lazy"
              />
              <div className="limited-store-body">
                <h4 className="limited-store-name">{homeData.limitedStore.shopName}</h4>
                <p className="limited-store-desc">{homeData.limitedStore.description}</p>
                <table className="limited-store-meta">
                  <tbody>
                    <tr>
                      <th>日時:</th>
                      <td>{homeData.limitedStore.date}</td>
                    </tr>
                    <tr>
                      <th>場所:</th>
                      <td>{homeData.limitedStore.location}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </a>
        )}
      </section>
    </div>
  );
};

export default Home;
