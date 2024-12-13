const Transaction = require('../models/transactionModel');

// API 1: Get the number of records and their respective percentage by category
const getCategoryReport = async () => {
  try {
    // Get all transactions
    const transactions = await Transaction.find({});

    // Group transactions by category
    const categoryCounts = transactions.reduce((acc, transaction) => {
      const { Category, Amount } = transaction;
      if (acc[Category]) {
        acc[Category].count++;
        acc[Category].amount += Amount;
      } else {
        acc[Category] = { count: 1, amount: Amount };
      }
      return acc;
    }, {});

    // Calculate the percentage for each category
    const totalTransactions = transactions.length;
    const totalAmount = transactions.reduce((sum, transaction) => sum + transaction.Amount, 0);
    const categoryPercentage = Object.keys(categoryCounts).map(category => {
        const { count, amount } = categoryCounts[category];
        return {
          category,
          count,
          amount,
          percentage: ((count / totalTransactions) * 100).toFixed(2),
          amountPercentage: ((amount / totalAmount) * 100).toFixed(2)
        };
      });

    return categoryPercentage;
  } catch (error) {
    throw new Error(error.message);
  }
};

// API 2: Get the number of records and their respective percentage by the 'Income/Expense' field
const getIncomeExpenseReport = async () => {
    try {
      // Get all transactions
      const transactions = await Transaction.find({});
  
      // Group transactions by 'Income/Expense' field
      const incomeExpenseCounts = transactions.reduce((acc, transaction) => {
        const { 'Income/Expense': type, Amount } = transaction;
        if (acc[type]) {
          acc[type].count++;
          acc[type].amount += Amount;
        } else {
          acc[type] = { count: 1, amount: Amount };
        }
        return acc;
      }, {});
  
      // Calculate the percentage for each type (Income/Expense)
      const totalTransactions = transactions.length;
      const totalAmount = transactions.reduce((sum, transaction) => sum + transaction.Amount, 0);
  
      const incomeExpensePercentage = Object.keys(incomeExpenseCounts).map(type => {
        const { count, amount } = incomeExpenseCounts[type];
        return {
          type,
          count,
          amount,
          percentage: ((count / totalTransactions) * 100).toFixed(2),
          amountPercentage: ((amount / totalAmount) * 100).toFixed(2)
        };
      });
  
      return incomeExpensePercentage;
    } catch (error) {
      throw new Error(error.message);
    }
  };

// API 2: Get the number of records, their respective percentage, and total amount by 'Income/Expense' field
const getIncomeExpenseReport1 = async () => {
    try {
      // Aggregation pipeline
      const aggregationResult = await Transaction.aggregate([
        {
          $group: {
            _id: "$Income/Expense", // Group by 'Income/Expense'
            count: { $sum: 1 }, // Count the records in each type
            amount: { $sum: "$Amount" }, // Sum of amounts in each type
          }
        },
        {
          $lookup: {
            from: "transactions", // Reference the transactions collection
            pipeline: [
              { $group: { _id: null, totalCount: { $sum: 1 }, totalAmount: { $sum: "$Amount" } } }
            ],
            as: "total"
          }
        },
        {
          $unwind: "$total" // Unwind the total field to get the values in the same document
        },
        {
          $project: {
            type: "$_id",
            count: 1,
            amount: 1,
            percentage: { $round: [{ $multiply: [{ $divide: ["$count", "$total.totalCount"] }, 100] }, 2] },
            amountPercentage: { $round: [{ $multiply: [{ $divide: ["$amount", "$total.totalAmount"] }, 100] }, 2] }
          }
        },
        {
          $sort: { count: -1 } // Optional: Sort by count, or you can choose another sorting field
        }
      ]);
  
      return aggregationResult;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
// API 1: Get the number of records, their respective percentage, and total amount by category
const getCategoryReport1 = async () => {
    try {
      // Aggregation pipeline
      const aggregationResult = await Transaction.aggregate([
        {
          $group: {
            _id: "$Category", // Group by category
            count: { $sum: 1 }, // Count the records in each category
            amount: { $sum: "$Amount" }, // Sum of amounts in each category
          }
        },
        {
          $lookup: {
            from: "transactions", // Reference the transactions collection
            pipeline: [
              { $group: { _id: null, totalCount: { $sum: 1 }, totalAmount: { $sum: "$Amount" } } }
            ],
            as: "total"
          }
        },
        {
          $unwind: "$total" // Unwind the total field to get the values in the same document
        },
        {
          $project: {
            category: "$_id",
            count: 1,
            amount: 1,
            percentage: { $round: [{ $multiply: [{ $divide: ["$count", "$total.totalCount"] }, 100] }, 2] },
            amountPercentage: { $round: [{ $multiply: [{ $divide: ["$amount", "$total.totalAmount"] }, 100] }, 2] }
          }
        },
        {
          $sort: { count: -1 } // Optional: Sort by count, or you can choose another sorting field
        }
      ]);
  
      return aggregationResult;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // API: Get the yearly report for income/expense categories
const getYearlyReport = async () => {
  try {
    // Aggregation pipeline for yearly report
    const aggregationResult = await Transaction.aggregate([
      {
        $project: {
          year: { $year: "$Date" }, // Extract year from the 'Date' field
          incomeExpense: "$Income/Expense", // Include the 'Income/Expense' field
          amount: "$Amount", // Include the 'Amount' field
        }
      },
      {
        $group: {
          _id: { year: "$year", incomeExpense: "$incomeExpense" }, // Group by year and income/expense
          count: { $sum: 1 }, // Count the number of records in each group
          amount: { $sum: "$amount" }, // Sum the amount in each group
        }
      },
      {
        $lookup: {
          from: "transactions", // Reference the transactions collection
          pipeline: [
            { $group: { _id: null, totalCount: { $sum: 1 }, totalAmount: { $sum: "$Amount" } } }
          ],
          as: "total"
        }
      },
      {
        $unwind: "$total" // Unwind the total field to access the total count and amount
      },
      {
        $project: {
          year: "$_id.year",
          incomeExpense: "$_id.incomeExpense",
          count: 1,
          amount: 1,
          percentage: { $round: [{ $multiply: [{ $divide: ["$count", "$total.totalCount"] }, 100] }, 2] },
          amountPercentage: { $round: [{ $multiply: [{ $divide: ["$amount", "$total.totalAmount"] }, 100] }, 2] }
        }
      },
      {
        $sort: { year: 1, incomeExpense: 1 } // Optional: Sort by year, then income/expense
      }
    ]);

    return aggregationResult;
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = {
  getCategoryReport,
  getIncomeExpenseReport,
  getIncomeExpenseReport1,
  getCategoryReport1,
  getYearlyReport
};
