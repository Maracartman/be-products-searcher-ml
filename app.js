const ens = require('./environment');

// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Routes
const apiRoutes = require('./routes/api.routes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api', apiRoutes);

app.listen(6512, err => {
  console.log("Listening on port 6512");
});
