export default interface GtkRequest {
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
}