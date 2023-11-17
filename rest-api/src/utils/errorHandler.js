function errorHandler(error, req, res, next) {
  if (error.status === 333) {
    res.status(333).json({ message: "ErrorHandler: not allowed!" });
  } else {
    res.status(500).json({
      message: "ErrorHandler: Something went wrong!",
      error,
    });
  }
}

export default errorHandler;
