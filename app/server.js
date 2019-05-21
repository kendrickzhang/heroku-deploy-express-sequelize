// Dependencies
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

// Configurations
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(cors());

// Routers
const appRouter = require('./router');

app.get('/', (req,res) => res.status(200).json({msg: `${process.env.EXPRESS_APP_MESSAGE}.`}));
app.use('/app', appRouter);

// Connections
app.listen(
  PORT,
  () => console.log(`App listening on PORT ${PORT}, in ${app.get('env')} mode.`)
);

// Exports
module.exports = app;
