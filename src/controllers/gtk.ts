import type { Request, Response  } from 'express';
import GtkModel from '../models/schema/gtk';
import GtkService from '../services/gtk';
import GtkRequest from '../models/dto/gtk';
import { createDefaultResponse } from '../utils';

export default class Gtk {
  static listGtk = async (req: Request, res: Response): Promise<void> => {
    try {
      const gtkData = await GtkModel.find();
      const response = createDefaultResponse(200, 'success', 'data successfully retrieved', gtkData);
      res.status(200).json(response)
    } catch (e) {
      if (e instanceof Error) {
        const response = createDefaultResponse(400, 'fail', e.message)
        res.status(400).json(response);
      }
    };
  }

  static getGtkById = async (req: Request, res: Response): Promise<void> => {
    const gtkId: string = req.params.id;
    try {
      const getGtk = await GtkService.getGtkById(gtkId);
      const response = createDefaultResponse(200, 'success', 'gtk has found', getGtk);
      res.status(200).json(response);
    } catch (e) {
      if (e instanceof Error) {
        const response = createDefaultResponse(400, 'fail', e.message);
        res.status(400).json(response);
      }
    };
  }

  static deleteGtkById = async (req: Request, res: Response): Promise<void> => {
    const gtkId = req.params.id;
    try {
      await GtkService.deleteGtkById(gtkId);
      const response = createDefaultResponse(200, 'success', `gtk with id: ${gtkId} has been deleted`);
      res.status(200).json(response);
    } catch (e) {
      if (e instanceof Error) {
        const response = createDefaultResponse(400, 'fail', e.message);
        res.status(400).json(response);
      }
    };
  }

  static createGtk = async(req: Request, res: Response): Promise<void> => {
    const payload: GtkRequest = req.body;
    const image: string | undefined = req.file?.path;
    const typeImage: any = req.file?.mimetype
    try {
      const newGtk = await GtkService.createGtk(payload, image, typeImage);
      const response = createDefaultResponse(201, 'success', 'gtk successfully created', newGtk);
      res.status(201).json(response);
    } catch (e) {
      if (e instanceof Error) {
        const response = createDefaultResponse(400, 'fail', e.message);
        res.status(400).json(response);
      }
    };
  }

  static updateGtk = async (req: Request, res: Response): Promise<void> => {
    const payload: GtkRequest = req.body;
    const gtkId: string = req.params.id;
    const image: string | undefined = req.file?.path;
    const typeImage: any = req.file?.mimetype;
    try {
      const gtkUpdate = await GtkService.updateGtk(res, payload, gtkId, image, typeImage);
      const response = createDefaultResponse(200, 'success', 'gtk successfully updated', gtkUpdate);
      res.status(200).json(response);
    } catch (e) {
      if (e instanceof Error) {
        const response = createDefaultResponse(400, 'fail', e.message);
        res.status(400).json(response);
      }
    };
  }
}