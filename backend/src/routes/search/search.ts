import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { Store } from '../../types/index';

import { getFilteredStore } from '../../controllers/search/index'

const router = Router();

router.get('/', (req: Request, res: Response) => {
    try {
    // 1. JSONファイルを読み込む
    // src/routes/sweets.ts から見た sweets.json の場所を指定
    const filePath = path.join(__dirname, '../../mocks/sweets.json');
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const storeData: Store[] = JSON.parse(rawData);

    // 2. クエリパラメータからキーワード取得
    const keyword = req.query.keyword as string;

    // 3. インポートした関数でフィルタリング
    const filteredResults = getFilteredStore(storeData, keyword);

    // 4. 結果を返す
    res.json(filteredResults);

  } catch (error) {
    console.error('File access error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;