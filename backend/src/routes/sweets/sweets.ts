import express, { Request, Response } from 'express';
//fs, pathモジュールのインポート
import fs from 'fs';
import path from 'path';
import { Sweet } from '../../types';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    try {
        // sweets.jsonファイルの絶対パスを取得
        const filePath = path.join(__dirname, '../../mocks/sweets/sweets.json');
        // fsモジュールを使ってファイルを読み込む
        const data = fs.readFileSync(filePath, 'utf-8');
        //文字列データをJSONオブジェクトに変換
        const sweetsData: Sweet[] = JSON.parse(data);
        //JSONレスポンスとしてブラウザに送信
        res.json(sweetsData);

    } catch (error) {
        console.error('データの読み込みに失敗しました:', error);
        // エラーレスポンスを送信
        res.status(500).json({ error: 'データの読み込みに失敗しました' });
    }
});
// // 動作確認用テストエンドポイント
// router.get('/', (req, res) => {
//     res.send('Sweets route is working!');
// });

export default router;