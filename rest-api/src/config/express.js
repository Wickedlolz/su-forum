import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authMiddleware from '../middlewares/auth.middleware.js';
import { v2 as cloudinary } from 'cloudinary';

const whitelist = ['http://localhost:5000', 'http://localhost:4200'];

const epxressConfig = (app) => {
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser(process.env.COOKIE_SECRET));
    app.use(
        cors({
            origin: whitelist,
            credentials: true,
        })
    );
    app.use(authMiddleware());
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
};

export default epxressConfig;
