import env from 'dotenv';
import express from 'express';
import rounter from './router';
import cors from 'cors';
import expressEjsLayouts from 'express-ejs-layouts';
env.config();

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(expressEjsLayouts);
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(cors());
app.use('/', rounter);

export default app;