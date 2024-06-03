import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VercelRequest, VercelResponse } from '@vercel/node';

let cachedApp;

async function bootstrapApp() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.init();
  return app;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (!cachedApp) {
      cachedApp = await bootstrapApp();
    }
    await cachedApp.getHttpAdapter().getInstance().handle(req, res);
  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).send('Internal Server Error');
  }
}
