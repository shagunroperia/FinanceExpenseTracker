// controllers/reportController.js
const reportService = require('../services/reportService');
const categoryReport = async (req, res) => {
  try {
    const categoryReport = await reportService.getCategoryReport1();
    res.status(200).json({
      message: 'Category report generated successfully',
      data: categoryReport
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error generating category report',
      error: error.message
    });
  }
};

// Controller method to generate income/expense report
const getIncomeExpenseReport = async (req, res) => {
  try {
    const incomeExpenseReport = await reportService.getIncomeExpenseReport1();
    res.status(200).json({
      message: 'Income/Expense report generated successfully',
      data: incomeExpenseReport
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error generating income/expense report',
      error: error.message
    });
  }
};

// Controller method to generate the yearly report
const getYearlyReport = async (req, res) => {
  try {
    const yearlyReport = await reportService.getYearlyReport();
    res.status(200).json({
      message: 'Yearly report generated successfully',
      data: yearlyReport
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error generating yearly report',
      error: error.message
    });
  }
};

// const monthlyReport = async (req, res) => {
//   try {
//     // const transactions = await transactionService.getTransactionsByUserId(req.userId);
//     // Implement monthly report logic here
//     res.json({ message: 'Monthly report', data: transactions });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


module.exports = {
  categoryReport,
  getIncomeExpenseReport,
  getYearlyReport
};
