const http = require('http');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const PORT = 3000;
const fs = require('fs');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let users = [];
fs.readFile('./users.json', 'utf8', (err, jsonString) => {
  if (err) {
    console.log("File read failed:", err);
    return;
  }
  users = JSON.parse(jsonString);
});

app.get('/api/users', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(users));
});

app.post('/api/login', (req, res) => {
  console.log(req.body);

  isLoginSuccessful = false;
  users.forEach(user => {
    if (user.email === req.body.email && user.password === req.body.password) {
      isLoginSuccessful = true;
      console.log('Login successful');
    }
  });

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(isLoginSuccessful));
});

app.post('/api/register', (req, res) => {
  console.log('User created');
  console.log(req.body);
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify('User created'));
});

http.createServer(app).listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});