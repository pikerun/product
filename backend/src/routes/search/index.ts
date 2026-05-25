import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    const keyword = req.query.q;
    
    console.log(keyword);

    res.send('search route');
});

export default router;