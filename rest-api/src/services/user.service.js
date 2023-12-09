import User from '../models/user.model.js';
import { v2 as cloudinary } from 'cloudinary';

/**
 * Retrieve user profile information by user ID.
 *
 * @param {string} userId - The unique identifier of the user.
 *
 * @returns {Object|null} user - The user profile information, excluding the password and version.
 *                            Returns null if no user is found with the provided user ID.
 * @throws {Error} If an issue occurs during the retrieval process.
 */
export const getProfileInfo = async (userId) => {
    const user = await User.findOne(
        { _id: userId },
        { password: 0, __v: 0 }
    ).lean();

    return user;
};

/**
 * Edit user profile information.
 *
 * @param {string} userId - The unique identifier of the user.
 * @param {string} tel - The updated telephone number for the user.
 * @param {string} username - The updated username for the user.
 * @param {string} email - The updated email address for the user.
 * @param {string} photoURL - The URL of the new profile photo for the user.
 *
 * @returns {Object} userData - The updated user data, excluding the password.
 * @throws {Error} If there are validation errors or if an issue occurs during the update process.
 */
export const editProfileInfo = async (
    userId,
    tel,
    username,
    email,
    photoURL
) => {
    const user = await User.findById(userId);
    let uploadedResponse = undefined;

    if (photoURL) {
        // check if user already have photoURL remove it from cloudinary
        if (user.photoURL) {
            await cloudinary.uploader.destroy(
                user.photoURL.split('/').pop().split('.')[0]
            );
        }
        uploadedResponse = await cloudinary.uploader.upload(photoURL);
    }

    const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { tel, username, email, photoURL: uploadedResponse.secure_url },
        { runValidators: true, new: true }
    ).lean();

    const { password, ...userData } = updatedUser;

    return userData;
};
