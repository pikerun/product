import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { Sweet } from '../../types';

export const searchSweets = (req: Request, res: Response) => {
    console.log("--- Search Request Received! ---");
    try {
        const filePath = path.join(__dirname, '../../mocks/sweets.json');
        console.log("Looking for file at:", filePath);
        const data = fs.readFileSync(filePath, 'utf-8');
        const sweetsData: Sweet[] = JSON.parse(data);

        const query = req.query.q as string;
        let filteredSweets = sweetsData;

        if (query) {
            const keyword = query.toLowerCase();
            
            // Completion Condition: Match against sweetName OR category
            filteredSweets = sweetsData.filter((sweet: Sweet) => {
                return (
                    sweet.sweetName.toLowerCase().includes(keyword) ||
                    sweet.category.toLowerCase().includes(keyword)
                );
            });
        }

        res.json(filteredSweets);
    } catch (error) {
        console.error('Search logic failed:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
=======
import { Store } from '../../types/index';

export const getFilteredStore = (storeData: Store[], keyword: string): Store[] => {
    return storeData.filter((store) => {
        // 1. キーワードが空の場合は全ての店舗を返す
        if (!keyword) return true;

        // 2. Storeインターフェースのプロパティに合わせて抽出
        // shopName や description が確実に文字列として存在するか確認しながら includes を実行
        const isNameMatch = store.shopName?.toLowerCase().includes(keyword.toLowerCase()) ?? false;
        const isDescriptionMatch = store.description?.includes(keyword) ?? false;

        // 3. いずれかにキーワードが含まれていればその Store を配列に残す
        return isNameMatch || isDescriptionMatch;
    });
};