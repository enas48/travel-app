// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
// Start up an instance of app
const app = express();

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

app.get('/', function(req, res) {
  res.sendFile('dist/index.html');
});

app.get('/test', async (req, res) => {
  res.json({ message: 'pass!' });
});

// Initialize all route with a callback function
app.post('/addTripInfo', addTripInfo);
app.get('/all', getAllData);

// Callback function to complete PosT '/addTripInfo'
function addTripInfo(req, res) {
  projectData.city = req.body.city;
  projectData.dayDiff = req.body.dayDiff;
  projectData.triplength = req.body.triplength;
  projectData.departDate = req.body.departDate;
  projectData.returnDate = req.body.returnDate;
  projectData.timestep = req.body.timestep;
  res.send(projectData);
}

// Callback function to complete GET '/all'
function getAllData(req, res) {
  res.send(projectData);
  console.log(projectData);
}



module.exports = app;
