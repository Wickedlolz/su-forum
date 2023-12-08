import { authService } from '../services/index.js';
import TokenBlacklist from '../models/tokenBlacklist.model.js';

const authMiddleware = function () {
    return async (req, res, next) => {
        const token = req.cookies[process.env.COOKIE_NAME] || undefined;

        try {
            if (token) {
                const payload = await authService.validateToken(token);
                const blacklistedToken = await TokenBlacklist.findOne({
                    token,
                });

                if (blacklistedToken) {
                    throw new Error('blacklisted token');
                }

                req.user = {
                    email: payload.email,
                    _id: payload._id,
                    username: payload.username,
                    token,
                };
            }
            next();
        } catch (err) {
            if (
                [
                    'token expired',
                    'blacklisted token',
                    'jwt must be provided',
                ].includes(err.message)
            ) {
                console.error(err);
                res.status(401).send({ message: 'Invalid token!' });
                return;
            }
            next(err);
        }
    };
};

export default authMiddleware;
