import { Router } from 'express';
import { authService } from '../services/index.js';

const router = Router();

router.post('/register', async (req, res, next) => {
    const { tel, email, username, password } = req.body;

    try {
        const user = await authService.register(tel, email, username, password);

        const token = await authService.createToken(user);

        res.cookie(process.env.COOKIE_NAME, token, {
            httpOnly: true,
        });

        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
});

router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await authService.login(email, password);
        const token = await authService.createToken(user);

        res.cookie(process.env.COOKIE_NAME, token, {
            httpOnly: true,
        });

        res.json(user);
    } catch (error) {
        next(error);
    }
});

router.get('/logout', async (req, res, next) => {
    const token = req.cookies[process.env.COOKIE_NAME];

    try {
        await authService.logout(token);

        res.clearCookie(process.env.COOKIE_NAME)
            .status(204)
            .json({ message: 'Logged out!' });
    } catch (error) {
        next(error);
    }
});

export default router;
