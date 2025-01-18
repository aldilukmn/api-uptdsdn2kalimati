
import express from 'express';
import Gtk from '../controllers/gtk';
import handleImage from '../utils/uploadFile';
import User from '../controllers/user';

const router = express.Router();

// router.get('/', (req: Request, res: Response) => {
//   res.render('home', {
//     layout: 'layouts/main',
//     title: 'Home',
//   });
// })

// FOR ADMIN
router.get('/api/v1/user/:id', User.getUserById);
router.post('/api/v1/user', handleImage, User.register);
router.get('/api/v1/user', User.listUser);

// GET GTK DATA
router.get('/api/v1/gtk', Gtk.listGtk);
router.get('/api/v1/gtk/:id', Gtk.getGtkById);
router.post('/api/v1/gtk', handleImage, Gtk.createGtk);
router.patch('/api/v1/gtk/:id', handleImage, Gtk.updateGtk);
router.delete('/api/v1/gtk/:id', Gtk.deleteGtkById);

export default router