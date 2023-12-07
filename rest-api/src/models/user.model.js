import { Schema, model, Types } from 'mongoose';

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
