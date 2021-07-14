export const responseHandler = (req, res, next) => {
  res.sendFormat = (data, statusCode = 200, message = 'OK', isError = false) => {
    res.json({
      statusCode: statusCode,
      isError,
      message,
      data,
    });
  };
  next();
};