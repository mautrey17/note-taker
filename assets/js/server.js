//Dependencies
const express = require('express');
const path = require('path');

//Set up Express to run as server
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const testObj = [
    {
        "title":"Test Title",
        "text":"Test text"
    },
    {
        "title":"Second Note",
        "text":"Now the second"
    }
]


//paths

//path to saved notes
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '../../notes.html')));

app.get('/test', (req, res) => res.json(path.join(__dirname, 'test.json')));

const savedObj = require('../../db/db.json')

//path to notes saved to api
app.get('/api/notes', (req, res) => res.json(savedObj));

//path to go to index file
app.get('/*', (req, res) => res.sendFile(path.join(__dirname, '../../index.html')));

//save new note to server
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    savedObj.push(newNote);
})

//start server and set to listen
app.listen(PORT, () => console.log(`Currently listening on PORT ${PORT}`));