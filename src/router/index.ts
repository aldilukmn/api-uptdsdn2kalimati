import express from 'express';
import Gtk from '../controllers/gtk';
import User from '../controllers/user';
import { handleImage } from '../utils';
import UserMiddleware from '../middlewares/user';

const router = express.Router();
const userUri = '/api/v1/user';
const gtkUri = '/api/v1/gtk';

// router.get('/', (req: Request, res: Response) => {
//   res.render('home', {
//     layout: 'layouts/main',
//     title: 'Home',
//   });
// })

// FOR ADMIN
router.get(`${userUri}/:id`, UserMiddleware.verifyToken, UserMiddleware.isAdmin, User.getUserById);
router.post(`${userUri}`, UserMiddleware.verifyToken, UserMiddleware.isAdmin, handleImage, User.register);
router.get(`${userUri}`, UserMiddleware.verifyToken, UserMiddleware.isAdmin, User.listUser);
router.delete(`${userUri}/:id`, UserMiddleware.verifyToken, UserMiddleware.isAdmin, User.deleteUserById);
router.post(`${userUri}/login`, User.login);
router.patch(`${userUri}/:id`, UserMiddleware.verifyToken, UserMiddleware.isAdmin, handleImage, User.updateUserById);

// GET GTK DATA
router.get(`${gtkUri}`, Gtk.listGtk);
router.get(`${gtkUri}/:id`, Gtk.getGtkById);
router.post(`${gtkUri}`, handleImage, Gtk.createGtk);
router.patch(`${gtkUri}/:id`, handleImage, Gtk.updateGtk);
router.delete(`${gtkUri}/:id`, Gtk.deleteGtkById);

export default router;