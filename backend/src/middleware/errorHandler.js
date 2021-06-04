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
  console.log(err);
  if (err instanceof ServerError) {
    return res.status(err.status).json({message: err.message});
  }
  if (err instanceof Error) {
    return res.status(500).json({message: err.message});
  }
  return res.sendStatus(500);
};