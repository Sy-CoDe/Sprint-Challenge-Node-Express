const express = require('express');
const helmet = require('helmet');  //not needed for this project, but useul practice
const cors = require('cors');  //not needed for this project, but useul practice

const actionModelRoutes = require('./data/Routes/actionModelRoutes');
const projectModelRoutes = require('./data/Routes/projectModelRoutes');


const server = express();    //create the server


function errorHandler(err, req, res, next) {
  if (err) {
    // check the type of error and react to it
    if (err.errno === 19) {
      res.status(400).json({ msg: 'Please provide all required fields' });
    } else {
      res.status(500).json({ error: 'something bad happened' });
    }
  }
}


// add middleware
server.use(express.json());   //built in Express body parser
server.use(helmet());  //not needed for this project, but useul practice
server.use(cors());  //not needed for this project, but useul practice

// use Route handlers
server.use('/api/actions', actionModelRoutes);
server.use('/api/projects', projectModelRoutes);

server.get('/', (req, res) => {
  res.json({ api: 'server is running' });
});

// ALWAYS EXECUTE ERROR HANDLER @ END SO IT WILL CATCH ALL MISSED ERRORS
server.use(errorHandler);

const port = 8000;
server.listen(port, () => console.log(`\n== API Running on port ${port} ==\n`));
