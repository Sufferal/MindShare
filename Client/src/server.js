const http = require('http');
const cors = require('cors');
const express = require('express');

const jsonData = [
  { title: 'Initial', author: 'Seva', creationDate: new Date().toDateString(), content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi \
  ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit\
  in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur \
  sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt \
  mollit anim id est laborum.' , comments: [{author: 'Cip', creationDate: new Date().toDateString(), content: 'hello'}]},
  { title: 'Initial', author: 'Seva', creationDate: new Date().toDateString(), content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi \
  ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit\
  in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur \
  sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt \
  mollit anim id est laborum.' , comments: [{author: 'Cip', creationDate: new Date().toDateString(), content: 'hello'}]},
  { title: 'Initial', author: 'Seva', creationDate: new Date().toDateString(), content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi \
  ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit\
  in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur \
  sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt \
  mollit anim id est laborum.' , comments: [{author: 'Cip', creationDate: new Date().toDateString(), content: 'hello'}]}
];

const app = express();

app.use(cors());

app.get('/data', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(jsonData));
});

app.post('/create', (req, res) => {
  console.log(req);
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify('Post created'));
});

const port = 3000;

http.createServer(app).listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});