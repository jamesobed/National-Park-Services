'use strict';
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const databaseConfig = require('./config/database.config');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

// Swagger
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const swaggerDocument = yaml.load('./swagger.yaml');

// Routes
const usersRoutes = require('./routes/users');

const port = process.env.PORT || 4003;

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/user', usersRoutes);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error handling middleware
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
});

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error("JWT_KEY must be defined");
    }

    try {
        await databaseConfig.sync({ 
            // force: true 
        });
        console.log('Database connected successfully 🚀');
    } catch (err) {
        console.log(err);
    }

    console.clear();
    console.log("Connected to MongoDb");

    app.listen(port, () => {
        console.log(`Listening on port ${port}!`);
    });
};

start();
