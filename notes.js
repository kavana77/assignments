const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const db = require('../connection');

const connection = mysql.createConnection(db);

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to  notes database');
  });

 

router.post('/notes', (req, res) => {
    const { title, content } = req.body;
    connection.query('INSERT INTO notes (title, content) VALUES (?, ?)', [title, content], (err, results) => {
      if (err) throw err;
      res.status(201).json({ message:'data inserted successfully' });
    });
  });
  
  
  router.get('/notes', (req, res) => {
   
    connection.query('SELECT * FROM notes', (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });
  

  router.get('/notes/:id', (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM notes WHERE id = ?', [id], (err, results) => {
      if (err) throw err;
      if (results.length === 0) {
        return res.status(404).json({ message: 'Note not found' });
      }
      res.json(results[0]);
    });
  });
  
 
  router.put('/notes/:id', (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    connection.query('UPDATE notes SET title = ?, content = ? WHERE id = ?', [title, content, id], (err, results) => {
      if (err) throw err;
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Note not found' });
      }
      res.json({ message:"Data Updated Successfully"});
    });
  });
  

  router.delete('/notes/:id',(req,res)=>{
    connection.query(`DELETE FROM notes WHERE id=${req.params.id} `,(err,results)=>{
        if(err) throw err
        res.send("note deleted",results)
    })

})
  
  module.exports = router;

