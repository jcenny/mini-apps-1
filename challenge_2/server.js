const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use('/', express.static(path.join(__dirname, './client')));
app.use(bodyParser.urlencoded({ extended: false }));


app.post('/upload_JSON', (req, res) => {
  var data = csv(JSON.parse(req.body.data));
  fs.writeFile(path.join(__dirname, 'serverData', 'csv_report.csv'), data, (err) => {
    if (err) {
      res.status(400).send();
    } else {
      // res.send(data);
      res.sendFile(path.join(__dirname, 'serverData', 'csv_report.csv'));
    }
  })
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})

var csv = function (data) {
  var result = '';

  var labels = function(data) {
    for (var key in data) {
      if (key !== 'children') {
        result = result.concat(key, ',');
      } else if (key === 'children') {
        result = result.substring(0, result.length - 1)
        result = result.concat('\n')
      }    
    } 
  }
  
  var getProps = (data) => {
    for (var key in data) {
      if (key !== 'children') {
       result = result.concat(data[key], ',');
      } else if (key === 'children') {     
         result = result.substring(0, result.length - 1)
         result = result.concat('\n')
      }
    }
    data.children.forEach((child) => {
      getProps(child);  
    });
     return result.substring(0, result.length - 1)
  };

  labels(data);
  return getProps(data);
}

