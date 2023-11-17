import User from "../models/user.model.js";

export const getProfileInfo = async (userId) => {
  const user = await User.findOne(
    { _id: userId },
    { password: 0, __v: 0 }
  ).lean();

  return user;
};

export const editProfileInfo = async (userId, tel, username, email) => {
  const updatedUser = await User.findOneAndUpdate(
    { _id: userId },
    { tel, username, email },
    { runValidators: true, new: true }
  );

  return updatedUser;
};
