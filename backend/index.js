const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const Contact = require('./contact'); // Import the Contact model
const routes = require('./routes'); // Import the routes

const app = express();
const port = 3000;

// Use body-parser middleware to parse incoming JSON data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const corsOptions = {
  origin: 'http://127.0.0.1:5500', // Allow requests from your frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// Connect to MongoDB
mongoose.connect('MDBURL', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Use the routes
app.use(routes);

// Retrieve and display contact data
app.get('/contacts', (req, res) => {
  Contact.find({}, '-__v', (err, contacts) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving contact data');
    } else {
      res.json(contacts);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
