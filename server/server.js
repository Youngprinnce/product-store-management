require('dotenv').config();
const express = require('express');
const cors = require("cors")
const routes = require('./routes/routes');
const InitiateMongoServer = require('./db/db');
const path = require("path")

//Express instance
const app = express();

//Initiate Mongo Server
InitiateMongoServer();

//Express Configuration
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/public', express.static(path.join(__dirname, 'uploads')));

// Read the host address and the port from the environment
const hostname = process.env.HOST;
const PORT = process.env.PORT || 3000;

//Routes
routes(app);

// Start a TCP server listening for connections on the given port and host
app.listen(PORT, hostname, () => {
  console.log(`Server running at http://${hostname}:${PORT}/`);
});
