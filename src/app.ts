import express from 'express';
import rounter from './router';
import cors from 'cors';
import env from 'dotenv';
// import expressEjsLayouts from 'express-ejs-layouts';
import cookieParser from 'cookie-parser';
env.config();

const app = express();

// app.use(express.static('public'));
// app.set('view engine', 'ejs');
// app.use(expressEjsLayouts);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); //For Login body json, POST METHOD
// app.use(express.json()); //For Login body json, POST METHOD
app.use(cors({
  origin: `https://uptdsdn2kalimati.vercel.app`,
  credentials: true
}));

app.use('/',rounter);

export default app;