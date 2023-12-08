import Theme from '../models/theme.model.js';
import { createPost } from './post.service.js';

export const getThemes = async () => {
    const themes = await Theme.find({})
        .sort({ createdAt: -1 })
        .populate({ path: 'userId', select: '-password' });

    return themes;
};

export const getThemeById = async (themeId) => {
    const theme = await Theme.findById(themeId).populate({
        path: 'posts',
        populate: {
            path: 'userId',
            select: '-password',
        },
    });

    return theme;
};

export const createTheme = async (themeName, userId, postText) => {
    const theme = new Theme({ themeName, userId, subscribers: [userId] });

    await theme.save();

    const updatedTheme = await createPost(postText, userId, theme._id);

    return updatedTheme;
};

export const subscribe = async (themeId, userId) => {
    const theme = await Theme.findById(themeId);
    const isSubscribed = theme.subscribers.includes(userId);

    if (isSubscribed) {
        theme.subscribers.pull(userId);
    } else {
        theme.subscribers.push(userId);
    }

    await theme.save();

    return theme.populate([
        'posts',
        { path: 'posts', populate: { path: 'userId', select: '-password' } },
        { path: 'userId', select: '-password' },
    ]);
};
