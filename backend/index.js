const express = require('express');
const dotenv = require('dotenv');
const handleResponse = require('./helpers/responseHandler');
const CusError = require('./helpers/cusError');
const responseType = require('./helpers/responseType');
const bodyParser = require('body-parser');

dotenv.config({ path: './configs/.env' });

const app = new express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});
app.options('*', (req, res) => res.status(201).end());

require('./routes')(app);

app.use(function (req, res, next) {
  let error = new CusError(responseType.NOT_FOUND, 'URL Not Found');
  logger.log(`warn`, req, res, `Requested URL [${req.url}] not found.`);
  next(error);
});

app.use(handleResponse.handleError);

let server = app.listen(process.env.PORT, function () {
  let port = server.address().port;
  console.log(`Book service listening at port ${server.address().port}.`);
});  

module.exports = server
