// routes/reportRoutes.js
const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/category', reportController.categoryReport);
router.get('/incomeExpense', reportController.getIncomeExpenseReport);
// router.get('/monthly', reportController.monthlyReport);
router.get('/yearly', reportController.getYearlyReport);

module.exports = router;
