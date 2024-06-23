import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import TransactionModel from './models/transaction.js';

// Load environment variables from a .env file into process.env
dotenv.config();

console.log('MongoDB URL:', process.env.MONGO_URL); // Debugging line

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB once when the server starts
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
 
})
.then(() => {
  console.log('MONGODB connected successfully');
})
.catch(err => {
  console.error('Failed to connect to MongoDB', err);
  process.exit(1); // Exit the process if the connection fails
});

// app.get('/api/test', (req, res) => {
//   res.json('test-ok2');
// });

app.post('/api/transaction', async (req, res) => {
  try {
    const {price, name, description, datetime } = req.body;
    const transaction = await TransactionModel.create({ price,name, description, datetime });
    res.json(transaction);
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ error: 'Failed to create transaction' });
  }
});

app.get('/api/transactions',async (req,res) => {
  await mongoose.connect(process.env.MONGO_URL);
 const transactions =await TransactionModel.find();// no need to specify what we need to find specifically so nothing in the bracket
 res.json(transactions);
});
app.listen(4040, () => {
  console.log('Server is running on port 4040');
});
