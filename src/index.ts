import app from './app';
import { connectDB } from './config/database';

const startServer = async ():Promise<void> => {
  try {
    await connectDB();
    app.listen(process.env.PORT ?? 8086, () => {
      console.log(`Server is running on http://localhost:${process.env.PORT ?? 8086}/api/v1`)
    });
  } catch (error: any) {
    console.error('Failed to start server: ', error);
    throw error;
  }
};

startServer();