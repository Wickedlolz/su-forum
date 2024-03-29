import { Router } from 'express';
import { postService } from '../services/index.js';
import { isAuth } from '../middlewares/guards.middleware.js';

const router = Router();

router.put('/:postId', isAuth(), async (req, res, next) => {
    const { postId } = req.params;
    const { _id: userId } = req.user;
    const t = 'sd';

    try {
        const likedPost = await postService.likePost(postId, userId);

        res.status(201).json(likedPost);
    } catch (error) {
        next(error);
    }
});

export default router;
