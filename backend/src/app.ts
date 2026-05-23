import express, { Request, Response } from 'express';
import homeRoutes from './routes/home/home';
import detailRoutes from './routes/stores/detail';
import sweetsRoutes from './routes/sweets/sweets';
import searchRoutes from './routes/search/search';

const app = express();
const port = 3000;

// トップページ (http://localhost:3000) にアクセスしたときの処理
app.get('/api', (req: Request, res: Response) => {
    res.send('Express is working!');
});

app.use('/api/home',homeRoutes);
app.use('/api/stores', detailRoutes);
app.use('/api/sweets', sweetsRoutes);
app.use('/api/search', searchRoutes);

// サーバーを起動して待機する
app.listen(port, () => {
    console.log(`サーバーが起動しました: http://localhost:${port}`);
});

