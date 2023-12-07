import { Router } from 'express';

const router = Router();

import authController from '../controllers/auth.controller.js';
import userController from '../controllers/user.controller.js';
import themeController from '../controllers/theme.controller.js';
import postController from '../controllers/post.controller.js';
import likeController from '../controllers/like.controller.js';

router.use('/api/v1/auth', authController);
router.use('/api/v1/users', userController);
router.use('/api/v1/themes', themeController);
router.use('/api/v1/posts', postController);
router.use('/api/v1/likes', likeController);

router.get('/test', (req, res) => {
    res.json({
        name: 'rest-api',
        version: '1.0.0',
        description: 'REST API for SoftUni Forum',
        main: 'index.js',
    });
});

export default router;
