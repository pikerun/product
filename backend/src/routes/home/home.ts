import express, { Request, Response } from 'express';
import homeController from '../../controllers/home/homeController';

const router = express.Router();
router.get('/', homeController.getFeatured);

export default router;