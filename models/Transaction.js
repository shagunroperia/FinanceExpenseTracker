// const mongoose = require('mongoose');

// // Define the schema for the transaction document
// const transactionSchema = new mongoose.Schema({
//   Date: {
//     type: Date, // This should be of type Date
//     required: true
//   },
//   Mode: {
//     type: String,
//     required: true
//   },
//   Category: {
//     type: String,
//     required: true
//   },
//   Subcategory: {
//     type: String,
//     required: true
//   },
//   Note: {
//     type: String,
//     required: true
//   },
//   Amount: {
//     type: Number, // Use Number for floating-point values (Double in MongoDB)
//     required: true
//   },
//   'Income/Expense': {
//     type: String,
//     enum: ['Income', 'Expense'],
//     required: true
//   },
//   Currency: {
//     type: String,
//     required: true
//   },
//   userId: {
//     type: String,
//     required: true
//   }
// });

// // Using virtuals to create a "type" field that maps to "Income/Expense"
// transactionSchema.virtual('type').get(function() {
//   return this['Income/Expense'];  // This will return the value of "Income/Expense" as "type"
// });

// // Exclude the original "Income/Expense" field from the result when converting to JSON
// transactionSchema.set('toJSON', {
//   virtuals: true, // Include virtuals when converting to JSON
//   transform: (doc, ret) => {
//     delete ret['Income/Expense'];  // Remove the original field from the response
//     return ret;
//   },
// });

// // Create the model using the schema
// const Transaction = mongoose.model('Transaction', transactionSchema);

// module.exports = Transaction;
