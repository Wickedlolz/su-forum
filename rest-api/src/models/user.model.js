import { Schema, model, Types } from 'mongoose';
import { USER_ROLES } from '../utils/userRoles';

const userSchema = new Schema(
    {
        tel: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        role: {
            type: Number,
            enum: [USER_ROLES.Admin, USER_ROLES.USER],
            default: 2,
        },
        photoURL: String,
        username: {
            type: String,
            required: true,
            unique: true,
            minlength: [5, 'Username should be at least 5 characters'],
            validate: {
                validator: function (v) {
                    return /[a-zA-Z0-9]+/g.test(v);
                },
                message: (props) =>
                    `${props.value} must contains only latin letters and digits!`,
            },
        },
        password: {
            type: String,
            required: true,
            minlength: [5, 'Password should be at least 5 characters'],
            validate: {
                validator: function (v) {
                    return /[a-zA-Z0-9]+/g.test(v);
                },
                message: (props) =>
                    `${props.value} must contains only latin letters and digits!`,
            },
        },
        themes: [
            {
                type: Types.ObjectId,
                ref: 'Theme',
            },
        ],
        posts: [
            {
                type: Types.ObjectId,
                ref: 'Post',
            },
        ],
    },
    { timestamps: true }
);

userSchema.index(
    {
        email: 1,
    },
    {
        unique: true,
        collation: {
            locale: 'en',
            strength: 2,
        },
    }
);

const User = model('User', userSchema);

export default User;
