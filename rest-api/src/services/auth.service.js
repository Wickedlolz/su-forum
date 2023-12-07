import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { hash, compare } from 'bcrypt';

/**
 * Registers a new user with the provided information, including telephone number, email,
 * username, and password. Performs email uniqueness check and stores the user in the database
 * after hashing the password.
 *
 * @param {string} tel - The telephone number of the new user.
 * @param {string} email - The email address of the new user.
 * @param {string} username - The desired username of the new user.
 * @param {string} password - The password for the new user.
 * @returns {Object} A user object with sensitive information removed after successful registration.
 * @throws {Object} An error object with a message property if registration fails.
 */
export const register = async (tel, email, username, password) => {
    const existing = await getUserByEmail(email);

    if (existing) {
        throw { message: 'Email is taken' };
    }

    const hashedPassword = await hash(
        password,
        Number(process.env.SALT_ROUNDS)
    );

    const user = new User({
        tel,
        email,
        username,
        password: hashedPassword,
    });

    await user.save();

    const result = bsonToJson(user);

    return removePassword(result);
};

/**
 * Authenticates a user by verifying the provided email and password.
 *
 * @param {string} email - The email address of the user attempting to log in.
 * @param {string} password - The password provided by the user for authentication.
 * @returns {Object} A user object with sensitive information removed upon successful authentication.
 * @throws {Object} An error object with a message property if authentication fails.
 */
export const login = async (email, password) => {
    const user = await getUserByEmail(email);

    if (!user) {
        throw { message: 'Incorect email or password!' };
    }

    const isIdentical = await compare(password, user.password);

    if (!isIdentical) {
        throw { message: 'Incorect email or password!' };
    }

    const result = bsonToJson(user);

    return removePassword(result);
};

/**
 * Creates a JSON Web Token (JWT) for the given user with a specified expiration time.
 *
 * @param {Object} user - The user object containing information like username, email, and user ID.
 * @returns {Promise<string>} - A promise that resolves with the generated JWT.
 * @throws {Error} - If there is an issue during JWT creation.
 */
export const createToken = (user) => {
    const tokenPromise = new Promise((resolve, reject) => {
        const payload = {
            username: user.username,
            email: user.email,
            _id: user._id,
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '2d' },
            (error, token) => {
                if (error) {
                    return reject(error);
                }

                resolve(token);
            }
        );
    });

    return tokenPromise;
};

/**
 * Validates a JSON Web Token (JWT) using the provided secret.
 *
 * @param {string} token - The JWT to be validated.
 * @returns {Object} - The decoded payload of the JWT.
 * @throws {Error} - If the token is invalid or an error occurs during verification.
 */
export const validateToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET, function (error, decoded) {
        if (error) {
            throw new Error(error.message);
        }

        return decoded;
    });
};

/**
 * Finds and returns a user object based on the provided email.
 *
 * @param {string} email - The email address used to look up the user.
 * @returns {Promise<Object|null>} A promise that resolves to the user object if found,
 *                                 or null if no user matches the provided email.
 * @throws {Error} If an error occurs during the database query.
 */
const getUserByEmail = async (email) => {
    const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });
    return user;
};

/**
 * Removes sensitive information (e.g., password and version number) from a user data object.
 *
 * @param {Object} data - The user data object containing sensitive information.
 * @returns {Object} A new object with sensitive information (password and version number) removed.
 */
const removePassword = (data) => {
    const { password, __v, ...userData } = data;
    return userData;
};

/**
 * Converts BSON (Binary JSON) data to a JSON (JavaScript Object Notation) object.
 *
 * @param {Object} data - The BSON data to be converted to JSON.
 * @returns {Object} A new object representing the JSON equivalent of the input BSON data.
 */
const bsonToJson = (data) => {
    return JSON.parse(JSON.stringify(data));
};
