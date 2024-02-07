import Book from "../models/book.js";
import dotenv from "dotenv";

dotenv.config();

class BookController {
    createBook = async (req, res) => {
        try {
            const { bookName, author, description, price } = req.body;
            const book = await Book.create({
                bookName,
                author,
                description,
                price
            });
            res.status(200).json({ message: "Book added successfully.", book });
        } catch (error) {
            res.status(500).json({ message: "Book adding error", error });
        }
    };

    getAllBooks = async (req, res) => {
        try {
            const { pageIndex, perPage, sortField, sortOrder } = req.query;
            const skip = (Number(pageIndex) - 1) * Number(perPage);
            const { count, rows } = await Book.findAndCountAll({
                offset: skip,
                limit: Number(perPage),
                order: [[sortField, sortOrder]],
            });

            res.status(200).json({
                message: "get all books",
                totalCount: count,
                results: rows
            });
        } catch (error) {
            res.status(500).json({ message: "get All books error", error });
        }
    };

    getBookById = async (req, res) => {
        try {
            const { id } = req.params;
            const book = await Book.findOne({
                where: {
                    id
                }
            });
            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            }
            res.status(200).json({ message: 'Book Details fetched successfully', book })
        } catch (error) {
            res.status(500).json({ message: 'get book by Id error', error });
        }
    }

    deleteBookById = async (req, res) => {
        try {
            const { id } = req.params;

            const deletedRowsCount = await Book.destroy({
                where: { id },
            });

            if (deletedRowsCount > 0) {
                res.status(200).json({ message: 'Book deleted successfully' });
            } else {
                return res.status(404).json({ message: 'Book not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Delete book error', error });
        }
    };

    updateBookById = async (req, res) => {
        try {
            const { id } = req.params;
            const { bookName, author, description, price } = req.body;

            const [updatedRowsCount, updatedBooks] = await Book.update(
                { bookName, author, description, price },
                { returning: true, where: { id } }
            );

            if (updatedRowsCount > 0) {
                res.status(200).json({ message: 'Book updated successfully', book: updatedBooks[0] });
            } else {
                return res.status(404).json({ message: 'Book not found' });
            }
        } catch (error) {
            console.log('update prive:', error);
            res.status(500).json({ message: 'Update book error', error });
        }
    };
}
export default new BookController();
