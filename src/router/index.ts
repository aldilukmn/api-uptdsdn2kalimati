import express from 'express';
import Gtk from '../controllers/gtk';
import User from '../controllers/user';
import { handleImage } from '../utils';
import UserMiddleware from '../middlewares/user';

const router = express.Router();
const baseUrl = '/api/v1';
const userUrl =`${baseUrl}/user`;
const gtkUrl = `${baseUrl}/gtk`;

// router.get('/', (req: Request, res: Response) => {
//   res.render('home', {
//     layout: 'layouts/main',
//     title: 'Home',
//   });
// })

// FOR ADMIN
router.get(`${userUrl}/:id`, UserMiddleware.verifyToken, UserMiddleware.isAdmin, User.getUserById);
router.post(`${userUrl}`, UserMiddleware.verifyToken, UserMiddleware.isAdmin, handleImage, User.register);
router.get(`${userUrl}`, UserMiddleware.verifyToken, UserMiddleware.isAdmin, User.listUser);
router.delete(`${userUrl}/:id`, UserMiddleware.verifyToken, UserMiddleware.isAdmin, User.deleteUserById);
router.post(`${baseUrl}/login`, User.login);
router.patch(`${userUrl}/:id`, UserMiddleware.verifyToken, UserMiddleware.isAdmin, handleImage, User.updateUserById);

// GET GTK DATA
router.get(`${gtkUrl}`, Gtk.listGtk);
router.get(`${gtkUrl}/:id`, Gtk.getGtkById);
router.post(`${gtkUrl}`, handleImage, Gtk.createGtk);
router.patch(`${gtkUrl}/:id`, handleImage, Gtk.updateGtk);
router.delete(`${gtkUrl}/:id`, Gtk.deleteGtkById);

export default router;