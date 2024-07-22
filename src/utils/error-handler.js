// @bt-ignore-file <please let us the reason to ignore>
const { default: mongoose } = require("mongoose");

const errorHandler = (err, req, res, next) => {
  console.log(err);

  //  Duplicate record error handler
  if (err.code && err.code === 11000) {
    const fields = Object.keys(err.keyValue);
    return res.status(400).json({
      error: `${fields[0]} already exists`,
      code: 400,
      error_code: "DUPLICATE",
    });
  }

  // Cast error handler
  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({
      error: `${err.path} is invalid`,
      code: 400,
      error_code: "BAD_REQUEST",
    });
  }

  if (err.code && err.code === 1013) {
    return res.status(400).json({
      error: `bad content-type header, no multipart boundary`,
      code: 400,
      error_code: "BAD_REQUEST",
    });
  }

  if (err.code && err.code === 1012) {
    return res.status(400).json({
      error: `Stream ended unexpectedly`,
      code: 400,
      error_code: "BAD_REQUEST",
    });
  }


  if (err.code && err.code === 1003) {
    return res.status(400).json({
      error: `Not able to parse the request`,
      code: 400,
      error_code: "BAD_REQUEST",
    });
  }

  

  if (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = errorHandler;
