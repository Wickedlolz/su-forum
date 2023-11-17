import { Router } from "express";
import { postService } from "../services/index.js";
import { isAuth } from "../middlewares/guards.js";

const router = Router();

router.put("/:postId", isAuth(), async (req, res, next) => {
  const { postId } = req.params;
  const { _id: userId } = req.user;

  try {
    const likedPost = await postService.likePost(postId, userId);

    res.status(201).json(likedPost);
  } catch (error) {
    next(error);
  }
});

export default router;
