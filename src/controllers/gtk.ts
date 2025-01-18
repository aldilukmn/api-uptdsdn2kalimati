import type { Request, Response  } from 'express';
import DefaultResponse from '../models/dto/response';
import GtkModel from '../models/schema/gtk';
import GtkService from '../services/gtk';
import GtkRequest from '../models/dto/gtk';

export default class Gtk {
  static listGtk = async (req: Request, res: Response): Promise<void> => {
    try {
      const gtkData = await GtkModel.find();
      const response: DefaultResponse = {
        status: {
          code: 200,
          response: 'success',
          message: 'Data successfully retrieved.'
        },
        result: gtkData
      };
      res.status(200).json(response)
    } catch (error: any) {
      const response: DefaultResponse = {
        status: {
          code: 400,
          response: 'error',
          message: error
        }
      };
      res.status(400).json(response)
    } 
  }

  static getGtkById = async (req: Request, res: Response): Promise<void> => {
    const gtkId: string = req.params.id;
    try {
      const getGtk = await GtkService.getGtkById(gtkId);
      const response: DefaultResponse = {
        status: {
          code: 200,
          response: 'success',
          message: 'gtk has found.'
        },
        result: getGtk
      };
      res.status(200).json(response);
    } catch (error: any) {
      const response: DefaultResponse = {
        status: {
          code: 404,
          response: 'fail',
          message: `${error}`
        }
      };
      res.status(404).json(response);
    }
  }

  static deleteGtkById = async (req: Request, res: Response): Promise<void> => {
    const gtkId = req.params.id;
    try {
      await GtkService.deleteGtkById(gtkId);
      const response: DefaultResponse = {
        status: {
          code: 200,
          response: 'success',
          message: `GTK with id: ${gtkId} has been deleted`
        }
      };
      res.status(200).json(response);
    } catch (error: any) {
      const response: DefaultResponse = {
        status: {
          code: 400,
          response: 'fail',
          message: `${error}`
        }
      }
      res.status(400).json(response);
    }
  }

  static createGtk = async(req: Request, res: Response): Promise<void> => {
    const payload: GtkRequest = req.body;
    const image: string | undefined = req.file?.path;
    const typeImage: any = req.file?.mimetype
    try {
      const newGtk = await GtkService.createGtk(payload, image, typeImage);
      const response: DefaultResponse = {
        status: {
          code: 201,
          response: 'success',
          message: 'GTK successfully created.'
        },
        result: newGtk
      }
      res.status(201).json(response);
    } catch (error: any) {
      const response: DefaultResponse = {
        status: {
          code: 400,
          response: 'fail',
          message: `${error}`
        }
      }
      res.status(400).json(response);
    }
  }

  static updateGtk = async (req: Request, res: Response): Promise<void> => {
    const payload: GtkRequest = req.body;
    const gtkId: string = req.params.id;
    const image: string | undefined = req.file?.path;
    const typeImage: any = req.file?.mimetype;
    try {
      const gtkUpdate = await GtkService.updateGtk(res, payload, gtkId, image, typeImage);
      const response: DefaultResponse = {
        status: {
          code: 200,
          response: 'success',
          message: 'GTK successfully updated.'
        },
        result: gtkUpdate
      }
      res.status(200).json(response);
    } catch (error: any) {
      const response: DefaultResponse = {
        status: {
          code: 400,
           response: 'fail',
           message: `${error}`
        }
      };
      res.status(400).json(response);
    }
  }
}