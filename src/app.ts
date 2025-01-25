import env from 'dotenv';
import express from 'express';
import rounter from './router';
import cors from 'cors';
import expressEjsLayouts from 'express-ejs-layouts';
import cookieParser from 'cookie-parser';
// env.config();

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(expressEjsLayouts);
app.use(express.urlencoded({ extended: true })); //For Login body json, POST METHOD
// app.use(express.json()); //For Login body json, POST METHOD
app.use(cors({
  origin: [`${process.env.LOCAL}`, `${process.env.DEPLOY}`],
  credentials: true
}));

app.use('/', rounter);

export default app;