const express = require('express');
const Contact = require('./contact'); // Import the Contact model

const router = express.Router();

// Define a route for handling form submissions
router.post('/submit', (req, res) => {
  const formData = req.body;

  // Create a new contact instance
  const newContact = new Contact({
    name: formData.name,
    email: formData.email,
    subject: formData.subject,
    message: formData.message,
  });

  // Save the contact data to the database
  newContact.save()
    .then(() => {
      res.status(200).send('Contact data saved successfully');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error saving contact data');
    });
});

module.exports = router;
