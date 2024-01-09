const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Connect to MongoDB
// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/expenseTracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function (callback) {
  console.log('connection succeeded');
});

// Create Expense model
const expenseSchema = new mongoose.Schema({
  category: String,
  amount: Number,
  date: { type: Date, default: Date.now }
});

const Expense = mongoose.model('Expense', expenseSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (like style.css and script.js)
app.use(express.static('public'));

// Set up routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/expenses', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/expenses', async (req, res) => {
  const { category, amount, date } = req.body;
  try {
    const newExpense = new Expense({ category, amount, date });
    await newExpense.save();
    res.json(newExpense);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/expenses/:id', async (req, res) => {
  const expenseId = req.params.id;
  try {
    await Expense.findByIdAndDelete(expenseId);
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
