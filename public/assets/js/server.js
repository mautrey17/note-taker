//Dependencies
const express = require('express');
const path = require('path');

//Set up Express to run as server
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//paths

//path to saved notes
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '../../notes.html')));

//path to go to index file
app.get('/*', (req, res) => res.sendFile(path.join(__dirname, '../../index.html')));




//start server and set to listen
app.listen(PORT, () => console.log(`Currently listening on PORT ${PORT}`));