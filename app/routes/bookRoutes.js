import express from "express";
import bookController from '../controller/bookController.js';
import { tokenMiddleware } from "../utils/jwtHelper.js";

const router = express.Router();

router.post('/book', tokenMiddleware, bookController.createBook)
router.get('/books', tokenMiddleware, bookController.getAllBooks)
router.get('/book/:id', tokenMiddleware, bookController.getBookById)
router.delete('/book/:id', tokenMiddleware, bookController.deleteBookById)
router.patch('/book/:id', tokenMiddleware, bookController.updateBookById)

export default router;