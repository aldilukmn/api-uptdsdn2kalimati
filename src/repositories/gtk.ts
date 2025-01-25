import mongoose from 'mongoose';
import GtkRequest from '../models/dto/gtk';
import Gtk from '../models/entity/gtk';
import GtkModel from '../models/schema/gtk';
import cloudinary from '../config/cloudinary';

export default class GtkRepository {
  // Get Data By Id
  static async getGtkById (gtkId: string): Promise<Gtk> {
    if (!mongoose.Types.ObjectId.isValid(gtkId)) {
      throw new Error(`Invalid ID format: ${gtkId}`);
    }
    const gtkData = await GtkModel.findById(gtkId);
    if (!gtkData) {
      throw new Error(`GTK with Id ${gtkId} not found!`);
    }
    return gtkData;
  }

  // Create New GTK
  static async createGtk (data: GtkRequest): Promise<Gtk> {
    const newGtk = new GtkModel(data);
    return await newGtk.save();
  }

  // Update GTK
  static async updateGtk (gtkId: string, data: GtkRequest): Promise<Gtk> {

    if (!gtkId) {
      throw new Error('gtk id is required!');
    }

    if (!data) {
      throw new Error('no data provided for update!');
    }

    const updatedGtk = await GtkModel.findByIdAndUpdate(
      gtkId,
      {
        $set: data,
      }, {
        new: true, 
        runValidators: true
      }
    );

    if (!updatedGtk) {
      throw new Error(`gtk with id ${gtkId} not found!`);
    }

    return updatedGtk
  }

  // Delete GTK
  static async deleteGtkById(gtkId: string): Promise<void> {
    if (!mongoose.Types.ObjectId.isValid(gtkId)) {
      throw new Error(`invalid id format: ${gtkId}`);
    };
    const gtkData = await GtkModel.findById(gtkId);
    if (!gtkData) {
      throw new Error(`gtk with id ${gtkId} not found!`)
    };

    if (gtkData.image_id) {
      await cloudinary.uploader.destroy(gtkData.image_id);
    };

    await GtkModel.findByIdAndDelete(gtkId);
  }
}