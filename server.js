//Dependencies
const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');


//Set up Express to run as server
const app = express();
const PORT = process.env.PORT || 3000;



// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//set static folder
app.use(express.static('public'));

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
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));


app.get('/test', (req, res) => res.json(path.join(__dirname, 'test.json')));

const savedObj = require('./db/db.json')

//function here to call to read json
fs.readFile

//function here to rewrite json
fs.writeFile

//path to notes saved to api
app.get('/api/notes', (req, res) => res.json(savedObj));

//path to go to index file
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));



//save new note to server
app.post('/api/notes', (req, res) => {

    const {title, text} = req.body;
    const newNote = {
        title, text,
        id: uuidv4()
    }
    console.log(newNote);
    savedObj.push(newNote);

    //destructure
})

//to access req.params.id

//uuid for unique id
//uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

//start server and set to listen
app.listen(PORT, () => console.log(`Currently listening on PORT ${PORT}`));