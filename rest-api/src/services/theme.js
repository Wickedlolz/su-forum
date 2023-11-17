import Theme from "../models/theme.model.js";
import { createPost } from "./post.js";

export const getThemes = async () => {
  const themes = await Theme.find({}).populate("userId");
  return themes;
};

export const getThemeById = async (themeId) => {
  const theme = await Theme.findById(themeId).populate({
    path: "posts",
    populate: {
      path: "userId",
    },
  });

  return theme;
};

export const createTheme = async (themeName, userId, postText) => {
  const theme = new Theme({ themeName, userId, subscribers: [userId] });
  const updatedTheme = await createPost(postText, userId, theme._id);

  return updatedTheme;
};

export const subscribe = async (themeId, userId) => {
  const updatedTheme = await Theme.findByIdAndUpdate(
    { _id: themeId },
    { $addToSet: { subscribers: userId } },
    { new: true }
  );

  return updatedTheme;
};
