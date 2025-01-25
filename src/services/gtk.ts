import type { Response  } from 'express';
import GtkRequest from '../models/dto/gtk'
import Gtk from '../models/entity/gtk'
import GtkRepository from '../repositories/gtk'
import { handleCloudinary, isValidImage } from '../utils';

export default class GtkService {
  static createGtk = async (payload: GtkRequest, image: string | undefined, imageType: any): Promise<GtkRequest | undefined> => {
    try {
      if(!payload.status || !payload.name) {
        throw new Error(`${
          !payload.status ? 'status'
          : !payload.name ? 'name'
          : null
        } is required!`)
      };

      if (!isValidImage(imageType)) {
        throw new Error('It\'s not image format!')
      };

      if (!image) {
        throw new Error('Image is undefined!');
      };

      const imageUrl = await handleCloudinary(image, 'gtk');

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
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message);
      }
    }
  }

  static getGtkById = async (gtkId: string): Promise<Gtk | undefined> => {
    try {
      const getGtk = await GtkRepository.getGtkById(gtkId);
      return getGtk;
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message);
      }
    }
  }

  static deleteGtkById = async (gtkId: string): Promise<void> => {
    try {
      const deleteGtk = await GtkRepository.deleteGtkById(gtkId);
      return deleteGtk;
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message);
      }
    }
  }

  static updateGtk = async (payload: GtkRequest, gtkId: string, image: string | undefined, imageType: any): Promise<Gtk | undefined> => {
    let gtkUpdate: GtkRequest;
    try {
      if (image) {
        if (!isValidImage(imageType)) {
          throw new Error('It\'s not image format!')
        }

        const newImageUrl = await handleCloudinary(image, 'gtk');
        
        gtkUpdate = await GtkService.saveUpdate(payload, gtkId, newImageUrl.secure_url, newImageUrl.public_id)
      } else {
        gtkUpdate = await GtkService.saveUpdate(payload, gtkId)
      }
      return gtkUpdate as Gtk;
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message);
      }
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