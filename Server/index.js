const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const session = require('express-session');



const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(session({
  secret: 'vengeance', 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

// MongoDB connection
mongoose.connect('mongodb+srv://nhivas:2004@cluster0.oqy28dm.mongodb.net/PC_factory')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// User schema
const userSchema = new mongoose.Schema({
    username: String,
  password: String,
  name: String,
  email: String,
  phone: String,
  address: String
});

const PCSchema = new mongoose.Schema({
  cpu: String,
  motherboard: String,
  ram: String,
  gpu: String,
  cooler: String,
  ssd: String,
  cabinet: String,
  smps: String,
  price: Number,
  ordered_by: {
      username: String,
      name: String,
      email: String,
      phone: String
  }
});

  

const querySchema = new mongoose.Schema({
  username: String,
  email: String,
  query: String,
  date: { type: Date, default: Date.now }
});

  
  const PC = mongoose.model('PC', PCSchema);
const User = mongoose.model('User', userSchema);
const Query = mongoose.model('Query', querySchema);




app.post('/api/contact', async (req, res) => {
  const { username, email, query } = req.body;
  try {
      // Validate user
      const user = await User.findOne({ username, email });
      if (!user) {
          return res.status(400).json({ message: 'User not found' });
      }

      // Create a new query document
      const newQuery = new Query({ username, email, query });
      await newQuery.save();

      res.status(201).json({ message: 'Query submitted successfully' });
  } catch (error) {
      console.error('Error handling contact query:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});





app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
      res.json({ message: 'Login successful', user });
  } else {
      res.status(401).json({ message: 'Invalid username or password' });
  }
});

// Signup route
app.post('/api/signup', async (req, res) => {
  const { username, password, email, name, phone, address } = req.body;
  try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
          return res.status(400).json({ message: 'Username already exists' });
      }
      const newUser = new User({ username, password, email, name, phone, address });
      await newUser.save();
      res.status(201).json({ message: 'Signup successful' });
  } catch (error) {
      console.error('Error during signup:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error logging out:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.status(200).json({ message: 'Logout successful' });
  });
});



app.post('/api/pc', async (req, res) => {
  const { cpu, motherboard, ram, gpu, cooler, ssd, cabinet, smps, price, ordered_by } = req.body;
  try {
    const newPCOrder = new PC({
      cpu, motherboard, ram, gpu, cooler, ssd, cabinet, smps,
      price, ordered_by,
      order_status: 'pending', // Set the order status to 'pending' by default
    });
    await newPCOrder.save();
    res.status(201).json({ message: 'Order placed successfully' });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




// Contact route
app.post('/api/contact', async (req, res) => {
  const { username, email, query } = req.body;
  try {
      // Validate user
      const user = await User.findOne({ username, email });
      if (!user) {
          return res.status(400).json({ message: 'User not found' });
      }

      // Create a new query document
      const newQuery = new Query({ username, email, query });
      await newQuery.save();

      res.status(201).json({ message: 'Query submitted successfully' });
  } catch (error) {
      console.error('Error handling contact query:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

// Logout route
app.post('/api/logout', (req, res) => {
  req.session.destroy((err) => {
      if (err) {
          console.error('Error logging out:', err);
          return res.status(500).json({ message: 'Internal server error' });
      }
      res.status(200).json({ message: 'Logout successful' });
  });
});


// Backend API to confirm order
// Backend API to confirm order
app.post('/api/confirm-order', async (req, res) => {
  // Extract data from request body
  const { username, name, email, phone, selectedComponents, totalPrice } = req.body;

  try {
    // Validate user or get user ID from JWT token if available
    // For simplicity, assuming username is unique and valid
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Create a new order in the database
    const newOrder = new PC({
      ...selectedComponents,
      price: totalPrice,
      purpose: 'custom', // Example purpose
      ordered_by: user._id, // Assuming user ID is used in PC schema
    });

    await newOrder.save();

    // You can also send a confirmation email or perform other actions here

    res.status(201).json({ message: 'Order confirmed successfully' });
  } catch (error) {
    console.error('Error confirming order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
