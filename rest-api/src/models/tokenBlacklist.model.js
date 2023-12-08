import { Schema, model } from 'mongoose';

const tokenBlacklistSchema = new Schema(
    {
        token: String,
    },
    { timestamps: true }
);

const TokenBlacklist = model('TokenBlacklist', tokenBlacklistSchema);

export default TokenBlacklist;
