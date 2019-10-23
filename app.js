// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const { logError, logRequest } = require('./services/loggin');
// Routes
const apiRoutes = require('./routes/api.routes');



const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());

app.use(logError);
app.use(logRequest);
app.use('/api', apiRoutes);

app.listen(6512, err => {
  console.log('Listening on port 6512');
});
