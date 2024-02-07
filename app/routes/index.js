import express from 'express'
import book from './bookRoutes.js';
import auth from './authRoute.js';

const router = express.Router()

router.use('/', book);
router.use('/', auth);

export default router