import express from 'express';
import cors from 'cors';
import expressEjsLayouts from 'express-ejs-layouts';
import cookieParser from 'cookie-parser';
import router from './router';
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(expressEjsLayouts);
app.use(express.urlencoded({ extended: true })); //For Login body json, POST METHOD
// app.use(express.json()); //For Login body json, POST METHOD
app.use(cors({
  origin: ['https://uptdsdn2kalimati.vercel.app', 'http://localhost:5173', 'http://localhost:3000'], // Sesuaikan dengan origin frontend kamu
  methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Sesuaikan dengan method yang kamu perlukan
  credentials: true
}));

app.use('/', router);

export default app;