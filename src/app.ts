import express from 'express';
import type { Request, Response } from 'express';
import rounter from './router';
// import cors from 'cors';
import expressEjsLayouts from 'express-ejs-layouts';
import cookieParser from 'cookie-parser';
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(expressEjsLayouts);
app.use(express.urlencoded({ extended: true })); //For Login body json, POST METHOD
// app.use(express.json()); //For Login body json, POST METHOD
// app.use(cors({
//   origin: ['https://uptdsdn2kalimati.vercel.app', 'http://localhost:5173', 'http://localhost:3000'], // Sesuaikan dengan origin frontend kamu
//   methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Sesuaikan dengan method yang kamu perlukan
//   credentials: true,
// }));
app.use((req: Request, res: Response) => {
  const allowedOrigins = ['https://uptdsdn2kalimati.vercel.app', 'http://localhost:5173', 'http://localhost:3000'];
  const origin = req.headers.origin!;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  };
  res.setHeader('Access-Control-Allow-Credentials', 'true');
})

app.use('/', rounter);

export default app;