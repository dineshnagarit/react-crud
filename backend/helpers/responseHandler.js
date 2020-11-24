const responseType = require('./responseType');
const cusError = require('./cusError');

const errorResponse = (message) => {
  return {
    success: false,
    message
  }
}

const successResponse = (message, data) => {
  return {
    success: true,
    message,
    data
  }
}
const sendError = (req, res, error) => {
  let code = error.code ? error.code : 500;
  res.status(code)
    .json(errorResponse(error.message));
}

const sendData = (req, res, result) => {
  res.status(result.code)
    .json(successResponse(result.message, result.data));
}

const handleError = (error, req, res, next) => {
  try {
   // console.log(error)
    if (!error.code) {
      throw new cusError(responseType.INTERNAL_SERVER_ERROR, error.message || 'Opps! Something not right. Internal server error.')
    }
    if (!!error.code) {
      switch (error.code) {
        case 'ECONNRESET': throw new cusError(responseType.BAD_GATEWAY, 'Service is down');
        case 'ECONNREFUSED': throw new cusError(responseType.BAD_GATEWAY, 'Connection is refused or service is down.');
      };

      console.log(`error`, req, res, error.message);
      console.log(`debug`, req, res, error.message, { error }, ['meta']);
    }
    sendError(req, res, error);
  }
  catch (error) {
    sendError(req, res, error);
  }
};

module.exports = {
  handleError,
  sendData,
  successResponse
};
