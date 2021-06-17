export class ServerError extends Error{
  status;
  message;
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }
}

export const errorHandler = (err, req, res, next) => {
  console.log("Error:", err);
  if (err instanceof ServerError) {
    return res.sendFormat(null, err.status, err.message, true);
  }
  if (err instanceof Error) {
    return res.sendFormat(null, 500, err.message, true);
  }
  return res.sendFormat(null, 500, 'Server Error', true);
};