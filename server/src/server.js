import express from 'express';
import dotenv from 'dotenv/config.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import configViewEngine from './config/configEngine.js';
import { webRouters } from './routes/webRoutes.js';
import apiRoutes from './routes/apiRoutes.js';
import authRoutes from './routes/authRoutes.js';


const app = express();


// config middleware cors to connect with front-end
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));




const port = process.env.PORT || 8080;

// config to send data from client to server and get simpler data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// config middleware cookie-parse
app.use(cookieParser());

// config view engine
configViewEngine(app);

// config web routes
webRouters(app);
// config authentication
authRoutes(app);
// config api routes
apiRoutes(app);

// set and get cookies
app.get('/set-cookies', (req, res) => {

    res.cookie('newUser', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });

    res.send('you got the cookies');
});

app.get('/get-cookies', (req, res) => {
    res.json(req.cookies);
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})