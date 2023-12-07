import express from 'express';
import dotenv from 'dotenv';
import epxressConfig from './src/config/express.js';
import mongooseConfig from './src/config/mongoose.js';
import router from './src/config/routes.js';
import errorHandler from './src/utils/errorHandler.js';

dotenv.config();

init();

async function init() {
    await mongooseConfig();

    const app = express();
    epxressConfig(app);
    app.use(router);

    app.use(errorHandler);

    app.listen(process.env.PORT, () =>
        console.log(
            '🚀 [server]: Server is up and running on port:',
            process.env.PORT
        )
    );
}
