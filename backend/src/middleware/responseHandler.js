export const responseHandler = (req, res, next) => {
  res.sendFormat = (data, statusCode = 200, message = 'OK', error = false) => {
    res.status(statusCode).json({
      statusCode: statusCode,
      error,
      message,
      data,
    });
  };
  next();
};