import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const getFeatured = (req: Request, res: Response) => {
    try {
        //上部：特集記事
        const featureArticles= [
            {
                id: "f001",
                title: "初夏のメロンスイーツ特集！",
                image_url: "/images/features/melon-feature.jpg",
                link_url: "/feature/melon-feature.html"
            },
            {
                id: "f002",
                title: "夏の涼感スイーツ特集！",
                image_url: "/images/features/cool-sweets-feature.jpg",
                link_url: "/feature/cool-sweets-feature.html"
            }
        ];

        //中部：新作スイーツ
        //mockデータを使用
        const sweetsFilePath = path.join(__dirname, '../../mocks/sweets.json');
        const sweetsRaw = fs.readFileSync(sweetsFilePath, 'utf8');
        const allSweets = JSON.parse(sweetsRaw);

        //最初の5件を新商品として切り出す
        const homeNewSweets = allSweets.slice(0, 5);

        //下部：期間限定出店データ
        const limitedStoresData = {
            hasStore: true, //期間限定出店があるかどうか
            shopId: "shop_limited_01",
            shopName: "期間限定・函館ミルクスタンド",
            description: "函館の新鮮な牛乳を使ったスイーツが楽しめる期間限定ショップ！",
            date: "2024年7月1日〜2024年8月31日",
            location: "函館駅前広場",
            image_url: "/images/limited_store/milk-stand.jpg"
        };

        // 3分割構想を大きなオブジェクトにまとめて返す
        const integrateHomeResponse = {
            features: featureArticles,
            newSweets: homeNewSweets,
            limitedStore: limitedStoresData
        };
        
        res.json(integrateHomeResponse);

    } catch (error) {
        console.error('homdata構築中にエラー:', error);
        res.status(500).json({
            status: 'error',
            message: 'データの構築中にサーバー内部エラーが発生しました。'
        });
    }
};

export default { getFeatured };



// const getFeatured = (req: Request, res: Response) => {
//     try {
//         // --- 1. 正常終了時の返信処理を追加 ---
//         res.json(featureData);

//     } catch (error) {
//         // --- 2. エラー処理は維持 ---
//         console.error('特集データ取得中にエラー:', error);
//         res.status(500).json({
//             status: 'error',
//             message: 'データの取得中にサーバー内部エラーが発生しました。'
//         });
//     }
// };

// export default { getFeatured };