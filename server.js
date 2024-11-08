// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// Initialize the main project folder
app.use(express.static('website'));

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Setup Server
const port=8000;
const Listening =  ()=> {console.log(`the server is running on ${port}`);};
const server = app.listen(port, Listening);


// POST route to add weather data
app.post('/addWeather', (req, res) => {
    const {City, date, temperature, userResponse, } = req.body;
    projectData = {City, date, temperature, userResponse };
    res.send({ message: 'Data successfully added', projectData });
});

// GET route to retrieve weather data
app.get('/all', (req, res) => {
    res.send(projectData);
});




