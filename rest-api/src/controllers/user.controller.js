import { Router } from 'express';
import { isAuth } from '../middlewares/guards.js';
import { userService } from '../services/index.js';

const router = Router();

router.get('/profile', isAuth(), async (req, res, next) => {
    const { _id } = req.user;

    try {
        const user = await userService.getProfileInfo(_id);

        res.json(user);
    } catch (error) {
        next(error);
    }
});

router.put('/profile', isAuth(), async (req, res, next) => {
    const { _id: userId } = req.user;
    const { tel, username, email } = req.body;

    try {
        const updatedUser = await userService.editProfileInfo(
            userId,
            tel,
            username,
            email
        );

        res.status(201).json(updatedUser);
    } catch (error) {
        next(error);
    }
});

export default router;
