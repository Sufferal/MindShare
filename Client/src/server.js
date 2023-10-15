const http = require('http');
const cors = require('cors')

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

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'GET') {
    if (req.url === '/data') {
        cors()(req, res, () => {
            res.end(JSON.stringify(jsonData));
        });
    } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: 'Not Found' }));
    }
    } else {
    res.statusCode = 405;
    res.end(JSON.stringify({ error: 'Method Not Allowed' }));
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
