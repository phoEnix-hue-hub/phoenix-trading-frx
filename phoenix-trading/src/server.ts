import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './config';
import * as express from 'express';

console.log('MONGODB_URI:', config.mongodbUri); // Debug log

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true }); // Enable CORS for all origins
  const PORT = config.port;

  const server = await app.listen(PORT);
  console.log(`Server running on port ${PORT}`);

  server.on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EADDRINUSE') {
      const nextPort = PORT + 1;
      console.log(`Port ${PORT} is in use, trying ${nextPort}...`);
      app.listen(nextPort).then(() => console.log(`Server running on port ${nextPort}`));
    } else {
      console.error('Server error:', err);
    }
  });
}

bootstrap();
