import { authService } from "../services/index.js";

const authMiddleware = function () {
  return async (req, res, next) => {
    const token = req.cookies[process.env.COOKIE_NAME] || undefined;

    if (token) {
      try {
        const payload = await authService.validateToken(token);

        req.user = {
          email: payload.email,
          _id: payload._id,
          username: payload.username,
          token,
        };
      } catch (error) {
        return res
          .status(403)
          .clearCookie(process.env.COOKIE_NAME)
          .json({ message: "Invalid access token. Please sign in." });
      }
    }

    next();
  };
};

export default authMiddleware;
