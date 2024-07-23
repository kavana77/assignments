const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const dbConfig = require('../config');

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

router.post('/insert', (req, res) => {
    const { name, email, message } = req.body;
  
    if (!name || !email || !message) {
        return res.status(400).send('All fields are required');
    }
    connection.query('INSERT INTO feedback SET ?', { name, email, message }, (err, result) => {
        if (err) {
            console.error('Database query error:', err);  
            return res.status(500).send('Server error');
        }
        res.status(201).send('Feedback submitted');
    });
});

  router.get('/retrieve', (req, res) => {
    connection.query( 'SELECT * FROM feedback', (err, results) => {
      if (err) {
        return res.status(500).send('Failed to retrieve Data',err);
      }
      res.json(results);
    });
  });
  
  module.exports = router;