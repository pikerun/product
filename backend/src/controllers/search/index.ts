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
};