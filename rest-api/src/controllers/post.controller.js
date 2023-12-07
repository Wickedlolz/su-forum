import { Router } from 'express';
import { postService } from '../services/index.js';
import { isAuth } from '../middlewares/guards.middleware.js';

const router = Router();

router.get('/', async (req, res, next) => {
    const limit = Number(req.query.limit) || 0;

    try {
        const posts = await postService.getLatestPosts(limit);

        res.json(posts);
    } catch (error) {
        next(error);
    }
});

export default router;
