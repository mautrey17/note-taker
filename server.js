//Dependencies
const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

//Set up Express to run as server
const app = express();
const PORT = process.env.PORT || 3000;



// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const savedObj = require('./db/db.json');

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

let savedNotes = [];

//function here to call to read json
const readJSON = () => {
    return readFileAsync(path.join(__dirname,'/db/db.json'), 'utf8') 
}



//function here to rewrite json
const writeJSON = (savedNotes) => {
    
    return writeFileAsync(path.join(__dirname,'/db/db.json'), JSON.stringify(savedNotes));

}


//path to notes saved to api
app.get('/api/notes', (req, res) => {
    readJSON().then(notes => {
        res.json(JSON.parse(notes))
    })
});

//path to go to index file
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));



//save new note to server
app.post('/api/notes', (req, res) => {

    const {title, text} = req.body;
    const newNote = {
        title, text,
        id: uuidv4()
    }

    readJSON().then((response) => {

        let fixedRes = JSON.parse(response);

        fixedRes.push(newNote);
        
        writeJSON(fixedRes).then(() => {
            res.json(newNote);
        });   
    })
});

app.delete('/api/notes/:id', (req, res) => {
    const delNote = req.params.id;

    console.log(delNote);

    readJSON().then((response) => {

        let newArr = JSON.parse(response);

        const delArr = newArr.filter(test => test.id != delNote);
        console.log(delArr);
        
        
        writeJSON(delArr).then(() => {
            res.end();
        });   
    })




    // fs.readFileSync('./db/db.json', 'utf8', (err, data) => {
    //     if(err){
    //        console.log(err);
    //        return 
    //     } ;
    //     console.log(data);
    //     let newArr = JSON.parse(data);
    //     const delArr = newArr.filter(test => test.id != delNote);
    //     console.log(delArr);
    //     return delArr
    // }).then((err, response) => {
    //     fs.writeFile('./db/db.json', response, err => {
    //         if(err) {
    //             console.error(err)
    //             return
    //         }
    //         console.log(`${delNote} has been deleted`);
    //     })
    // })
})

//to access req.params.id

//uuid for unique id
//uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

//start server and set to listen
app.listen(PORT, () => console.log(`Currently listening on PORT ${PORT}`));
