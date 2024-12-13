// services/transactionService.js
const Transaction = require('../models/transactionModel');

// Get all transactions for a user
const getTransactionsByUserId = async (userId) => {
  return await Transaction.find({ userId });
  
};

// Create a new transaction
const createTransaction = async (transactionData) => {
  // Validate required fields
  const requiredFields = [
    'Date',
    'Mode',
    'Category',
    'Subcategory',
    'Note',
    'Amount',
    'Income/Expense',
    'Currency',
    'userId',
  ];
  const missingFields = requiredFields.filter(field => !transactionData[field]);
  if (missingFields.length > 0) {
    throw new Error(`Missing fields: ${missingFields.join(', ')}`);
  }

  // Create and save the transaction
  const newTransaction = new Transaction(transactionData);
  return await newTransaction.save();
};

// Get a single transaction
const getTransactionById = async (id) => {
  return await Transaction.findById(id);
};

// Update a transaction
const updateTransaction = async (id, updatedData) => {
  return await Transaction.findByIdAndUpdate(id, updatedData, { new: true });
};

// Delete a transaction
const deleteTransaction = async (id) => {
  return await Transaction.findByIdAndDelete(id);
};

module.exports = {
  getTransactionsByUserId,
  createTransaction,
  getTransactionById,
  updateTransaction,
  deleteTransaction
};
