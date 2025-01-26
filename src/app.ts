import express from 'express';
import rounter from './router';
import cors from 'cors';
import expressEjsLayouts from 'express-ejs-layouts';
import cookieParser from 'cookie-parser';
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(expressEjsLayouts);
app.use(express.urlencoded({ extended: true })); //For Login body json, POST METHOD
// app.use(express.json()); //For Login body json, POST METHOD
app.use(cors({
  origin: [`${process.env.LOCAL}`, `${process.env.DEPLOY}`], // Sesuaikan dengan origin frontend kamu
  methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Sesuaikan dengan method yang kamu perlukan
}));

app.use('/', rounter);

export default app;