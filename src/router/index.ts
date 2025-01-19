
import express from 'express';
import Gtk from '../controllers/gtk';
import User from '../controllers/user';
import { handleImage } from '../utils';

const router = express.Router();

// router.get('/', (req: Request, res: Response) => {
//   res.render('home', {
//     layout: 'layouts/main',
//     title: 'Home',
//   });
// })

// FOR ADMIN
router.get(`${process.env.USER_URL}/:id`, User.getUserById);
router.post(`${process.env.USER_URL}`, handleImage, User.register);
router.get(`${process.env.USER_URL}`, User.listUser);
router.delete('/api/v1/user/:id', User.deleteUserById);

// GET GTK DATA
router.get(`${process.env.GTK_URL}`, Gtk.listGtk);
router.get(`${process.env.GTK_URL}/:id`, Gtk.getGtkById);
router.post(`${process.env.GTK_URL}`, handleImage, Gtk.createGtk);
router.patch(`${process.env.GTK_URL}/:id`, handleImage, Gtk.updateGtk);
router.delete(`${process.env.GTK_URL}/:id`, Gtk.deleteGtkById);

export default router