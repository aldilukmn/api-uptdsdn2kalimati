import { Document } from 'mongoose';

export default interface Gtk extends Document {
  status: string;
  name: string;
  nip: string;
  class_gtk: string;
  image_url: string;
  image_id: string;
  totalStudent: {
    male: number;
    female: number;
  }
};