//Dependencies
const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const util = require("util");

//write and read files as async functions
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

//Set up Express to run as server
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const savedObj = require("./db/db.json");

//set static folder
app.use(express.static("public"));

//==== paths ====

//path to saved notes
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/notes.html"))
);

app.get("/test", (req, res) => res.json(path.join(__dirname, "test.json")));

//function here to call to read json
const readJSON = () => {
  return readFileAsync(path.join(__dirname, "/db/db.json"), "utf8");
};

//function here to rewrite json
const writeJSON = (savedNotes) => {
  return writeFileAsync(
    path.join(__dirname, "/db/db.json"),
    JSON.stringify(savedNotes)
  );
};

//path to notes saved to api
app.get("/api/notes", (req, res) => {
  readJSON().then((notes) => {
    res.json(JSON.parse(notes));
  });
});

//path to go to index file
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/index.html"))
);

//save new note to server
app.post("/api/notes", (req, res) => {
  const { title, text } = req.body;
  const newNote = {
    title,
    text,
    id: uuidv4(),
  };

  readJSON().then((response) => {
    let fixedRes = JSON.parse(response);

    fixedRes.push(newNote);

    writeJSON(fixedRes).then(() => {
      res.json(newNote);
    });
  });
});

app.delete("/api/notes/:id", (req, res) => {
  const delNote = req.params.id;

  readJSON().then((response) => {
    let newArr = JSON.parse(response);

    const delArr = newArr.filter((test) => test.id != delNote);

    writeJSON(delArr).then(() => {
      res.end();
    });
  });
});

//start server and set to listen
app.listen(PORT, () => console.log(`Currently listening on PORT ${PORT}`));
