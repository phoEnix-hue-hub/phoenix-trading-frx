import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express'; // Default import
import mongoose from 'mongoose'; // Default import
import { AppModule } from './app.module';

const expressApp = express();

export default async (req: any, res: any) => {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp), {
    logger: ['error', 'warn'],
  });

  // Connect to MongoDB with modern options (no deprecated parameters)
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    return res.status(500).json({ error: 'Database connection failed' });
  }

  await app.init();
  await app.getHttpAdapter().getInstance().handle(req, res);

  // Close MongoDB connection
  await mongoose.connection.close();
};
