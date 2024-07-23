const express = require('express');
const fs = require('fs');
const { parse } = require('json2csv');
const router = express.Router();



router.get('/convert', (req, res) => {
    const jsonFile = 'data.json';
    const csvFile = 'data.csv'; 
  
    const convertJsonToCsv = (jsonFile, csvFile) => {
      fs.readFile(jsonFile, 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading JSON file:', err);
        }
        try {
          const jsonData = JSON.parse(data);
          const csvData = parse(jsonData);
  
          fs.writeFile(csvFile, csvData, (err) => {
            if (err) {
              console.error('Error writing CSV file:', err);
            }
            res.status(200).json({ message: 'CSV file has been saved', csvFile });
          });
        } catch (err) {
          console.error('Error parsing JSON data:', err);        }
      });
    };
  
    convertJsonToCsv(jsonFile, csvFile);
  });

  module.exports = router;


