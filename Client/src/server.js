const http = require("http");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");

let currentUser = {};
const jsonData = [
  {
    title: "Hiking",
    author: "Sorin",
    creationDate: new Date().toDateString(),
    image: "assets/img/posts/hiking.jpg",
    content: "I went hiking today and it was awesome!",
    comments: [
      {
        author: "Andrei",
        creationDate: new Date().toDateString(),
        content: "Nice! Where is this place?",
      }
    ],
  },
  {
    title: "Best profile picture",
    author: "Dinu",
    creationDate: new Date().toDateString(),
    image: "assets/img/posts/pfp.jpg",
    content: "I think this is the best profile picture and here is why: I look good",
    comments: [
      {
        author: "Ciprian",
        creationDate: new Date().toDateString(),
        content: "No, I don't think so",
      }
    ],
  },
  {
    title: "Literally me",
    author: "Seva",
    creationDate: new Date().toDateString(),
    image: "assets/img/posts/meme_1.png",
    content: "When you receive the rejection email from Google.",
    comments: [
      {
        author: "Dinu",
        creationDate: new Date().toDateString(),
        content: "lmao",
      },
      {
        author: "Sorin",
        creationDate: new Date().toDateString(),
        content: "I can relate",
      },
    ],
  },
  {
    title: "Lightweight is the way to go",
    author: "Danu",
    creationDate: new Date().toDateString(),
    image: "assets/img/posts/lightweight.jpg",
    content: "I am the boss of this gym",
    comments: [
      {
        author: "Sorin",
        creationDate: new Date().toDateString(),
        content: "Big muscles, big brain",
      }
    ],
  },
  {
    title: "Every time",
    author: "Ciprian",
    creationDate: new Date().toDateString(),
    image: "assets/img/posts/meme_2.png",
    content: "Ads on mobile games be like:",
    comments: [
      {
        author: "Seva",
        creationDate: new Date().toDateString(),
        content: "I hate this, but they have to make money somehow",
      },
    ],
  },
  {
    title: "Python is the best programming language",
    author: "Andrei",
    creationDate: new Date().toDateString(),
    image: "assets/img/posts/python.png",
    content: "The title says it all",
    comments: [
      {
        author: "Ciprian",
        creationDate: new Date().toDateString(),
        content: "debatable, buddy",
      },
    ],
  },
  {
    title: "Witcher 3 is the best game ever",
    author: "Ciprian",
    creationDate: new Date().toDateString(),
    image: "assets/img/posts/witcher.jpg",
    content: "I have played a lot of games in my life, but this one is the best",
    comments: [
      {
        author: "Sorin",
        creationDate: new Date().toDateString(),
        content: "I don't know, I think CS 2 is better",
      },
      {
        author: "Ciprian",
        creationDate: new Date().toDateString(),
        content: "You are so wrong. Literally 0 taste",
      },
      {
        author: "Dinu",
        creationDate: new Date().toDateString(),
        content: "You are both wrong. Minecraft is the best game ever",
      },
      {
        author: "Danu",
        creationDate: new Date().toDateString(),
        content: "All of you go and touch grass",
      },
      {
        author: "Ciprian",
        creationDate: new Date().toDateString(),
        content: "I am going to cry now",
      },
      {
        author: "Seva",
        creationDate: new Date().toDateString(),
        content: "I am going to cry with you",
      },
      {
        author: "Andrei",
        creationDate: new Date().toDateString(),
        content: "Quick, someone call the ambulance",
      }
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