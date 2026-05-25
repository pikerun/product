import { useState, useEffect } from 'react';

interface FeatureArticle {
  id: string;
  title: string;
  image_url: string;
  link_url: string;
}

interface SweetProduct {
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

    //読み込み中やエラー時の表示
    if (loading) return <div style={{ padding: '20px' }}>Loading...</div>;
    if (!homeData) return <div style={{ padding: '20px' }}>データの取得に失敗しました。</div>;

    return (
        <section className='home-section' style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h2>ホーム画面</h2>
            
            {/* 上部：特集記事 */}
            <div className='home-uppper-section' style={{ marginBottom: '30px' }}>
              <h3> 期間・季節限定特集</h3>
              <div style={{ display: 'flex', gap: '20px' }}>
                {homeData.features.map((article) => (
                  //各項目をクリックすると画面が遷移するようにする
                  <a href={article.link_url} key={article.id} className='feature-card' style={{ textDecoration: 'none', color: '#333', width: '45%' }}>
                    <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px', background: '#f9f9f9' }}>
                      <img src={article.image_url} alt={article.title} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }} />
                      <h4 style={{ marginTop: '10px', marginBottom: '0' }}>{article.title}</h4>
                      <span style={{ fontSize: '12px', color: '#0070f3' }}>続きを読む →</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* 中部：新商品まとめ（左右に矢印あり、5本ロール想定） */}
            <div className='home-middle-section' style={{ marginBottom: '30px' }}>
              <h3>新商品まとめ</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflowX: 'auto', paddingBottom: '10px' }}>
                {/* 左矢印 (クリック時の動きは未実装) */}
                <button style={{ padding: '10px', cursor: 'pointer' }} onClick={() => alert('左にスクロール')}>◂</button>

                {/* sweets.jsonから取得したデータを表示 */}
                <div className='new-sweets-carousel' style={{ display: 'flex', gap: '15px', overflowX: 'auto', flexGrow: 1, padding: '10px 0'}}>
                  {homeData.newSweets.map((sweet) => (
                    //タップするとお菓子の詳細画面に遷移できるようにする
                    <a href={`/sweet/${sweet.shopId}`} key={sweet.shopId} className='sweet-carousel-item' style={{ textDecoration: 'none', color: '#333', minWidth: '160px', background: '#f9f9f9', border: '1px solid #ccc', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
                      <img src={sweet.image_url} alt={sweet.sweetName} style={{ width: '100%', height: '110px', objectFit: 'cover', borderRadius: '4px' }} />
                      <h4 style={{ margin: '5px 0 2px 0', fontSize: '14px' }}>{sweet.sweetName}</h4>
                      <p style={{ margin: '0', fontSize: '11px', color: '#777' }}>{sweet.shopName}</p> 
                      <p style={{ margin: '5px 0 0 0', fontWeight: 'bold',  color: '#e53e3e' }}>{sweet.price}円</p>
                    </a>
                  ))}
                </div>

                <button style={{ padding: '10px', cursor: 'pointer' }} onClick={() => alert('右にスクロール')}>▸</button>
              </div>
            </div> 

            {/* 下部：期間限定出店情報（hasStore フラグで切り替え）*/}
            <div className='home-lower-section'>
              <h3>期間限定出店情報</h3>

              {/* hasStoreがtrueのときは出店情報を表示、falseのときは「現在期間限定出店はありません」と表示する */}
              {!homeData.limitedStore.hasStore ? (
                <p style={{ color: '#999', fontStyle: 'italic', padding: '10px' }}>現在期間限定出店はありません。</p>
              ) : (
                //出店があるときは、店名、電話番号、仮の写真をカード形式で綺麗にレンダリング。タップすると店舗の詳細画面に遷移するようにする
                <a href={`/stores/${homeData.limitedStore.shopId}`} className='limited-store-link' style={{ textDecoration: 'none', color: '#333' }}>
                  <div style={{ display: 'flex', gap: '20px', background: '#f7fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '15px' }}>
                    <img src={homeData.limitedStore.image_url} alt={homeData.limitedStore.shopName} style={{ width: '180px', height: '120px', objectFit: 'cover', borderRadius: '4px' }} />
                    <div>
                      <h4 style={{ margin: '0 0 5px 0', color: '#2b6cb0', fontSize: '18px' }}>{homeData.limitedStore.shopName}</h4>
                      <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#4a5568' }}>{homeData.limitedStore.description}</p>
                      <table style={{ fontSize: '12px', color: '#4a5568', textAlign: 'left' }}>
                        <tbody>
                          <tr><th style={{ width: '50px', verticalAlign: 'top'}}>日時:</th><td>{homeData.limitedStore.date}</td></tr>
                          <tr><th style={{ verticalAlign: 'top'}}>場所:</th><td>{homeData.limitedStore.location}</td></tr>
                          {/* <tr><th style={{ verticalAlign: 'top'}}>電話:</th><td>{homeData.limitedStore.tel}</td></tr> */}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </a>
              )}
            </div>
        </section>
    );
};

export default Home;