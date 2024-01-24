const http = require("http");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");

let currentUser = {};
const jsonData = [
  {
    title: "Literally me",
    author: "Seva",
    creationDate: new Date().toDateString(),
    image: "assets/img/posts/meme_1.png",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi \
  ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit\
  in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur \
  sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt \
  mollit anim id est laborum.",
    comments: [
      {
        author: "Dinu",
        creationDate: new Date().toDateString(),
        content: "lmao",
      },
      {
        author: "Dinu",
        creationDate: new Date().toDateString(),
        content: "wait a second",
      },
    ],
  },
  {
    title: "Post 2",
    author: "Ciprian",
    creationDate: new Date().toDateString(),
    image: "assets/img/posts/meme_2.png",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi \
  ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit\
  in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur \
  sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt \
  mollit anim id est laborum.",
    comments: [
      {
        author: "Andrei",
        creationDate: new Date().toDateString(),
        content: "hello",
      },
    ],
  },
  {
    title: "Post 3",
    author: "Sorin",
    creationDate: new Date().toDateString(),
    image: null,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi \
  ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit\
  in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur \
  sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt \
  mollit anim id est laborum.",
    comments: [
      {
        author: "Sorin",
        creationDate: new Date().toDateString(),
        content: "hello",
      },
    ],
  },
];

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  cors({
    origin: "http://localhost:4200",
    optionsSuccessStatus: 200,
  })
);

app.get("/data", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(jsonData));
});

app.get("/user", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  user_data = {
    firstName: "Steven",
    lastName: "Smith",
    dateOfBirth: "27.05.1980",
    gender: "Male",
    username: "steve",
    email: "steve@mail.com" 
  }
  res.end(JSON.stringify(currentUser));
});

app.post("/create", (req, res) => {
  try {
    // Your POST request handling logic
    res.setHeader("Content-Type", "application/json");
    let data = req.body;
    res.send({ ack: "OK" });
    jsonData.push(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
});

app.post("/user/create", (req, res) => {
  try {
    // Your POST request handling logic
    res.setHeader("Content-Type", "application/json");
    currentUser = req.body;
    res.send({ ack: "OK" });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
});

app.put("/update", (req, res) => {
  console.log(req.body);
});

app.put("/user/update", (req, res) => {
  console.log(req.body);
});

const port = 3000;

http.createServer(app).listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});