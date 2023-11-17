export const isAuth = function () {
  return (req, res, next) => {
    if (!req.user) {
      res.status(401).json({ message: "Please log in." });
    }

    next();
  };
};
