import express from 'express';
import { searchSweets } from '../../controllers/search';

const router = express.Router();
router.get('/', searchSweets);

export default router;