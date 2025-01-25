import mongoose, { Schema } from 'mongoose';
import Gtk from '../entity/gtk';

const GtkSchema: Schema = new Schema(
  {
    status: {
      type: String,
      require: true
    },
    name: {
      type: String,
      require: true
    },
    nip: {
      type: String,
      // unique: true
    },
    class_gtk: {
      type: String,
      require: false
    },
    image_url: {
      type: String,
      require: true
    },
    image_id: {
      type: String,
      require: true
    },
    total_student: {
      male: {
        type: Number,
        require: false
      },
      female: {
        type: Number,
        require: false
      }
    }
  },
  {
    collection: 'gtk',
    timestamps: true
  }
);

const GtkModel = mongoose.model<Gtk>('gtk', GtkSchema);

export default GtkModel;