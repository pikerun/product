import express, { Request, Response } from 'express';
import homeController from '../../controllers/home/homeController';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Here is the home page!');
});
router.get('/featured', homeController.getFeatured);

export default router;