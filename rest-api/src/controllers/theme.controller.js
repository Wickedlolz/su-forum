import { Router } from 'express';
import { themeService, postService } from '../services/index.js';
import { isAuth } from '../middlewares/guards.middleware.js';

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const themes = await themeService.getThemes();

        res.json(themes);
    } catch (error) {
        next(error);
    }
});

router.get('/:themeId', async (req, res, next) => {
    const { themeId } = req.params;

    try {
        const theme = await themeService.getThemeById(themeId);

        res.json(theme);
    } catch (error) {
        next(error);
    }
});

router.post('/', isAuth(), async (req, res, next) => {
    const { themeName, postText } = req.body;
    const { _id: userId } = req.user;

    try {
        const theme = await themeService.createTheme(
            themeName,
            userId,
            postText
        );

        res.status(201).json(theme);
    } catch (error) {
        next(error);
    }
});

router.post('/:themeId', isAuth(), async (req, res, next) => {
    const { themeId } = req.params;
    const { postText } = req.body;
    const { _id: userId } = req.user;

    try {
        const updatedTheme = await postService.createPost(
            postText,
            userId,
            themeId
        );
        res.json(updatedTheme);
    } catch (error) {
        next(error);
    }
});

router.put('/:themeId', isAuth(), async (req, res, next) => {
    const themeId = req.params.themeId;
    const { _id: userId } = req.user;

    try {
        const updatedTheme = await themeService.subscribe(themeId, userId);

        res.status(201).json(updatedTheme);
    } catch (error) {
        next(error);
    }
});

router.put('/:themeId/posts/:postId', isAuth(), async (req, res, next) => {
    const { postId } = req.params;
    const { postText } = req.body;
    const { _id: userId } = req.user;

    try {
        const updatedPost = await postService.editPost(
            postText,
            userId,
            postId
        );
        res.status(201).json(updatedPost);
    } catch (error) {
        next(error);
    }
});

router.delete('/:themeId/posts/:postId', isAuth(), async (req, res, next) => {
    const { postId, themeId } = req.params;
    const { _id: userId } = req.user;

    try {
        const deletedPost = await postService.deletePost(
            postId,
            themeId,
            userId
        );

        res.json(deletedPost);
    } catch (error) {
        next(error);
    }
});

export default router;
