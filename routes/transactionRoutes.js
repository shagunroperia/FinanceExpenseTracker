// routes/transactionRoutes.js
const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/',  transactionController.getTransactions);
router.post('/', transactionController.createTransaction);
router.post('/getTransaction', transactionController.getTransactionById);
router.post('/updateTransaction', transactionController.updateTransaction);
// router.post('/deleteTransaction', authMiddleware, transactionController.deleteTransaction);
router.post('/deleteTransaction', transactionController.deleteTransaction);
module.exports = router;
