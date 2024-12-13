// const express = require('express');
// const mongoose = require('mongoose');
// require('dotenv').config();

// // Import the Mongoose model for transactions
// const Transaction = require('./models/Transaction');

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Connect to MongoDB using Mongoose
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('Error connecting to MongoDB:', err));

// // Middleware to parse JSON bodies
// app.use(express.json());

// app.get('/collections', async (req, res) => {
//   try {
//     // List all collections in the current database
//     const collections = await mongoose.connection.db.listCollections().toArray();
//     console.log("Collections: ", collections);
//     res.json(collections);  // Send the list of collections to the client
//   } catch (error) {
//     console.error("Error listing collections:", error);
//     res.status(500).send('Error listing collections');
//   }
// });

// // GET /transactions - List all transactions
// app.get('/transactions', async (req, res) => {
//   try {
//     const transactions = await Transaction.find({});
//     res.json(transactions);

//   } catch (error) {
//     console.error("Error fetching transactions:", error);
//     res.status(500).send('Error fetching transactions');
//   }
// });


// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
