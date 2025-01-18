import type { Request, Response  } from 'express';
import cloudinary from '../config/cloudinary'
import GtkRequest from '../models/dto/gtk'
import Gtk from '../models/entity/gtk'
import GtkRepository from '../repositories/gtk'

export default class GtkService {
  static createGtk = async (payload: GtkRequest, image: string | undefined, typeImage: any): Promise<GtkRequest> => {
    try {
      if(!payload.status || !payload.name) {
        throw new Error(`${
          !payload.status ? 'status'
          : !payload.name ? 'name'
          : null
        } is required!`)
      }


      if (
        typeImage !== 'image/png' &&
        typeImage !== 'image/jpg' &&
        typeImage !== 'image/jpeg'
      ) {
        throw new Error('It\'s not image format!')
      }

      if (!image) {
        throw new Error('Image is undefined!');
      }

      const imageUrl = await cloudinary.uploader.upload(image, { folder: 'gtk'},
        function (err: any, result: any) {
          if (err) {
            throw new Error('Failed to upload image to cloudinary!')
          }
          return result
        }
      )

      const newGtk: GtkRequest = {
        status: payload.status.toLowerCase(),
        name: payload.name,
        nip: payload.nip === '-' ? '' : payload.nip,
        class_gtk: payload.class_gtk,
        image_url: imageUrl.secure_url,
        image_id: imageUrl.public_id,
        totalStudent: {
          male: payload.totalStudent?.male,
          female: payload.totalStudent?.female
        }
      }
      await GtkRepository.createGtk(newGtk);
      return newGtk
    } catch (error: any) {
      throw error.message;
    }
  }

  static getGtkById = async (gtkId: string): Promise<Gtk> => {
    try {
      const getGtk = await GtkRepository.getGtkById(gtkId);
      return getGtk as Gtk;
    } catch (error: any) {
      throw new Error(error.message || 'Unknown error occurred!')
    }
  }

  static deleteGtkById = async (gtkId: string): Promise<void> => {
    try {
      const deleteGtk = await GtkRepository.deleteGtkById(gtkId);
      return deleteGtk;
    } catch (error: any) {
      throw new Error(error.message || 'Unknown error occurred!')
    }
  }

  static updateGtk = async (res: Response, payload: GtkRequest, gtkId: string, image: string | undefined, typeImage: any): Promise<Gtk> => {
    let gtkUpdate: GtkRequest;
    try {
      if (image) {
        if (
          typeImage !== 'image/png' &&
          typeImage !== 'image/jpg' &&
          typeImage !== 'image/jpeg'
        ) {
          throw new Error('It\'s not image format!')
        }
        const newImageUrl = await cloudinary.uploader.upload(image, { folder: 'gtk'},
          function (err: any, result: any) {
            if (err) {
              throw new Error('Failed to upload image to cloudinary!')
            }
            return result
          }
        )
        gtkUpdate = await GtkService.saveUpdate(payload, gtkId, newImageUrl.secure_url, newImageUrl.public_id)
      } else {
        gtkUpdate = await GtkService.saveUpdate(payload, gtkId)
      }
      return gtkUpdate as Gtk;
    } catch (error: any) {
      throw new Error(error.message || 'Unknown error occurred')
    }
  }

  static async saveUpdate (options: GtkRequest, gtkId: string, newImageUrl?: string, newImageId?: string): Promise<GtkRequest> {
    const { status, name, nip, class_gtk } = options;
    const existingGtk = await GtkRepository.getGtkById(gtkId);
    const totalStudent = {
      male: options.totalStudent?.male || existingGtk.totalStudent.male,
      female: options.totalStudent?.female || existingGtk.totalStudent.female,
    };
    const updateGtk: GtkRequest = {
      status: status || existingGtk.status,
      name: name || existingGtk.name,
      nip: nip || existingGtk.nip,
      class_gtk: class_gtk || existingGtk.class_gtk,
      image_url: newImageUrl || existingGtk.image_url,
      image_id: newImageId || existingGtk.image_id,
      totalStudent
    };
    await GtkRepository.updateGtk(gtkId, updateGtk);
    return updateGtk;
  }
}